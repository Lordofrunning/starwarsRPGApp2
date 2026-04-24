import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './index.styles';
import { useTheme } from './ThemeContext';

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

const settingsStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    padding: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '45%',
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 28,
    color: 'black',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

type SettingsDrawerProps = {
  visible: boolean;
  onClose: () => void;
  columns: number;
  onColumnsChange: (columns: number) => void;
};

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ visible, onClose, columns, onColumnsChange }) => {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={settingsStyles.overlay} onPress={onClose}>
        <TouchableWithoutFeedback>
          <Animated.View 
            style={[settingsStyles.drawer, { transform: [{ translateX }], backgroundColor: theme.background }]}
          >
          <View style={settingsStyles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={[settingsStyles.closeText, { color: theme.border }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={settingsStyles.optionRow}>
            <TouchableOpacity
              style={[
                settingsStyles.optionButton,
                {
                  borderColor: columns === 2 ? theme.border : '#ccc',
                  backgroundColor: columns === 2 ? theme.onPressed : 'rgba(0,0,0,0.05)',
                },
              ]}
              onPress={() => onColumnsChange(2)}
            >
              <Text style={[settingsStyles.optionButtonText, { color: columns === 2 ? theme.border : '#999' }]}>2 Columns</Text>
            </TouchableOpacity>
          </View>

          <View style={settingsStyles.optionRow}>
            <TouchableOpacity
              style={[
                settingsStyles.optionButton,
                {
                  borderColor: columns === 3 ? theme.border : '#ccc',
                  backgroundColor: columns === 3 ? theme.onPressed : 'rgba(0,0,0,0.05)',
                },
              ]}
              onPress={() => onColumnsChange(3)}
            >
              <Text style={[settingsStyles.optionButtonText, { color: columns === 3 ? theme.border : '#999' }]}>3 Columns</Text>
            </TouchableOpacity>
          </View>

          <View style={settingsStyles.optionRow}>
            <TouchableOpacity
              style={[
                settingsStyles.optionButton,
                {
                  borderColor: columns === 4 ? theme.border : '#ccc',
                  backgroundColor: columns === 4 ? theme.onPressed : 'rgba(0,0,0,0.05)',
                },
              ]}
              onPress={() => onColumnsChange(4)}
            >
              <Text style={[settingsStyles.optionButtonText, { color: columns === 4 ? theme.border : '#999' }]}>4 Columns</Text>
            </TouchableOpacity>
          </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default function SoundboardPage() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(2);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  // Load columns setting on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem('soundBoardColumns');
        if (saved) {
          setColumns(parseInt(saved, 10));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Handle columns change and save to storage
  const handleColumnsChange = async (newColumns: number) => {
    setColumns(newColumns);
    try {
      await AsyncStorage.setItem('soundBoardColumns', newColumns.toString());
    } catch (error) {
      console.error('Error saving settings:', error);
    }
    setDrawerVisible(false);
  };

  // Calculate grid button width based on columns
  const getGridButtonWidth = () => {
    if (columns === 3) return '31%';
    if (columns === 4) return '22%';
    return '47%'; // default 2 columns
  };

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
      <View style={[styles.headerTitleCenter, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.background, paddingVertical: 12, marginBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
          <Text style={[styles.menuArrow, { color: theme.border }]}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logos/rpg_main_logo.png')}
            style={styles.smallImage}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={[styles.sideButton2, { borderColor: theme.border, justifyContent: 'center', alignItems: 'center' }]}>
          <Image source={require('../assets/images/TransparentWhiteSettingsIcon.png')} style={[styles.profileImageNC, { tintColor: theme.border }]} />
        </TouchableOpacity>
      </View>

      <SettingsDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} columns={columns} onColumnsChange={handleColumnsChange} />

      <ScrollView contentContainerStyle={[{ alignItems: 'center', maxHeight: 3500 }]}>
        <Text style={styles.title}>Sound Board</Text>
        {/* Top Big Button */}
        <TouchableOpacity onPress={() => playSound(0)} style={[styles.bigButton, { marginTop: -20 }]}>
          <ImageBackground
            source={require('../assets/images/starwars_opening_crawl.png')}
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
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
    
    <TouchableOpacity key={i + 1} onPress={() => playSound(i + 1)} style={[styles.gridButton, { width: getGridButtonWidth(), backgroundColor: theme.background }]}>
      <ImageBackground
  source={item.image || require('../assets/images/starwars_opening_crawl.png')}
  style={styles.imageBackground}
  imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
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