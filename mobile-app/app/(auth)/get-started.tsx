import { router } from 'expo-router';
import { View } from 'react-native';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function GetStartedScreen() {
  return (
    <AuthScreenLayout keyboardAware={false}>
      <View className="flex-1 items-center justify-between py-4">
        <View className="flex-1 items-center justify-center gap-6">
          <Logo size="lg" />
          <View className="items-center gap-2 mt-2">
            <Text className="max-w-xs text-center text-lg text-muted-foreground">
              Field reporting that still works when the internet doesn&apos;t.
            </Text>
          </View>
        </View>

        <View className="w-full gap-3">
          <Button className="w-full" onPress={() => router.push('/(auth)/sign-up')}>
            <Text>Create account</Text>
          </Button>
          <Button variant="secondary" className="w-full" onPress={() => router.push('/(auth)/login')}>
            <Text>Sign in</Text>
          </Button>
        </View>
      </View>
    </AuthScreenLayout>
  );
}
