import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import SplashScreenComponent from "./screens/SplashScreen"; // SplashScreen bileşeni

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isSplashScreenVisible, setSplashScreenVisible] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setTimeout(() => {
        setSplashScreenVisible(false);
      }, 3000); // 3 saniye splash screen göster
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isSplashScreenVisible ? (
        <SplashScreenComponent />
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          {/* Yayıncı ve İzleyici sayfalarında bottom tab navigation gizlendi */}
          <Stack.Screen
            name="streamer"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="viewer"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
