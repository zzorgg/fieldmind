import { LogoMark } from '@/components/logo';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';
import { THEME } from '@/lib/theme';
import {
    CloudSunIcon,
    MapPinIcon,
    PlantIcon,
    PlusIcon,
    SignOutIcon
} from 'phosphor-react-native';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUICK_ACTIONS = [
  { icon: PlantIcon, label: 'Field Log' },
  { icon: MapPinIcon, label: 'Locations' },
  { icon: CloudSunIcon, label: 'Weather' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const palette = THEME[colorScheme ?? 'light'];
  const { user } = useAuthContext();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Sign out failed', error.message);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 py-4"
        showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3">
            <LogoMark size="sm" />
            <View>
              <Text className="text-xl font-bold text-foreground">fieldmind</Text>
              <Text className="text-xs text-muted-foreground">Field intelligence</Text>
            </View>
          </View>
          <TouchableOpacity
            className="flex-row items-center gap-2 bg-muted rounded-full px-3 py-1.5 active:opacity-80"
            onPress={handleSignOut}>
            <SignOutIcon size={14} color={palette.primary} weight="bold" />
            <Text className="text-xs text-primary font-medium">Sign out</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome card */}
        <View className="bg-primary rounded-3xl p-5 mb-5">
          <Text className="text-primary-foreground text-xl font-bold mb-1">
            Good morning! 👋
          </Text>
          <Text className="text-primary-foreground/80 text-sm">
            Your fields are synced. Everything is up to date.
          </Text>
          {!!user?.email && (
            <Text className="text-primary-foreground/90 text-xs mt-2">{user.email}</Text>
          )}
        </View>

        {/* Quick actions */}
        <Text className="text-base font-semibold text-foreground mb-3">Quick access</Text>
        <View className="flex-row gap-3 mb-6">
          {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
            <TouchableOpacity
              key={label}
              className="flex-1 items-center gap-2 bg-card border border-border rounded-2xl py-4 active:opacity-75">
              <Icon size={24} color={palette.primary} weight="fill" />
              <Text className="text-xs font-medium text-foreground">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Placeholder empty state */}
        <Text className="text-base font-semibold text-foreground mb-3">Recent activity</Text>
        <View className="bg-card border border-border rounded-2xl p-8 items-center gap-3">
          <PlantIcon size={40} color={palette.border} weight="fill" />
          <Text className="text-muted-foreground text-sm text-center">
            No activity yet. Start by adding a field log.
          </Text>
          <TouchableOpacity className="flex-row items-center gap-2 bg-primary rounded-xl px-4 py-2 mt-1 active:opacity-80">
            <PlusIcon size={16} color={palette.primaryForeground} weight="bold" />
            <Text className="text-primary-foreground text-sm font-semibold">Add log</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
