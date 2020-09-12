# react-native-unibubbles
The animated floating header for [**Uni**](https://getuni.app). It's a way to use a config object to declare a group of nested floating animations which can be interrupted asynchronously.

## 🚀 Getting Started

Using [`yarn`](https://yarnpkg.com):

```
yarn add react-native-unibubbles
```

## ✍️ Usage

```javascript
import React from "react";
import { TouchableOpacity, StyleSheet, Animated, Platform } from "react-native";
import { useWindowDimensions } from "react-native-use-dimensions";

import { UniBubbles, useUniBubbles } from "react-native-unibubbles";

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
        children: <Animated.View />,
      },
    ]}
    />
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
