console.log('DiceRoller.tsx file loaded');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
//import { default as React} from 'react';
import { Animated, Button, Image, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import { useDiceSettings } from './DiceSettingsContext';
import { styles } from './index.styles';
//import SettingsDrawer from './SettingsDrawer'; // Adjust path if needed

//const diceSettings = useDiceSettings();
//console.log('DiceRoller: useDiceSettings loaded', diceSettings);
//console.log('DiceRoller: SettingsDrawer type', typeof SettingsDrawer);
const translateX = React.useRef(new Animated.Value(300)).current; // Start off-screen to the right (adjust 300 as needed)
type SettingsDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

const setstyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',  // Dim the background
    //justifyContent: 'center',
    //alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 1,
  },
    drawer: {
    position: 'absolute',
    top: 50,
    //left: 30,
    right: 0,
    width: '90%',
    height: '95%',
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    left: 50,
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 20,
    color: 'blue',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 2,
    //right: 30,
  },
  optionRowSmall: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 0,
    //right: 30,
  },
  optionText: {
    fontSize: 16,
  },
  optionSubText: {
    fontSize: 10,
    alignItems: 'center',
  },
  dieBox: {
    width: 60,
    height: 60,
    backgroundColor: '#222',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dieText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const diceStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },
  tallyContainer:{
    flex: 1,
    paddingTop: 10,
    
  },
  diceSelector: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: 5,
  gap: 1, // optional if you're using React Native 0.71+
},
buttonsContainer: {
    
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 10,
},
dieButton: {
  alignItems: 'center',
  margin: 8,
},

dieIcon: {
  width: 50,  // doubled from 50
  height: 50,
  marginBottom: 4,
},

dieText: {
  color: 'black',
  fontSize: 14,
  textTransform: 'capitalize',
},
  middleScroll: {
  flex: 1,
  marginVertical: 5,
  minHeight: 130
},

poolContainer: {
  marginBottom: 16,
},

poolLabel: {
  textAlign: 'center',
  fontSize: 16,
  color: 'white',
  marginBottom: 6,
},

poolDiceWrapper: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  backgroundColor: '#D3D3D3',//'#FBFBFB'Off-white
},

resultsContainer: {
  marginBottom: 16,
},

resultsWrapper: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
},

poolIcon: {
  width: 50,
  height: 50,
  margin: 4,
  borderWidth: 0,
  borderColor: '#FFFFFF',
  borderRadius: 0,
},

resultIcon: {
  width: 40,
  height: 40,
  margin: 4,
  borderWidth: 0,
  borderColor: '#FFFFFF',
  borderRadius: 0,
},
divider: {
  height: 4,
  backgroundColor: 'black', // or white, gray, etc.
   marginVertical: 5, // spacing above and below the line
  width: '100%',
},
whiteBorder: {
    borderColor: '#888888',//I changed this from white to grey
    borderWidth: 2,
    padding: 2
}

});

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ visible, onClose }) => {
  let diceSettings;
  try {
    diceSettings = useDiceSettings();
    console.log('SettingsDrawer: diceSettings loaded', diceSettings);
  } catch (e) {
    console.error('SettingsDrawer: useDiceSettings error', e);
    // Optionally render a fallback UI or return null
    return <Text style={{ color: 'red' }}>Settings context error</Text>;
  }

  const {
    diceOption1, setDiceOption1,
    diceOption2, setDiceOption2,
    diceOption3, setDiceOption3
  } = diceSettings;

  React.useEffect(() => {
    try{
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,               // Slide into view
        duration: 300,            // Duration in ms
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: 300,             // Slide out to the right
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  } catch (e) {
      console.error('SettingsDrawer: Animated.timing error', e);
    }
  }, [visible, translateX]);
  return (
    <Modal
      visible={visible}
      animationType="none"  // You can use "fade", "slide", or "none"
      transparent={true}
      onRequestClose={onClose}  // Handles hardware back button on Android
    >
      <View style={setstyles.overlay}>
        <Animated.View style={[setstyles.drawer, { transform: [{ translateX }] }]}>
        
          <View style={setstyles.header}>
            <Text style={setstyles.title}>Dice Options</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={setstyles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Buff Upgraded Dice</Text>
            <Switch value={diceOption1} onValueChange={setDiceOption1} />
          </View>
          <View style={setstyles.optionRowSmall}>
            <Text style={setstyles.optionSubText}>Proficiency and Challenge dice are a tiny bit better</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>Replaces blank space with the two normal symbols for that die</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text></Text>
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Seperate Narrative Results</Text>
            <Switch value={diceOption2} onValueChange={setDiceOption2} />
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>Stops subtracting advantage and threat results from each other</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>During crafting, threat and advantage can each be used seperately</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}></Text>
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Add Symbols As Dice</Text>
            <Switch value={diceOption3} onValueChange={setDiceOption3} />
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>Can add success and advantage as automatic results to the pool</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>Some talents, tools, or mods add these to your results</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}></Text>
          </View>
        
      </Animated.View>
      </View>
    </Modal>
  );
};

