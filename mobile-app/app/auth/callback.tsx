import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { supabase } from '@/lib/supabase';

export default function AuthCallbackScreen() {
  const params = useLocalSearchParams();

  useEffect(() => {
    let cancelled = false;

    async function completeAuthFlow() {
      const code = Array.isArray(params.code) ? params.code[0] : params.code;
      const accessToken = Array.isArray(params.access_token)
        ? params.access_token[0]
        : params.access_token;
      const refreshToken = Array.isArray(params.refresh_token)
        ? params.refresh_token[0]
        : params.refresh_token;

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      } else if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }

      if (!cancelled) {
        router.replace('/(tabs)');
      }
    }

    completeAuthFlow();

    return () => {
      cancelled = true;
    };
  }, [params.access_token, params.code, params.refresh_token]);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator />
    </View>
  );
}
