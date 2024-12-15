import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  ActivityIndicator,
  ScrollViewBase,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RotateLogo from "@/components/RotateLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import About from "@/components/About";
import { useLocalSearchParams } from "expo-router";
import { PostType } from "@/types";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const storedData = await AsyncStorage.getItem("booksList");
        if (storedData) {
          const books: PostType[] = JSON.parse(storedData);
          const foundBook = books.find((item) => item.id === Number(id));
          setBook(foundBook || null);
        } else {
          setBook(null);
        }
      } catch (error) {
        setError("Failed to fetch book data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ThemedView style={styles.headerContainer}>
          {/* Header Image */}
          <View style={styles.logoContainer}>
            <RotateLogo />
          </View>
          {/* Title and Search */}
          <View style={styles.titleContainer}>
            <ThemedText style={styles.titleText}>
              ၷႂၫမ်းꩬႃꩬꩫႃ ꧤႃꩬႃတႆးꩫꧥင်း
            </ThemedText>
          </View>
        </ThemedView>
        {/* Content */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : error ? (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        ) : book && (
          <ScrollView style={styles.contentContainer}>
            <ThemedText style={styles.bookTitle}>{book.title}</ThemedText>
            <ThemedText style={styles.bookContent}>{book.content}</ThemedText>
          </ScrollView>
        ) || <ScrollView style={styles.aboutContainer}>
            <About/>
          </ScrollView>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomColor: "gray",
    borderWidth: 0.2,
    marginVertical: 10,
  },
  logoContainer: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    paddingHorizontal: 10,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    marginTop: 0,
  },
  titleText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 1,
  },
  contentContainer: {
    marginVertical: 5,
    width: "100%",
    padding: 10,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  bookContent: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  loader: {
    marginTop: 50,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  aboutContainer:{
    height:600,
    overflow:'scroll'
  }
});

export default DetailsScreen;
