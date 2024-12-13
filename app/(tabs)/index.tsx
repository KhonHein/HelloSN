import {
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { ThemedText } from "@/components/ThemedText";
import { vocabs, vocabType } from "@/assets/data";
import Item from "@/components/ui/Item";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import NotFoundItem from "@/components/ui/NotFoundItem";
import RotateLogo from "@/components/RotateLogo";

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";
  const [items, setItems] = useState<vocabType[]>(vocabs);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on the search query

  const filteredItems = items.filter((item: vocabType) =>
    item.tai.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.myan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.eng.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderItem = (item:vocabType) => <AnimatedItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
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
                { backgroundColor: theme && "gray" || "black" },
              ]}
              placeholder={`🔎 ${items.length} vocabs`}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </ThemedView>
        </View>
      </ThemedView>
      {filteredItems.length>0&&<FlatList
      style={styles.itemContainer}
        data={filteredItems} // Data for the list
        keyExtractor={(item) => item.id.toString()} // Use item.id as the key
        renderItem={({ item }: { item: vocabType }) => (
          <AnimatedItem item={item} /> // Render the AnimatedItem
        )}
        numColumns={3} // Two columns
        columnWrapperStyle={styles.columnWrapper} // Adjust spacing between columns
      /> || <NotFoundItem/>}
    </SafeAreaView>
  );
}

function AnimatedItem({ item }: { item: vocabType }) {
  const opacity = useRef(new Animated.Value(0)).current;

  Animated.timing(opacity, {
    toValue: 1,
    duration: 900,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={[styles.itemContainer, { opacity }]}>
      <Item
        id={item.id}
        tai={item.tai}
        myan={item.myan}
        eng={item.eng}
        description={item.description}
        isArchived={item.isArchived}
        created_at={item.created_at}
        updated_at={item.updated_at}
        authorId={item.authorId}
      />
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    marginHorizontal: "auto",
    justifyContent: "center",
  },
  itemsContainer: {
    width: "100%",
    marginHorizontal: "auto",
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
    marginHorizontal: "auto",
  },
  search: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    height: "100%",
    borderRadius: 5,
  },
  itemContainer: {
    marginBottom: 10, // Add spacing between items
  },
  columnWrapper: {
    justifyContent: "space-between", // Space items evenly in a row
    marginBottom: 10,
    flexWrap:'wrap'
  },
});
