import { router } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { SignInForm } from '@/components/sign-in-form';
import type { SocialProvider } from '@/components/social-connections';
import { signInWithOAuth } from '@/lib/oauth';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleEmailSignIn(values: { email: string; password: string }) {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.signInWithPassword(values);

      if (error) {
        Alert.alert('Sign in failed', error.message);
        return;
      }

      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Sign in failed', error instanceof Error ? error.message : 'Unknown error.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn(provider: SocialProvider) {
    try {
      setIsSubmitting(true);
      await signInWithOAuth(provider);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        `${provider === 'github' ? 'GitHub' : 'Google'} sign in failed`,
        error instanceof Error ? error.message : 'Unknown error.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthScreenLayout onBack={() => router.back()}>
      <SignInForm
        onSubmit={handleEmailSignIn}
        onSignUpPress={() => router.replace('/(auth)/sign-up')}
        onSocialPress={handleSocialSignIn}
        isSubmitting={isSubmitting}
      />
    </AuthScreenLayout>
  );
}
