import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';


import { styles } from '../index.styles';


export default function MinionGalleryPage() {
  const router = useRouter();
  const imageData = [
  {
    src: require('../../assets/images/RivalsNemesis/Barabel.png'),
    style: { width: 350, height: 540 }, // Taller image
    boxStyle: { width: 380, height: 560 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/HeavyGunner.png'),
    style: { width: 350, height: 600 }, // Taller image
    boxStyle: { width: 380, height: 620 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/ConArtist.png'),
    style: { width: 360, height: 640 }, // Taller image
    boxStyle: { width: 380, height: 660 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/RebelTrooper.png'),
    style: { width: 350, height: 540 }, // Taller image
    boxStyle: { width: 380, height: 560 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/B2SuperBattleDroid.png'),
    style: { width: 350, height: 540 }, // Taller image
    boxStyle: { width: 380, height: 200 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/DestroyerDroid.png'),
    style: { width: 350, height: 540 }, // Taller image
    boxStyle: { width: 380, height: 320 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/StormSergeant.png'),
    style: { width: 350, height: 540 }, // Taller image
    boxStyle: { width: 380, height: 560 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/SecurityDroid.png'),
    style: { width: 350, height: 540 }, // Taller image
    boxStyle: { width: 380, height: 560 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/WookieGladiator.png'),
    style: { width: 350, height: 540 }, // Taller image
    boxStyle: { width: 380, height: 560 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/Smuggler.png'),
    style: { width: 360, height: 500 },
    boxStyle: { width: 380, height: 520 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/Slicer.png'),
    style: { width: 360, height: 420 },
    boxStyle: { width: 380, height: 440 },
  },
  // Add more images with custom styles
  {
    src: require('../../assets/images/RivalsNemesis/AstromechDroid.png'),
    style: { width: 350, height: 500 }, // Taller image
    boxStyle: { width: 380, height: 520 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/CorruptBureaucrat.png'),
    style: { width: 350, height: 420 },
    boxStyle: { width: 380, height: 360 },
  },
  {
    src: require('../../assets/images/RivalsNemesis/WealthyNoble.png'),
    style: { width: 350, height: 420 },
    boxStyle: { width: 380, height: 360 },
  },
];

  return (
     <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
          <Text style={styles.menuArrow}>←</Text>
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
  <Text style={styles.shopTitle}>{"Rivals"}</Text>
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