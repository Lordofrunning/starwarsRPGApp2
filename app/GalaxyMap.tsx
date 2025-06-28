import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      <ImageZoom
        cropWidth={screenWidth}
        cropHeight={screenHeight - HEADER_HEIGHT}
        imageWidth={IMAGE_WIDTH}
        imageHeight={IMAGE_HEIGHT}
        minScale={fitScale}
        maxScale={3}
        enableCenterFocus={false}
        useNativeDriver={true}
        panToMove={true}
        pinchToZoom={true}
      >
        <View style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black', 
        }}>
          <Image
            source={require('../assets/images/galaxy_map_2nd_try__upscale_gentle.jpg')}
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
            resizeMode="contain"
          />
        </View>
      </ImageZoom>
    </View>
  );
};

export default GalaxyMap;