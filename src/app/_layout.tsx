import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../../global.css';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'league-spartan-black': require('../../assets/fonts/LeagueSpartan-Black.ttf'),
    'league-spartan-bold': require('../../assets/fonts/LeagueSpartan-Bold.ttf'),
    'league-spartan-extrabold': require('../../assets/fonts/LeagueSpartan-Bold.ttf'),
    'league-spartan-extralight': require('../../assets/fonts/LeagueSpartan-ExtraLight.ttf'),
    'league-spartan-light': require('../../assets/fonts/LeagueSpartan-Light.ttf'),
    'league-spartan-medium': require('../../assets/fonts/LeagueSpartan-Medium.ttf'),
    'league-spartan-regular': require('../../assets/fonts/LeagueSpartan-Regular.ttf'),
    'league-spartan-semibold': require('../../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    'league-spartan-thin': require('../../assets/fonts/LeagueSpartan-Thin.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  )
}
