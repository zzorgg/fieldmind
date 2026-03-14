import { SocialConnections, type SocialProvider } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { type TextInput, View } from 'react-native';

type SignInFormProps = {
  onSubmit?: (values: { email: string; password: string }) => void;
  onForgotPassword?: () => void;
  onSignUpPress?: () => void;
  onSocialPress?: (provider: SocialProvider) => void;
  isSubmitting?: boolean;
};

export function SignInForm({
  onSubmit,
  onForgotPassword,
  onSignUpPress,
  onSocialPress,
  isSubmitting = false,
}: SignInFormProps) {
  const passwordInputRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function handleSubmit() {
    onSubmit?.({ email: email.trim(), password });
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Sign in to your app</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-auto min-h-0 px-1 py-1"
                  disabled={isSubmitting}
                  onPress={onForgotPassword}>
                  <Text className="font-normal leading-5">Forgot your password?</Text>
                </Button>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
              />
            </View>
            <Button className="w-full" disabled={isSubmitting} onPress={handleSubmit}>
              <Text>{isSubmitting ? 'Please wait...' : 'Continue'}</Text>
            </Button>
          </View>
          <View className="flex-row items-center justify-center gap-1">
            <Text className="text-sm text-muted-foreground">Don&apos;t have an account?</Text>
            <Button
              variant="link"
              size="sm"
              className="h-auto min-h-0 px-0 py-1"
              disabled={isSubmitting}
              onPress={onSignUpPress}>
              <Text className="leading-5">Sign up</Text>
            </Button>
          </View>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections onPress={isSubmitting ? undefined : onSocialPress} />
        </CardContent>
      </Card>
    </View>
  );
}
