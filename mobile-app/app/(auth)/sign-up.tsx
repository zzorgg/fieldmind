import { router } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { SignUpForm } from '@/components/sign-up-form';
import type { SocialProvider } from '@/components/social-connections';
import { signInWithOAuth } from '@/lib/oauth';
import { supabase } from '@/lib/supabase';

export default function SignUpScreen() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSignUp(values: { name: string; email: string; password: string }) {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          },
        },
      });

      if (error) {
        Alert.alert('Sign up failed', error.message);
        return;
      }

      Alert.alert('Check your email', 'Confirm your email link to finish sign up.');
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Sign up failed', error instanceof Error ? error.message : 'Unknown error.');
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
      <SignUpForm
        onSubmit={handleSignUp}
        onSignInPress={() => router.replace('/(auth)/login')}
        onSocialPress={handleSocialSignIn}
        isSubmitting={isSubmitting}
      />
    </AuthScreenLayout>
  );
}
