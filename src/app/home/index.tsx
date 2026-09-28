import DateStrip from "@/components/DateStrip";
import { Rubik_500Medium, useFonts } from "@expo-google-fonts/rubik";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalanderIcon from "@/assets/icons/calander.svg";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({ RubikMedium: Rubik_500Medium });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <CalanderIcon width={22} height={22} />
        <Text style={styles.today}>Today</Text>
      </View>
      <DateStrip />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  today: {
    flex: 1,
    paddingStart: 10,
    fontSize: 20,
    color: "#0560FA",
    fontFamily: "RubikMedium",
  },
});
