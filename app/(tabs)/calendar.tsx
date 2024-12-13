import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RotateLogo from "@/components/RotateLogo";
import MyCalendar from "@/components/MyCalendar";

const calendar = () => {
  return (
    <SafeAreaView>
      <ThemedView style={styles.headerContainer}>

        <View style={{ width: 120, height: 120 }}>
          <RotateLogo />
        </View>
        
        <View style={styles.titleContainer}>
          <ThemedText style={styles.titleText}>ꩫမ်ႍၷႂၫမ်းတႆးꩫꧥင်း</ThemedText>
        </View>

      </ThemedView>
      
      <MyCalendar/>

    </SafeAreaView>
  );
};

export default calendar;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomColor: "gray",
    borderWidth: 0.2,
    marginVertical:10,
  },

  titleContainer: {
    paddingHorizontal: 10,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    marginTop: 0,
  },
  titleText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 1,
  },
});
