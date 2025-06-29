import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

import { Stack, useRouter } from 'expo-router';
import { default as React, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDiceSettings } from './DiceSettingsContext';
import { styles } from './index.styles';
import SettingsDrawer from './SettingsDrawer'; // Adjust path if needed
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
  backgroundColor: '#FBFBFB',//The same off-white as the dice pics
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
  { src: require('../assets/dice/green/side1_blank.jpg'), characters: {} },
  { src: require('../assets/dice/green/side2_1advantage.jpg'), characters: { advantage: 1 } },
  { src: require('../assets/dice/green/side3_2suc.jpg'), characters: { success: 2 } },
  { src: require('../assets/dice/green/side4_1suc.jpg'), characters: { success: 1 } },
  { src: require('../assets/dice/green/side5_2advantage.jpg'), characters: { advantage: 2 } },
  { src: require('../assets/dice/green/side6_1advantage.jpg'), characters: { advantage: 1 } },
  { src: require('../assets/dice/green/side7_1ad_1suc.jpg'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/green/side8_1suc.jpg'), characters: { success: 1 } },
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
  { src: require('../assets/dice/yellow/side7_blank.jpg'), characters: {}},
  { src: require('../assets/dice/yellow/side2_1advantage.jpg'), characters: { advantage: 1 } },
  { src: require('../assets/dice/yellow/side3_2suc.jpg'), characters: { success: 2 } },
  { src: require('../assets/dice/yellow/side4_1suc.jpg'), characters: { success: 1 } },
  { src: require('../assets/dice/yellow/side5_2advantage.jpg'), characters: { advantage: 2 } },
  { src: require('../assets/dice/yellow/side6_1ad_1suc.jpg'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/yellow/side1_triumph.jpg'), characters: { success: 1, triumph: 1 } },  // Triumph assumed
  { src: require('../assets/dice/yellow/side8_2suc.jpg'), characters: { success: 2 } },
  { src: require('../assets/dice/yellow/side9_1ad_1suc.jpg'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/yellow/side10_1ad_1suc.jpg'), characters: { success: 1, advantage: 1 } },
  { src: require('../assets/dice/yellow/side11_2ad.jpg'), characters: { advantage: 2 } },
  { src: require('../assets/dice/yellow/side12_1suc.jpg'), characters: { success: 1 } },
];


const yellowSideBlank = require('../assets/dice/yellow/side7_blank.jpg');
const yellowSideCombo = require('../assets/dice/yellow/side6_1ad_1suc.jpg');
const redSideBlank = require('../assets/dice/red/side7_blank.jpg');
const redSideCombo = require('../assets/dice/red/side5_1thr_1fail.jpg');


const purpleDie = [
  { src: require('../assets/dice/purple/side1_blank.jpg'), characters: {} },
  { src: require('../assets/dice/purple/side2_1thr_1fail.jpg'), characters: { threat: 1, failure: 1 } },
  { src: require('../assets/dice/purple/side3_1thr.jpg'), characters: { threat: 1 } },
  { src: require('../assets/dice/purple/side4_2fail.jpg'), characters: { failure: 2 } },
  { src: require('../assets/dice/purple/side5_2thr.jpg'), characters: { threat: 2 } },
  { src: require('../assets/dice/purple/side6_1thr.jpg'), characters: { threat: 1 } },
  { src: require('../assets/dice/purple/side7_1fail.jpg'), characters: { failure: 1 } },
  { src: require('../assets/dice/purple/side8_1thr.jpg'), characters: { threat: 1 } },
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
  { src: require('../assets/dice/red/side7_blank.jpg'), characters:{} }, 
  { src: require('../assets/dice/red/side2_1thr.jpg'), characters: { threat: 1 } },
  { src: require('../assets/dice/red/side3_1fail.jpg'), characters: { failure: 1 } },
  { src: require('../assets/dice/red/side4_2thr.jpg'), characters: { threat: 2 } },
  { src: require('../assets/dice/red/side5_1thr_1fail.jpg'), characters: { failure: 1, threat: 1 } },
  { src: require('../assets/dice/red/side6_2fail.jpg'), characters: { failure: 2 } },
  { src: require('../assets/dice/red/side1_despair.jpg'), characters: { failure: 1, despair: 1 } },  // Despair assumed
  { src: require('../assets/dice/red/side8_2fail.jpg'), characters: { failure: 2 } },
  { src: require('../assets/dice/red/side9_1thr_1fail.jpg'), characters: { failure: 1, threat: 1 } },
  { src: require('../assets/dice/red/side10_2thr.jpg'), characters: { threat: 2 } },
  { src: require('../assets/dice/red/side11_1fail.jpg'), characters: { failure: 1 } },
  { src: require('../assets/dice/red/side12_1thr.jpg'), characters: { threat: 1 } },
];

const successDie = [
  { src: require('../assets/dice/symbols/Success.png'), characters: { success: 1 } }
];

const advantageDieSymbol = [
  { src: require('../assets/dice/symbols/Advantage.png'), characters: { advantage: 1 } }
];

const forceDie = [
  { src: require('../assets/dice/force/side1_1ds.jpg'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side2_2ls.jpg'), characters: { light: 2 } },
  { src: require('../assets/dice/force/side3_1ls.jpg'), characters: { light: 1 } },
  { src: require('../assets/dice/force/side4_2ds.jpg'), characters: { dark: 2 } },
  { src: require('../assets/dice/force/side5_1ds.jpg'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side6_1ds.jpg'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side7_1ds.jpg'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side8_2ls.jpg'), characters: { light: 2 } },
  { src: require('../assets/dice/force/side9_1ls.jpg'), characters: { light: 1 } },
  { src: require('../assets/dice/force/side10_2ls.jpg'), characters: { light: 2 } },
  { src: require('../assets/dice/force/side11_1ds.jpg'), characters: { dark: 1 } },
  { src: require('../assets/dice/force/side12_1ds.jpg'), characters: { dark: 1 } },
];


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

export default function DiceRoller() {
  const { diceOption1, diceOption2, diceOption3 } = useDiceSettings();
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

if (diceOption1) {
  yellowDie[0] = { src: yellowSideCombo, characters: { success: 1, advantage: 1 } };
  redDie[0] = { src: redSideCombo, characters: { failure: 1, threat: 1 } };
} else {
  yellowDie[0] = { src: yellowSideBlank, characters: {} };
  redDie[0] = { src: redSideBlank, characters: {} };
}

  const addDieToPool = (type: DieType) => {
    setDicePool([...dicePool, { type }]);
  };
  const removeDieFromPool = (indexToRemove: number) => {
  setDicePool(prev => prev.filter((_, index) => index !== indexToRemove));
};

/*/ Load dice pool on mount
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
}, [dicePool]);*/

// stuff for saving dice pools
const [isModalVisible, setIsModalVisible] = useState(false);
const [poolName, setPoolName] = useState('');
const [savedPools, setSavedPools] = useState<Record<string, DicePoolItem[]>>({});
//stuff for deleting dice pools
const [poolToDelete, setPoolToDelete] = useState<string | null>(null);
const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

const [hasLoadedPools, setHasLoadedPools] = useState(false);

useEffect(() => {
  const loadPoolsFromStorage = async () => {
    try {
      const json = await AsyncStorage.getItem('savedDicePools');
      if (json) {
        const parsed = JSON.parse(json);
        setSavedPools(parsed);
      }
    } catch (error) {
      console.error('Failed to load saved pools:', error);
    } finally {
      setHasLoadedPools(true); // ✅ Mark as loaded
    }
  };

  loadPoolsFromStorage();
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
  const pool = savedPools[name];
  if (pool) {
    setDicePool([...pool]);
    setResults([]); // optionally clear previous results
  }
};


  const rollDice = () => {
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

  const clearPool = () => {
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



  //const clearPool = () => {
    //setDicePool([]);
    //setResults([]);
  //};

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

  return (
       <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false}} />
    {/* Header */}
          <View style={styles.headerSmall}>
            <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
              <Text style={styles.smallMenuArrow}>←</Text>
            </TouchableOpacity>
    
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logos/rpg_main_logo.png')}
                style={styles.smallImage}
                resizeMode="contain"
              />
            </View>
    
            <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.sideButton2}>
              <Image source={require('../assets/images/blackSettingsIcon.png')} style={styles.profileImage} />
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
          width: type === 'SuccessSymbol' || type === 'AdvantageSymbol' ? 40 : 50,
          height: type === 'SuccessSymbol' || type === 'AdvantageSymbol' ? 40 : 50,
          marginBottom: 4,
        }}
        />
                        
                    </TouchableOpacity>
                    ))}
                </View>

            </View>

            {/* Buttons section - takes 1/3 of width */}
            <View style={{
                flex: 1,
                justifyContent: 'center',
                marginLeft: 10,
                height: 120,
            }}>
                <View style={{ marginBottom: 10 }}>
                <Button title="Roll Dice" onPress={rollDice} disabled={dicePool.length === 0} />
                </View>
                <View>
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
      source={die.result ? die.result.src : diceTypes[die.type][0].src}
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


