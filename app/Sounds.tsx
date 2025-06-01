import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './index.styles';
const soundData = [
  { label: 'StarWars', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Explosion', image: null, file: require('../assets/sounds/Explosion.mp3') },
  { label: 'BigExplosion', image: null, file: require('../assets/sounds/BigExplosion.mp3') },
  { label: 'TieFlyBy', image: null, file: require('../assets/sounds/TieFlyBy.mp3') },
  { label: 'TieBlastt', image: null, file: require('../assets/sounds/TieBlastt.mp3') },
  { label: 'TieBlasts', image: null, file: require('../assets/sounds/TieBlasts.mp3') },
  { label: 'TieExplode', image: null, file: require('../assets/sounds/TieExplode.mp3') },
  { label: 'ShipFlyBy', image: null, file: require('../assets/sounds/ShipFlyBy.mp3') },
  { label: 'LaserTurret', image: null, file: require('../assets/sounds/LaserTurret.mp3') },
  { label: 'TieChase', image: null, file: require('../assets/sounds/TieChase.mp3') },
  { label: 'AsteroidChase', image: null, file: require('../assets/sounds/AsteroidChase.mp3') },
  { label: 'CantinBand', image: null, file: require('../assets/sounds/CantinBand.mp3') },
  { label: 'BeepBoops', image: null, file: require('../assets/sounds/BeepBoops.mp3') },
  { label: 'Jump2', image: null, file: require('../assets/sounds/Jump2.mp3') },
  { label: 'DuelOfFates', image: null, file: require('../assets/sounds/DuelOfFates.mp3') },
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