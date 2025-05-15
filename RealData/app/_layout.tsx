import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import { EventProvider } from '@/components/ui/event-context-provider'
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from "@/utils/supabase";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const queryClient = new QueryClient();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

    useEffect(() => {
        const autoSignIn = async () => {
            if (isAuthenticated) {
                console.log("User is already authenticated!")
                return;
            }

            const {data, error} = await supabase.auth.signInWithPassword({
                email: 'test@test.com',
                password: 'test123',
            });

            if (error) {
                console.error("Error signing in: ", error)
            }
            else {
                setIsAuthenticated(true);
                console.log("User is signed in!");
            }
        }
        autoSignIn();
    });

  if (!loaded) {
    return null;
  }

  return (
      <QueryClientProvider client={queryClient}>
          <GluestackUIProvider mode="light">
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <EventProvider>
                      <Stack>
                          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                          <Stack.Screen name="addEvent" options={{ headerShown: true}} />
                          <Stack.Screen name="+not-found" />
                      </Stack>
                      <StatusBar style="auto" />
                  </EventProvider>
              </ThemeProvider>
          </GluestackUIProvider>
      </QueryClientProvider>
  );
}
