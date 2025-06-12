import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';


import { styles } from './index.styles';


export default function MinionGalleryPage() {
  const router = useRouter();

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

        <TouchableOpacity onPress={() => console.log('Profile pressed')} style={styles.sideButton}>
          <Image
            source={require('../assets/images/empty_profile_pic.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.shopTitle}>{"Minion Group Stat Blocks"}</Text>
      {[
        require('../assets/images/minions/Thug.png'),
        require('../assets/images/minions/Tough.png'),
        require('../assets/images/minions/DefenseTrooper.png'),
        require('../assets/images/minions/Security.png'),
        require('../assets/images/minions/Gang.png'),
        require('../assets/images/minions/Pirate.png'),
        require('../assets/images/minions/CorporateAuthority.png'),
        require('../assets/images/minions/Hunter.png'),
        require('../assets/images/minions/BattleDroid.png'),
        require('../assets/images/minions/StormTrooper.png'),
        require('../assets/images/minions/TiePilot.png'),
        require('../assets/images/minions/Emperial.png'),
        require('../assets/images/minions/MechDroid.png'),
        require('../assets/images/minions/StreetUrchin.png'),
        require('../assets/images/minions/Mynock.png'),
        require('../assets/images/minions/Twilek.png'),
        // Add as many images as you like here
      ].map((img, index) => (
        <View key={index} style={styles.imageWrapperMinion}>
          <Image source={img} style={styles.imageMinionCards} resizeMode="contain" />
        </View>
      ))}
    </ScrollView>
    </View>
  </View>
    //<ItemsDropdown items={Items} />
  );
}