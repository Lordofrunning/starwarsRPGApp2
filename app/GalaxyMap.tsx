import { useRouter } from 'expo-router';
import React from 'react';
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

const { width, height } = Dimensions.get('window');
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

const GalaxyMap = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
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

        <TouchableOpacity onPress={() => console.log('Profile pressed')} style={styles.sideButton}>
          <Image
            source={require('../assets/images/empty_profile_pic.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={1200}
        imageHeight={1000}
        minScale={0.5}
        maxScale={3}
      >
        <Image
          source={require('../assets/images/galaxy_map_main_image.webp')}
          style={{ width: 1200, height: 1000 }}
          resizeMode="contain"
        />
      </ImageZoom>
    </View>
  );
};

export default GalaxyMap;