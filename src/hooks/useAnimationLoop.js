import { useCallback, useEffect, useState } from "react";
import { Animated, Platform } from "react-native";

const defaultCreate = anim => Animated.delay(anim, 0);

export default function useAnimationLoop(start, create = defaultCreate) {
  const [anim, setAnim] = useState(() => new Animated.Value(start));

  const executeLoop = useCallback(
    async () => new Promise((resolve, reject) =>  create(anim).start(({ finished }) => {
      !!finished && resolve();
      !finished && reject(new Error(`Animation was cancelled.`));
    })),
    [anim, create],
  );
  
  useEffect(
    () => {
      async function loopAnimation() {
        await executeLoop().then(loopAnimation);
      }
      /* ignore promise rejections on stop */
      loopAnimation()
        .catch(console.error);
    },
    [executeLoop],
  );

  return anim;
}
