import { useState, useEffect } from "react";
import {
  FlatList,
  Animated,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import BookItem from "@/components/ui/BookItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import RotateLogo from "@/components/RotateLogo";
import { postApiUrl, postsList } from "@/assets/data/books";
import { PostType } from "@/types";

const API_URL = postApiUrl; // Replace with your API endpoint

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setBooksList] = useState<PostType[]>(postsList); // Initialize with default books
  const [loading, setLoading] = useState(false);
  const theme = useColorScheme() ?? "light";

  // Load stored books list on app start
  useEffect(() => {
    const loadBooks = async () => {
      const storedData = await AsyncStorage.getItem("booksList");
      if (storedData) {
        setBooksList(JSON.parse(storedData));
      }
    };
    loadBooks();
  }, []);

  // Fetch data from the API and update the list
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      await AsyncStorage.setItem("booksList", JSON.stringify(data)); // Save updated data to storage
      setBooksList(data); // Replace the current list
      Alert.alert("Success", "Books list updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to fetch books data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort items based on search query
  const filteredItems = list
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => Number(b.id) - Number(a.id));

  // Animation state
  const animations = filteredItems.map(() => new Animated.Value(0));

  useEffect(() => {
    // Start animation when the component is mounted
    Animated.stagger(
      100,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [filteredItems]);

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    const translateY = animations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0], // Slide up effect
    });

    const opacity = animations[index];

    return (
      <Animated.View
        style={{
          transform: [{ translateY }],
          opacity,
        }}
      >
        <BookItem {...item} />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.headerContainer}>
        <View style={{ width: 120, height: 120 }}>
          <RotateLogo />
        </View>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.titleText}>ꩫမ်ႍၷႂၫမ်းတႆးꩫꧥင်း</ThemedText>
          <ThemedView style={styles.searchContainer}>
            <TextInput
              style={[
                styles.search,
                { backgroundColor: theme === "light" ? "white" : "gray" },
              ]}
              placeholder={`🔎 ${list.length} items`}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </ThemedView>
        </View>

        {/* Smarter Button */}
        <Pressable
          onPress={fetchBooks}
          disabled={loading}
          style={({ pressed }) => [
            styles.updateButton,
            pressed && styles.pressedButton,
            loading && styles.disabledButton,
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>
              Update
            </ThemedText>
          )}
        </Pressable>
      </ThemedView>

      {/* FlatList */}
      <FlatList
        style={styles.listContainer}
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomColor: "gray",
    borderWidth: 0.2,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#CCC",
    width: 220,
    height: 50,
  },
  search: {
    flex: 1,
    padding: 4,
    fontSize: 16,
    color: "black",
    height: "100%",
    borderRadius: 5,
  },
  updateButton: {
    marginTop: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  pressedButton: {
    transform: [{ scale: 0.98 }],
    backgroundColor: "#005BBB",
  },
  disabledButton: {
    backgroundColor: "#B0C4DE",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    padding: 5,
    width: "100%",
    height: "100%",
    marginVertical: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
