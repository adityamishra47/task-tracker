import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SplashIcon from "@/assets/icons/splashIcon.svg";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <SplashIcon width={196} height={96} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
