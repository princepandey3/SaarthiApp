import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme(); // "light" | "dark" | null

  const isDark = colorScheme === 'dark';

  return (
    <>
      {/* Status bar background */}
      <View
        style={{
          height: insets.top,
          backgroundColor: isDark ? '#000' : '#fff', // black in dark mode, white in light mode
        }}
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* Status bar text/icons adapt to theme */}
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}
