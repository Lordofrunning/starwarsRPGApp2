import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import { styles } from './index.styles';

const styles2 = StyleSheet.create({
  mapContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  mapImage: {
    width: 1000, // or use '100%' if you want it screen-sized
    height: 1000, // adjust based on your image size
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const planetData = [
  { name: 'Tython', x: 1169, y: 1089, info: "Tython was a terrestrial planet located in the Deep Core's that played a pivotal role in the history of the Jedi Order. A verdant world that was rich in the Force, Tython was eventually abandoned when changing Hyperspace routes moved from the planet, leaving it shrouded in myth.", imperialPrecence: 0, rim: 'Deep Core', extra: ''},
  { name: 'Coruscant', x: 1170, y: 1002, info: "Coruscant was an ecumenopolis and a center for galactic politics and commerce", imperialPrecence: 8, rim: 'Core', extra: ''},
  { name: 'Skako', x: 1253, y: 991, info: "Skako was a planet home to the Poletec species and controlled by the Techno Union, whose headquarters was the city of Purkoll. It was captured by the Galactic Republic during the Clone Wars", imperialPrecence: 0, rim: 'Core', extra: ''},
  { name: 'Alderaan', x: 1315, y: 1009, info: "Alderaan was a planet covered with Vast Mountains, forests, and many lakes. was destroyed in 0BBy", imperialPrecence: 4, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Byss', x: 1120, y: 1204, info: "Byss was a planet located within the galaxy's Deep Core. Only discovered late during the Old Republic, it was the endpoint of the Byss Run hyperspace route after Prakith. It was an unusual world with an uncanny glow caused by its sun", imperialPrecence: 2, rim: 'Deep Core', extra: ''},
  { name: 'Kalist', x: 1153, y: 1222, info: " Kalist was a barren rocky planet located in the Kalist system of the Deep Core. During the Imperial Era, Kalist VI housed a high-surveillance Galactic Empire penal colony", imperialPrecence: 8, rim: 'Deep Core', extra: ''},
  { name: 'Chandrila', x: 1209, y: 977, info: "Chandrila was a planet in the Core Worlds of the galaxy. Mon Mothma hailed from Chandrila, and represented her homeworld in the Senate of the Galactic Republic. It was also the homeworld and birthplace of Ben Solo.", imperialPrecence: 0, rim: 'Core', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: ''},

 
];





const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// This should match the actual dimensions of your galaxy image
const IMAGE_WIDTH = 2449;
const IMAGE_HEIGHT = 2449;
const HEADER_HEIGHT = 210;

const widthScale = screenWidth / IMAGE_WIDTH;
const heightScale = screenHeight / IMAGE_HEIGHT;
const fitScale = Math.min(widthScale, heightScale);




const GalaxyMap = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const [devMode, setDevMode] = useState(true);

  const [selectedPlanet, setSelectedPlanet] = useState<{name: string;x: number;y: number; info: string; imperialPrecence: number; rim: string; extra: string;
} | null>(null);
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
          <Text style={styles.menuArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logos/rpg_main_logo.png')}
            style={styles.smallImage}
            resizeMode="contain"
          />
        </View>

       
      </View>

       {/* Zoomable Galaxy Map */}
       {/* Zoomable Map */}
       {/*
        @ts-expect-error: Suppress children type error for ImageZoom
      */}
      {React.createElement(
        ImageZoom as any,
        {
          cropWidth: screenWidth,
          cropHeight: screenHeight - HEADER_HEIGHT,
          imageWidth: IMAGE_WIDTH,
          imageHeight: IMAGE_HEIGHT,
          minScale: fitScale,
          maxScale: 3,
          enableCenterFocus: false,
          useNativeDriver: true,
          panToMove: true,
          pinchToZoom: true,
          style: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          },
        },
        <View
  style={{
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }}
  onStartShouldSetResponder={(evt) => {
    if (!devMode) return false;
    // Only intercept single taps (not multi-finger gestures)
    return evt.nativeEvent.touches.length === 1;
  }}
  onResponderRelease={(evt) => {
    if (!devMode) return;

    const nativeX = Math.round(evt.nativeEvent.locationX);
    const nativeY = Math.round(evt.nativeEvent.locationY);
    Alert.alert("Coordinates", `X: ${nativeX}\nY: ${nativeY}`);

  }}
>
  <Image
    source={require('../assets/images/galaxy_map_2nd_try__upscale_gentle.jpg')}
    style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
    resizeMode="contain"
  />

  {/* Planet Markers */}
  {planetData.map((planet, i) => (
    <TouchableOpacity
      key={i}
      onPress={() => setSelectedPlanet(planet)}
      style={{
        position: 'absolute',
        left: planet.x - 10,
        top: planet.y - 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 149, 255, 0)',
        borderWidth: .75,
        borderColor: 'white',
      }}
    />
  ))}

  {/* Modal for Planet Info */}
  <Modal
    transparent
    visible={!!selectedPlanet}
    animationType="fade"
    onRequestClose={() => setSelectedPlanet(null)}
  >
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
    >
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: 10,
          padding: 20,
          borderColor: 'white',
          borderWidth: 1,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>
          {selectedPlanet?.name}
        </Text>
        <Text style={{ color: 'lightgray', marginBottom: 20 }}>
          {selectedPlanet?.info}
        </Text>
        <TouchableOpacity onPress={() => setSelectedPlanet(null)}>
          <Text style={{ color: '#00ffff', fontSize: 16 }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
</View>
      )}
    </View>
  );
};

export default GalaxyMap;