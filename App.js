import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation/Navigation";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontLoaded] = useFonts({
    "SFPro-Regular": require("./assets/font/SFProDisplay-Regular.ttf"),
    "SFPro-Bold": require("./assets/font/SFProDisplay-Semibold.ttf"),
    "Seraya-Display": require("./assets/font/Seraya.ttf"),
    "IvyMode-Regular": require("./assets/font/IvyMode-Regular.ttf"),
    "IvyMode-SemiBold": require("./assets/font/IvyMode-SemiBold.ttf"),
    "IvyMode-Bold": require("./assets/font/IvyMode-Bold.ttf"),
  });
  if (!fontLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
