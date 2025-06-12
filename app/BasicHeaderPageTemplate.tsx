import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';


import { styles } from './index.styles';


export default function NPCButtonsPage() {
  const router = useRouter();

  return (
     <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

      <Text style={styles.shopTitle}>{"Header Info"}</Text>

    </View>
    </ScrollView>
  </View>
    //<ItemsDropdown items={Items} />
  );
}