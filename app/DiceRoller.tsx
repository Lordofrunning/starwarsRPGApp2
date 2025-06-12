import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const diceStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#111',
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
  width: 30,
  height: 30,
  margin: 4,
  borderWidth: 2,
  borderColor: '#555',
  borderRadius: 8,
},

resultIcon: {
  width: 30,
  height: 30,
  margin: 4,
  borderWidth: 1,
  borderColor: '#444',
  borderRadius: 6,
},
});


const greenDie = [
  require('../assets/dice/green/side1_blank.jpg'),
  require('../assets/dice/green/side2_1advantage.jpg'),
  require('../assets/dice/green/side3_2suc.jpg'),
  require('../assets/dice/green/side4_1suc.jpg'),
// bottom of the dice
    require('../assets/dice/green/side5_2advantage.jpg'),
    require('../assets/dice/green/side6_1advantage.jpg'),
    require('../assets/dice/green/side7_1ad_1suc.jpg'),
    require('../assets/dice/green/side8_1suc.jpg'),
];

const advantageDie = [
  require('../assets/dice/blue/side1_blank.jpg'),
  require('../assets/dice/blue/side2_blank.jpg'),
  require('../assets/dice/blue/side3_1suc.jpg'),
  require('../assets/dice/blue/side4_2ad.jpg'),
// bottom of the dice
    require('../assets/dice/blue/side5_1advantage.jpg'),
    require('../assets/dice/blue/side6_1ad_1suc.jpg'),
  
];

const yellowDie = [
     require('../assets/dice/yellow/side7_blank.jpg'),
  
  require('../assets/dice/yellow/side2_1advantage.jpg'),
  require('../assets/dice/yellow/side3_2suc.jpg'),
  require('../assets/dice/yellow/side4_1suc.jpg'),
    require('../assets/dice/yellow/side5_2advantage.jpg'),
    require('../assets/dice/yellow/side6_1ad_1suc.jpg'),
    // bottom of the dice
   require('../assets/dice/yellow/side1_triumph.jpg'),
    require('../assets/dice/yellow/side8_2suc.jpg'),
    require('../assets/dice/yellow/side9_1ad_1suc.jpg'),
  require('../assets/dice/yellow/side10_1ad_1suc.jpg'),
  require('../assets/dice/yellow/side11_2ad.jpg'),
  require('../assets/dice/yellow/side12_1suc.jpg'),

];


const purpleDie = [
  require('../assets/dice/purple/side1_blank.jpg'),
  require('../assets/dice/purple/side2_1thr_1fail.jpg'),
  require('../assets/dice/purple/side3_1thr.jpg'),
  require('../assets/dice/purple/side4_2fail.jpg'),
// bottom of the dice
    require('../assets/dice/purple/side5_2thr.jpg'),
    require('../assets/dice/purple/side6_1thr.jpg'),
    require('../assets/dice/purple/side7_1fail.jpg'),
    require('../assets/dice/purple/side8_1thr.jpg'),
];

const setbackDie = [
  require('../assets/dice/black/side1_blank.jpg'),
  require('../assets/dice/black/side2_blank.jpg'),
  require('../assets/dice/black/side3_1fail.jpg'),
  require('../assets/dice/black/side4_1thr.jpg'),
// bottom of the dice
    require('../assets/dice/black/side5_1fail.jpg'),
    require('../assets/dice/black/side6_1thr.jpg'),
  
];

const redDie = [
    require('../assets/dice/red/side7_blank.jpg'),
  require('../assets/dice/red/side2_1thr.jpg'),
  require('../assets/dice/red/side3_1fail.jpg'),
  require('../assets/dice/red/side4_2thr.jpg'),
    require('../assets/dice/red/side5_1thr_1fail.jpg'),
    require('../assets/dice/red/side6_2fail.jpg'),
    // bottom of the dice
    require('../assets/dice/red/side1_despair.jpg'),
    require('../assets/dice/red/side8_2fail.jpg'),
    require('../assets/dice/red/side9_1thr_1fail.jpg'),
  require('../assets/dice/red/side10_2thr.jpg'),
  require('../assets/dice/red/side11_1fail.jpg'),
  require('../assets/dice/red/side12_1thr.jpg'),

];

const forceDie = [
  require('../assets/dice/force/side1_1ds.jpg'),
  require('../assets/dice/force/side2_2ls.jpg'),
  require('../assets/dice/force/side3_1ls.jpg'),
  require('../assets/dice/force/side4_2ds.jpg'),
    require('../assets/dice/force/side5_1ds.jpg'),
    require('../assets/dice/force/side6_1ds.jpg'),
    // bottom of the dice
    require('../assets/dice/force/side7_1ds.jpg'),
    require('../assets/dice/force/side8_2ls.jpg'),
    require('../assets/dice/force/side9_1ls.jpg'),
  require('../assets/dice/force/side10_2ls.jpg'),
  require('../assets/dice/force/side11_1ds.jpg'),
  require('../assets/dice/force/side12_1ds.jpg'),

];

// Assuming you've already imported diceTypes and declared the types
type DieType = 'green' | 'yellow' | 'purple' | 'red' | 'blue' | 'black' | 'force';

interface DicePoolItem {
  type: DieType;
}

// You'll also need this where your dice arrays are set up
const diceTypes: Record<DieType, any[]> = {
  green: greenDie,
  yellow: yellowDie,
  purple: purpleDie, // Make sure the import matches
  red: redDie,
  blue: advantageDie,
  black: setbackDie,
  force: forceDie,
};

const diceIcons: Record<DieType, any> = {
  green: require('../assets/dice/GreenDiceFull.jpg'),
  yellow: require('../assets/dice/YellowDiceFull.jpg'),
  purple: require('../assets/dice/PurpleDiceFull.jpg'),
  red: require('../assets/dice/RedDiceFull.jpg'),
  blue: require('../assets/dice/BlueDiceFull.jpg'),
  black: require('../assets/dice/BlackDiceFull.jpg'),
  force: require('../assets/dice/ForceDiceFull.jpg'),
};






export default function DiceRoller() {
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
      const randomIndex = Math.floor(Math.random() * sides.length);
      return sides[randomIndex];
    });
    setResults(newResults);
  };

  const clearPool = () => {
    setDicePool([]);
    setResults([]);
  };

  return (
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
          <Image source={diceTypes[die.type][0]} style={diceStyles.poolIcon} />
        </TouchableOpacity>
      ))}
    </View>
  </View>

  <View style={diceStyles.resultsContainer}>
    <Text style={diceStyles.poolLabel}>Results:</Text>
    <View style={diceStyles.resultsWrapper}>
      {results.map((img, i) => (
        <Image key={i} source={img} style={diceStyles.resultIcon} />
      ))}
    </View>
  </View>
  
</ScrollView>

    </View>
  );
}







