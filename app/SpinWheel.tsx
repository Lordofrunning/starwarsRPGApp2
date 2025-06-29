// import { Audio } from 'expo-av';
// import React, { useEffect, useRef, useState } from 'react';
// import { Animated, Button, Easing, StyleSheet, Text, TextInput, View } from 'react-native';
// import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
// const segments = 12;
// const radius = 160;
// const padding = 20;
// const borderSize = radius * 2 + padding * 2;
// const cornerRoundness = borderSize / 2; // super rounded
// const ballradius = 140;
// const colors = ['red', 'green'];



// function createSlices() {
//   const angle = (2 * Math.PI) / segments;
//   let slices = [];

//   for (let i = 0; i < segments; i++) {
//     const startAngle = i * angle;
//     const endAngle = startAngle + angle;

//     const x1 = radius + radius * Math.cos(startAngle);
//     const y1 = radius + radius * Math.sin(startAngle);

//     const x2 = radius + radius * Math.cos(endAngle);
//     const y2 = radius + radius * Math.sin(endAngle);

//     const path = `
//       M${radius},${radius}
//       L${x1},${y1}
//       A${radius},${radius} 0 0 1 ${x2},${y2}
//       Z
//     `;

//     slices.push(
//       <Path
//         key={i}
//         d={path}
//         fill={colors[i % colors.length]}
//         stroke="black"
//         strokeWidth={1}
//       />
//     );
//   }
//   return slices;
// }

// function getRandomTileIndexByColor(color: 'red' | 'green') {
//   const indexes = Array.from({ length: segments }, (_, i) => i).filter(
//     i => colors[i % colors.length] === color
//   );
//   const randomIndex = indexes[Math.floor(Math.random() * indexes.length)];
//   return randomIndex;
// }
// function getAngleForTile(index: number) {
//   const anglePerSegment = (2 * Math.PI) / segments;
//   const offset = anglePerSegment / 2; // aim for center of tile
//   return index * anglePerSegment + offset;
// }


// export default function App() {
//   const handleRed = () => console.log('Red pressed');
//   const handleGreen = () => console.log('Green pressed');
//   const spinAnim = useRef(new Animated.Value(0)).current;
//   const soundRef = useRef<Audio.Sound | null>(null);
//   const [value, setValue] = React.useState('');
//   const [ballPos, setBallPos] = useState({ x: ballradius * 2, y: ballradius });
  
//   const handleGreenPress = () => {
//     console.log('Green pressed');
//   };

//   const handleRedPress = () => {
//     console.log('Red pressed');
//   };

//   useEffect(() => {
//     (async () => {
//       const { sound } = await Audio.Sound.createAsync(require('../assets/spin.mp3'));
//       soundRef.current = sound;
//     })();
//     return () => {
//       if (soundRef.current) soundRef.current.unloadAsync();
//     };
//   }, []);

//   function animateBallToTarget(targetAngle: number) {
//     let animationFrame: number;
//     let start: number | null = null;

//     const totalDuration = 5000;
//     const totalRotations = 4;
//     const finalAngle = 2 * Math.PI * totalRotations + targetAngle;

//     const animate = (timestamp: number) => {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;
//       const progress = Math.min(elapsed / totalDuration, 1);

//       const easedProgress = 1 - Math.pow(1 - progress, 3); // ease out
//       const angle = finalAngle * easedProgress;

//       const bounceStrength = Math.log10(10 - 9 * progress); // decreases faster as progress → 1
//       const bounce = 10 * Math.sin(progress * 20 * Math.PI) * bounceStrength;

//       const jitter = (Math.random() - 0.5) * 4;
//       const r = radius*0.85 + bounce;

//       const x = radius + r * Math.cos(angle) + jitter;
//       const y = radius + r * Math.sin(angle) + jitter;

//       setBallPos({ x, y });

//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationFrame);
//   }


//   const spin = (forceColor?: 'red' | 'green') => {
//     // Sound
//     soundRef.current?.replayAsync();

//     spinAnim.setValue(0);
//     //ballAnim.setValue(0);

//     Animated.timing(spinAnim, {
//       toValue: 1,
//       duration: 5000,
//       easing: Easing.out(Easing.cubic),
//       useNativeDriver: true,
//     }).start();

//     // Choose target tile
//     const colorToLandOn = forceColor ?? (Math.random() < 0.5 ? 'red' : 'green');
//     const tileIndex = getRandomTileIndexByColor(colorToLandOn);
//     const targetAngle = getAngleForTile(tileIndex);

//     // Animate ball
//     animateBallToTarget(targetAngle);
//   };


//   const spinInterpolate = spinAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '1440deg'],
//   });

//   const FooterText = () => (
//     <View style={{
//       position: 'absolute',
//       bottom: 80,
//       width: '100%',
//       alignItems: 'center',
//     }}>
//       <Text style={{ fontSize: 16, color: 'black' }}>
//         Enter your wager and choose a color
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Rotating wheel with ball */}
//       <Animated.View
//         style={{
//           position: 'absolute',
//           transform: [{ rotate: spinInterpolate }],
//         }}
//       >
//         <Svg height={radius * 2 + 40} width={radius * 2 + 40}>
//           <G transform="translate(20, 20)">
//             {createSlices()}
//             <Circle
//               cx={ballPos.x}
//               cy={ballPos.y}
//               r={10}
//               fill="white"
//               stroke="black"
//               strokeWidth={2}
//             />
//           </G>
//         </Svg>
//       </Animated.View>

//       {/* Square-like border with rounded corners (on top) */}
//       <Svg
//         height={radius * 2 + 40}
//         width={radius * 2 + 40}
//         style={{ position: 'absolute' }}
//       >
//         <Rect
//           x={0}
//           y={0}
//           width={radius * 2 + 40}
//           height={radius * 2 + 40}
//           rx={180} // roundness of corners
//           ry={180}
//           stroke="saddlebrown"
//           strokeWidth={55}
//           fill="none"
//         />
//       </Svg>
//       {/* Spin button */}
//       <View style={{ marginTop: 20 }}>
        
//         <Button title="Spin!" onPress={() => spin('green')} />
//       </View>
//       <View style={{position: 'absolute', bottom: 120, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Button title="Green" color="green" onPress={handleGreenPress} />
//         <TextInput
//           value={value}
//           onChangeText={setValue}
//           style={{
//             borderColor: 'black',
//             borderWidth: 1,
//             padding: 10,
//             width: 100,
//             backgroundColor: 'white',
//             textAlign: 'center',
//           }}
//           keyboardType="numeric"
//         />
//         <Button title="Red" color="red" onPress={handleRedPress} />
//       </View>
//       <FooterText />
//     </View>
//   );
// }//<Button title="Spin!" onPress={() => spin('red')} />

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });
