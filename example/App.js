import React from "react";
import { View, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native-use-dimensions";

import { UniBubbles } from "./lib";

const styles = StyleSheet.create({
  container: {
    marginLeft: -100,
    marginTop: -400,
  },
});

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <UniBubbles
      style={styles.container}
      width={windowWidth + 200}
      duration={windowWidth * 100}
      bubbles={[
      {
        size: 800,
        style: { backgroundColor: 'red' },
        offset: 0,
      },
      {
        size: 440,
        style: {
          position: "absolute",
          bottom: 10,
          backgroundColor: 'green'
        },
        offset: Math.PI,
      },
      {
        size: 330,
        style: {
          position: "absolute",
          bottom: 10,
          backgroundColor: 'blue',
          alignItems: "center",
          justifyContent: "center",
        },
        offset: Math.PI,
        children: (
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "orange",
            }}
          />
        ),
      },
    ]}
    />
  );
}
