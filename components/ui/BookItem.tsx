import { Image, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { Link } from "expo-router";
import { BookType } from "@/types";

const BookItem = (item:BookType) => {

  return (
    
      <Link
      
        href={{
          pathname: "/details/[id]",
          params: { id: item.id },
        }}
      >
        <ThemedView style={styles.bookContainer}>
        <ThemedView style={styles.imageContainer}>
        
          <Image
            source={require('@/assets/images/pray.png')}
            style={styles.reactLogo}
          />
        
        </ThemedView>
        <ThemedView style={styles.titleContainer}><ThemedText style={styles.text}>{item.title}</ThemedText></ThemedView>
        </ThemedView>
      </Link>
    
  );
};

export default BookItem;

const styles = StyleSheet.create({
  bookContainer: {
    width: 160,
    height: 140,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "",
  },
  imageContainer: {
    width: '100%',
    height: 100,
    borderColor:'gray',
    borderWidth:0.5,
    borderTopEndRadius:5,
    borderTopStartRadius:5,
    justifyContent:'center',
    alignItems:'center',
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius:5,
  },
  reactLogo: {
    height: 90,
    width: 85,
  },
  titleContainer:{
    width:'100%',
    height:35,
    borderBottomEndRadius:5,
    borderBottomStartRadius:5,
    borderColor:'gray',
    borderWidth:0.5,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:0,
  },
  title: {
    fontSize: 14,
    width:'auto',
  },
  text:{
    fontSize:12,
  }
});
