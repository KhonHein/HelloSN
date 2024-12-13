import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

const RotateLogo = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000, // Full rotation duration
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
  }, [rotateValue]);

  const rotateAnimation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Rotating Border */}
      <Animated.View
        style={[
          styles.borderContainer,
          { transform: [{ rotate: rotateAnimation }] },
        ]}
      />

      {/* Static Image */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.reactLogo}
        />
      </View>
    </View>
  );
};

export default RotateLogo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    //backgroundColor: "#fff",

  },
  borderContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "transparent",
    borderStyle: "solid",
    position: "absolute",
    borderTopColor: "red",
    borderRightColor: "white",
    borderBottomColor: "green",
    borderLeftColor: "yellow",
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    //backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  reactLogo: {
    width: "100%",
    height: "100%",
  },
});
