import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';

import { styles } from './index.styles';

import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const popupWidth = screenWidth * 0.75;
const { width } = Dimensions.get('window');
const router = useRouter();

export default function InfoPage() {
  const [visibleSection, setVisibleSection] = useState<'section1' | 'section2' | 'section3' | 'section4' | null>(null);
  const [d100Result, setD100Result] = useState<number | null>(null);
  return (
    <ImageBackground
      source={require('../assets/images/BiggerDataPadCustom.png')}
      style={styles.backgroundInfoPage}
      resizeMode="contain"
      >
        <>
      <Stack.Screen options={{ headerShown: false }} />
        </>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 80, left: 30, zIndex: 1 }}>
        <Text style={styles.menuArrow}>←</Text>
      </TouchableOpacity>

      {visibleSection === null && (
      <View style={styles.overlayContainerInfoPage}>
        {/* Buttons was modalbackgroundInfoPageTrent*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section1')}
        >
          <Text style={styles.buttonText}>Actions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section2')}
        >
          <Text style={styles.buttonText}>Manuevers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section3')}
        >
          <Text style={styles.buttonText}>Critical Injuries</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Healing Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Crafting Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Buying and Selling</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Starship Fighting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Starship Crit Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Landspeader Chase</Text>
        </TouchableOpacity>
      </View>
      )}

      {/* Modal Section */}
      <Modal
        transparent={true}
        animationType="none"
        visible={visibleSection !== null}
        onRequestClose={() => setVisibleSection(null)}
      >
        <View style={styles.modalbackgroundInfoPageTrent}>
          <View style={[styles.popupcontainerInfoPageTrent, { width: popupWidth }]}>
            <View style={{ maxHeight: 500, overflow: 'hidden' }}>
            <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
              {/* d100 button and result for section3 */}
          {visibleSection === 'section3' && (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <TouchableOpacity
                style={[styles.button, { width: 120 }]}
                onPress={() => setD100Result(Math.floor(Math.random() * 100) + 1)}
              >
                <Text style={styles.buttonText}>Roll d100</Text>
              </TouchableOpacity>
              {d100Result !== null && (
                <Text style={{ color: '#fff', fontSize: 20, marginTop: 8 }}>
                  Result: {d100Result}
                </Text>
              )}
            </View>
          )}
          <Image
                source={
                  visibleSection === 'section1'
                    ? require('../assets/images/section1.png')
                    : visibleSection === 'section2'
                    ? require('../assets/images/section2.png')
                    : visibleSection === 'section3'
                    ? require('../assets/images/section3.jpg')
                    : visibleSection === 'section4'
                    ? require('../assets/images/section2.png')
                    : null
                }
                style={{ width: popupWidth, resizeMode: 'contain' }}
              />
              
            </ScrollView>
          </View></View>
          {/* Close Button */}
    <TouchableOpacity
      onPress={() => setVisibleSection(null)}
      style={styles.closeButtonFixed}
    >
      <Text style={styles.closeButtonText}>Close</Text>
    </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
}
