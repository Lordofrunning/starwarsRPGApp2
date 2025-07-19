import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '.././ThemeContext';
import { styles } from '../index.styles';


export default function NPCButtonsPage() {
  const router = useRouter();
  const { theme, themeName } = useTheme();

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

        <TouchableOpacity onPress={() => console.log('Profile pressed')} style={[styles.sideButton,{ borderColor: theme.border}]}>
          <Image
                                source={require('../../assets/images/Icons/informationIcon1.png')}
                                style={[styles.iconImage, { tintColor: theme.icon }]}
                              />
        </TouchableOpacity>
      </View>
        {/* Button stack */}
                    <View style={styles.buttonStack}>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/NPC/Minions')}>
                        <Text style={styles.buttonTextCentered}>Minion Group Stats</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/NPC/Monsters')}>
                        <Text style={styles.buttonText}>Monsters</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/NPC/Rivals')}>
                        <Text style={styles.buttonText}>Rivals</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/NPC/Nemeses')}>
                        <Text style={styles.buttonText}>Nemesis</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('./LandShips')}>
                        <Text style={styles.buttonText}>Land Vehicles</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('./Ships')}>
                        <Text style={styles.buttonText}>Starships</Text>
                      </TouchableOpacity>
                    </View>
    </View>
  </View>
    //<ItemsDropdown items={Items} />
  );
}