import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './index.styles';
const soundData = [
  { label: 'Big Sound', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 1', image: null, file: require('../assets/sounds/Explosion.mp3') },
  { label: 'Sound 2', image: null, file: require('../assets/sounds/BigExplosion.mp3') },
  { label: 'Sound 3', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 4', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 5', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 6', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 7', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 8', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 9', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Sound 10', image: null, file: require('../assets/sounds/DuelOfFates.mp3') },
];

export default function SoundboardPage() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async (index: number) => {
    if (playingIndex === index) {
      // Stop if same button pressed again
      await sound?.stopAsync();
      setPlayingIndex(null);
      return;
    }

    // Stop previous
    if (sound) {
      await sound.unloadAsync();
    }

    // Load and play new
    const { sound: newSound } = await Audio.Sound.createAsync(soundData[index].file);
    setSound(newSound);
    setPlayingIndex(index);
    await newSound.playAsync();
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Soundboard</Text>

      {/* Top Big Button */}
      <TouchableOpacity
        onPress={() => playSound(0)}
        style={styles.bigButton}
      >
        {soundData[0].image ? (
          <Image source={soundData[0].image} style={styles.image} />
        ) : (
          <Text style={styles.buttonText}>{soundData[0].label}</Text>
        )}
      </TouchableOpacity>

      {/* Grid Buttons */}
      <View style={styles.gridSoundsPage}>
        {soundData.slice(1).map((item, i) => (
          <TouchableOpacity
            key={i + 1}
            onPress={() => playSound(i + 1)}
            style={styles.gridButton}
          >
            {item.image ? (
              <Image source={item.image} style={styles.image} />
            ) : (
              <Text style={styles.buttonText}>{item.label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}