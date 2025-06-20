import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


import { styles } from './index.styles';


export default function NPCButtonsPage() {
  const router = useRouter();

  return (
     <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.sideButton}>
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
        {/* Button stack */}
                    <View style={styles.buttonStack}>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/SpinWheel')}>
                        <Text style={styles.buttonTextCentered}>Wheel Spinner</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/Sabacc')}>
                        <Text style={styles.buttonText}>Sabacc</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/Pazaak')}>
                        <Text style={styles.buttonText}>Pazaak</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/CorellianRoulette')}>
                        <Text style={styles.buttonText}>Corellian Roulette</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/DroidFight')}>
                        <Text style={styles.buttonText}>Droid Duel</Text>
                      </TouchableOpacity>
                    </View>
    </View>
  </View>
    //<ItemsDropdown items={Items} />
  );
}