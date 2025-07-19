import { Audio } from 'expo-av';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './index.styles';

const soundData = [
  { label: 'Star Wars', image: null, file: require('../assets/sounds/StarWars.mp3') },
  { label: 'Duel Of Fates', image: require("../assets/images/SoundImages/DuelOfFatesImage.png"), file: require('../assets/sounds/DuelOfFates.mp3') },
  { label: 'Cantina Band', image: require("../assets/images/SoundImages/cantinaBandImage.png"), file: require('../assets/sounds/CantinaBand.mp3') },
  { label: 'Asteroid Chase', image: require("../assets/images/SoundImages/AsteroidChaseImage.png"), file: require('../assets/sounds/AsteroidChase.mp3') },
  { label: 'Tie Chase', image: require("../assets/images/SoundImages/TieChaseImage.png"), file: require('../assets/sounds/TieChase.mp3') },

  { label: 'DL44 Blaster Pistol', image: require("../assets/images/SoundImages//DL44BlasterImage.png"), file: require('../assets/sounds/DL44BlasterPistol.mp3') },
  { label: 'Stun Blaster', image: require("../assets/images/SoundImages/StunBlast.png"), file: require('../assets/sounds/StunBlaster.mp3') },
  { label: 'Blaster Fight', image: require("../assets/images/SoundImages/BlasterFire.jpg"), file: require('../assets/sounds/BlasterFight.mp3') },
  { label: 'Wilhelm Scream', image: require("../assets/images/SoundImages/WilhelmScreamST.png"), file: require('../assets/sounds/WilhelmScream.mp3') },
  { label: 'Excited Droid', image: require("../assets/images/SoundImages/R2D2.jpg"), file: require('../assets/sounds/DroidSounds.mp3') },
  { label: 'Booping Droid', image: require("../assets/images/SoundImages/BBDroid.jpg"), file: require('../assets/sounds/BBDroid.mp3') },
  { label: 'Hyperspace Jump', image: require("../assets/images/SoundImages/JumpToHyperspace.jpg"), file: require('../assets/sounds/Jump2.mp3') },
  { label: 'Hyperdrive Trouble', image: require("../assets/images/SoundImages/HyperspaceFailure.jpg"), file: require('../assets/sounds/HyperDriveTrouble.mp3') },

  { label: 'Alarm Siren', image: require("../assets/images/SoundImages/Alarm.jpg"), file: require('../assets/sounds/Siren.mp3') },
  { label: 'Space Ship Blast', image: require("../assets/images/SoundImages/FireSprayBlasts.jpg"), file: require('../assets/sounds/SpaceShipBlast.mp3') },

  { label: 'Explosion', image: require("../assets/images/SoundImages/Explosion.jpg"), file: require('../assets/sounds/Explosion.mp3') },
  { label: 'Big Explosion', image: require("../assets/images/SoundImages/AtomicExplosion.jpg"), file: require('../assets/sounds/BigExplosion.mp3') },
  { label: 'Ship Fly By', image: require("../assets/images/SoundImages/ShipFly.jpg"), file: require('../assets/sounds/ShipFlyBy.mp3') },
  { label: 'Laser Turret', image: require("../assets/images/SoundImages/TurboLaser.jpg"), file: require('../assets/sounds/LaserTurret.mp3') },

  { label: 'Tie Blast', image: require("../assets/images/SoundImages/TieBlast.jpg"), file: require('../assets/sounds/TieBlastt.mp3') },
  { label: 'Tie Blasts', image: require("../assets/images/SoundImages/TieBlasts.jpg"), file: require('../assets/sounds/Blastsss.mp3') },
  { label: 'Tie Fly By', image: require("../assets/images/SoundImages/TieFlyBy.jpg"), file: require('../assets/sounds/TieFlyBy.mp3') },
  { label: 'Tie Explode', image: require("../assets/images/SoundImages/TieExplode.jpg"), file: require('../assets/sounds/TieExplode.mp3') },
  { label: 'Pew', image: require("../assets/images/SoundImages/PewBoba.jpg"), file: require('../assets/sounds/Pew.mp3') },
  { label: 'Light Saber On Off', image: require("../assets/images/SoundImages/LightSaber.jpg"), file: require('../assets/sounds/LightSaberOnOff.mp3') },

  { label: 'Prowler', image: require("../assets/images/SoundImages/NightForestProwl.jpg"), file: require('../assets/sounds/Prowler.mp3') },
  { label: 'Monster Roar', image: require("../assets/images/SoundImages/MonsterRoar.jpg"), file: require('../assets/sounds/Roar.mp3') },
  { label: 'Far Away Growl', image: require("../assets/images/SoundImages/Nexu.jpg"), file: require('../assets/sounds/Growl.mp3') },

  { label: 'Yoda Wisdom', image: require("../assets/images/SoundImages/Yoda.jpg"), file: require('../assets/sounds/DoOrDoNot.mp3') },

  { label: 'Death Radio', image: require("../assets/images/SoundImages/RadioRoom.jpg"), file: require('../assets/sounds/tmp.mp3') },
  { label: 'Galaxy Meme', image: require("../assets/images/SoundImages/GalaxyBrain.jpg"), file: require('../assets/sounds/GalaxyMeme.mp3') },
  { label: 'Lava Chicken', image: require("../assets/images/SoundImages/LavaChicken.jpg"), file: require('../assets/sounds/LavaChicken.mp3') },
];

export default function SoundboardPage() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const router = useRouter();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch(() => {}); // catch to avoid unhandled rejections
      }
    };
  }, [sound]);

  const playSound = async (index: number) => {
    try {
      if (playingIndex === index) {
        // Stop if same button pressed again
        await sound?.stopAsync();
        setPlayingIndex(null);
        return;
      }

      // Stop and unload previous sound
      if (sound) {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (e) {
          // Ignore unload errors here, might be already unloaded or stopped
        }
      }

      // Load and play new sound
      const { sound: newSound } = await Audio.Sound.createAsync(soundData[index].file);
      setSound(newSound);
      setPlayingIndex(index);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

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

      <ScrollView contentContainerStyle={[{ alignItems: 'center', maxHeight: 3500 }]}>
        <Text style={styles.title}>Sound Board</Text>
        {/* Top Big Button */}
        <TouchableOpacity onPress={() => playSound(0)} style={styles.bigButton}>
          <ImageBackground
            source={require('../assets/images/starwars_opening_crawl.png')}
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 10 }}
          >
            {soundData[0].image ? (
              <Image source={soundData[0].image} style={[{ width: '100%' }]} />
            ) : (
              <Text style={styles.buttonText}></Text>
            )}
          </ImageBackground>
        </TouchableOpacity>
{/* Grid Buttons */}
<View style={styles.gridSoundsPage}>
  {soundData.slice(1).map((item, i) => (
    
    <TouchableOpacity key={i + 1} onPress={() => playSound(i + 1)} style={styles.gridButton}>
      <ImageBackground
  source={item.image || require('../assets/images/starwars_opening_crawl.png')}
  style={styles.imageBackground}
  imageStyle={{ borderRadius: 10 }}
>
  <Text style={styles.buttonText}>{item.label}</Text>
</ImageBackground>
    </TouchableOpacity>
   
  ))}
</View>



      </ScrollView>
    </View>
  );
}