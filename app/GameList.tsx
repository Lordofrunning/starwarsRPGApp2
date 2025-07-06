import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './index.styles';
import { useTheme } from './ThemeContext';

export default function NPCButtonsPage() {
  const router = useRouter();
  const { theme } = useTheme();

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

        {/* Button stack */}
        <View style={styles.buttonStack}>
          <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/Sabacc')}>
            <Text style={styles.buttonText}>Sabacc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/Pazaak')}>
            <Text style={styles.buttonText}>Pazaak</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBig} onPress={() => router.push('/CorellianRoulette')}>
            <Text style={styles.buttonText}>Corellian Roulette</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBig}>
            <Text style={styles.buttonText}>Droid Duel {"\n"}(comming soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBig}>
            <Text style={styles.buttonTextCentered}>Wheel Spinner (comming soon)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // <ItemsDropdown items={Items} />
  );
}