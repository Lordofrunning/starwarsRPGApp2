import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { planetData } from '../data/planetData';
import { useTheme } from './ThemeContext';
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
const { theme } = useTheme();
  const [devMode, setDevMode] = useState(false);

  const [selectedPlanet, setSelectedPlanet] = useState<{name: string;x: number;y: number; info: string; imperialPrecence: number; rim: string; extra: string;
} | null>(null);
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
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
        <TouchableOpacity onPress={() => setDevMode(!devMode)} style={[styles.sideButton, { borderColor: theme.border }]}>
                  <Image
                    source={require('../assets/images/Icons/informationIcon1.png')}
                    style={[styles.iconImage, { tintColor: theme.icon }]}
                  />
                </TouchableOpacity>

       
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
  {!devMode && planetData.map((planet, i) => (
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
  {!devMode && (
  <Modal
    transparent
    visible={!!selectedPlanet}
    animationType="fade"
    onRequestClose={() => setSelectedPlanet(null)}
  >
    <Pressable
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
      onPress={() => setSelectedPlanet(null)}
    >
      <View
        style={{
          backgroundColor: theme.background,
          borderRadius: 10,
          padding: 20,
          borderColor: theme.darkerborder,
          borderWidth: 1,
        }}
      >
        <Text style={{ color: theme.border, fontSize: 20, marginBottom: 10 }}>
          {selectedPlanet?.name}
        </Text>
        <Text style={{ color: 'lightgray', marginBottom: 20 }}>
          {selectedPlanet?.info}
        </Text>
        <TouchableOpacity onPress={() => setSelectedPlanet(null)}>
          <Text style={{ color: theme.border, fontSize: 16 }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Modal>
  )}
  
</View>
      )}
    </View>
  );
};

export default GalaxyMap;