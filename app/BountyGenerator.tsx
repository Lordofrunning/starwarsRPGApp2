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
  const [affiliationModalVisible, setAffiliationModalVisible] = useState(false);
  const [selectedAffiliations, setSelectedAffiliations] = useState<{ [key: string]: boolean }>({
    Empire: false,
    Rebel: false,
    'Galactic Republic': false,
    'Bounty Guild': false,
    'Crime Syndicate': false,
    Separatist: false,
  });
  const [selectedJobTypes, setSelectedJobTypes] = useState<{ [key: string]: boolean }>({
    Bounty: false,
    Extraction: false,
    'Body Guard': false,
    'Weapon for Hire': false,
  });
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [debugEnabled, setDebugEnabled] = useState(false);

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

        <TouchableOpacity onPress={() => setSettingsModalVisible(true)} style={[styles.sideButton2, { borderColor: theme.border, justifyContent: 'center', alignItems: 'center', marginTop: 25 }]}>
          <Image source={require('../assets/images/TransparentWhiteSettingsIcon.png')} style={[styles.profileImageNC, { tintColor: theme.border }]} />
        </TouchableOpacity>
      </View>

      {/* Button Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 0, paddingBottom: 15, backgroundColor: theme.background }}>
        <TouchableOpacity onPress={() => setEraModalVisible(true)} style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
        <TouchableOpacity onPress={() => setAffiliationModalVisible(true)} style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
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

      {/* Affiliation Modal */}
      <Modal
        visible={affiliationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAffiliationModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => setAffiliationModalVisible(false)}
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
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Affiliation</Text>

            {/* 2-Column Grid */}
            <View style={{ flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {/* Row 1 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                {['Empire', 'Rebel'].map((affiliation) => (
                  <TouchableOpacity
                    key={affiliation}
                    onPress={() => setSelectedAffiliations({ ...selectedAffiliations, [affiliation]: !selectedAffiliations[affiliation] })}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: selectedAffiliations[affiliation] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      borderColor: theme.border,
                      borderWidth: selectedAffiliations[affiliation] ? 2 : 1,
                    }}
                  >
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: theme.border,
                      marginRight: 12,
                      backgroundColor: selectedAffiliations[affiliation] ? theme.border : 'transparent',
                    }} />
                    <Text style={{ color: theme.text, fontSize: 14 }}>{affiliation}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 2 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                {['Galactic Republic', 'Bounty Guild'].map((affiliation) => (
                  <TouchableOpacity
                    key={affiliation}
                    onPress={() => setSelectedAffiliations({ ...selectedAffiliations, [affiliation]: !selectedAffiliations[affiliation] })}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: selectedAffiliations[affiliation] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      borderColor: theme.border,
                      borderWidth: selectedAffiliations[affiliation] ? 2 : 1,
                    }}
                  >
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: theme.border,
                      marginRight: 12,
                      backgroundColor: selectedAffiliations[affiliation] ? theme.border : 'transparent',
                    }} />
                    <Text style={{ color: theme.text, fontSize: 14 }}>{affiliation}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 3 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                {['Crime Syndicate', 'Separatist'].map((affiliation) => (
                  <TouchableOpacity
                    key={affiliation}
                    onPress={() => setSelectedAffiliations({ ...selectedAffiliations, [affiliation]: !selectedAffiliations[affiliation] })}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: selectedAffiliations[affiliation] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      borderColor: theme.border,
                      borderWidth: selectedAffiliations[affiliation] ? 2 : 1,
                    }}
                  >
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: theme.border,
                      marginRight: 12,
                      backgroundColor: selectedAffiliations[affiliation] ? theme.border : 'transparent',
                    }} />
                    <Text style={{ color: theme.text, fontSize: 14 }}>{affiliation}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Job Type Section */}
            <Text style={{ color: theme.text, fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Job Type</Text>
            <View style={{ flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {/* Row 1 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                {['Bounty', 'Extraction'].map((jobType) => (
                  <TouchableOpacity
                    key={jobType}
                    onPress={() => setSelectedJobTypes({ ...selectedJobTypes, [jobType]: !selectedJobTypes[jobType] })}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: selectedJobTypes[jobType] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      borderColor: theme.border,
                      borderWidth: selectedJobTypes[jobType] ? 2 : 1,
                    }}
                  >
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: theme.border,
                      marginRight: 12,
                      backgroundColor: selectedJobTypes[jobType] ? theme.border : 'transparent',
                    }} />
                    <Text style={{ color: theme.text, fontSize: 14 }}>{jobType}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 2 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                {['Body Guard', 'Weapon for Hire'].map((jobType) => (
                  <TouchableOpacity
                    key={jobType}
                    onPress={() => setSelectedJobTypes({ ...selectedJobTypes, [jobType]: !selectedJobTypes[jobType] })}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: selectedJobTypes[jobType] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      borderColor: theme.border,
                      borderWidth: selectedJobTypes[jobType] ? 2 : 1,
                    }}
                  >
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: theme.border,
                      marginRight: 12,
                      backgroundColor: selectedJobTypes[jobType] ? theme.border : 'transparent',
                    }} />
                    <Text style={{ color: theme.text, fontSize: 14 }}>{jobType}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setAffiliationModalVisible(false)}
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

      {/* Settings Modal */}
      <Modal
        visible={settingsModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => setSettingsModalVisible(false)}
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
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Settings</Text>

            {/* Debug Toggle */}
            <TouchableOpacity
              onPress={() => setDebugEnabled(!debugEnabled)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 12,
                marginVertical: 8,
                backgroundColor: debugEnabled ? theme.onPressed : 'rgba(0,0,0,0.1)',
                borderRadius: 8,
                borderColor: theme.border,
                borderWidth: debugEnabled ? 2 : 1,
              }}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.border,
                marginRight: 12,
                backgroundColor: debugEnabled ? theme.border : 'transparent',
              }} />
              <Text style={{ color: theme.text, fontSize: 16, flex: 1 }}>Debug Settings</Text>
            </TouchableOpacity>

            {/* Debug Info Display */}
            {debugEnabled && (
              <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 8, padding: 12, marginVertical: 16, borderColor: theme.border, borderWidth: 1 }}>
                <Text style={{ color: theme.text, fontSize: 12, marginBottom: 6, fontWeight: 'bold' }}>Current Selections:</Text>
                <Text style={{ color: theme.text, fontSize: 11, marginBottom: 3 }}>Era: {selectedEra || 'None'}</Text>
                <Text style={{ color: theme.text, fontSize: 11, marginBottom: 3 }}>Planet: {selectedPlanet?.name || 'None'}</Text>
                <Text style={{ color: theme.text, fontSize: 11, marginBottom: 3 }}>Affiliations: {Object.entries(selectedAffiliations).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
                <Text style={{ color: theme.text, fontSize: 11 }}>Job Types: {Object.entries(selectedJobTypes).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => setSettingsModalVisible(false)}
              style={{
                marginTop: 20,
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

      {/* Debug Footer */}
      {debugEnabled && (
        <View style={{ backgroundColor: theme.background, paddingVertical: 12, paddingHorizontal: 16, borderTopColor: theme.darkerborder, borderTopWidth: 1 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Era: {selectedEra || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Planet: {selectedPlanet?.name || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Affiliations: {Object.entries(selectedAffiliations).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Job Types: {Object.entries(selectedJobTypes).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
        </View>
      )}
    </View>
  );
}
