import { booksList } from "@/assets/data/books";
import About from "@/components/About";
import RotateLogo from "@/components/RotateLogo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const book = booksList.find((item) => item.id === Number(id));

  return (
    <SafeAreaView style={styles.container}>
      {(book && (
        <View>
          <ThemedView style={styles.headerContainer}>
            {/* Header Image */}
            <View style={{ width: 120, height: 120 }}>
              <RotateLogo />
            </View>
            {/* Title and Search */}
            <View style={styles.titleContainer}>
              <ThemedText style={styles.titleText}>
                ၷႂၫမ်းꩬႃꩬꩫႃ ꧤႃꩬႃတႆးꩫꧥင်း
              </ThemedText>
            </View>
          </ThemedView>
          {book && (
            <ThemedView style={styles.contentContainer}>
              <ThemedText style={styles.titleText}>{book.title}</ThemedText>
              <ThemedText style={styles.contentText}>{book.content}</ThemedText>
            </ThemedView>
          )}
        </View>
      )) || <About />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes the full height
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    //backgroundColor:'#0B192C',
    borderBottomColor: "gray",
    borderWidth: 0.2,
    marginVertical: 10,
  },
  reactLogo: {
    height: 100,
    width: 150,
  },
  titleContainer: {
    //backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    // borderBottomColor: "#DDD",
    marginTop: 0,
  },
  titleText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 1,
  },
  contentContainer: {
    marginVertical: 10,
    width: "100%",
    height: "auto",
    padding: 5,
  },
  contentText: {
    width: "100%",
    height: "auto",
  },
});
