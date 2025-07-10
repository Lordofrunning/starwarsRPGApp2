import { Audio } from 'expo-av';
import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from './ThemeContext';


const initialSlots = [
  { label: "x0.9", multiplier: 0.9, description: "you gain 1/5 of your bet!" },
  { label: "x0.5", multiplier: 0.5, description: "you lose 1/5 of your bet!." }, 
  { label: "x1.2", multiplier: 1.2, description: "you gain 1/2 of your bet!" },
  { label: "Zap", effect: "" , description: "take 3 stain and 3 wounds! " },
  { label: "DRAIN", multiplier: 0 , description: "you lose your bet!" },
  { label: "x1.0", multiplier: 1.0, description: "you double your bet!" },
   { label: "Zap", effect: "" , description: "take 4 stain and 3 wounds! " },
  { label: "x0.4", multiplier: 0.4 , description: "you lose half your bet" },
  { label: "Zap", effect: "" , description: "take 5 wounds! " },
  { label: "x0.9", multiplier: .9 , description: "Your bet is multiplied by 2." },
  { label: "Mystery DRAIN", effect: "mystery", description: "you lose your bet, and that much again in credits" },
  { label: "x1.1", multiplier: 1.1, description: "you gain 1/5 of your bet!" },
];

const mysteryDrainOutcomes = [
  {
    description: "You lose all your credits!",
    apply: (credits: number) => 0,
  },
  {
    description: "You lose half your credits, and that much again from your account",
    apply: (credits: number) => Math.floor(credits * 0.5),
  },
  {
    description: "You lose half your credits, and take 4 wounds",
    apply: (credits: number) => Math.floor(credits * 0.5),
  },
  {
    description: "You take 2 wounds, 5 Strain, and lose 15% of your credits",
    apply: (credits: number) => Math.floor(credits * 0.85),
  },
  {
    description: "You lose all your credits, and that much again from your account",
    apply: (credits: number) => Math.max(credits * - 1),
  },
];

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.8;
const wheelOuter = width * 0.9;

export default function Spinner() {
    const router = useRouter();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const { theme, themeName } = useTheme();
  // state stuff? 
  const [credits, setCredits] = useState<number | null>(null); // null = not started
   const [creditInput, setCreditInput] = useState("1000");
   const [currentSlot, setCurrentSlot] = useState<any | null>(null);
const [customDescription, setCustomDescription] = useState<string | null>(null);

const [startModalVisible, setStartModalVisible] = useState(true);
const [infoModalVisible, setInfoModalVisible] = useState(false);

const [spins, setSpins] = useState(0);
// for saving the origonal slot numbers
const [spinnerSlots, setSpinnerSlots] = useState(() =>
  JSON.parse(JSON.stringify(initialSlots)) // deep copy to avoid mutation
);
const resetSpinnerSlots = () => {
  setSpinnerSlots(JSON.parse(JSON.stringify(initialSlots))); // reset to original
};

 const playSound = async (soundFile) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    // Optional: unload the sound after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) sound.unloadAsync();
    });
  } catch (error) {
    console.warn("Sound playback error:", error);
  }
};

