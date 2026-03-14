import { supabase } from '@/lib/supabase';
import type { Provider } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export async function signInWithOAuth(provider: Provider) {
  const redirectTo = Linking.createURL('auth/callback');
  console.info('[auth] OAuth start', { provider, redirectTo });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.url) {
    throw new Error('Supabase did not return an OAuth URL.');
  }

  const authUrl = new URL(data.url);
  const requestedRedirectTo = authUrl.searchParams.get('redirect_to');
  console.info('[auth] OAuth URL received', {
    requestedRedirectTo,
    authHost: authUrl.host,
  });

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  console.info('[auth] Browser session result', { type: result.type });

  const hasUrl = 'url' in result && typeof result.url === 'string' && result.url.length > 0;

  if (result.type !== 'success' || !hasUrl) {
    console.warn('[auth] OAuth did not complete successfully', {
      type: result.type,
      hasUrl,
    });
    return;
  }

  const callbackUrlString = result.url;
  if (!callbackUrlString) {
    console.warn('[auth] OAuth success result was missing callback URL');
    return;
  }

  const callbackUrl = new URL(callbackUrlString);
  const code = callbackUrl.searchParams.get('code');

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      throw new Error(exchangeError.message);
    }
    console.info('[auth] Session exchanged from code');
    return;
  }

  const hash = callbackUrl.hash.startsWith('#') ? callbackUrl.hash.slice(1) : callbackUrl.hash;
  const hashParams = new URLSearchParams(hash);
  const accessToken = hashParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token');

  console.info('[auth] Parsed callback params', {
    hasCode: !!code,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
  });

  if (!accessToken || !refreshToken) {
    console.warn('[auth] Missing token pair in callback URL');
    return;
  }

  const { error: setSessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (setSessionError) {
    throw new Error(setSessionError.message);
  }

  console.info('[auth] Session set from token pair');
}
