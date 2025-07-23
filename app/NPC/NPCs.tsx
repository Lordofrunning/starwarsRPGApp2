import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '.././ThemeContext';
import { styles } from '../index.styles';


export default function NPCButtonsPage() {
  const router = useRouter();
  const { theme, themeName } = useTheme();

  return (
     <View style={{ flex: 1, position: 'relative', backgroundColor: theme.border }}>
    <View style={[styles.container, ]}>
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
                    <View style={[styles.buttonGrid]}>
  <TouchableOpacity style={styles.buttonCell} onPress={() => router.push('/NPC/Minions')}>
     <ImageBackground
      source={require('../../assets/images/minions/StormTrooperMinionImage.png')}
      style={styles.buttonImageBackground}> 
    <Text style={styles.buttonText}>Minion Group Stats</Text>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buttonCell} onPress={() => router.push('/NPC/Monsters')}>
    <ImageBackground
      source={require('../../assets/images/Monsters/RancorImage.png')}
      style={styles.buttonImageBackground}>
    <Text style={styles.buttonText}>Monsters</Text>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buttonCell} onPress={() => router.push('/NPC/Rivals')}>
    <ImageBackground
      source={require('../../assets/images/RivalsNemesis/droidikaImage.png')}
      style={styles.buttonImageBackground}>
    <Text style={styles.buttonText}>Rivals</Text>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buttonCell} onPress={() => router.push('/NPC/Nemeses')}>
     <ImageBackground
      source={require('../../assets/images/RivalsNemesis/NemesisImage.png')}
      style={styles.buttonImageBackground}>
    <Text style={styles.buttonText}>Nemesis</Text>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buttonCell} onPress={() => router.push('./LandShips')}>
    <ImageBackground
      source={require('../../assets/images/Landships/ATSTImage.png')}
      style={styles.buttonImageBackground}>
    <Text style={styles.buttonText}>Land Vehicles</Text>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buttonCell} onPress={() => router.push('./Ships')}>
    <ImageBackground
      source={require('../../assets/images/Starships/XWingImage.png')}
      style={styles.buttonImageBackground}>
    <Text style={styles.buttonText}>Starships</Text>
    </ImageBackground>
  </TouchableOpacity>
</View>


    </View>
  </View>
    //<ItemsDropdown items={Items} />
  );
}