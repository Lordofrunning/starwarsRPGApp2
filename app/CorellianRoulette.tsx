import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";


const initialSlots = [
  { label: "x1.1", multiplier: 1.1, description: "you gain 1/5 of your bet!" },
  { label: "x0.6", multiplier: 0.6, description: "you lose 1/5 of your bet!." }, 
  { label: "x1.3", multiplier: 1.3, description: "you gain 1/2 of your bet!" },
  { label: "Zap", effect: "" , description: "take 3 stain and 3 wounds! " },
  { label: "DRAIN", multiplier: 0 , description: "you lose your bet!" },
  { label: "x1.4", multiplier: 1.4, description: "you double your bet!" },
  { label: "x1.0", multiplier: 1.0, description: "you gain nothing" },
  { label: "x0.6", multiplier: 0.6 , description: "you lose half your bet" },
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
  // state stuff? 
  const [credits, setCredits] = useState<number | null>(null); // null = not started
   const [creditInput, setCreditInput] = useState("1000");
   const [currentSlot, setCurrentSlot] = useState<any | null>(null);
const [customDescription, setCustomDescription] = useState<string | null>(null);

const [startModalVisible, setStartModalVisible] = useState(true);
const [spins, setSpins] = useState(0);
// for saving the origonal slot numbers
const [spinnerSlots, setSpinnerSlots] = useState(() =>
  JSON.parse(JSON.stringify(initialSlots)) // deep copy to avoid mutation
);
const resetSpinnerSlots = () => {
  setSpinnerSlots(JSON.parse(JSON.stringify(initialSlots))); // reset to original
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
        <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/GameList')} style={styles.sideButton}>
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

  // THEN apply +0.1x updates
  setSpinnerSlots(prevSlots =>
    prevSlots.map(slot => {
      if (typeof slot.multiplier === "number" && slot.multiplier > 0) {
        const newMultiplier = parseFloat((slot.multiplier + 0.1).toFixed(1));
        return {
          ...slot,
          multiplier: newMultiplier,
          label: `x${newMultiplier.toFixed(1)}`,
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

    {credits !== null && (
  <View style={{ marginBottom: 10 }}>
    <Text style={{ color: "#fff", fontSize: 18 }}>Credits: {credits}</Text>
    <Text style={{ color: "#fff", fontSize: 16 }}>Spins: {spins}</Text>
  </View>
)}
        <View style={styles.wheelOuter}> 
                
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
                },
              ]}
            >
              <Text style={styles.segmentText}>{slot.label}</Text>
            </View>
          );
        })}
      </Animated.View>
        </View>
      <View style={styles.pointer} />

      <TouchableOpacity style={styles.spinButton} onPress={spin} disabled={isSpinning}>
        <Text style={styles.spinText}>{isSpinning ? "Spinning..." : "SPIN"}</Text>
      </TouchableOpacity>

      {resultIndex !== null && !isSpinning && (
        <Text style={styles.resultText}>
          Result: {spinnerSlots[resultIndex].label}
        </Text>
      )}

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
      setCredits(null);
      setSpins(0);
    }}
  >
    <Text style={[styles.closeButtonText, {}]}>Restart</Text>
  </TouchableOpacity>
</View>
      
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
smallImage: {
    width: '50%',
    height: '100%',

  },


});