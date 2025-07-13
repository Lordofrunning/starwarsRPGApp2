import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { styles } from './index.styles';
import { useTheme } from './ThemeContext';

export default function NPCButtonsPage() {
  const router = useRouter();
  const { theme, themeName } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);


  type ThemeName = 'jedi' | 'imperial' | 'rebel';
  type TablePositions = {
  sabaccPosition: ViewStyle;
  roulettePosition: ViewStyle;
  pazaakPosition: ViewStyle;
};
  const themeImages = {
  imperial: require('../assets/images/GameStuff/CasinoImperialImage.png'),
  rebel: require('../assets/images/GameStuff/CasinoRebelsImage.png'),
  jedi: require('../assets/images/GameStuff/CasinoJedi2Image.png'),

};

  const tablePositionsByTheme: Record<ThemeName, TablePositions> = {
  jedi: {
     sabaccPosition: {
    top: '11%',
    left: '40%',
    width: 80,
    height: 178,
    borderRadius: 60,
    //borderColor: theme.border,
  },
  roulettePosition: {
    top: '0%',
    left: '8%',
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  pazaakPosition: {
    top: '1%',
    right: '5%',
    width: 70,
    height: 95,
    borderRadius: 20,
  },
  },
  imperial: {
    sabaccPosition: {
    top: '13%',
    left: '40%',
    width: 80,
    height: 178,
    borderRadius: 60,
  },
  roulettePosition: {
    top: '4%',
    left: '8%',
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  pazaakPosition: {
    top: '5%',
    right: '5%',
    width: 70,
    height: 95,
    borderRadius: 20,
  },
  },
  rebel: {
    sabaccPosition: {
    top: '13%',
    left: '40%',
    width: 80,
    height: 178,
    borderRadius: 60,
  },
  roulettePosition: {
    top: '4%',
    left: '8%',
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  pazaakPosition: {
    top: '5%',
    right: '5%',
    width: 70,
    height: 95,
    borderRadius: 20,
  },
  },
};

const currentTheme = theme.name as ThemeName;
const positions = tablePositionsByTheme[currentTheme];

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: theme.background }}>
      <View style={styles.container}>
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

          <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={[styles.sideButton, { borderColor: theme.border }]}>
                    <Image
                      source={require('../assets/images/Icons/informationIcon1.png')}
                      style={[styles.iconImage, { tintColor: theme.icon }]}
                    />
                  </TouchableOpacity>
        </View>

            <ImageBackground
                  source={themeImages[themeName]}
                  style={localStyles.room}
                  resizeMode="stretch"
                >
                  <Pressable
  onPress={() => router.push('/Sabacc')}
  style={({ pressed }) => [
    //localStyles.invisibleButton,
    positions.sabaccPosition,
    pressed && {
      borderColor: theme.border,
      borderWidth: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.05)', // optional
      shadowColor: theme.border,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 0 },
    },
  ]}
/>

<Pressable
  onPress={() => router.push('/CorellianRoulette')}
  style={({ pressed }) => [
    localStyles.invisibleButton,
    positions.roulettePosition,
    pressed && {
      borderColor: theme.border,
      borderWidth: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      shadowColor: theme.border,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 0 },
    },
  ]}
/>

<Pressable
  onPress={() => router.push('/Pazaak')}
  style={({ pressed }) => [
    localStyles.invisibleButton,
    positions.pazaakPosition,
    pressed && {
      borderColor: theme.border,
      borderWidth: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      shadowColor: theme.border,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 0 },
    },
  ]}
/>

             </ImageBackground>


      </View>
      <Modal
                visible={infoModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setInfoModalVisible(false)}
              >
                <View style={localStyles.modalOverlayBig}>
                  <View style={localStyles.modalContentBig}>
                    <Text style={localStyles.modalHeaderBig}>Local Cantina {"\n"}</Text>
                    <ScrollView contentContainerStyle={localStyles.scrollViewContent}>
                      <Text style={localStyles.modalHeaderMedium}>Gambling Den</Text>
                      <Text style={localStyles.modalDescriptionBig}>
                        {/* Put your long info text here */}
                        you can find all sorts of legal and illegal activities here. just make sure you got enought credits to hang around. 
                      </Text>
                      <View style={[localStyles.divider,{marginBottom: 20}]}></View>
                      
                      <Text style={localStyles.modalHeaderMedium}>Dual/Spinning</Text>
                      <Text style={localStyles.modalDescriptionBig}>
                         
              
              
                      </Text>
                    </ScrollView>
                    <TouchableOpacity style={localStyles.closeButtonBig} onPress={() => setInfoModalVisible(false)}>
                      <Text style={localStyles.closeButtonTextBig}>Got it</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
      
    </View>
    // <ItemsDropdown items={Items} />
    
  );
}

const localStyles = StyleSheet.create({
  buttonStack: {
    marginTop: 30,
    gap: 14,
    paddingHorizontal: 20,
  },
  buttonBig: {
    backgroundColor: '#3B2C24', // warm smoky brown, leather-like
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D6B400', // faded gold trim
    shadowColor: '#D6B400',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#F8EEC1', // pale cantina parchment
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonTextCentered: {
    color: '#F8EEC1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },

  // room stuf
   room: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  tableGlow: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00FFFF',
    borderRadius: 12,
    backgroundColor: 'transparent',
    shadowColor: '#00FFFF',
    shadowRadius: 12,
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
  },
  
  invisibleButton: {
  position: 'absolute',
  opacity: 0, // invisible by default
  borderRadius: 12,
},



  // modal stuff here
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
});


     