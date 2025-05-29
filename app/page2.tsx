import { Audio } from 'expo-av';
import React, { useRef } from 'react';
import { Animated, Button, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

const segments = 12;
const radius = 120;
const colors = ['red', 'green'];

function createSlices() {
  const angle = (2 * Math.PI) / segments;
  let slices = [];

  for (let i = 0; i < segments; i++) {
    const startAngle = i * angle;
    const endAngle = startAngle + angle;

    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius + radius * Math.sin(startAngle);

    const x2 = radius + radius * Math.cos(endAngle);
    const y2 = radius + radius * Math.sin(endAngle);

    const path = `
      M${radius},${radius}
      L${x1},${y1}
      A${radius},${radius} 0 0 1 ${x2},${y2}
      Z
    `;

    slices.push(
      <Path
        key={i}
        d={path}
        fill={colors[i % colors.length]}
        stroke="black"
        strokeWidth={1}
      />
    );
  }
  return slices;
}

export default function App() {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const ballAnim = useRef(new Animated.Value(0)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  // Load sound once
  React.useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(require('../assets/spin.mp3'));
      soundRef.current = sound;
    })();
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  const spin = () => {
    // Play spin sound
    soundRef.current?.replayAsync();

    spinAnim.setValue(0);
    ballAnim.setValue(0);

    // Spin animation: 4 full rotations (1440deg) slowing down
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // Ball animation synced but phase offset to simulate rolling
    Animated.timing(ballAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };
  
  // Interpolate rotation for wheel
  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1440deg'], // 4 rotations
  });

  // Ball position on circle (phase offset so ball looks like it's rolling)
  const ballAngle = ballAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2 * Math.PI * 4], // 4 circles in radians
  });

  // Calculate ball position using sin/cos
  const ballX = ballAngle.interpolate({
    inputRange: [0, 2 * Math.PI * 4],
    outputRange: [radius * 2, radius * 2], // dummy to enable interpolation
  }); // We'll use Animated.multiply and Animated.sin/cos instead

  // To animate x and y coordinates along circle, use Animated.sin and Animated.cos:
  // Unfortunately React Native Animated doesn't support sin/cos natively,
  // so we use 'Animated.modulo' trick to loop and interpolate x/y.

  // Instead, we'll use `Animated` with `Animated.divide` and `Animated.sin` using
  // `Animated` math helpers from 'react-native-reanimated' or use state + useEffect.
  // For simplicity, let's use useEffect + setInterval to update position every 16ms:

  const [ballPos, setBallPos] = React.useState({ x: radius * 2, y: radius });

  React.useEffect(() => {
    let animationFrame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      // duration = 5000ms
      const progress = Math.min(elapsed / 5000, 1);
      // Ball makes 4 full circles:
      const angle = 2 * Math.PI * 4 * progress + Math.PI / 4; // phase offset

      const x = radius + radius * Math.cos(angle);
      const y = radius + radius * Math.sin(angle);

      setBallPos({ x, y });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (spinAnim._value === 0) return;

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [spinAnim._value]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
        <Svg height={radius * 2} width={radius * 2}>
          <G>{createSlices()}</G>
          {/* Ball */}
          <Circle
            cx={ballPos.x}
            cy={ballPos.y}
            r={10}
            fill="white"
            stroke="black"
            strokeWidth={2}
          />
        </Svg>
      </Animated.View>
      <View style={{ marginTop: 20 }}>
        <Button title="Spin" onPress={spin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
