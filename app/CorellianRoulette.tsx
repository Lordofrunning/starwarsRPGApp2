import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const spinnerSlots = [
  { label: "x1.2", multiplier: 1.2 },
  { label: "x0.8", multiplier: 0.8 },
  { label: "x1.5", multiplier: 1.5 },
  { label: "DRAIN", multiplier: 0 },
  { label: "x2.5", multiplier: 2.5 },
  { label: "x1.0", multiplier: 1.0 },
  { label: "x0.5", multiplier: 0.5 },
  { label: "STEAL", effect: "steal" },
  { label: "x2.0", multiplier: 2.0 },
  { label: "DOUBLE DRAIN", multiplier: -1 },
];

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.8;
const wheelOuter = width * 0.9;

export default function Spinner() {
  const spinAnim = useRef(new Animated.Value(0)).current;
  
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
  if (isSpinning) return;

  setIsSpinning(true);
  const selected = Math.floor(Math.random() * 10);
  setResultIndex(selected);

  const segmentAngle = 360 / spinnerSlots.length;
  const spinAmount = 360 * 5; // 5 full spins
  const endAngle = spinAmount + segmentAngle * selected * -1;

  // Reset the animation value before spinning
  spinAnim.setValue(0);

  Animated.timing(spinAnim, {
    toValue: endAngle,
    duration: 3000,
    useNativeDriver: true,
    easing: Easing.out(Easing.cubic),
  }).start(() => {
    setIsSpinning(false);
  });
};
  const interpolated = spinAnim.interpolate({
  inputRange: [0, 360],
  outputRange: ["0deg", "360deg"],
});

  return (
    <View style={styles.container}>
        <View style={styles.wheelOuter}> 
      <Animated.View style={[styles.wheel, { transform: [{ rotate: interpolated }] }]}>
        {spinnerSlots.map((slot, i) => {
          const angle = (360 / spinnerSlots.length) * i;
          const rad = (angle * Math.PI) / 180;
          const radius = WHEEL_SIZE / 2.5;

          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <View
              key={i}
              style={[
                styles.segment,
                {
                  position: "absolute",
                  left: WHEEL_SIZE / 2 + x - 30,
                  top: WHEEL_SIZE / 2 + y - 15,
                },
              ]}
            >
              <Text style={styles.segmentText}>{slot.label}</Text>
            </View>
          );
        })}
      </Animated.View>
        </View>
      <View style={styles.pointer} />

      <TouchableOpacity style={styles.spinButton} onPress={spin} disabled={isSpinning}>
        <Text style={styles.spinText}>{isSpinning ? "Spinning..." : "SPIN"}</Text>
      </TouchableOpacity>

      {resultIndex !== null && !isSpinning && (
        <Text style={styles.resultText}>
          Result: {spinnerSlots[resultIndex].label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: 'grey'
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 3,
    borderColor: "#444",
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  wheelOuter: {
    width: wheelOuter,
    height: wheelOuter,
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 3,
    borderColor: "#white",
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  segment: {
    width: 60,
    height: 30,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#777",
    borderWidth: 1,
  },
  segmentText: {
    color: "#0ff",
    fontWeight: "bold",
    fontSize: 12,
  },
  pointer: {
  position: "absolute",
  top: "50%",
  right: 10, 
  marginTop: -10,
  width: 0,
  height: 0,
  borderTopWidth: 10,
  borderBottomWidth: 10,
  borderRightWidth: 20,
  borderStyle: "solid",
  backgroundColor: "transparent",
  borderTopColor: "transparent",
  borderBottomColor: "transparent",
  borderRightColor: "#ff0", // Yellow pointer
  zIndex: 10,
},
  spinButton: {
    backgroundColor: "#0f0",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  spinText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
});