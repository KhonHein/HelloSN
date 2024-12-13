import React, { useState, useEffect } from "react";
import {
  FlatList,
  Animated,
  StyleSheet,
  TextInput,
  Image,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { booksList } from "@/assets/data/books";
import BookItem from "@/components/ui/BookItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import RotateLogo from "@/components/RotateLogo";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useColorScheme() ?? "light";

  const filteredItems = booksList
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.id - a.id);

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

  const renderItem = ({ item, index }: { item: any; index: number }) => {
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
        <View style={{width:120, height:120}}>
        <RotateLogo/>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.titleText}>Hello Shan Ni</ThemedText>
          <ThemedView style={styles.searchContainer}>
            <TextInput
              style={[
                styles.search,
                { backgroundColor: theme === "light" ? "white" : "gray" },
              ]}
              placeholder={`🔎 ${booksList.length} items`}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </ThemedView>
        </View>
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
