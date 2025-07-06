import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './index.styles';

import { ThemeName, useTheme } from './ThemeContext';
const holoStyles = StyleSheet.create({
  holoBorder: {
    borderRadius: 14,
    padding: 2,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 12,
    shadowColor: '#0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonInner: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonFill: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
      blurContainer: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  buttonPressed: {
  backgroundColor: 'rgba(0, 255, 255, 0.4)', // bright lightning blue fill on press
  borderColor: '#00FFFF', // optional border highlight if your button has a border
},

  // take 2
   outerBorder: {
    borderRadius: 16,
    padding: 2,
    width: '75%',
    alignSelf: 'center',
    marginVertical: 14,
    backgroundColor: '#003B6F', // solid deep blue border
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
   holoWrapper: {
    borderWidth: 2,
    borderColor: '#003B6F', // Solid blue border
    borderRadius: 16,
    overflow: 'hidden',
    width: '75%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  holoGradient: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // important
  },
   touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  
});
const impStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#FF3C3C',
    shadowColor: '#FF3C3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  menuTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
  textAlign: 'center',
  color: '#B0B0B0', // fallback if you want a default color
},
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  menuText: {
    fontSize: 24,
    color: '#FF3C3C',
    fontWeight: 'bold',
  },
  sideButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FF3C3C',
  },
  iconImage: {
    width: 26,
    height: 26,
    tintColor: '#FF3C3C',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBox: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    width: '70%',
    shadowColor: '#FF3C3C',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  menuItem: {
    color: '#B0B0B0',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
});



 export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const router = useRouter();
    const { theme, themeName, setThemeName } = useTheme();

      const buttonGradients: Record<ThemeName, string[]> = {
  imperial: ['rgba(255, 60, 60, 0.05)', 'rgba(255, 60, 60, 0.2)', 'rgba(255, 60, 60, 0.4)'],
  rebel: [
    'rgba(214,180,0,0.05)',  // light golden glow
    'rgba(214,180,0,0.2)',   // faded tactical yellow
    'rgba(155,120,0,0.35)',  // gritty golden brown
  ],
  jedi:     ['rgba(92, 173, 170, 0.05)', 'rgba(92, 173, 170, 0.2)', 'rgba(92, 173, 170, 0.4)'],
};
    useEffect(() => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    interruptionModeIOS: 1, // DO_NOT_MIX
    playsInSilentModeIOS: true,
    shouldDuckAndroid: false,
    interruptionModeAndroid: 1, // DO_NOT_MIX
    playThroughEarpieceAndroid: false,
  });
}, []);

  return (
    
    <View style={styles.container}>
     
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.background, borderBottomColor: theme.border },
        ]}
      >
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={[styles.sideButton, { borderColor: theme.border }]}>
          <Text style={[styles.menuText, { color: theme.icon }]}>☰</Text>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>GM AID</Text>

        <TouchableOpacity style={[styles.sideButton, { borderColor: theme.border }]}>
          <Image
            source={require('../assets/images/Icons/informationIcon1.png')}
            style={[styles.iconImage, { tintColor: theme.icon }]}
          />
        </TouchableOpacity>
      </View>

      {/* Popup Menu */}
      <Modal visible={menuVisible} transparent animationType="none">
  <TouchableOpacity
    style={impStyles.modalBackground}
    onPress={() => setMenuVisible(false)}
    activeOpacity={1}
  >
    <View style={[impStyles.menuBox, { backgroundColor: theme.background }]}>
      {/* Existing Menu Options */}
      <TouchableOpacity>
        <Text style={[impStyles.menuItem, { color: theme.text }]}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[impStyles.menuItem, { color: theme.text }]}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[impStyles.menuItem, { color: theme.text }]}>Logout</Text>
      </TouchableOpacity>

      <View style={impStyles.menuDivider} />

      {/* Theme Picker */}
      <Text style={[impStyles.menuTitle, { color: theme.border }]}>Select Theme</Text>

      <TouchableOpacity onPress={() => setThemeName('imperial')}>
        <Text
          style={[
            impStyles.menuItem,
            themeName === 'imperial' && { color: theme.border },
          ]}
        >
          Imperial
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThemeName('rebel')}>
        <Text
          style={[
            impStyles.menuItem,
            themeName === 'rebel' && { color: theme.border },
          ]}
        >
          Rebel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThemeName('jedi')}>
        <Text
          style={[
            impStyles.menuItem,
            themeName === 'jedi' && { color: theme.border },
          ]}
        >
          Jedi
        </Text>
      </TouchableOpacity>

      <View style={impStyles.menuDivider} />

      <TouchableOpacity onPress={() => setMenuVisible(false)}>
        <Text style={[impStyles.menuItem, { color: theme.icon }]}>Close</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
