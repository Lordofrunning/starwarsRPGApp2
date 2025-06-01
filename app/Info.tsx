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
      <View><Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
          <Text style={styles.menuArrow}>←</Text>
        </TouchableOpacity>
      </View> </View>
      <View style={styles.overlayContainerInfoPage}>
        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section1')}
        >
          <Text style={styles.buttonText}>Section 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section2')}
        >
          <Text style={styles.buttonText}>Section 2</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Section */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={visibleSection !== null}
        onRequestClose={() => setVisibleSection(null)}
      >
        <View style={styles.modalbackgroundInfoPage}>
          <View style={[styles.popupcontainerInfoPage, { width: popupWidth }]}>
            <ScrollView>
              <Image
                source={
                  visibleSection === 'section1'
                    ? require('../assets/images/section1.png')
                    : require('../assets/images/section2.png')
                }
                style={{ width: popupWidth, resizeMode: 'contain' }}
              />
            </ScrollView>
            <TouchableOpacity onPress={() => setVisibleSection(null)} style={styles.closeButton}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