const spin = () => {
  if (isSpinning || credits === null || credits <= 0) return;
  setIsSpinning(true);
  const selected = Math.floor(Math.random() * spinnerSlots.length);
  setResultIndex(selected); // used for displaying result in modal
  const segmentAngle = 360 / spinnerSlots.length;
  const spinAmount = 360 * 5;
  const endAngle = spinAmount + segmentAngle * selected * -1;
  spinAnim.setValue(0);

    // playSound(wheelSpinaAudio)
  Animated.timing(spinAnim, {
    toValue: endAngle,
    duration: 3000,
    useNativeDriver: true,
    easing: Easing.out(Easing.cubic),
  }).start(() => {
const result = spinnerSlots[selected];
setCurrentSlot(result); // 🟢 store the slot for the modal


if (credits !== null) {
  if (typeof result.multiplier === "number") {
    const newCredits = Math.floor(credits * result.multiplier);
    setCredits(newCredits);
    setCustomDescription(null); // no custom text needed
  }else if (result.effect === "mystery") {
      const randomEffect = mysteryDrainOutcomes[Math.floor(Math.random() * mysteryDrainOutcomes.length)];
      const updatedCredits = randomEffect.apply(credits);
      setCredits(updatedCredits);
      setCustomDescription(randomEffect.description); // 💥 Set the effect description
    }
}
    // Show modal first — delay updates
    setModalVisible(true);
    setSpins(prev => prev + 1);
    setIsSpinning(false);
    // play sound effect based on the result
    if (result.sound) {
         playSound(result.sound);
        }
  });
};

   
 

    const generateDescription = (slot, customDesc?: string) => {
  const { label, multiplier } = slot;

  if (customDesc && slot.effect === "mystery") {
    return `Mystery Drain! ${customDesc}`;
  }

  if (label === "Zap") return "Take 3 strain and 3 wounds!";
  if (label === "DRAIN") return "You lose your bet!";
  if (label === "Mystery DRAIN") return "Missed custom desc.....";

  if (multiplier === 1.0) return "You break even.";

  if (multiplier > 1) {
    const percent = Math.round((multiplier - 1) * 100);
    return `You gain ${percent}% of your current credits!`;
  }

  if (multiplier > 0) {
    const percent = Math.round((1 - multiplier) * 100);
    return `You lose ${percent}% of your current credits.`;
  }

  return "Something mysterious happened.";
};


  const interpolated = spinAnim.interpolate({
  inputRange: [0, 360],
  outputRange: ["0deg", "360deg"],
});

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        {/* header here */}
        <View  style={[
                    styles.header,
                    { backgroundColor: theme.background, borderBottomColor: theme.border },
                  ]}>
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
        
               <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={styles.sideButton}>
                    <Image
                        source={require('../assets/images/Icons/informationIcon1.png')}
                        style={[styles.iconImage, { tintColor: theme.icon }]}
                    />
                </TouchableOpacity>
              </View>
         

        {credits === null && (
            // start menue/ credit input modal
  <Modal
    visible={startModalVisible}
    transparent
    animationType="slide"
    onRequestClose={() => {}}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeader}>Enter Starting Credits</Text>
        <Text style={styles.modalDescription}>Begin your Corellian Roulette run.</Text>

        <TextInput
  style={styles.input}
  value={creditInput}
  onChangeText={setCreditInput}
  placeholder="Enter starting credits"
  keyboardType="numeric"
/>

<TouchableOpacity
  style={styles.closeButton}
  onPress={() => {
    const startingCredits = parseInt(creditInput);
    if (!isNaN(startingCredits) && startingCredits > 0) {
      setCredits(startingCredits);
      setStartModalVisible(false);
    } else {
      alert("Please enter a valid number.");
    }
  }}
>
  <Text style={styles.closeButtonText}>Start Game</Text>
</TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

        {resultIndex !== null && (
  <Modal
    visible={modalVisible}
    transparent
    animationType="fade"
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
         <Text style={styles.modalHeader}>{currentSlot?.label ?? ""}</Text>
        <Text style={styles.modalDescription}>
  {currentSlot ? generateDescription(currentSlot, customDescription ?? undefined) : ""}
</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
  setModalVisible(false);
  setCustomDescription(null);
  setCurrentSlot(null);

 setSpinnerSlots(prevSlots =>
  prevSlots.map(slot => {
    if (
      typeof slot.multiplier === "number" &&
      slot.multiplier > 0 &&
      spins < 10 &&                  // ✅ Only increase if spins are less than 10
      spins % 2 === 1                // ✅ Still only on every 2nd spin
    ) {
      const newMultiplier = parseFloat((slot.multiplier + 0.1).toFixed(1));
      return {
        ...slot,
        multiplier: newMultiplier,
        label: `x${newMultiplier.toFixed(1)}`
      };
    }
    return slot;
  })
);


}}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

    <Modal
  visible={infoModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setInfoModalVisible(false)}
>
  <View style={styles.modalOverlayBig}>
    <View style={styles.modalContentBig}>
      <Text style={styles.modalHeaderBig}>Game Info {"\n"}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.modalHeaderMedium}>Solo Spinner</Text>
        <Text style={styles.modalDescriptionBig}>
          {/* Put your long info text here */}
          🎰 Corellian Roulette is a game of chance. Spin the wheel and see how your bet multiplies — or vanishes.
          {"\n\n"}- "Zap" inflicts damage.
          {"\n"}- "DRAIN" wipes your credits.
          {"\n"}- "Mystery DRAIN" applies a surprise penalty.
          {"\n\n"}General Rules: you can stop spinning at any time, and lock in your credits
          {'\n'}No Healing while spinning. all wounds and strain are applied directly to threasholds, no soak is applyed
        </Text>
        <View style={[styles.divider,{marginBottom: 20}]}></View>
        
        <Text style={styles.modalHeaderMedium}>Dual/Spinning</Text>
        <Text style={styles.modalDescriptionBig}>
            for going Head to Head with another person, a 2v2, or even 3v3
             {"\n\n"} the best way is to have 2 wheels going at the same time. but you could go one after the other.
            {"\n\n"}players battle to end with the most amount of credits. if playing in teams, you add your credits and your teamates credits after locking them in.
            {"\n\n"} you may stop spinning at any time, and lock in your current credit amount
            {"\n\n"} each player/team spins their own wheel.


        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.closeButtonBig} onPress={() => setInfoModalVisible(false)}>
        <Text style={styles.closeButtonTextBig}>Got it</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  {/* lock in modal/winning modal */}
