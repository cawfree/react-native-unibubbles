import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { View, Animated, StyleSheet, Dimensions, Platform, Easing } from "react-native";
import AnimatedMath from "react-native-animated-math";
import useDeepCompareEffect from "use-deep-compare-effect";

import { UniBubbleContext } from "../contexts";
import { useAnimationLoop } from "../hooks";

const parseBubbles = ({ bubbles, angle, width }) => {
  const [...offsets] = bubbles.map(() => new Animated.ValueXY({ x: 0, y: 0 }));
  const [Component] =  bubbles
    .reduce(
      ([Child, parentSize], { size, style, offset, children }, i) => {
        const Component = ({ children: nextChildren, ...extraProps }) => (
          <Child key={i}>
            <Animated.View
              {...extraProps}
              style={{
                ...style,
                width: size,
                height: size,
                borderRadius: size * 0.5,
                transform: [
                  { translateX: Animated.add((parentSize - size) * 0.5, Animated.multiply(AnimatedMath.sin(Animated.add(angle, offset)), (parentSize - size) * 0.5)) },
                  { translateX: offsets[i].x },
                  { translateY: offsets[i].y },
                ],
              }}
            >
              {nextChildren || null}
              {children}
            </Animated.View>
          </Child>
        );
        return [Component, size];
      },
      [React.Fragment, width],
    );
  return [Component, offsets];
};

function UniBubbles({ style, width, bubbles, duration, start, stop }) {

  const createLoop = useCallback(
    anim => Animated.sequence([
      Animated.timing(
        anim,
        { toValue: 1, duration, easing: Easing.linear, useNativeDriver: Platform.OS !== "web" },
      ),
      Animated.timing(
        anim,
        { toValue: 0, duration, easing: Easing.linear, useNativeDriver: Platform.OS !== "web" },
      ),
    ]),
    [duration],
  );

  const loop = useAnimationLoop(start, createLoop);
  const angle = Animated.add(Animated.multiply(loop, (start - stop)), start);

  const [[Bubbles, offsets], setBubbles] = useState(() => parseBubbles({ bubbles, angle, width }));

  useDeepCompareEffect(
    () => setBubbles(parseBubbles({ bubbles, angle, width })),
    [bubbles, angle, width, setBubbles],
  ); 

  return (
    <UniBubbleContext.Provider value={{ offsets, bubbles }}>
      <Animated.View style={[StyleSheet.flatten(style), { width }]}>
        <Bubbles />
      </Animated.View>
    </UniBubbleContext.Provider>
  );
}

UniBubbles.propTypes = {
  style: PropTypes.any,
  width: PropTypes.number.isRequired,
  bubbles: PropTypes.arrayOf(PropTypes.shape({})),
  duration: PropTypes.number,
  start: PropTypes.number,
  stop: PropTypes.number,
};

UniBubbles.defaultProps = {
  style: {},
  bubbles: [],
  duration: 1000,
  start: Math.PI * 1.5,
  stop: Math.PI * 0.5,
};

export default UniBubbles;
