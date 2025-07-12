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


const planetData = [
  { name: 'Tython', x: 1169, y: 1089, info: "Tython was a terrestrial planet located in the Deep Core's that played a pivotal role in the history of the Jedi Order. A verdant world that was rich in the Force, Tython was eventually abandoned when changing Hyperspace routes moved from the planet, leaving it shrouded in myth.", imperialPrecence: 0, rim: 'Deep Core', extra: '', underWorld: 0,},
  { name: 'Coruscant', x: 1170, y: 1002, info: "Coruscant was an ecumenopolis and a center for galactic politics and commerce", imperialPrecence: 8, rim: 'Core', extra: '', underWorld: 5,},
  { name: 'Skako', x: 1253, y: 991, info: "Skako was a planet home to the Poletec species and controlled by the Techno Union, whose headquarters was the city of Purkoll. It was captured by the Galactic Republic during the Clone Wars", imperialPrecence: 0, rim: 'Core', extra: '', underWorld: 3,},
  { name: 'Alderaan', x: 1315, y: 1009, info: "Alderaan was a planet covered with Vast Mountains, forests, and many lakes. was destroyed in 0BBy", imperialPrecence: 4, rim: 'CORETYPEHERE', extra: '', underWorld: 2,},
  { name: 'Byss', x: 1120, y: 1204, info: "Byss was a planet located within the galaxy's Deep Core. Only discovered late during the Old Republic, it was the endpoint of the Byss Run hyperspace route after Prakith. It was an unusual world with an uncanny glow caused by its sun", imperialPrecence: 2, rim: 'Deep Core', extra: '', underWorld: 7,},
  { name: 'Kalist', x: 1153, y: 1222, info: " Kalist was a barren rocky planet located in the Kalist system of the Deep Core. During the Imperial Era, Kalist VI housed a high-surveillance Galactic Empire penal colony", imperialPrecence: 8, rim: 'Deep Core', extra: '', underWorld: 1,},
  { name: 'Chandrila', x: 1209, y: 977, info: "Chandrila was a planet in the Core Worlds of the galaxy. Mon Mothma hailed from Chandrila, and represented her homeworld in the Senate of the Galactic Republic. It was also the homeworld and birthplace of Ben Solo.", imperialPrecence: 4, rim: 'Core', extra: '', underWorld: 6,},
  { name: 'Castell', x: 1323, y: 912, info: "Castell was a planet in the Castell system. It was part of the Confederacy of Independent Systems during the Clone Wars. After the Clone Wars ended, Castell was captured by Republic forces. Until the Galactic Civil War, when it switched hands to the Galactic Empire.", imperialPrecence: 6, rim: 'Colonies', extra: '', underWorld: 6,},
  { name: 'Carida', x: 1339, y: 941, info: "Carida was a mountainous planet in the Colonies region. During the Clone Wars, the Valor space station orbited it, while the Imperial Era saw it home to an Imperial academy and Imperial Navy Deepdock Facility Two.", imperialPrecence: 9, rim: 'Colonies', extra: '', underWorld: 1,},
  { name: 'Corellia', x: 1345, y: 1200, info: "Corellia was a Core Worlds planet known for its ace pilots and large starships. Its vast shipyards produced many vessels over hundreds of years, including Star Destroyers for the Galactic Empire as well as other famous models such as the YT-1300 light freighter.", imperialPrecence: 9, rim: 'Core', extra: '', underWorld: 8,},
  { name: 'Duro', x: 1344, y: 1212, info: "Duro was a temperate Core Worlds planet home to the Duros species.", imperialPrecence: 4, rim: 'Core', extra: '', underWorld: 2,},
  { name: 'Rendili', x: 1351, y: 1159, info: "Rendili was an ancient, conservative planet in the Core Worlds. Its system of shipyards across the Mid Rim Territories and Outer Rim Territories gave it a temporary ascendancy. In the Imperial Era, it supported the Galactic Emperor Sheev Palpatine.", imperialPrecence: 7, rim: 'Core', extra: '', underWorld: 4,},
  { name: 'Kuat', x: 1379, y: 1065, info: "Kurt was a vital shipbuilding and industrial planet in the Core Worlds home to the Kuati people. Kuat Drive Yards' legendary Kuat shipyards was a single, large man-made ring circling its equator. It made warships for both the Galactic Republic and Galactic Empire.", imperialPrecence: 8, rim: 'Core', extra: '', underWorld: 7,},
  { name: 'Cato Neimoidia', x: 1407, y: 1152, info: "Cato Neimoidia was a planet in the Quellor sector of the Colonies region that was a Purse World of the Neimoidians and the base of operations of the Trade Federation. Much of it was covered in a persistent fog and it had bridge cities above its acidic oceans.", imperialPrecence: 4, rim: 'Core', extra: '', underWorld: 5,},
  { name: 'Quellor', x: 1428, y: 1230, info: "Quellor was a planet in the Colonies region of the galaxy. By 4 ABY, Quellor had become an Imperial fortress world. It was still under Imperial control in 7 ABY", imperialPrecence: 10, rim: 'Colonies', extra: '', underWorld: 3,},
  { name: "N'Zoth", x: 1064, y: 1068, info: "N'Zoth was a planet located in the N'zoth system of the Koornacht Cluster in the galaxy's Core Worlds. On the periphery of the Deep Core, it was connected via hyperspace route to Jedha and Coruscant", imperialPrecence: 5, rim: 'Core', extra: '', underWorld: 3,},
  { name: 'Xa Fel', x: 1053, y: 974, info: "Xa Fel was an astronomical object in the Core Worlds and the Interior home to Galactic Empire shipyards.", imperialPrecence: 10, rim: 'Core', extra: '', underWorld: 4,},
  { name: 'Pantolomin', x: 1131, y: 956, info: "Pantolomin was an astromonical object in the Core Worlds and the Interior regions connected via hyperspace routes to Borleias and Coruscant. Its name was shared by the Pantolomin cruiser, a type of luxury cruiser used by the Black Sun crime syndicate.", imperialPrecence: 0, rim: 'Core', extra: '', underWorld: 10,},
  { name: 'Moons of Bogden', x: 1287, y: 810, info: "the Moons of Bogden were composed of diverse ecosystems, from the lush moon of Bogden 4, to the arid wast of Bogden 1 ", imperialPrecence: 0, rim: 'Innter Rim', extra: '', underWorld: 8,},
  { name: 'Shili', x: 1245, y: 798, info: "Shili was a planet in the Expansion Region, that was the homeworld of the Togruta species. Because of its colorful grasslands, Togruta had special skin patterns to camouflage", imperialPrecence: 3, rim: 'Expansion Region', extra: '', underWorld: 2,},
  { name: 'Metellos', x: 1151, y: 1010, info: "Metellos was a planet in the galaxy's Core Worlds region connected via hyperspace route to the planet Ilum. The route was mapped by hyperspace surveyors hired by the Jedi Order as Ilum was a world important to the training of a Jedi", imperialPrecence: 4, rim: 'Core', extra: '', underWorld: 2,},
  { name: 'Jerrilek System', x: 1171, y: 1035, info: "The Jerrilek system was a star system in the Deep Core. it housed the planet Jerriletk, a tropical vacation planet", imperialPrecence: 4, rim: 'Deep Core', extra: '', underWorld: 4,},
  { name: 'Odik II ', x: 1073, y: 1130, info: "Odik II was a planet that was located on the Byss Run hyperlane in the Deep Core. It housed political detention wards used by the Galactic Empire to secretly imprison many dissidents. The Human officer Major Calders served at the detention facility before being reassigned aboard the Imperial Death Star battle station.", imperialPrecence: 10, rim: 'Deep Core', extra: '', underWorld: 2,},
  { name: 'Prakith', x: 1120, y: 1101, info: "Prakith was a mountainous fortress world located in the Prakith system of the Deep Core that, thanks to its unstable terrain and its isolation, was a difficult location to conquer by force. The planet was a powerful Fifth Army fortress world during the Galactic Civil War and later the personal empire of Moff Foga Brill", imperialPrecence: 10, rim: 'Deep Core', extra: '', underWorld: 7,},
  { name: 'Had Abbadon', x: 1261, y: 1104, info: "The Had Abbadon system was a star system located within the galaxy's Deep Core[1] that contained Had Abbadon,[3] a mythical ''lost planet'' that some Jedi scholars believed might have been the birthplace of the Jedi Order.", imperialPrecence: 0, rim: 'Deep Core', extra: 'Many Mysteries await on this planet, for any who dare look. ', underWorld: 0,},
  { name: 'Ebaq 9', x: 1280, y: 1160, info: "Ebaq 9 was a natural satellite of the Deep Core planet Ebaq located in the Treskov system.[1] The moon was a barren planetoid.", imperialPrecence: 7, rim: 'Deep Core', extra: 'During the Galactic Empire, the  Deep Core Mining Corporation was permitted to build a series of mines and refineries to process the moons valuable bronzium deposits, as well as a small base to handle emergency resupply and transportation. ', underWorld: 7,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},
  { name: 'Name', x: 100000, y: 100000, info: "DESCRIptionHERE", imperialPrecence: 0, rim: 'CORETYPEHERE', extra: '', underWorld: 0,},

 
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
        <TouchableOpacity style={[styles.sideButton, { borderColor: theme.border }]}>
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
    </View>
  </Modal>
  
</View>
      )}
    </View>
  );
};

export default GalaxyMap;