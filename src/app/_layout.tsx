import {
  DMSans_400Regular,
  DMSans_700Bold,
  DMSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/dm-sans';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { FontFamily } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AuthProvider } from '@/state/auth-context';
import { CartProvider } from '@/state/cart-context';
import { OrdersProvider } from '@/state/orders-context';
import { SettingsProvider } from '@/state/settings-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
    DMSans_800ExtraBold,
  });

  // Hide the splash screen once fonts are ready; on error, fall back to system fonts.
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Gives the navigation (headers, screen backgrounds) our colors instead of its defaults.
  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.background,
      text: theme.text,
      border: theme.border,
    },
  };

  // Native header with a back arrow and a title, for the order flow screens.
  const withHeader = {
    headerShown: true,
    headerShadowVisible: false,
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: theme.text,
    headerTitleStyle: { fontFamily: FontFamily.regular },
  } as const;

  return (
    <ThemeProvider value={navigationTheme}>
      <AuthProvider>
        <SettingsProvider>
          <OrdersProvider>
            <CartProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="scan" options={{ presentation: 'fullScreenModal' }} />
                <Stack.Screen name="spot-camera" options={{ presentation: 'fullScreenModal' }} />
                <Stack.Screen name="cart" options={{ ...withHeader, title: 'Your cart' }} />
                <Stack.Screen name="spot" options={{ ...withHeader, title: 'Confirm your spot' }} />
                <Stack.Screen name="checkout" options={{ ...withHeader, title: 'Checkout' }} />
                <Stack.Screen name="sign-in" options={{ ...withHeader, title: 'Sign in' }} />
                <Stack.Screen
                  name="settings/notifications"
                  options={{ ...withHeader, title: 'Notifications' }}
                />
                <Stack.Screen
                  name="settings/payment-methods"
                  options={{ ...withHeader, title: 'Payment methods' }}
                />
                <Stack.Screen
                  name="settings/language"
                  options={{ ...withHeader, title: 'Language' }}
                />
                <Stack.Screen
                  name="settings/help"
                  options={{ ...withHeader, title: 'Help & support' }}
                />
                <Stack.Screen
                  name="settings/privacy"
                  options={{ ...withHeader, title: 'Privacy' }}
                />
              </Stack>
            </CartProvider>
          </OrdersProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
