import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const popupWidth = screenWidth * 0.75;
const { width } = Dimensions.get('window');

export default function InfoPage() {
  const [visibleSection, setVisibleSection] = useState<'section1' | 'section2' | null>(null);

  return (
    <ImageBackground
      source={require('../assets/images/BiggerDataPadCustom.png')}
      style={styles.background}
      resizeMode="contain"
    >
      <View style={styles.overlayContainer}>
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
        <View style={styles.modalBackground}>
          <View style={[styles.popupContainer, { width: popupWidth }]}>
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
const styles = StyleSheet.create({
    background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  button: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '75%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  closeButton: {
    backgroundColor: '#222',
    padding: 10,
    alignItems: 'center',
  },
});
