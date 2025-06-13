import { Stack, useRouter } from 'expo-router';
import { default as React, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './index.styles';
const diceStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
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
  margin: 6,
},

dieIcon: {
  width: 50,  // doubled from 50
  height: 50,
  marginBottom: 4,
},

dieText: {
  color: 'white',
  fontSize: 14,
  textTransform: 'capitalize',
},
  middleScroll: {
  flex: 1,
  marginVertical: 10,
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
  width: 40,
  height: 40,
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
});


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
  { src: require('../assets/dice/yellow/side7_blank.jpg'), characters: {} },
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
  { src: require('../assets/dice/red/side7_blank.jpg'), characters: {} },
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
type DieType = 'Ability' | 'Proficiency' | 'Difficulty' | 'Challenge' | 'Advantage' | 'Setback' | 'force';

interface DicePoolItem {
  type: DieType;
}

// You'll also need this where your dice arrays are set up
const diceTypes: Record<DieType, any[]> = {
  Ability: greenDie,
  Proficiency: yellowDie,
  Difficulty: purpleDie, // Make sure the import matches
  Challenge: redDie,
  Advantage: advantageDie,
  Setback: setbackDie,
  force: forceDie,
};

const diceIcons: Record<DieType, any> = {
  Ability: require('../assets/dice/GreenDiceFull.jpg'),
  Proficiency: require('../assets/dice/YellowDiceFull.jpg'),
  Difficulty: require('../assets/dice/PurpleDiceFull.jpg'),
  Challenge: require('../assets/dice/RedDiceFull.jpg'),
  Advantage: require('../assets/dice/BlueDiceFull.jpg'),
  Setback: require('../assets/dice/BlackDiceFull.jpg'),
  force: require('../assets/dice/ForceDiceFull.jpg'),
};






export default function DiceRoller() {
  const router = useRouter();
  const [dicePool, setDicePool] = useState<DicePoolItem[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const addDieToPool = (type: DieType) => {
    setDicePool([...dicePool, { type }]);
  };
  const removeDieFromPool = (indexToRemove: number) => {
  setDicePool(prev => prev.filter((_, index) => index !== indexToRemove));
};

  const rollDice = () => {
    const newResults = dicePool.map(die => {
      const sides = diceTypes[die.type];
      const randomIndex = Math.floor(Math.random() * sides.length);//I question how this works correctly
      return sides[randomIndex];
    });
    setResults(newResults);
  };

  const clearPool = () => {
    setDicePool([]);
    setResults([]);
  };

  return (
       <View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
      <View style={styles.container}>
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
    
            <TouchableOpacity onPress={() => console.log('Profile pressed')} style={styles.sideButton}>
              <Image
                source={require('../assets/images/empty_profile_pic.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
    <View style={diceStyles.container}>
      <View style={diceStyles.diceSelector}>
  {Object.keys(diceTypes).map(type => (
    <TouchableOpacity key={type} onPress={() => addDieToPool(type as DieType)} style={diceStyles.dieButton}>
      <Image source={diceIcons[type as DieType]} style={diceStyles.dieIcon} />
      <Text style={diceStyles.dieText}>{type}</Text>
    </TouchableOpacity>
  ))}
</View>

 
  <View style={diceStyles.buttonsContainer}>
    <Button title="Roll Dice" onPress={rollDice} disabled={dicePool.length === 0} />
    <Button title="Clear" onPress={clearPool} color="gray" />
  </View>


      <ScrollView style={diceStyles.middleScroll}>
  <View style={diceStyles.poolContainer}>
    <Text style={diceStyles.poolLabel}>Dice Pool:</Text>
    <View style={diceStyles.poolDiceWrapper}>
      {dicePool.map((die, index) => (
        <TouchableOpacity key={index} onPress={() => removeDieFromPool(index)}>
          <Image source={diceTypes[die.type][0].src} style={diceStyles.poolIcon} />
        </TouchableOpacity>
      ))}
    </View>
  </View>

  <View style={diceStyles.resultsContainer}>
    <Text style={diceStyles.poolLabel}>Results:</Text>
    <View style={diceStyles.resultsWrapper}>
      {results.map((img, i) => (
        <Image key={i} source={img.src} style={diceStyles.resultIcon} />
      ))}
    </View>
  </View>
  
</ScrollView>

    </View>
    </View>
    </View>
  );
}