<Modal
  visible={confirmationVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setConfirmationVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={[styles.modalContent, { padding: 24 }]}>
      <Text style={styles.modalHeader}>Credits Locked In</Text>
      <Text style={styles.modalDescription}>
        You locked in {credits} credits!
      </Text>

      <TouchableOpacity
        style={[styles.closeButton, { marginTop: 20 }]}
        onPress={() => {
          setConfirmationVisible(false);
          setModalVisible(false);
          resetSpinnerSlots();
          setCredits(1000);
          setSpins(0);
        }}
      >
        <Text style={styles.closeButtonText}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.closeButton, { marginTop: 20 }]}
        onPress={() => {
          setConfirmationVisible(false);
          setModalVisible(false);
          resetSpinnerSlots();
          setCredits(1000);
          setSpins(0);
          router.push('./')
        }}
      >
        <Text style={styles.closeButtonText}>Exit</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

    {credits !== null && (
  <View style={{ marginBottom: 10 }}>
  <Text style={{ color: theme.text, fontSize: 18 }}>Credits: {credits}</Text>
  <Text style={{ color: theme.text, fontSize: 16 }}>Spins: {spins}</Text>
</View>
)}
        <View style={[styles.wheelOuter, { backgroundColor: theme.darkerborder, borderColor: theme.border }]}> 
  <Animated.View style={[styles.wheel, { transform: [{ rotate: interpolated }] }]}>
    {spinnerSlots.map((slot, i) => {
      const angle = (360 / spinnerSlots.length) * i;
      const rad = (angle * Math.PI) / 180;
      const radius = WHEEL_SIZE / 2.5;

      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);

      return (
        <View
          key={i}
          style={[
            styles.segment,
            {
              position: "absolute",
              left: WHEEL_SIZE / 2 + x - 30,
              top: WHEEL_SIZE / 2 + y - 15,
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.segmentText, { color: theme.text }]}>{slot.label}</Text>
        </View>
      );
    })}
  </Animated.View>
</View>

<View style={[styles.pointer, { backgroundColor: theme.darkerborder || theme.border }]} />

      <TouchableOpacity
  style={[styles.spinButton, { backgroundColor: theme.border }]}
  onPress={spin}
  disabled={isSpinning}
>
  <Text style={[styles.spinText, { color: theme.text }]}>
    {isSpinning ? "Spinning..." : "SPIN"}
  </Text>
</TouchableOpacity>

     

      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 60, padding: 30 }}>
  <TouchableOpacity
    style={[styles.closeButton, { flex: 1, borderColor: 'navy', borderWidth: 2, justifyContent: 'center', alignItems: 'center' }]}
    onPress={() => {
      setModalVisible(false);
      resetSpinnerSlots();
      setCredits(null);
      setSpins(0);
      router.push("./GameList");
    }}
  >
    <Text style={styles.closeButtonText}>Close</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.closeButton, { flex: 1, borderColor: 'navy', borderWidth: 2, justifyContent: 'center', alignItems: 'center'  }]}
    onPress={() => {
      setModalVisible(false);
      resetSpinnerSlots();
      setCredits(1000);
      setSpins(0);
    }}
  >
    <Text style={[styles.closeButtonText, {}]}>Restart</Text>
  </TouchableOpacity>
