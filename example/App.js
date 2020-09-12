import React from "react";
import { TouchableOpacity, StyleSheet, Animated, Platform } from "react-native";
import { useWindowDimensions } from "react-native-use-dimensions";

import { UniBubbles, useUniBubbles } from "./lib";

const styles = StyleSheet.create({
  container: {
    marginLeft: -100,
    marginTop: -400,
  },
});

const JiggleButton = ({ ...extraProps }) => {
  const { offsets, bubbles } = useUniBubbles();
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        backgroundColor: "orange",
      }}
      onPress={() => {
        Animated.sequence(
          [
            Animated.stagger(
              50,
              offsets.map(
                offset => Animated.timing(
                  offset,
                  {
                    toValue: { x: Math.random() > 0.5 ? 1 : -1 * Math.random() * 100, y: Math.random() > 0.5 ? 1 : -1 * Math.random() * 100 },
                    duration: 100,
                    useNativeDriver: Platform.OS !== "web",
                  },
                ),
              ),
            ),
            Animated.parallel(
              offsets.map(
                offset => Animated.timing(
                  offset,
                  {
                    toValue: { x: 0, y: 0 },
                    duration: 300,
                    useNativeDriver: Platform.OS !== "web",
                  },
                ),
              ),
            ),
          ],
        ).start();
      }}
    />
  );
};

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
        children: <JiggleButton />,
      },
    ]}
    />
  );
}