</Modal>


      {/* Main content below */}
         <ImageBackground 
        source={require('../assets/images/hyperdrive_image4.jpg')}
        style={{ flex: 1}}
        resizeMode='cover'
        >
      
        <Stack.Screen options={{ headerShown: false }} />
    {/* <View style={styles.container}> */}
         {/* <View style={[styles.imageWrapper, { backgroundColor: 'rgba(134, 134, 134, 0.4)'}]}> */}
        <Image
          source={require('../assets/images/logos/rpg_main_logo.png')}
          style={[styles.image,{height: 100} ]}
          resizeMode="contain"
        />
        {/* </View> */}
        

         {/* Button stack */}
            <View style={styles.buttonStack}>

              <TouchableOpacity style={[holoStyles.holoWrapper,{ borderColor: theme.darkerborder}]} onPress={() => router.push('/Sounds')}>
                 <Pressable onPress={() => router.push('/Sounds')}style={({ pressed }) => [holoStyles.buttonInner,pressed && holoStyles.buttonPressed,]}>
                    <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
                  <LinearGradient
  colors={buttonGradients[themeName] as [string, string, string]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={holoStyles.holoGradient}
>
                    <Text style={[holoStyles.buttonText, {color: theme.text}]}>Sounds of the Galaxy</Text>
                     </LinearGradient>
                  </BlurView>
                </Pressable>
              </TouchableOpacity>

          
              <TouchableOpacity style={[holoStyles.holoWrapper,{ borderColor: theme.darkerborder}]} onPress={() => router.push('/DataPad')}>
                 <Pressable onPress={() => router.push('/DataPad')}style={({ pressed }) => [holoStyles.buttonInner,pressed && holoStyles.buttonPressed,]}>
                    <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
                      <LinearGradient
  colors={buttonGradients[themeName] as [string, string, string]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={holoStyles.holoGradient}
> <Text style={[holoStyles.buttonText, {color: theme.text}]}>Combat Info</Text>
                     </LinearGradient>
                  </BlurView>
                </Pressable>
              </TouchableOpacity>

               <TouchableOpacity style={[holoStyles.holoWrapper,{ borderColor: theme.darkerborder}]} onPress={() => router.push('/GameList')}>
                 <Pressable onPress={() => router.push('/GameList')}style={({ pressed }) => [holoStyles.buttonInner,pressed && holoStyles.buttonPressed,]}>
                    <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
                     <LinearGradient
  colors={buttonGradients[themeName] as [string, string, string]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={holoStyles.holoGradient}
>  <Text style={[holoStyles.buttonText, {color: theme.text}]}>Gambling Games</Text>
                     </LinearGradient>
                  </BlurView>
                </Pressable>
              </TouchableOpacity>


               <TouchableOpacity style={[holoStyles.holoWrapper,{ borderColor: theme.darkerborder}]} onPress={() => router.push('/Shop')}>
                 <Pressable onPress={() => router.push('/Shop')}style={({ pressed }) => [holoStyles.buttonInner,pressed && holoStyles.buttonPressed,]}>
                    <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
                     <LinearGradient
  colors={buttonGradients[themeName] as [string, string, string]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={holoStyles.holoGradient}
>  <Text style={[holoStyles.buttonText, {color: theme.text}]}>Generate Random Shop</Text>
                     </LinearGradient>
                  </BlurView>
                </Pressable>
              </TouchableOpacity>

               <TouchableOpacity style={[holoStyles.holoWrapper,{ borderColor: theme.darkerborder}]} onPress={() => router.push('/NPC/NPCs')}>
                 <Pressable onPress={() => router.push('/NPC/NPCs')}style={({ pressed }) => [holoStyles.buttonInner,pressed && holoStyles.buttonPressed,]}>
                    <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
                    <LinearGradient
  colors={buttonGradients[themeName] as [string, string, string]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={holoStyles.holoGradient}
> <Text style={[holoStyles.buttonText, {color: theme.text}]}>Enemies / NPCs</Text>
                     </LinearGradient>
                  </BlurView>
                </Pressable>
              </TouchableOpacity>

             <TouchableOpacity style={[holoStyles.holoWrapper,{ borderColor: theme.darkerborder}]} onPress={() => router.push('/GalaxyMap')}>
                 <Pressable onPress={() => router.push('/GalaxyMap')}style={({ pressed }) => [holoStyles.buttonInner,pressed && holoStyles.buttonPressed,]}>
                    <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
                    <LinearGradient
  colors={buttonGradients[themeName] as [string, string, string]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={holoStyles.holoGradient}
> <Text style={[holoStyles.buttonText, {color: theme.text}]}>Galaxy Map</Text>
                     </LinearGradient>
                  </BlurView>
                </Pressable>
              </TouchableOpacity>

              <TouchableOpacity style={[holoStyles.holoWrapper,{ borderColor: theme.darkerborder}]} onPress={() => router.push('/DiceRoller')}>
                 <Pressable onPress={() => router.push('/DiceRoller')}style={({ pressed }) => [holoStyles.buttonInner,pressed && holoStyles.buttonPressed,]}>
                    <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
                     <LinearGradient
  colors={buttonGradients[themeName] as [string, string, string]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={holoStyles.holoGradient}
> <Text style={[holoStyles.buttonText, {color: theme.text}]}>Dice Roller</Text>
                     </LinearGradient>
                  </BlurView>
                </Pressable>
              </TouchableOpacity>
             
              
            </View>
              {/* </View> */}
              
                <Modal
                          visible={infoModalVisible}
                          animationType="slide"
                          transparent={true}
                          onRequestClose={() => setInfoModalVisible(false)}
                        >
                          <View style={localStyles.modalOverlayBig}>
                            <View style={localStyles.modalContentBig}>
                              <Text style={localStyles.modalHeaderBig}>Star Wars GM Aid {"\n"}</Text>
                              <ScrollView contentContainerStyle={localStyles.scrollViewContent}>
                                <Text style={localStyles.modalHeaderMedium}>whats here?</Text>
                                <Text style={localStyles.modalDescriptionBig}>
                                  {/* Put your long info text here */}
                                {"\n\n"} this app has lots of different uses. it has a sound board, to help emerse your players into the game, a map, listing all the planets and where they are in the wider galaxy. it has a dice roller, with dice pool saving, optional bonus rules, and more. 
                                {"\n\n"} its also got a random shop generator, and a bunch of star wars casino games. enough for any pc to bet to their hearts content. there are also enemy sheets, giving easy access to enemy stats for use in game. 
                                </Text>
                               
                                
                               
                              </ScrollView>
                              <TouchableOpacity style={localStyles.closeButtonBig} onPress={() => setInfoModalVisible(false)}>
                                <Text style={localStyles.closeButtonTextBig}>Got it</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                </ImageBackground>
              </View>
              
  );
}

// // The root component exports the ThemeProvider wrapped around HomeScreenContent
// export default function Index() {
//   return (
//     <ThemeProvider>
//       <HomeScreen />
//     </ThemeProvider>
//   );
// }



const localStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  cardImage: {
    resizeMode: 'contain',
    marginBottom: 5,
  },
  cardName: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  totalValueText: {
    fontSize: 22,
    color: 'lightgreen',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
  },
  cardButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#222',
  padding: 20,
  borderRadius: 10,
  width: '80%',
   alignItems: 'center',
},

    modalTextHeader: {
  color: 'white',
  fontSize: 25,
  marginBottom: 100,
  textAlign: 'center',
},

modalText: {
  color: 'white',
  fontSize: 16,
  marginBottom: 20,
  textAlign: 'center',
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
modalButton: {
  flex: 1,
  padding: 10,
  marginHorizontal: 5,
  borderRadius: 6,
  alignItems: 'center',
},
modalButton2: {
  padding: 10,
  marginHorizontal: 5,
  borderRadius: 6,
  alignItems: 'center',
},
modalButtonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 20,        
},

// big modal stuff here 
  modalOverlayBig: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentBig: {
    backgroundColor: "#222",
    borderRadius: 12,
    width: '90%',  // almost full width
    height: '85%', // limit max height so it doesn't cover entire screen
    padding: 20,
  },
    sideButton: {
  width: 50,
  alignItems: 'center',
},
 resetButton: {
    backgroundColor: '#CC3333', // deep red
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  resetButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },


// toggle stuff
toggleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
  width: '100%',
},
toggleLabel: {
  color: 'white',
  fontSize: 16,
},
  divider: {
  height: 4,
  backgroundColor: "#0ff", // or white, gray, etc.
   marginVertical: 5, // spacing above and below the line
  width: '100%',
},
scrollViewContent: {
    paddingBottom: 20,  // add space below scroll content for comfortable scrolling
  },
  modalHeaderBig: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0ff",
    marginBottom: 12,
  },
  modalHeaderMedium: {
    fontSize: 22,
    fontWeight: "bold",
    color: "yellow",
    marginBottom: 12,
  },
   modalDescriptionBig: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  closeButtonBig: {
    backgroundColor: "#0f0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: "center",
  },
  closeButtonTextBig: {
    color: "#000",
    fontWeight: "bold",
  },
   profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18, // makes it circular
    borderWidth: 1,
    borderColor: '#fff',
  },

  absoluteDiceWrapper: {
    position: 'absolute',
    right: 10,
    top: '55%',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)', // Temporary for visibility
    padding: 10,
    borderRadius: 10,
  },
  diceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  die: {
    width: 60,
    height: 60,
    marginVertical: 5,
    resizeMode: 'contain',
    backgroundColor: '#111', // Helps visually spot missing images
  },
  rollButton: {
    backgroundColor: '#228822',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
     




