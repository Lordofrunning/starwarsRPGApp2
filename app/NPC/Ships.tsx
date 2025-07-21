import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../ThemeContext';
import { styles } from '../index.styles';


export default function MinionGalleryPage() {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const imageData = [
  {
    src: require('../../assets/images/Starships/Tie.png'),
    style: { width: 355, height: 300 },
    boxStyle: { width: 380, height: 240 },
  },
  {
    src: require('../../assets/images/Starships/TieAce.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 240 },
  },
  {
    src: require('../../assets/images/Starships/Defender.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 440 },
  },
  {
    src: require('../../assets/images/Starships/Hunter.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 280 },
  },
  {
    src: require('../../assets/images/Starships/XWing.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 260 },
  },
  {
    src: require('../../assets/images/Starships/YT13.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 340 },
  },
  {
    src: require('../../assets/images/Starships/YT24.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 340 },
  },
  {
    src: require('../../assets/images/Starships/CR90.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 270 },
  },
  {
    src: require('../../assets/images/Starships/AirSpeeder.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 230 },
  },
  {
    src: require('../../assets/images/Starships/SkyHopper.png'),
    style: { width: 355, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 180 },
  },
  {
    src: require('../../assets/images/Starships/Hoth.png'),
    style: { width: 350, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 280 },
  },
  // Add more images with custom styles
];

  return (
     <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
                  <View style={[styles.header, {backgroundColor: theme.background, borderBottomColor: theme.border}]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
                      <Text style={[styles.menuArrow, {color: theme.border}]}>←</Text>
                    </TouchableOpacity>
            
                    <View style={styles.logoContainer}>
                      <Image
                        source={require('../../assets/images/logos/rpg_main_logo.png')}
                        style={styles.smallImage}
                        resizeMode="contain"
                      />
                    </View>
        <TouchableOpacity onPress={() => router.push('/DiceRoller')} style={styles.sideButton}>
          <Image
            source={require('../../assets/dice/TransparentDice/YellowDie.png')}
            style={styles.profileImageNC}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
  <Text style={styles.shopTitle}>{"Starships"}</Text>
  {imageData.map((img, index) => (
    <View key={index} style={[styles.imageWrapperMinion, img.boxStyle]}>
      <Image source={img.src} style={[styles.imageMinionCards, img.style]} resizeMode="contain" />
    </View>
  ))}
</ScrollView>

    </View>
  </View>
    //<ItemsDropdown items={Items} />
  );
}