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
  const [visibleSection, setVisibleSection] = useState<'section1' | 'section2' | null>(null);

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
              <Image
                source={
                  visibleSection === 'section1'
                    ? require('../assets/images/section1.png')
                    : require('../assets/images/section2.png')
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
