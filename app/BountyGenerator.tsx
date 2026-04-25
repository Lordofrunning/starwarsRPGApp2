import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { planetData } from '../data/planetData';
import { styles } from './index.styles';
import { useTheme } from './ThemeContext';

export default function BountyGeneratorPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [eraModalVisible, setEraModalVisible] = useState(false);
  const [selectedEra, setSelectedEra] = useState<'cloneWars' | 'empire' | 'postEmpire' | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<typeof planetData[0] | null>(null);
  const [planetSearch, setPlanetSearch] = useState('');

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.headerTitleCenter, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.background, paddingVertical: 12 }]}>
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

      {/* Button Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 0, paddingBottom: 15, backgroundColor: theme.background }}>
        <TouchableOpacity onPress={() => setEraModalVisible(true)} style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
        <TouchableOpacity style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
        <TouchableOpacity style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
        <TouchableOpacity style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
      </View>

      {/* Era Selection Modal */}
      <Modal
        visible={eraModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEraModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => setEraModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: theme.background,
              borderRadius: 12,
              padding: 24,
              borderColor: theme.darkerborder,
              borderWidth: 2,
              width: '80%',
            }}
          >
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Select Era</Text>

            {/* Clone Wars Era Toggle */}
            <TouchableOpacity
              onPress={() => setSelectedEra(selectedEra === 'cloneWars' ? null : 'cloneWars')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 12,
                marginVertical: 8,
                backgroundColor: selectedEra === 'cloneWars' ? theme.onPressed : 'rgba(0,0,0,0.1)',
                borderRadius: 8,
                borderColor: theme.border,
                borderWidth: selectedEra === 'cloneWars' ? 2 : 1,
              }}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.border,
                marginRight: 12,
                backgroundColor: selectedEra === 'cloneWars' ? theme.border : 'transparent',
              }} />
              <Text style={{ color: theme.text, fontSize: 16, flex: 1 }}>Clone Wars Era</Text>
            </TouchableOpacity>

            {/* Empire Era Toggle */}
            <TouchableOpacity
              onPress={() => setSelectedEra(selectedEra === 'empire' ? null : 'empire')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 12,
                marginVertical: 8,
                backgroundColor: selectedEra === 'empire' ? theme.onPressed : 'rgba(0,0,0,0.1)',
                borderRadius: 8,
                borderColor: theme.border,
                borderWidth: selectedEra === 'empire' ? 2 : 1,
              }}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.border,
                marginRight: 12,
                backgroundColor: selectedEra === 'empire' ? theme.border : 'transparent',
              }} />
              <Text style={{ color: theme.text, fontSize: 16, flex: 1 }}>Empire Era</Text>
            </TouchableOpacity>

            {/* Post Empire Era Toggle */}
            <TouchableOpacity
              onPress={() => setSelectedEra(selectedEra === 'postEmpire' ? null : 'postEmpire')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 12,
                marginVertical: 8,
                backgroundColor: selectedEra === 'postEmpire' ? theme.onPressed : 'rgba(0,0,0,0.1)',
                borderRadius: 8,
                borderColor: theme.border,
                borderWidth: selectedEra === 'postEmpire' ? 2 : 1,
              }}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.border,
                marginRight: 12,
                backgroundColor: selectedEra === 'postEmpire' ? theme.border : 'transparent',
              }} />
              <Text style={{ color: theme.text, fontSize: 16, flex: 1 }}>Post Empire</Text>
            </TouchableOpacity>

            {/* Planet Selector Section */}
            <Text style={{ color: theme.text, fontSize: 14, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>PC's Current Planet (or closest to)</Text>
            
            <TextInput
              placeholder="Search planets..."
              placeholderTextColor={theme.icon}
              value={planetSearch}
              onChangeText={setPlanetSearch}
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                color: theme.text,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 12,
                borderColor: theme.border,
                borderWidth: 1,
              }}
            />

            <ScrollView style={{ maxHeight: 150, marginBottom: 16, borderColor: theme.darkerborder, borderWidth: 2, borderRadius: 8 }}>
              {planetData
                .filter((planet) =>
                  planet.name.toLowerCase().includes(planetSearch.toLowerCase())
                )
                .map((planet, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedPlanet(planet)}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(0,0,0,0.1)',
                      backgroundColor: selectedPlanet?.name === planet.name ? theme.onPressed : 'transparent',
                    }}
                  >
                    <Text style={{ color: theme.text, fontSize: 14 }}>{planet.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setEraModalVisible(false)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: theme.border,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.background, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <ScrollView contentContainerStyle={[{ alignItems: 'center', paddingVertical: 20 }]}>
        <Text style={styles.title}>Bounty Generator</Text>
        {/* Content will go here */}
      </ScrollView>
    </View>
  );
}
