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
  const [archetypeModalVisible, setArchetypeModalVisible] = useState(false);
  const [selectedArchetypes, setSelectedArchetypes] = useState<{ [key: string]: boolean }>({
    Spy: true,
    Assassin: true,
    'Crime Boss': true,
    'Force Sensitive': true,
    'Ex Imperial': true,
    Smuggler: true,
    Scientist: true,
    Cloner: true,
    Hacker: true,
    Politician: true,
  });
  const [tierModalVisible, setTierModalVisible] = useState(false);
  const [selectedTiers, setSelectedTiers] = useState<{ [key: string]: boolean }>({
    'Tier 1': false,
    'Tier 2': false,
    'Tier 3': false,
    'Tier 4': false,
    'Tier 5': false,
  });
  const [targetRevealed, setTargetRevealed] = useState(false);
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
        <TouchableOpacity onPress={() => setArchetypeModalVisible(true)} style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
        <TouchableOpacity onPress={() => setTierModalVisible(true)} style={{ width: '10%', aspectRatio: 1, backgroundColor: theme.border, borderRadius: 8 }} />
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

      {/* Archetype Modal */}
      <Modal
        visible={archetypeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setArchetypeModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => setArchetypeModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: theme.background,
              borderRadius: 12,
              padding: 24,
              borderColor: theme.darkerborder,
              borderWidth: 2,
              width: '80%',
              maxHeight: '80%',
            }}
          >
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Archetype</Text>

            <ScrollView style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'column', gap: 12 }}>
                {/* Row 1 */}
                <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                  {['Spy', 'Assassin'].map((archetype) => (
                    <TouchableOpacity
                      key={archetype}
                      onPress={() => setSelectedArchetypes({ ...selectedArchetypes, [archetype]: !selectedArchetypes[archetype] })}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                        borderRadius: 8,
                        borderColor: theme.border,
                        borderWidth: selectedArchetypes[archetype] ? 2 : 1,
                      }}
                    >
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: theme.border,
                        marginRight: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.border : 'transparent',
                      }} />
                      <Text style={{ color: theme.text, fontSize: 14 }}>{archetype}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Row 2 */}
                <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                  {['Crime Boss', 'Force Sensitive'].map((archetype) => (
                    <TouchableOpacity
                      key={archetype}
                      onPress={() => setSelectedArchetypes({ ...selectedArchetypes, [archetype]: !selectedArchetypes[archetype] })}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                        borderRadius: 8,
                        borderColor: theme.border,
                        borderWidth: selectedArchetypes[archetype] ? 2 : 1,
                      }}
                    >
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: theme.border,
                        marginRight: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.border : 'transparent',
                      }} />
                      <Text style={{ color: theme.text, fontSize: 14 }}>{archetype}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Row 3 */}
                <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                  {['Ex Imperial', 'Smuggler'].map((archetype) => (
                    <TouchableOpacity
                      key={archetype}
                      onPress={() => setSelectedArchetypes({ ...selectedArchetypes, [archetype]: !selectedArchetypes[archetype] })}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                        borderRadius: 8,
                        borderColor: theme.border,
                        borderWidth: selectedArchetypes[archetype] ? 2 : 1,
                      }}
                    >
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: theme.border,
                        marginRight: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.border : 'transparent',
                      }} />
                      <Text style={{ color: theme.text, fontSize: 14 }}>{archetype}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Row 4 */}
                <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                  {['Scientist', 'Cloner'].map((archetype) => (
                    <TouchableOpacity
                      key={archetype}
                      onPress={() => setSelectedArchetypes({ ...selectedArchetypes, [archetype]: !selectedArchetypes[archetype] })}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                        borderRadius: 8,
                        borderColor: theme.border,
                        borderWidth: selectedArchetypes[archetype] ? 2 : 1,
                      }}
                    >
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: theme.border,
                        marginRight: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.border : 'transparent',
                      }} />
                      <Text style={{ color: theme.text, fontSize: 14 }}>{archetype}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Row 5 */}
                <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                  {['Hacker', 'Politician'].map((archetype) => (
                    <TouchableOpacity
                      key={archetype}
                      onPress={() => setSelectedArchetypes({ ...selectedArchetypes, [archetype]: !selectedArchetypes[archetype] })}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                        borderRadius: 8,
                        borderColor: theme.border,
                        borderWidth: selectedArchetypes[archetype] ? 2 : 1,
                      }}
                    >
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: theme.border,
                        marginRight: 12,
                        backgroundColor: selectedArchetypes[archetype] ? theme.border : 'transparent',
                      }} />
                      <Text style={{ color: theme.text, fontSize: 14 }}>{archetype}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={() => setArchetypeModalVisible(false)}
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

      {/* Tier Modal */}
      <Modal
        visible={tierModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setTierModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => setTierModalVisible(false)}
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
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Tier</Text>

            <View style={{ flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {/* Row 1 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                {['Tier 1', 'Tier 2'].map((tier) => (
                  <TouchableOpacity
                    key={tier}
                    onPress={() => setSelectedTiers({ ...selectedTiers, [tier]: !selectedTiers[tier] })}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: selectedTiers[tier] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      borderColor: theme.border,
                      borderWidth: selectedTiers[tier] ? 2 : 1,
                    }}
                  >
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: theme.border,
                      marginRight: 12,
                      backgroundColor: selectedTiers[tier] ? theme.border : 'transparent',
                    }} />
                    <Text style={{ color: theme.text, fontSize: 14 }}>{tier}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 2 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                {['Tier 3', 'Tier 4'].map((tier) => (
                  <TouchableOpacity
                    key={tier}
                    onPress={() => setSelectedTiers({ ...selectedTiers, [tier]: !selectedTiers[tier] })}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: selectedTiers[tier] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      borderColor: theme.border,
                      borderWidth: selectedTiers[tier] ? 2 : 1,
                    }}
                  >
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: theme.border,
                      marginRight: 12,
                      backgroundColor: selectedTiers[tier] ? theme.border : 'transparent',
                    }} />
                    <Text style={{ color: theme.text, fontSize: 14 }}>{tier}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 3 */}
              <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={() => setSelectedTiers({ ...selectedTiers, 'Tier 5': !selectedTiers['Tier 5'] })}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    backgroundColor: selectedTiers['Tier 5'] ? theme.onPressed : 'rgba(0,0,0,0.1)',
                    borderRadius: 8,
                    borderColor: theme.border,
                    borderWidth: selectedTiers['Tier 5'] ? 2 : 1,
                  }}
                >
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: theme.border,
                    marginRight: 12,
                    backgroundColor: selectedTiers['Tier 5'] ? theme.border : 'transparent',
                  }} />
                  <Text style={{ color: theme.text, fontSize: 14 }}>Tier 5</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setTierModalVisible(false)}
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
                <Text style={{ color: theme.text, fontSize: 11, marginBottom: 3 }}>Job Types: {Object.entries(selectedJobTypes).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
                <Text style={{ color: theme.text, fontSize: 11, marginBottom: 3 }}>Archetypes: {Object.entries(selectedArchetypes).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
                <Text style={{ color: theme.text, fontSize: 11 }}>Tiers: {Object.entries(selectedTiers).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
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

      <ScrollView contentContainerStyle={[{ flex: 1, alignItems: 'center', paddingVertical: 20 }]}>
        {/* Top 1/3 - Generate Target */}
        <View style={{ width: '90%', flex: 1, flexDirection: 'row', gap: 12, marginBottom: 20 }}>
          {/* Left Side - Generate Content */}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {/* Content for target generation will go here */}
          </View>

          {/* Right Side - Target Image */}
          <View style={{ width: '35%', backgroundColor: '#000000', borderRadius: 8, borderColor: theme.border, borderWidth: 1 }}>
            {/* Target image placeholder */}
          </View>
        </View>

        {/* Divider */}
        <View style={{ width: '90%', height: 6, backgroundColor: theme.darkerborder, marginBottom: 20 }} />

        {/* Bottom 2/3 - Location & Target Info */}
        <View style={{ width: '90%', flex: 2 }}>
          {/* Location and target info will go here */}
        </View>
      </ScrollView>

      {/* Reveal Target Overlay - Below Header & Buttons */}
      {!targetRevealed && (
        <View style={{
          position: 'absolute',
          top: 170,
          left: 0,
          right: 0,
          height: 225,
          backgroundColor: '#000000',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <TouchableOpacity
            onPress={() => setTargetRevealed(true)}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 32,
              backgroundColor: theme.border,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: theme.background, fontWeight: 'bold', fontSize: 18 }}>Reveal Target</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Debug Footer */}
      {debugEnabled && (
        <View style={{ backgroundColor: theme.background, paddingVertical: 12, paddingHorizontal: 16, borderTopColor: theme.darkerborder, borderTopWidth: 1 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Era: {selectedEra || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Planet: {selectedPlanet?.name || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Affiliations: {Object.entries(selectedAffiliations).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Job Types: {Object.entries(selectedJobTypes).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 4 }}>Archetypes: {Object.entries(selectedArchetypes).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Tiers: {Object.entries(selectedTiers).filter(([_, isSelected]) => isSelected).map(([name]) => name).join(', ') || 'None'}</Text>
        </View>
      )}
    </View>
  );
}
