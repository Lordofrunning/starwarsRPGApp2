import { Audio } from 'expo-av';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './index.styles';
const soundData = [
  { label: 'Star Wars', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Duel Of Fates', image: null, file: require('../assets/sounds/DuelOfFates.mp3') },
  { label: 'Cantina Band', image: null, file: require('../assets/sounds/CantinaBand.mp3') },
  { label: 'Asteroid Chase', image: null, file: require('../assets/sounds/AsteroidChase.mp3') },
  { label: 'Tie Chase', image: null, file: require('../assets/sounds/TieChase.mp3') },

  { label: 'DL44 Blaster Pistol', image: null, file: require('../assets/sounds/DL44BlasterPistol.mp3') },
  { label: 'Stun Blaster', image: null, file: require('../assets/sounds/StunBlaster.mp3') },
  { label: 'Blaster Fight', image: null, file: require('../assets/sounds/BlasterFight.mp3') },
  { label: 'Wilhelm Scream', image: null, file: require('../assets/sounds/WilhelmScream.mp3') },
  { label: 'Excited Droid', image: null, file: require('../assets/sounds/DroidSounds.mp3') },
  { label: 'Booping Droid', image: null, file: require('../assets/sounds/BBDroid.mp3') },
  { label: 'Hyperspace Jump', image: null, file: require('../assets/sounds/Jump2.mp3') },
  { label: 'Hyperdrive Trouble', image: null, file: require('../assets/sounds/HyperDriveTrouble.mp3') },

  { label: 'Alarm Siren', image: null, file: require('../assets/sounds/Siren.mp3') },
  { label: 'Space Ship Blast', image: null, file: require('../assets/sounds/SpaceShipBlast.mp3') },

  { label: 'Explosion', image: null, file: require('../assets/sounds/Explosion.mp3') },
  { label: 'Big Explosion', image: null, file: require('../assets/sounds/BigExplosion.mp3') },
  { label: 'Ship Fly By', image: null, file: require('../assets/sounds/ShipFlyBy.mp3') },
  { label: 'Laser Turret', image: null, file: require('../assets/sounds/LaserTurret.mp3') },

  { label: 'Tie Blast', image: null, file: require('../assets/sounds/TieBlastt.mp3') },
  { label: 'Tie Blasts', image: null, file: require('../assets/sounds/Blastsss.mp3') },
  { label: 'Tie Fly By', image: null, file: require('../assets/sounds/TieFlyBy.mp3') },
  { label: 'Tie Explode', image: null, file: require('../assets/sounds/TieExplode.mp3') },
  { label: 'Pew', image: null, file: require('../assets/sounds/Pew.mp3') },
  { label: 'Light Saber On Off', image: null, file: require('../assets/sounds/LightSaberOnOff.mp3') },

  { label: 'Prowler', image: null, file: require('../assets/sounds/Prowler.mp3') },
  { label: 'Monster Roar', image: null, file: require('../assets/sounds/Roar.mp3') },
  { label: 'Far Away Growl', image: null, file: require('../assets/sounds/Growl.mp3') },

  { label: 'Yoda Wisdom', image: null, file: require('../assets/sounds/DoOrDoNot.mp3') },

  { label: 'Death Radio', image: null, file: require('../assets/sounds/tmp.mp3') },
  { label: 'Galaxy Meme', image: null, file: require('../assets/sounds/GalaxyMeme.mp3') },
  { label: 'Lava Chicken', image: null, file: require('../assets/sounds/LavaChicken.mp3') },
];

export default function SoundboardPage() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const router = useRouter();

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
//<Stack.Screen options={{ headerShown: false }} />
  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
            <View style={styles.headerTitleCenter}>
              <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
                <Text style={styles.menuArrow}>←</Text>
              </TouchableOpacity>
      
              <View style={styles.logoContainer}>
                <Image
                  source={require('../assets/images/logos/rpg_main_logo.png')}
                  style={styles.smallImage}
                  resizeMode="contain"
                />
              </View>
            
            </View>

            <ScrollView contentContainerStyle={[{alignItems: 'center', maxHeight: 2000}]}>
      <Text style={styles.title}>Sound Board</Text>
      {/* Top Big Button */}
      <TouchableOpacity onPress={() => playSound(0)} style={styles.bigButton}>
  <ImageBackground
    source={require('../assets/images/starwars_opening_crawl.png')} // your background image path
    style={styles.imageBackground}
    imageStyle={{ borderRadius: 10 }} // optional: rounded corners
  >
    {soundData[0].image ? (
      <Image source={soundData[0].image} style={[{width: "100%"}]} />
    ) : (
      <Text style={styles.buttonText}></Text>
    )}
  </ImageBackground>
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
    </View>
  );
}