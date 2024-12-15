import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedView } from "./ThemedView";
import { Collapsible } from "./Collapsible";
import { about1, about2, about3, about4, about5, aboutIntroduction } from "@/assets/data/about";

const About = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <View style={styles.headerImage}>
          <Image
            source={require("@/assets/images/developer.png")}
            style={styles.reactLogo}
          />
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText>Shan Ni Vocabularies</ThemedText>
        <ThemedText>@ Mauk Khon Hein</ThemedText>
      </ThemedView>
      <ThemedText>{aboutIntroduction}</ThemedText>
      <Collapsible title="About Vocabularies 🔡">
        {about1 &&
          about1.map((item, index) => (
            <ThemedText key={index}>
              {item.status + ". " + item.describion}
            </ThemedText>
          ))}
      </Collapsible>

      <Collapsible title="About Application 📱">
        {about2 &&
          about2.map((item, index) => (
            <ThemedText key={index}>
              {item.status + ". " + item.describion}
            </ThemedText>
          ))}
      </Collapsible>

      <Collapsible title="About Finance 💰">
        {about3 &&
          about3.map((item, index) => (
            <ThemedText key={index}>
              {item.status + ". " + item.describion}
            </ThemedText>
          ))}
      </Collapsible>
      <Collapsible title="Contact">
        {about5 &&
          about5.map((item, index) => (
            <ThemedText key={index}>
              {item.status + ". " + item.describion}
            </ThemedText>
          ))}
      </Collapsible>
      <Collapsible title="About Developer🧑‍💻">
        {about4 &&
          about4.map((item, index) => (
            <ThemedText key={index}>
              {item.status + ". " + item.describion}
            </ThemedText>
          ))}
      </Collapsible>
    </ParallaxScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  headerImage: {
    
    color: "#808080",
    //bottom: -90,
    //position: "absolute",
    width:'100%',
    height:150,
    justifyContent:'center',
    alignItems:'center',
  },
  titleContainer: {
    //flexDirection: "row",
    gap: 8,
  },
  reactLogo: {
    height: 150,
    width: 150,
  },
});
