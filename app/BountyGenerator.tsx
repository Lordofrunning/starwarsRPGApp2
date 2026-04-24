import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './index.styles';
import { useTheme } from './ThemeContext';

export default function BountyGeneratorPage() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.headerTitleCenter, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.background, paddingVertical: 12, marginBottom: 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
          <Text style={[styles.menuArrow, { color: theme.border }]}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logos/rpg_main_logo.png')}
            style={styles.smallImage}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={[styles.sideButton2, { borderColor: theme.border, justifyContent: 'center', alignItems: 'center', marginTop: 25 }]}>
          <Image source={require('../assets/images/TransparentWhiteSettingsIcon.png')} style={[styles.profileImageNC, { tintColor: theme.border }]} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[{ alignItems: 'center', paddingVertical: 20 }]}>
        <Text style={styles.title}>Bounty Generator</Text>
        {/* Content will go here */}
      </ScrollView>
    </View>
  );
}
