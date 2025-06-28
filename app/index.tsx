import { Audio } from 'expo-av';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './index.styles';



export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const router = useRouter();

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
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>

         {/* Popup Menu */}
      <Modal visible={menuVisible} transparent animationType="none">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.menuBox}>
            <TouchableOpacity>
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
             {/* 🔻 Close button */}
          <View style={styles.menuDivider} />

            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuItem}>Close</Text>
            </TouchableOpacity>
          </View>
          
        </TouchableOpacity>
      </Modal>



        <Text style={styles.headerTitle}>GM AID</Text>

                <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={styles.sideButton}>
                                      <Image
                                          source={require('../assets/images/Icons/informationIcon1.png')}
                                          style={[styles.profileImage, { backgroundColor: 'white' }]}
                                      />
                </TouchableOpacity>

      </View>


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
          style={styles.image }
          resizeMode="contain"
        />
        {/* </View> */}
        

         {/* Button stack */}
            <View style={styles.buttonStack}>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/Sounds')}>
                <Text style={styles.buttonTextCentered}>Sounds of the Galaxy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/DataPad')}>
                <Text style={styles.buttonText}>Combat Info</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/GameList')}>
                <Text style={styles.buttonText}>Gambling Games</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/Shop')}>
                <Text style={styles.buttonText}>Generate Shop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/NPC/NPCs')}>
                <Text style={styles.buttonText}>Enemies / NPCs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/GalaxyMap')}>
                <Text style={styles.buttonText}>Galaxy Map</Text>
              </TouchableOpacity> 
               <TouchableOpacity style={styles.button} onPress={() => router.push('/DiceRoller')}>
                <Text style={styles.buttonText}>Dice Roller</Text>
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
     




