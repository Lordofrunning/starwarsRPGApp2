import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './index.styles';
import { useTheme } from './ThemeContext';

export default function NPCButtonsPage() {
  const router = useRouter();
  const { theme, themeName } = useTheme();

  const themeImages = {
  imperial: require('../assets/images/GameStuff/CasinoImperialImage.png'),
  rebel: require('../assets/images/GameStuff/CasinoRebelsImage.png'),
  jedi: require('../assets/images/GameStuff/CasinoBigImage.png'),
};

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme.background, borderBottomColor: theme.border },
          ]}
        >
          <TouchableOpacity
            onPress={() => router.push('/')}
            style={[styles.sideButton, { borderColor: theme.border }]}
          >
            <Text style={[styles.menuArrow, { color: theme.border }]}>←</Text>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logos/rpg_main_logo.png')}
              style={styles.smallImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={[styles.sideButton, { borderColor: theme.border }]}>
                    <Image
                      source={require('../assets/images/Icons/informationIcon1.png')}
                      style={[styles.iconImage, { tintColor: theme.icon }]}
                    />
                  </TouchableOpacity>
        </View>

            <ImageBackground
                  source={themeImages[themeName]}
                  style={localStyles.room}
                  resizeMode="stretch"
                >
                  <Pressable
                    onPress={() => router.push('/Sabacc')}
                    style={({ pressed }) => [
                      localStyles.tableGlow,{borderColor: theme.border},
                      localStyles.sabaccPosition,
                      pressed && { shadowOpacity: 0.9 },
                    ]}
                  />
                  <Pressable
                    onPress={() => router.push('/CorellianRoulette')}
                    style={[localStyles.tableGlow,localStyles.tableGlow,{borderColor: theme.border}, localStyles.roulettePosition]}
                  />
                  <Pressable
                    onPress={() => router.push('/Pazaak')}
                    style={[localStyles.tableGlow,localStyles.tableGlow,{borderColor: theme.border}, localStyles.pazaakPosition]}
                  />

             </ImageBackground>


      </View>
    </View>
    // <ItemsDropdown items={Items} />
  );
}

const localStyles = StyleSheet.create({
  buttonStack: {
    marginTop: 30,
    gap: 14,
    paddingHorizontal: 20,
  },
  buttonBig: {
    backgroundColor: '#3B2C24', // warm smoky brown, leather-like
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D6B400', // faded gold trim
    shadowColor: '#D6B400',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#F8EEC1', // pale cantina parchment
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonTextCentered: {
    color: '#F8EEC1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },

  // room stuf
   room: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  tableGlow: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00FFFF',
    borderRadius: 12,
    backgroundColor: 'transparent',
    shadowColor: '#00FFFF',
    shadowRadius: 12,
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
  },
  sabaccPosition: {
    top: '11%',
    left: '40%',
    width: 80,
    height: 178,
    borderRadius: 60,
  },
  roulettePosition: {
    top: '0%',
    left: '8%',
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  pazaakPosition: {
    top: '1%',
    right: '5%',
    width: 70,
    height: 95,
    borderRadius: 20,
  },
});


        {/* Button stack
        <View style={localStyles.buttonStack}>
          <TouchableOpacity style={localStyles.buttonBig} onPress={() => router.push('/Sabacc')}>
            <Text style={localStyles.buttonText}>Sabacc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.buttonBig} onPress={() => router.push('/Pazaak')}>
            <Text style={localStyles.buttonText}>Pazaak</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.buttonBig} onPress={() => router.push('/CorellianRoulette')}>
            <Text style={localStyles.buttonText}>Corellian Roulette</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.buttonBig}>
            <Text style={localStyles.buttonText}>Droid Duel {"\n"}(comming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.buttonBig}>
            <Text style={localStyles.buttonTextCentered}>Wheel Spinner (comming soon)</Text>
          </TouchableOpacity>
        </View> */}