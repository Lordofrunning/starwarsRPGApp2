import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';


import { styles } from './index.styles';


export default function MinionGalleryPage() {
  const router = useRouter();
  const imageData = [
  {
    src: require('../assets/images/RivalsNemesis/Bargos.png'),
    style: { width: 360, height: 300 },
    boxStyle: { width: 380, height: 300 },
  },
  {
    src: require('../assets/images/RivalsNemesis/IG89.png'),
    style: { width: 360, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 480 },
  },
  {
    src: require('../assets/images/RivalsNemesis/Hunter.png'),
    style: { width: 360, height: 480 }, // Taller image
    boxStyle: { width: 380, height: 500 },
  },
  // Add more images with custom styles
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
            source={require('../assets/images/logos/rpg_main_logo.png')}
            style={styles.smallImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={() => router.push('/DiceRoller')} style={styles.sideButton}>
          <Image
            source={require('../assets/dice/TransparentDice/YellowDie.png')}
            style={styles.profileImageNC}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
  <Text style={styles.shopTitle}>{"Nemeses"}</Text>
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