</View>

    <TouchableOpacity
    style={[styles.closeButton, { flex: 1, borderColor: 'navy', borderWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#484848', marginBottom: 40, width: '100%'  }]}
    onPress={() => {
      setConfirmationVisible(true);
    }}
  >
    <Text style={[styles.closeButtonText, {color: 'white'}]}>Lock in Credits</Text>
  </TouchableOpacity>

      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 0,
    backgroundColor: 'grey',
    flex: 1,
  },
  
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 3,
    borderColor: "#444",
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  wheelOuter: {
    width: wheelOuter,
    height: wheelOuter,
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 3,
    borderColor: "#white",
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  segment: {
    width: 60,
    height: 30,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#777",
    borderWidth: 1,
  },
  segmentText: {
    color: "#0ff",
    fontWeight: "bold",
    fontSize: 12,
  },
  pointer: {
  position: "absolute",
  top: "42%",
  right: 10, 
  marginTop: -10,
  width: 0,
  height: 0,
  borderTopWidth: 10,
  borderBottomWidth: 10,
  borderRightWidth: 20,
  borderStyle: "solid",
  backgroundColor: "transparent",
  borderTopColor: "transparent",
  borderBottomColor: "transparent",
  borderRightColor: "#ff0", // Yellow pointer
  zIndex: 10,
},
  spinButton: {
    backgroundColor: "#0f0",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  spinText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },



  resultText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.7)",
  justifyContent: "center",
  alignItems: "center",
},
modalContent: {
  backgroundColor: "#222",
  padding: 24,
  borderRadius: 12,
  width: "80%",
  alignItems: "center",
  borderColor: "#888",
  borderWidth: 2,
},
modalHeader: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#0ff",
  marginBottom: 12,
},
modalDescription: {
  fontSize: 16,
  color: "#fff",
  textAlign: "center",
  marginBottom: 20,
},
closeButton: {
  backgroundColor: "#0f0",
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 8,
},
closeButtonText: {
  color: "#000",
  fontWeight: "bold",
},
input: {
  height: 40,
  borderColor: "#ccc",
  borderWidth: 1,
  paddingHorizontal: 10,
  borderRadius: 6,
  marginBottom: 16,
  width: "100%",
  backgroundColor: "#fff",
},

// header stuff here
  containerH: {
    flex: 1,
    backgroundColor: '#D3D3D3', // light grey
    
  },
  transparentContainer: {
    flex: 1, 
   

  },
   header: {
    height: 120,
    backgroundColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
    width: '100%',
    marginBottom: 20,
  },
  headerLeft: {
  height: 120,
  backgroundColor: '#444',
  flexDirection: 'row',
  alignItems: 'center',      // vertical centering in row
  justifyContent: 'flex-start', // horizontal alignment to left
  paddingHorizontal: 15,
  paddingTop: 30,
},
 headerSmall: {
    height: 80,
    backgroundColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
    
  
  },
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
  menuArrow: {
    fontSize: 60,
    color: '#fff'
  },
  smallMenuArrow: {
    fontSize: 30,
    color: '#fff'
  },
  menuArrowTrent: {
    fontSize: 60,
    alignItems: 'center',
    color: '#fff'
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitleCenter: {
    fontSize: 20,
    color: '#fff',
    alignContent: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18, // makes it circular
    borderWidth: 1,
    borderColor: '#fff',
  },
  sideButton: {
  width: 50,
  alignItems: 'center',
},
sideButton2: {
  width: 50,
  alignItems: 'center',
    color: '#DDDDDD',
},
logoContainer: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 20,
},
iconImage: {
    width: 26,
    height: 26,
  },
smallImage: {
    width: '50%',
    height: '100%',

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
    width: width * 0.95,  // almost full width
    height: '85%', // limit max height so it doesn't cover entire screen
    padding: 20,
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
  divider: {
  height: 4,
  backgroundColor: "#0ff", // or white, gray, etc.
   marginVertical: 5, // spacing above and below the line
  width: '100%',
},


});