const symbolImages: Record<string, any> = {
      success: require('../assets/dice/symbols/Success.png'),
      advantage: require('../assets/dice/symbols/Advantage.png'),
      triumph: require('../assets/dice/symbols/Triumph.png'),
      failure: require('../assets/dice/symbols/Failure.png'),
      threat: require('../assets/dice/symbols/Threat.png'),
      despair: require('../assets/dice/symbols/Despair.png'),
      //light: require('../assets/dice/symbols/light.png'),
      //dark: require('../assets/dice/symbols/dark.png'),
    };

const greenDie = [
  { src: require('../assets/dice/green/side1_blank.png'), characters: {} },
  { src: require('../assets/dice/green/side2_1advantage.png'), characters: { advantage: 1 } },
  { src: require('../assets/dice/green/side3_2suc.png'), characters: { success: 2 } },
  { src: require('../assets/dice/green/side4_1suc.png'), characters: { success: 1 } },
  { src: require('../assets/dice/green/side5_2advantage.png'), characters: { advantage: 2 } },
  { src: require('../assets/dice/green/side6_1advantage.png'), characters: { advantage: 1 } },
  { src: require('../assets/dice/green/side7_1ad_1suc.png'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/green/side8_1suc.png'), characters: { success: 1 } },
];

const advantageDie = [
  { src: require('../assets/dice/blue/side1_blank.jpg'), characters: {} },
  { src: require('../assets/dice/blue/side2_blank.jpg'), characters: {} },
  { src: require('../assets/dice/blue/side3_1suc.jpg'), characters: { success: 1 } },
  { src: require('../assets/dice/blue/side4_2ad.jpg'), characters: { advantage: 2 } },
  { src: require('../assets/dice/blue/side5_1advantage.jpg'), characters: { advantage: 1 } },
  { src: require('../assets/dice/blue/side6_1ad_1suc.jpg'), characters: { success: 1, advantage: 1 } },
];

const yellowDie = [
  { src: require('../assets/dice/yellow/side7_blank.png'), characters: {}},
  { src: require('../assets/dice/yellow/side2_1advantage.png'), characters: { advantage: 1 } },
  { src: require('../assets/dice/yellow/side3_2suc.png'), characters: { success: 2 } },
  { src: require('../assets/dice/yellow/side4_1suc.png'), characters: { success: 1 } },
  { src: require('../assets/dice/yellow/side5_2advantage.png'), characters: { advantage: 2 } },
  { src: require('../assets/dice/yellow/side6_1ad_1suc.png'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/yellow/side1_triumph.png'), characters: { success: 1, triumph: 1 } },  // Triumph assumed
  { src: require('../assets/dice/yellow/side8_2suc.png'), characters: { success: 2 } },
  { src: require('../assets/dice/yellow/side9_1ad_1suc.png'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/yellow/side10_1ad_1suc.png'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/yellow/side11_2ad.png'), characters: { advantage: 2 } },
  { src: require('../assets/dice/yellow/side12_1suc.png'), characters: { success: 1 } },
];


const yellowSideBlank = require('../assets/dice/yellow/side7_blank.png');
const yellowSideCombo = require('../assets/dice/yellow/side6_1ad_1suc.png');
const redSideBlank = require('../assets/dice/red/side7_blank.png');
const redSideCombo = require('../assets/dice/red/side5_1thr_1fail.png');


const purpleDie = [
  { src: require('../assets/dice/purple/side1_blank.png'), characters: {} },
  { src: require('../assets/dice/purple/side2_1thr_1fail.png'), characters: { threat: 1, failure: 1 } },
  { src: require('../assets/dice/purple/side3_1thr.png'), characters: { threat: 1 } },
  { src: require('../assets/dice/purple/side4_2fail.png'), characters: { failure: 2 } },
  { src: require('../assets/dice/purple/side5_2thr.png'), characters: { threat: 2 } },
  { src: require('../assets/dice/purple/side6_1thr.png'), characters: { threat: 1 } },
  { src: require('../assets/dice/purple/side7_1fail.png'), characters: { failure: 1 } },
  { src: require('../assets/dice/purple/side8_1thr.png'), characters: { threat: 1 } },
];

const setbackDie = [
  { src: require('../assets/dice/black/side1_blank.jpg'), characters: {} },
  { src: require('../assets/dice/black/side2_blank.jpg'), characters: {} },
  { src: require('../assets/dice/black/side3_1fail.jpg'), characters: { failure: 1 } },
  { src: require('../assets/dice/black/side4_1thr.jpg'), characters: { threat: 1 } },
  { src: require('../assets/dice/black/side5_1fail.jpg'), characters: { failure: 1 } },
  { src: require('../assets/dice/black/side6_1thr.jpg'), characters: { threat: 1 } },
];

const redDie = [
  { src: require('../assets/dice/red/side7_blank.png'), characters:{} }, 
  { src: require('../assets/dice/red/side2_1thr.png'), characters: { threat: 1 } },
  { src: require('../assets/dice/red/side3_1fail.png'), characters: { failure: 1 } },
  { src: require('../assets/dice/red/side4_2thr.png'), characters: { threat: 2 } },
  { src: require('../assets/dice/red/side5_1thr_1fail.png'), characters: { failure: 1, threat: 1 } },
  { src: require('../assets/dice/red/side6_2fail.png'), characters: { failure: 2 } },
  { src: require('../assets/dice/red/side1_despair.png'), characters: { failure: 1, despair: 1 } },  // Despair assumed
  { src: require('../assets/dice/red/side8_2fail.png'), characters: { failure: 2 } },
  { src: require('../assets/dice/red/side9_1thr_1fail.png'), characters: { failure: 1, threat: 1 } },
  { src: require('../assets/dice/red/side10_2thr.png'), characters: { threat: 2 } },
  { src: require('../assets/dice/red/side11_1fail.png'), characters: { failure: 1 } },
  { src: require('../assets/dice/red/side12_1thr.png'), characters: { threat: 1 } },
];

const successDie = [
  { src: require('../assets/dice/symbols/Success.png'), characters: { success: 1 } }
];

const advantageDieSymbol = [
  { src: require('../assets/dice/symbols/Advantage.png'), characters: { advantage: 1 } }
];

const forceDie = [
  { src: require('../assets/dice/force/side1_1ds.png'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side2_2ls.png'), characters: { light: 2 } },
  { src: require('../assets/dice/force/side3_1ls.png'), characters: { light: 1 } },
  { src: require('../assets/dice/force/side4_2ds.png'), characters: { dark: 2 } },
  { src: require('../assets/dice/force/side5_1ds.png'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side6_1ds.png'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side7_1ds.png'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side8_2ls.png'), characters: { light: 2 } },
  { src: require('../assets/dice/force/side9_1ls.png'), characters: { light: 1 } },
  { src: require('../assets/dice/force/side10_2ls.png'), characters: { light: 2 } },
  { src: require('../assets/dice/force/side11_1ds.png'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side12_1ds.png'), characters: { dark: 1 } },
];

console.log('DiceRoller loaded all the dice assets');
// Assuming you've already imported diceTypes and declared the types
type DieType = 'Ability' | 
'Proficiency' | 
'Difficulty' | 
'Challenge' | 
'Advantage' | 
'Setback' |
'SuccessSymbol' |
'AdvantageSymbol' |
'force';

interface DicePoolItem {
  type: DieType;
  result?: { src: any; characters: Record<string, number> }; // optional result
}


// You'll also need this where your dice arrays are set up
const diceTypes: Record<DieType, any[]> = {
  Ability: greenDie,
  Proficiency: yellowDie,
  Difficulty: purpleDie, // Make sure the import matches
  Challenge: redDie,
  Advantage: advantageDie,
  Setback: setbackDie,
  SuccessSymbol: successDie,
  AdvantageSymbol: advantageDieSymbol,
  force: forceDie,
};

const diceBlankTypes: Record<DieType, any[]> = {
  Ability: [greenDie[0].src],
  Proficiency: [yellowSideBlank],
  Difficulty: [purpleDie[0].src],
  Challenge: [redSideBlank],
  Advantage: [advantageDie[0].src],
  Setback: [setbackDie[0].src],
  SuccessSymbol: [successDie[0].src],
  AdvantageSymbol: [advantageDieSymbol[0].src],
  force: [forceDie[0].src],
};

const diceIcons: Record<DieType, any> = {
  Ability: require('../assets/dice/GreenDiceFull.jpg'),
  Proficiency: require('../assets/dice/YellowDiceFull.jpg'),
  Difficulty: require('../assets/dice/PurpleDiceFull.jpg'),
  Challenge: require('../assets/dice/RedDiceFull.jpg'),
  Advantage: require('../assets/dice/BlueDiceFull.jpg'),
  Setback: require('../assets/dice/BlackDiceFull.jpg'),
  SuccessSymbol: require('../assets/dice/symbols/Success.png'),
  AdvantageSymbol: require('../assets/dice/symbols/Advantage.png'),
  force: require('../assets/dice/ForceDiceFull.jpg'),
};
const diceGridOrder: DieType[] = [
  'Ability',
  'Proficiency',
  'Difficulty',
  'Challenge',
  'Advantage',
  'Setback',
  'SuccessSymbol',
  'AdvantageSymbol',
  'force',
];
console.log('DiceRoller set a bunch of constants and types');
// Define the type for your context
export type DiceSettingsContextType = {
  diceOption1: boolean;
  setDiceOption1: (value: boolean) => void;
  diceOption2: boolean;
  setDiceOption2: (value: boolean) => void;
  diceOption3: boolean;
  setDiceOption3: (value: boolean) => void;
};

// Provide default values so TypeScript doesn't complain
const defaultValue: DiceSettingsContextType = {
  diceOption1: false,
  setDiceOption1: () => {},
  diceOption2: false,
  setDiceOption2: () => {},
  diceOption3: false,
  setDiceOption3: () => {},
};

export const DiceSettingsContext = createContext<DiceSettingsContextType>(defaultValue);

export const DiceSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('DiceSettingsProvider mounted');
  const [diceOption1, setDiceOption1State] = useState(false);
  const [diceOption2, setDiceOption2State] = useState(false);
  const [diceOption3, setDiceOption3State] = useState(false);

  // Load stored values on mount
  useEffect(() => {
  const loadSettings = async () => {
    try {
      console.log('Loading dice settings from AsyncStorage...');
      const option1 = await AsyncStorage.getItem('diceOption1');
      const option2 = await AsyncStorage.getItem('diceOption2');
      const option3 = await AsyncStorage.getItem('diceOption3');
      console.log('Loaded:', { option1, option2, option3 });
      if (option1 !== null) setDiceOption1State(option1 === 'true');
      if (option2 !== null) setDiceOption2State(option2 === 'true');
      if (option3 !== null) setDiceOption3State(option3 === 'true');
    } catch (error) {
      console.error('Failed to load dice settings:', error);
    }
  };
  loadSettings();
}, []);



  // Save to AsyncStorage when values change
  const setDiceOption1 = async (value: boolean) => {
  setDiceOption1State(value);
  try {
    await AsyncStorage.setItem('diceOption1', value.toString());
    console.log('Saved diceOption1:', value);
  } catch (error) {
    console.error('Failed to save diceOption1:', error);
  }
};

  const setDiceOption2 = (value: boolean) => {
    setDiceOption2State(value);
    try {
      AsyncStorage.setItem('diceOption2', value.toString());
      console.log('Saved diceOption2:', value);
    } catch (error) {
      console.error('Failed to save diceOption2:', error);
    }
    
  };

  const setDiceOption3 = (value: boolean) => {
    setDiceOption3State(value);
    try {
    AsyncStorage.setItem('diceOption3', value.toString());
    console.log('Saved diceOption3:', value);
    } catch (error) {
      console.error('failed to get dice option 3', error);
    }
  };

  return (
    <DiceSettingsContext.Provider value={{
      diceOption1, setDiceOption1,
      diceOption2, setDiceOption2,
      diceOption3, setDiceOption3
    }}>
      {children}
    </DiceSettingsContext.Provider>
  );
};
// Helper hook
export const useDiceSettings = () => {
  const context = useContext(DiceSettingsContext);
  if (!context) {
    throw new Error('useDiceSettings must be used within a DiceSettingsProvider');
  }
  return context;
};

export default function DiceRoller() {
  useEffect(() => {
    console.log('DiceRoller mounting page');
  }, []);
  const { diceOption1, diceOption2, diceOption3 } = useDiceSettings();//{ diceOption1: false, diceOption2: false, diceOption3: false };//
  const router = useRouter();
  const [dicePool, setDicePool] = useState<DicePoolItem[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
const [tally, setTally] = useState({
  netSuccess: 0,
  netAdvantage: 0,
  triumph: 0,
  despair: 0
});
const [narrative, setNarrative] = useState({
  advantage: 0,
  threat: 0,
});

  const addDieToPool = (type: DieType) => {
    console.log('DiceRoller: addDieToPool', type);
    setDicePool([...dicePool, { type }]);
  };
  const removeDieFromPool = (indexToRemove: number) => {
    console.log('DiceRoller: removeDieFromPool', indexToRemove);
    setDicePool(prev => prev.filter((_, index) => index !== indexToRemove));
  };

if (diceOption1) {
  yellowDie[0] = { src: yellowSideCombo, characters: { success: 1, advantage: 1 } };
  redDie[0] = { src: redSideCombo, characters: { failure: 1, threat: 1 } };
} else {
  yellowDie[0] = { src: yellowSideBlank, characters: {} };
  redDie[0] = { src: redSideBlank, characters: {} };
}
// Load dice pool on mount
useEffect(() => {
  const loadPool = async () => {
    const json = await AsyncStorage.getItem('currentDicePool');
    if (json) setDicePool(JSON.parse(json));
  };
  loadPool();
}, []);

// Save dice pool on change
useEffect(() => {
  AsyncStorage.setItem('currentDicePool', JSON.stringify(dicePool));
}, [dicePool]);

useEffect(() => {
    console.log('DiceRoller more consts and types loading');
  }, []);

// stuff for saving dice pools
const [isModalVisible, setIsModalVisible] = useState(false);
const [poolName, setPoolName] = useState('');
const [savedPools, setSavedPools] = useState<Record<string, DicePoolItem[]>>({});
//stuff for deleting dice pools
const [poolToDelete, setPoolToDelete] = useState<string | null>(null);
const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

const [hasLoadedPools, setHasLoadedPools] = useState(false);

useEffect(() => {
    console.log('DiceRoller page mounted');
  }, []);

useEffect(() => {
  const loadPoolsFromStorage = async () => {
    try {
      const json = await AsyncStorage.getItem('savedDicePools');
      if (json) {
        let parsed;
        try {
          parsed = JSON.parse(json);
        } catch (e) {
          console.error('JSON.parse error for savedDicePools:', e, json);
          return;
        }
        if (parsed && typeof parsed === 'object') {
          setSavedPools(parsed);
        } else {
          console.error('Parsed savedPools is not an object:', parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load saved pools:', error);
    } finally {
      setHasLoadedPools(true);
    }
  };
  loadPoolsFromStorage();
}, []);
useEffect(() => {
    console.log('DiceRoller loaded async storage');
  }, []);
useEffect(() => {
  if (!hasLoadedPools) return; // ⛔ Don't save yet
  const savePoolsToStorage = async () => {
    try {
      const json = JSON.stringify(savedPools);
      await AsyncStorage.setItem('savedDicePools', json);
    } catch (error) {
      console.error('Failed to save pools:', error);
    }
  };

  savePoolsToStorage();
}, [savedPools, hasLoadedPools]);

const saveCurrentPool = () => {
  setIsModalVisible(true);
};
const loadPool = (name: string) => {
  console.log('DiceRoller: loadPool', name);
  const pool = savedPools[name];
  if (pool) {
    setDicePool([...pool]);
    setResults([]); // optionally clear previous results
  }
};
useEffect(() => {
    console.log('DiceRoller loaded pools, rolling dice');
  }, []);

  const rollDice = () => {
    console.log('DiceRoller: rollDice called');
    const newPool = dicePool.map(die => {
    const sides = diceTypes[die.type];
    const randomIndex = Math.floor(Math.random() * sides.length);
    const result = sides[randomIndex];
    return { ...die, result };  // Attach result to die
  });
  setDicePool(newPool);  // Update pool with results

  // Also update the separate results array if you want to keep it (optional)
  setResults(newPool.map(die => die.result));

  // Tally logic
  let success = 0;
  let advantage = 0;
  let triumph = 0;
  let failure = 0;
  let threat = 0;
  let despair = 0;

  newPool.forEach(die => {
    const chars = die.result?.characters || {};
    success += chars.success || 0;
    advantage += chars.advantage || 0;
    triumph += chars.triumph || 0;
    failure += chars.failure || 0;
    threat += chars.threat || 0;
    despair += chars.despair || 0;
  });
  //if(diceOption2){}
  const netSuccess = success - failure;
  const netAdvantage = advantage - threat;

  setTally({
    netSuccess,
    netAdvantage,
    triumph,
    despair
  });
  setNarrative({
    advantage,
    threat,
  });
};
useEffect(() => {
    console.log('DiceRoller rolled dice');
  }, []);

  const clearPool = () => {
    console.log('DiceRoller: clearPool');
    setDicePool([]);
    setResults([]);
    setTally({
    netSuccess: 0,
    netAdvantage: 0,
    triumph: 0,
    despair: 0
  });
  setNarrative({
    advantage: 0,
    threat: 0,
  });
};

    const [d100Result, setD100Result] = useState<number | null>(null);

const rollD100 = () => {
  const result = Math.floor(Math.random() * 100) + 1;
  setD100Result(result);
};

  const getDiceGridOrder = () => {
    const baseOrder: DieType[] = [
      'Ability',
      'Proficiency',
      'Difficulty',
      'Challenge',
      'Advantage',
      'Setback',
    ];
    
    if (diceOption3) {
      baseOrder.push('SuccessSymbol', 'AdvantageSymbol');
    }else{
      baseOrder.push('force');
    }
    return baseOrder;
  };
  useEffect(() => {
    console.log('DiceRoller creating views');
  }, []);
  return (
       <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false}} />
    {/* Header */}
          <View style={styles.headerSmall}>
            <TouchableOpacity onPress={() => router.back()} 
            style={styles.sideButton2}>{/*style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}*/}
              <Text style={styles.menuArrowMed}>←</Text>
            </TouchableOpacity>
    
            {/*<View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logos/rpg_main_logo.png')}
                style={styles.smallImage}
                resizeMode="contain"
              />
            </View>//Just put this textvv here instead of the image ^^*/}
            <Text style={styles.redHeader}>EOTE DICE</Text>
            {/* Settings button */}
    
            <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.sideButton2}>
              <Image source={require('../assets/images/TransparentWhiteSettingsIcon.png')} style={styles.profileImageNC} />
            </TouchableOpacity>
            {/* Settings drawer */}
            <SettingsDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
          </View>
{/* // all the code for the top dice, roll buttons, clear, ect */}
         <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            {/* Dice section - takes 2/3 of width */}
            <View style={{ flex: 2 }}>
                {/* Dice grid 2x3 */}
                <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginBottom: 8,
                }}>
                {getDiceGridOrder().map((type) => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => addDieToPool(type)}
                        style={{
                        width: (type === 'SuccessSymbol' || type === 'AdvantageSymbol') ? '25%' : '25%',    // ~3 per row
                        aspectRatio: 1,
                        marginBottom: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <Image
                            source={diceIcons[type]}
                            style={{
          width: (type === 'SuccessSymbol' || type === 'AdvantageSymbol') ? 40 : 50,
          height: (type === 'SuccessSymbol' || type === 'AdvantageSymbol') ? 40 : 50,
          marginBottom: 4,
        }}
        />
                        
                    </TouchableOpacity>
                    ))}
                </View>

            </View>

            {/* Buttons section - takes 1/3 of width */}
            <View
  style={{
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    height: 160, // Increased slightly to fit 3 rows
  }}
>
   {/* D100 Roller Row */}
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
    {/* D100 Display */}
    <View
      style={{
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#222',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
      }}
    >
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        {d100Result !== null ? d100Result : 'D100'}
      </Text>
    </View>

    {/* Roll D100 Button */}
    <View style={{ flex: 1 }}>
      <Button title="Roll D100" onPress={rollD100} color="skyblue" />
    </View>
  </View>

  {/* Roll Dice Button */}
  <View style={{ marginBottom: 10 }}>
    <Button title="Roll Dice" onPress={rollDice} disabled={dicePool.length === 0} />
  </View>

  {/* Clear Button */}
  <View style={{ marginBottom: 10 }}>
    <Button title="Clear" onPress={clearPool} color="gray" />
  </View>

 

</View>
    </View>
        <View style={diceStyles.divider}>

        </View>

      <ScrollView style={diceStyles.middleScroll}>
        {/* Dice to be rolled */}
  <View style={diceStyles.poolContainer}>
   
    <Text style={diceStyles.poolLabel}>Dice Pool:</Text>
    <View style={diceStyles.poolDiceWrapper}>
      {dicePool.map((die, index) => (
  <TouchableOpacity key={index} onPress={() => removeDieFromPool(index)}>
    <Image
      source={die.result ? die.result.src : diceBlankTypes[die.type][0]}
      style={diceStyles.poolIcon}
    />
  </TouchableOpacity>
))}
    </View>
  </View>
  

  <View style={{ flexDirection: 'row', padding: 10, flexWrap: 'nowrap' }}>
  {/* Left side (2/3 width) - your dice pool or other content */}
  <View style={{ flex: 2, paddingRight: 10 }}>
    {/* Add results here with symbols?? */}
    {/*<Text>Results:</Text>*/}
    <View style={{ marginTop: 8 }}>
  {results.length > 0 && (
    <Text style={{ fontWeight: 'bold', marginBottom: 4, color: '#333' }}>Results:</Text>
  )}
  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
    {(() => {
      // Sum up all symbols across all dice
      const totalSymbols: Record<string, number> = {};
      results.forEach(result => {
        if (!result) return;
        const chars = result.characters || {};
        Object.entries(chars).forEach(([symbol, count]) => {
          if (typeof count === 'number') {
            totalSymbols[symbol] = (totalSymbols[symbol] || 0) + count;
          }
        });
      });

      // Calculate net values
      const netSuccess = (totalSymbols.success || 0) - (totalSymbols.failure || 0);
      const netAdvantage = (totalSymbols.advantage || 0) - (totalSymbols.threat || 0);
      const triumph = totalSymbols.triumph || 0;
      const despair = totalSymbols.despair || 0;

      // Prepare display order and net symbol logic
      const display: { symbol: string; count: number }[] = [];

      if (netSuccess > 0) {
        display.push({ symbol: 'success', count: netSuccess });
      } else if (netSuccess < 0) {
        display.push({ symbol: 'failure', count: Math.abs(netSuccess) });
      }
      if(diceOption2){
        display.push({ symbol: 'advantage', count: totalSymbols.advantage });
        display.push({ symbol: 'threat', count: totalSymbols.threat });
      }else{
        if (netAdvantage > 0) {
          display.push({ symbol: 'advantage', count: netAdvantage });
        } else if (netAdvantage < 0) {
          display.push({ symbol: 'threat', count: Math.abs(netAdvantage) });
        }
      }

      if (triumph > 0) {
        display.push({ symbol: 'triumph', count: triumph });
      }
      if (despair > 0) {
        display.push({ symbol: 'despair', count: despair });
      }

      // Render the net symbols
      return display.map(({ symbol, count }) =>
        symbolImages[symbol]
          ? Array.from({ length: count }).map((_, i) => (
              <Image
                key={symbol + i}
                source={symbolImages[symbol]}
                style={{ width: 32, height: 32, marginRight: 2 }}
                resizeMode="contain"
              />
            ))
          : null
      );
    })()}
  </View>
</View>
  </View>

  {/* Right side (1/3 width) - tally container */}
  <View style={{ flex: 1, backgroundColor: '#222', padding: 10, borderRadius: 8 }}>
    <Text style={{ fontWeight: 'bold', color: '#fff', marginBottom: 6 }}>Tally:</Text>
    <View style={diceStyles.whiteBorder}> 
        <Text style={{ color: '#eee' }}>Successes: {tally.netSuccess >= 0 ? tally.netSuccess : 0}</Text>
        <Text style={{ color: '#eee' }}>Failures: {tally.netSuccess < 0 ? Math.abs(tally.netSuccess) : 0}</Text>
    </View>
    <View style={diceStyles.whiteBorder}> 
        <Text style={{ color: '#eee' }}>
          Advantages: {diceOption2 ? 
        (narrative.advantage) : 
        (tally.netAdvantage >= 0 ? tally.netAdvantage : 0)}
        </Text>
        <Text style={{ color: '#eee' }}>
          Threats: {diceOption2 ? 
          (narrative.threat) : 
          (tally.netAdvantage < 0 ? Math.abs(tally.netAdvantage) : 0)}
          </Text>
    </View>
    <View style={diceStyles.whiteBorder}> 
        <Text style={{ color: '#eee' }}>Triumphs: {tally.triumph}</Text>
        <Text style={{ color: '#eee' }}>Despairs: {tally.despair}</Text>
    </View>
  </View>
</View>
</ScrollView>

        {/* saved dice pools display here, above the save pool button */}
    {isModalVisible && (
  <View style={{
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }}>
    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
      <Text style={{ marginBottom: 10 }}>Enter a name for the dice pool:</Text>
      <TextInput
        placeholder="e.g. Blaster Squad"
        value={poolName}
        onChangeText={setPoolName}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />
      <Button
        title="Save"
        onPress={() => {
          if (poolName.trim()) {
            setSavedPools(prev => ({ ...prev, [poolName.trim()]: [...dicePool] }));
            setPoolName('');
            setIsModalVisible(false);
          }
        }}
      />
      <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="gray" />
    </View>
  </View>
)}
    {/* // deleting the dice pools modal here */}
    {deleteConfirmVisible && poolToDelete && (
  <View style={{
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }}>
    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
      <Text style={{ marginBottom: 10 }}>
        Delete "{poolToDelete}"?
      </Text>
      <Button
        title="Delete"
        color="red"
        onPress={() => {
          const updated = { ...savedPools };
          delete updated[poolToDelete];
          setSavedPools(updated);
          setDeleteConfirmVisible(false);
          setPoolToDelete(null);
        }}
      />
      <Button title="Cancel" onPress={() => {
        setDeleteConfirmVisible(false);
        setPoolToDelete(null);
      }} color="gray" />
    </View>
  </View>
)}

   <View style={{ flex: 1 }}>
  {/* Saved Dice Pools in a scrollable grid */}
  <ScrollView contentContainerStyle={{ padding: 2 }}>
    <Text style={{ color: 'white', marginBottom: 2 }}>Saved Dice Pools:</Text>
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {Object.keys(savedPools).map((name) => (
        <TouchableOpacity
  key={name}
  onPress={() => setDicePool(savedPools[name])}
  onLongPress={() => {
    setPoolToDelete(name);
    setDeleteConfirmVisible(true);
  }}
  delayLongPress={500}
  style={{
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#333',
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777',
  }}
>
  <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>{name}</Text>
</TouchableOpacity>
      ))}
    </View>
  </ScrollView>

  {/* Fixed Save Button */}
  <View style={{
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 15
  }}>
    <Button title="Save Dice Pool" onPress={saveCurrentPool} />
  </View>
</View>


    
    </View>
    </View>
  );
}


