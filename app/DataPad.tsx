import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';

import { styles } from './index.styles';

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemeName, useTheme } from './ThemeContext';

export const sectionStyles = StyleSheet.create({
  headingMain: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#944',
    marginBottom: 0,
  },
  headingSub: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#944',
    marginBottom: 8,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#39d',
    marginTop: 12,
    marginBottom: 0,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
  },
  textSmall: {
    color: '#fff',
    fontSize: 14,
    marginTop: 0,
    marginBottom: 0,
  },
  textDiff: {
    color: '#759',
    fontSize: 14,
    marginBottom: 0,
    marginTop: 0,
  },
  textBold: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
  },
  symbol: {
    width: 14,
    height: 14,
  },
});

export const tableStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    color: '#fff',
  },
  costCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff',
  },
  resultCell: {
    flex: 3,
    paddingLeft: 8,
    color: '#fff',
  },
  iconStyles: {
    width: 18,           // small enough to fit within a line of text
    height: 18,
    marginHorizontal: 3, // space around the icon so it doesn’t crowd the text
    resizeMode: 'contain',
    tintColor: undefined // optional: set to a color if your icon is a tintable vector
  },
  blue: { color: 'blue', fontWeight: 'bold' },
  black: { color: 'black', fontWeight: 'bold' },
});
const holoStyles = StyleSheet.create({
  holoWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
    width: '70%',
  },
  blurContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  holoGradient: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export const symbolImages = {
  success: require('../assets/dice/DiceSymbolsWhite/Success.png'),
  advantage: require('../assets/dice/DiceSymbolsWhite/Advantage.png'),
  threat: require('../assets/dice/DiceSymbolsWhite/Threat.png'),
  triumph: require('../assets/dice/DiceSymbolsWhite/Triumph.png'),
  failure: require('../assets/dice/DiceSymbolsWhite/Failure.png'),
  despair: require('../assets/dice/DiceSymbolsWhite/Despair.png'),
  purple: require('../assets/dice/TransparentDice/PurpleDie.png'),
  blue: require('../assets/dice/TransparentDice/BlueDie.jpg'),
  black: require('../assets/dice/TransparentDice/BlackDie.jpg'),
  // ...add others as needed
};

const screenWidth = Dimensions.get('window').width;
const popupWidth = screenWidth * 0.75;
const { width } = Dimensions.get('window');
const router = useRouter();

const CombatManeuvers = () => {
  const [showExtra, setShowExtra] = useState(false);
  return(
  <View style={{ backgroundColor: 'transparent', width: popupWidth }}>
    <Text style={sectionStyles.headingMain}>Combat Maneuvers</Text>

    {/* Aim */}
    <Text style={sectionStyles.heading}>Aim</Text>
    <Text style={sectionStyles.text}>
      Add <Text style={tableStyles.blue}>🟦</Text> to next combat check, or
      <Text style={tableStyles.blue}>🟦</Text>
      <Text style={tableStyles.blue}>🟦</Text>
      if character spends 2 consecutive maneuvers aiming. Or target a specific part of target or item carried, add
      <Text style={tableStyles.black}>⬛</Text>
      <Text style={tableStyles.black}>⬛</Text> to next check,
      <Text style={tableStyles.black}>⬛</Text> if character spends 2 consecutive maneuvers aiming.
    </Text>

    {/* Assist */}
    <Text style={sectionStyles.heading}>Assist</Text>
    <Text style={sectionStyles.text}>
      Add <Text style={tableStyles.blue}>🟦</Text> to an engaged ally’s next check.
    </Text>

    {/* Guarded Stance */}
    <Text style={sectionStyles.heading}>Guarded Stance</Text>
    <Text style={sectionStyles.text}>
      Add <Text style={tableStyles.black}>⬛</Text> 
      to any combat check the character makes until the end of his next turn, but gain +1 melee defense.
    </Text>

    {/* Take Cover */}
    <Text style={sectionStyles.heading}>Take Cover</Text>
    <Text style={sectionStyles.text}>
      Take cover in doorways or behind objects to gain a ranged defense of 1 (some cover may grant a ranged defense higher than 1 if particularly sturdy).
    </Text>

    {/* Manage Gear */}
    <Text style={sectionStyles.heading}>Manage Gear</Text>
    <Text style={sectionStyles.text}>
      Draw, holster, ready, or load a weapon, or draw something from storage or put it away.
    </Text>

    {/* Interact with Environment */}
    <Text style={sectionStyles.heading}>Interact with Environment</Text>
    <Text style={sectionStyles.text}>
      Move a large item. Open or close a door. Enteract with a control panel.
    </Text>
    

    {/* Mount / Dismount */}
    <Text style={sectionStyles.heading}>Mount / Dismount</Text>
    <Text style={sectionStyles.text}>
      Mounting a vehicle or gunnery station, or mounting a domesticated creature (successfully mounting an animal requires an Average
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      Survival check).
    </Text>

    {/* Move */}
    <Text style={sectionStyles.heading}>Move</Text>
    <Text style={sectionStyles.text}>
      Change range increment.
      {'\n'}Engage or Disengage with an opponent.
      {'\n'}Move within Short range.
    </Text>
    {/* Expandable/Dropdown Section */}
      <TouchableOpacity onPress={() => setShowExtra(!showExtra)}>
        <Text style={[sectionStyles.text, { color: '#39d', textDecorationLine: 'underline' }]}>
          {showExtra ? 'Hide Move Cost Table ▲' : 'Move Maneuver Cost Table ▼'}
        </Text>
      </TouchableOpacity>
      {showExtra && <MoveCostTable />}

    {/* Move to/from Prone */}
    <Text style={sectionStyles.heading}>Move to/from Prone</Text>
    <Text style={sectionStyles.text}>
      Dropping prone allows a character to add <Text style={tableStyles.black}>⬛</Text> to all ranged attacks made against him, although he must also add 
      <Text style={tableStyles.blue}>🟦</Text> to all melee attacks made against him.
    </Text>

    {/* Preparation */}
    <Text style={sectionStyles.heading}>Preparation</Text>
    <Text style={sectionStyles.text}>
      Some actions require additional preparation to be used. This maneuver is used to confer a bonus, offset a penalty, or fulfill a requirement.
    </Text>
  </View>
)};

const CombatActions = () => {
  const [showExtra, setShowExtra] = useState(false);
  return(
  <View style={{ backgroundColor: 'transparent', width: popupWidth }}>
    <Text style={sectionStyles.headingMain}>Combat Actions</Text>

    {/* Make Combat Check */}
    <Text style={sectionStyles.heading}>Melee Combat Check</Text>
    <Text style={sectionStyles.text}>
      Use the brawl skill for punching, grappling, and other unarmed combat. Use melee for any close range weapon like a sword, axe, or vibroblade.
    </Text>
    <Text style={sectionStyles.textDiff}>
      Average diffuculty (
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      )
    </Text>
    <Text style={sectionStyles.heading}>Ranged Combat Check</Text>
    <Text style={sectionStyles.text}>
      Use one of the 3 ranged comabat skill types based on the weapon. 
      Difficulty increases with distance from the target and also with the size of your gun when engaged with the target. 
      Using bigger guns when engaged with a target is more difficult, and using gunnery is impossible against and engaged target. 
    </Text>
    <Text style={sectionStyles.textDiff}>
      {'  '}-Ranged checks while engaged-{'\n'}
      Ranged light:     {' '}average(
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ){'\n'}
      Ranged heavy:        {' '}hard(
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ){'\n'}
      {'  '}-All types at range-{'\n'}
      Short range:          {'   '}easy(
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />){'\n'}
      Medium range:  average(
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ){'\n'}
      Long range:           {'   '}hard(
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ){'\n'}
      Extreme range: daunting(
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      )
    </Text>
    {/* Expandable/Dropdown Section */}
      <TouchableOpacity onPress={() => setShowExtra(!showExtra)}>
        <Text style={[sectionStyles.text, { color: '#39d', textDecorationLine: 'underline' }]}>
          {showExtra ? 'Hide Advantage Options Table ▲' : 'Spending Advantage Options ▼'}
        </Text>
      </TouchableOpacity>
      {showExtra && <CombatAdvantageTable />}

    {/* Exchange for a Maneuver */}
    <Text style={sectionStyles.heading}>Exchange for a Maneuver</Text>
    <Text style={sectionStyles.text}>
      A character can exchange his action for an additional maneuver during his turn, 
      but still may not perform more than two maneuvers during his turn, no matter how he gained access to them.
    </Text>

    {/* Activate Ability */}
    <Text style={sectionStyles.heading}>Activate Ability</Text>
    <Text style={sectionStyles.text}>
      Certain abilities or talents require an action to activate.
    </Text>

    {/* Activate Force Power */}
    <Text style={sectionStyles.heading}>Activate Force Power</Text>
    <Text style={sectionStyles.text}>
      Most Force powers require an action to activate.
    </Text>

    {/* Make Skill Check */}
    <Text style={sectionStyles.heading}>Make Skill Check</Text>
    <Text style={sectionStyles.text}>
      Perform a skill check within the structured time of combat. 
      This could include Mechanics, Computers, Medicine, or other checks. 
      The GM may determine that certain skill checks require multiple actions or cannot be performed while the encounter continues.
    </Text>
  </View>
  )
};

const MoveCostTable = () => {
  return(
    <ScrollView style={tableStyles.container}>
      {/* Header Row */}
      <View style={tableStyles.headerRow}>
        <Text style={sectionStyles.textDiff}>
          Engaged: 1 to Short (Disengage) {'\n'}
          Short Range: 1 to Engaged / Medium {'\n'}
          Medium Range: 1 to Short / 2 to Long {'\n'}
          Long Range: 2 to Medium / Extreme {'\n'}
          Extreme Range: 2 to Long
        </Text>
      </View>
    </ScrollView>
  );
};

const CombatAdvantageTable = () => {
  return (
    <ScrollView style={tableStyles.container}>
      {/* Header Row */}
      <View style={tableStyles.headerRow}>
        <Text style={tableStyles.headerCell}>Cost</Text>
        <Text style={tableStyles.headerCell}>Result Options</Text>
      </View>

      {/* Row 1 – 1 Advantage or Triumph */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} /> {'or'}{' '}
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Recover 1 strain (may be selected more than once).</Text>
          <Text style={sectionStyles.text}>• Add <Text style={tableStyles.blue}>🟦</Text> to the next allied character’s check.</Text>
          <Text style={sectionStyles.text}>• Notice a single important point in the ongoing conflict.</Text>
          <Text style={sectionStyles.text}>• Inflict a Critical Hit that bypasses soak (<Image source={symbolImages.triumph} style={tableStyles.iconStyles} /> cost may vary).</Text>
          <Text style={sectionStyles.text}>• Activate a weapon quality (<Image source={symbolImages.triumph} style={tableStyles.iconStyles} /> cost may vary).</Text>
        </View>
      </View>

      {/* Row 2 – 2 Advantage or Triumph */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} /> {'or'}{' '}
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Perform one free maneuver (still bound by 2‑maneuver limit).</Text>
          <Text style={sectionStyles.text}>• Add <Text style={tableStyles.black}>⬛</Text> to the targeted character’s next check.</Text>
          <Text style={sectionStyles.text}>• Add <Text style={tableStyles.blue}>🟦</Text> to any allied character’s next check (including the active character).</Text>
        </View>
      </View>

      {/* Row 3 – 3 Advantage or Triumph */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} /> {'or'}{' '}
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Negate the target’s defensive bonuses until end of the round.</Text>
          <Text style={sectionStyles.text}>• Ignore penalizing environmental conditions until end of next turn.</Text>
          <Text style={sectionStyles.text}>• Temporarily disable a specific component or item instead of dealing wounds/strain.</Text>
          <Text style={sectionStyles.text}>• Gain +1 melee or ranged defense until end of next turn.</Text>
          <Text style={sectionStyles.text}>• Force the target to drop a melee or ranged weapon it is wielding.</Text>
        </View>
      </View>

      {/* Row 4 – Triumph */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Upgrade the difficulty of the targeted character’s next check.</Text>
          <Text style={sectionStyles.text}>• Upgrade any allied character’s next check, including the active character.</Text>
          <Text style={sectionStyles.text}>• Do something vital to the tide of battle (e.g., seal nearby blast doors).</Text>
        </View>
      </View>

      {/* Row 5 – 2 Triumph */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• When dealing damage, the attack destroys a piece of equipment the target is using.</Text>
        </View>
      </View>
      {/* Row 6 – 1 Threat or Despair */}
      <View style={tableStyles.row}> {/* alternate background */}
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.threat} style={tableStyles.iconStyles} />
          {' '}
          or{' '}
          <Image source={symbolImages.despair} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• The active character suffers 1 strain (may be selected more than once).</Text>
          <Text style={sectionStyles.text}>• The active character loses the benefit of a prior maneuver (e.g., taking cover) until he performs the maneuver again.</Text>
        </View>
      </View>

      {/* Row 7 – 2 Threat or Despair */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.threat} style={tableStyles.iconStyles} />
          <Image source={symbolImages.threat} style={tableStyles.iconStyles} />{' '}
          or{' '}
          <Image source={symbolImages.despair} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• An opponent may immediately perform 1 free maneuver in response to the active character’s check.</Text>
          <Text style={sectionStyles.text}>• Add <Text style={tableStyles.blue}>🟦</Text> to the targeted character’s next check.</Text>
          <Text style={sectionStyles.text}>• The active or an allied character suffers <Text style={tableStyles.black}>⬛</Text> on his next action.</Text>
        </View>
      </View>

      {/* Row 8 – 3 Threat or Despair */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.threat} style={tableStyles.iconStyles} />
          <Image source={symbolImages.threat} style={tableStyles.iconStyles} />
          <Image source={symbolImages.threat} style={tableStyles.iconStyles} />{' '}
          or{' '}
          <Image source={symbolImages.despair} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• The active character falls prone.</Text>
          <Text style={sectionStyles.text}>• The active character grants the enemy a significant advantage in the conflict (e.g., blasting controls to a bridge he needed).</Text>
        </View>
      </View>

      {/* Row 9 – Despair */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.despair} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• The character’s ranged weapon immediately runs out of ammunition for the encounter.</Text>
          <Text style={sectionStyles.text}>• Upgrade the difficulty of an allied character’s next check (including the active character).</Text>
          <Text style={sectionStyles.text}>• The tool or melee weapon the character is using becomes damaged one step.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

/*  Critical Injury (Characters) – d100 table
    - Follows the same styling conventions as your other tables.
    - Uses tableStyles (container, headerRow, headerCell, row, rowAlt, costCell, resultCell, iconStyles)
    - Uses sectionStyles.text for bullet text
    - Uses symbolImages.purple (difficulty die), symbolImages.black (setback), symbolImages.blue (boost)
    - Severity column is expressed via inline images: Easy = 1 purple, Average = 2 purple, Hard = 3 purple, Daunting = 4 purple.
    - Group shading: every other severity block alternates rowAlt for readability (Easy, Average, Hard, Daunting)
*/
const StarshipCritChart = () => (
  <ScrollView style={tableStyles.container}>
    {/* Header */}
    <View style={tableStyles.headerRow}>
      <Text style={tableStyles.headerCell}>d100</Text>
      <Text style={tableStyles.headerCell}>Severity</Text>
      <Text style={tableStyles.headerCell}>Result</Text>
    </View>

    {/* ---------- EASY (1 purple) ---------- */}
    {[
      ['01 – 09', 'Mechanical Stress: The ship suffers 1 point of system strain.'],
      ['10 – 18', 'Jostled: All crew suffer 1 strain and are disoriented for 1 round.'],
      ['19 – 27', 'Losing Power to Shields: Reduce defense in affected zone by 1 (or +1 system strain if no defense).'],
      ['28 – 36', 'Knocked off Course: Pilot cannot execute maneuvers next turn; must make Piloting check to regain control (difficulty = current speed).'],
      ['37 – 45', 'Tailspin: All firing suffers <Image source={symbolImages.setback} style={tableStyles.iconStyles}/> until end of pilot’s next turn; crew immobilized until then.'],
      ['46 – 54', 'Component Hit: One component of attacker’s choice knocked offline until end of next round.'],
    ].map((row, i) => (
      <View key={`easy-${i}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row[0]}</Text>
        <Text style={tableStyles.costCell}><Image source={symbolImages.purple} style={tableStyles.iconStyles}/></Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row[1]}</Text></View>
      </View>
    ))}

    {/* ---------- AVERAGE (2 purple) ---------- */}
    {[
      ['55 – 63', 'Shields Failing: Reduce defense in all zones by 1 (or +2 system strain if none).'],
      ['64 – 72', 'Navicomputer Failure: Cannot make hyperspace jump; navigation systems blind without hyperdrive.'],
      ['73 – 81', 'Power Fluctuations: Pilot cannot voluntarily inflict system strain until repaired.'],
    ].map((row, i) => (
      <View key={`avg-${i}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row[0]}</Text>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
        </Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row[1]}</Text></View>
      </View>
    ))}

    {/* ---------- HARD (3 purple) ---------- */}
    {[
      ['82 – 90', 'Shields Down: Defense in affected zone to 0; all others –1 (or +4 strain if none).'],
      ['91 – 99', 'Engine Damaged: Max speed –1 (min 1) until repaired.'],
      ['100 – 108', 'Shield Overload: All defenses to 0 for encounter; +2 strain. If no defense, armor –1 until repaired.'],
      ['109 – 117', 'Engines Down: Max speed 0; cannot execute maneuvers until repaired.'],
      ['118 – 126', 'Major Systems Failure: One component heavily damaged and inoperable until repaired.'],
    ].map((row, i) => (
      <View key={`hard-${i}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row[0]}</Text>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
        </Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row[1]}</Text></View>
      </View>
    ))}

    {/* ---------- DAUNTING (4 purple) ---------- */}
    {[
      ['127 – 133', 'Major Hull Breach: Ship depressurizes (or suffers Destabilized in atmosphere).'],
      ['134 – 138', 'Destabilized: Hull trauma & system strain thresholds halved until repaired.'],
      ['139 – 144', 'Fire!: Ship takes 2 strain; fire spreads (see core rules).'],
      ['145 – 153', 'Breaking Up: Ship destroyed at end of next round unless crew escape!'],
      ['154 +', 'Vaporized: Ship completely destroyed in a dramatic fireball.'],
    ].map((row, i) => (
      <View key={`daunt-${i}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row[0]}</Text>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
        </Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row[1]}</Text></View>
      </View>
    ))}
  </ScrollView>
);

const PersonalCritChart = () => {
  return(
  <ScrollView style={tableStyles.container}>
    {/* Header */}
    <View style={tableStyles.headerRow}>
      <Text style={tableStyles.headerCell}>d100</Text>
      <Text style={tableStyles.headerCell}>Severity</Text>
      <Text style={tableStyles.headerCell}>Result</Text>
    </View>

    {/* ----------------------------- EASY (1 purple) -------------------------------- */}
    {[
      {range: '01 – 05', result: 'Minor Nick: Suffer 1 strain.'},
      {range: '06 – 10', result: 'Slowed Down: May only act during last allied Initiative slot on next turn.'},
      {range: '11 – 15', result: 'Sudden Jolt: Drop whatever is in hand.'},
      {range: '16 – 20', result: 'Distracted: Cannot perform free maneuver on next turn.'},
      {range: '21 – 25', result: 'Off‑Balance: Add <Image source={symbolImages.setback} style={tableStyles.iconStyles}/> to next skill check.'},
      {range: '26 – 30', result: 'Discouraging Wound: Flip one Light Destiny to Dark (reverse if NPC).'},
      {range: '31 – 35', result: 'Stunned: <Italic>Staggered</Italic> until end of next turn.'},
      {range: '36 – 40', result: 'Stinger: Increase difficulty (<Image source={symbolImages.purple} style={tableStyles.iconStyles}/> +1) of next check.'},
    ].map((row, idx) => (
      <View key={`easy-${idx}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row.range}</Text>
        <Text style={tableStyles.costCell}><Image source={symbolImages.purple} style={tableStyles.iconStyles}/></Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row.result}</Text></View>
      </View>
    ))}

    {/* ----------------------------- AVERAGE (2 purple) ------------------------------ */}
    {[
      {range: '41 – 45', result: 'Bowled Over: Knocked prone and suffer 1 strain.'},
      {range: '46 – 50', result: 'Head Ringer: Increase difficulty of all Intellect & Cunning checks until end of encounter.'},
      {range: '51 – 55', result: 'Fearsome Wound: Increase difficulty of Presence & Willpower checks until end of encounter.'},
      {range: '56 – 60', result: 'Agonizing Wound: Increase difficulty of Brawn & Agility checks until end of encounter.'},
      {range: '61 – 65', result: 'Slightly Dazed: <Italic>Disoriented</Italic> (add <Image source={symbolImages.setback} style={tableStyles.iconStyles}/> to all checks) until end of encounter.'},
      {range: '66 – 70', result: 'Scattered Senses: Remove all <Image source={symbolImages.blue} style={tableStyles.iconStyles}/> from skill checks until end of encounter.'},
      {range: '71 – 75', result: 'Hamstrung: Lose free maneuver until end of encounter.'},
      {range: '76 – 80', result: 'Overpowered: Attacker may immediately make another free attack with same pool.'},
      {range: '81 – 85', result: 'Winded: Cannot voluntarily suffer strain for abilities or extra maneuvers until end of encounter.'},
      {range: '86 – 90', result: 'Compromised: Increase difficulty (<Image source={symbolImages.purple} style={tableStyles.iconStyles}/> +1) of all checks until end of encounter.'},
    ].map((row, idx) => (
      <View key={`avg-${idx}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row.range}</Text>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
        </Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row.result}</Text></View>
      </View>
    ))}

    {/* ----------------------------- HARD (3 purple) --------------------------------- */}
    {[
      {range: '91 – 95', result: 'At the Brink: Suffer 1 strain each time you perform an action.'},
      {range: '96 – 100', result: 'Crippled: Limb crippled until healed or replaced. Increase difficulty (+1<Image source={symbolImages.purple} style={tableStyles.iconStyles}/>) of all checks relying on that limb.'},
      {range: '101 – 105', result: 'Maimed: Limb permanently lost. Unless replaced, cannot perform actions requiring that limb. Add <Image source={symbolImages.setback} style={tableStyles.iconStyles}/> to all other actions.'},
      {range: '106 – 110', result: 'Horrific Injury: Roll 1d10 to lower a random characteristic by 1 until healed.'},
      {range: '111 – 115', result: 'Temporarily Lame: May not perform more than one maneuver each turn until healed.'},
      {range: '116 – 120', result: 'Blinded: Cannot see. Upgrade difficulty of all checks twice; Perception & Vigilance three times.'},
      {range: '121 – 125', result: 'Knocked Senseless: <Italic>Staggered</Italic> for remainder of encounter.'},
    ].map((row, idx) => (
      <View key={`hard-${idx}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row.range}</Text>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
        </Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row.result}</Text></View>
      </View>
    ))}

    {/* ----------------------------- DAUNTING (4 purple) ------------------------------ */}
    {[
      {range: '126 – 130', result: 'Gruesome Injury: Randomly reduce one characteristic permanently by 1 (min 1).'},
      {range: '131 – 140', result: 'Bleeding Out: Suffer 1 wound & 1 strain each round; every 5 wounds ⇒ another critical injury.'},
      {range: '141 – 150', result: 'The End is Nigh: Die after the last Initiative slot next round.'},
      {range: '151 +',   result: 'Dead: Complete, obliterated death.'},
    ].map((row, idx) => (
      <View key={`daunt-${idx}`} style={tableStyles.row}>
        <Text style={tableStyles.costCell}>{row.range}</Text>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
          <Image source={symbolImages.purple} style={tableStyles.iconStyles}/>
        </Text>
        <View style={tableStyles.resultCell}><Text style={sectionStyles.text}>• {row.result}</Text></View>
      </View>
    ))}

  </ScrollView>
  );
};

const StarshipCombatTable = () => {
  return (
    <ScrollView style={tableStyles.container}>
      <View style={tableStyles.headerRow}>
        <Text style={tableStyles.headerCell}>Cost</Text>
        <Text style={tableStyles.headerCell}>Result Options</Text>
      </View>

      {/* Row 1 */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          {/* Replace with your actual icon or emoji if desired */}
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          {' or '}
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Add <Text style={tableStyles.blue}>🟦</Text> to the next allied character’s check.</Text>
          <Text style={sectionStyles.text}>• Notice a flaw in the enemy's course or a vital weakness.</Text>
          <Text style={sectionStyles.text}>• Inflict a Critical Hit (⚡ cost may vary).</Text>
          <Text style={sectionStyles.text}>• Activate a weapon quality (⚡ cost may vary).</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          {' or '}
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Perform a free maneuver (if within 2-maneuver limit).</Text>
          <Text style={sectionStyles.text}>• Add <Text style={tableStyles.black}>⬛</Text> to target’s next Piloting or Gunnery check.</Text>
          <Text style={sectionStyles.text}>• Add <Text style={tableStyles.blue}>🟦</Text> to any allied Piloting, Gunnery, Computers, or Mechanics check.</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          <Image source={symbolImages.advantage} style={tableStyles.iconStyles} />
          {' or '}
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Ignore terrain or stellar effects until end of next turn.</Text>
          <Text style={sectionStyles.text}>• Disable a specific ship component instead of causing damage.</Text>
          <Text style={sectionStyles.text}>• Gain a free Pilot Only maneuver.</Text>
          <Text style={sectionStyles.text}>• Force target ship to veer off/stay off target.</Text>
        </View>
      </View>

      {/* Row 4 */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Upgrade difficulty of target’s next check.</Text>
          <Text style={sectionStyles.text}>• Upgrade any allied Piloting, Gunnery, or Mechanics check.</Text>
          <Text style={sectionStyles.text}>• Do something vital to the tide of battle (e.g., destroy shield generator).</Text>
        </View>
      </View>

      {/* Row 5 */}
      <View style={tableStyles.row}>
        <Text style={tableStyles.costCell}>
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
          <Image source={symbolImages.triumph} style={tableStyles.iconStyles} />
        </Text>
        <View style={tableStyles.resultCell}>
          <Text style={sectionStyles.text}>• Disable or destroy a component of attacker’s ship.</Text>
          <Text style={sectionStyles.text}>• Effects should be meaningful but not devastating.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const StarshipActions = () => {
  const [showExtra, setShowExtra] = useState(false);
  return(
  <View style={{ backgroundColor: 'transparent', width: popupWidth }}>
    <Text style={sectionStyles.headingMain}>
      Starship Actions
    </Text>
    <Text style={sectionStyles.headingSub}>
      (Silhouette 1-4)
    </Text>

    {/* Pilot */}
    <Text style={sectionStyles.heading}>
      Pilot (Pilot)
    </Text>
    <Text style={sectionStyles.textDiff}>
      Piloting check
    </Text>
    <Text style={sectionStyles.text}>
      Make a check to navigate a hazard.
    </Text>

    {/* Plot Course */}
    <Text style={sectionStyles.heading}>
      Plot Course
    </Text>
    <Text style={sectionStyles.textDiff}>
      Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Astrogation or Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Perception check.
    </Text>
    <Text style={sectionStyles.text}>
      Each{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      reduces the{" "}
      <Image source={symbolImages.threat} style={sectionStyles.symbol} />
      suffered for difficult terrain by 1.
    </Text>

    {/* Copilot */}
    <Text style={sectionStyles.heading}>
      Copilot
    </Text>
    <Text style={sectionStyles.textDiff}>
      Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Piloting check
    </Text>
    <Text style={sectionStyles.text}>
      Each{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      downgrades the difficulty of the pilot’s next piloting check by 1.
    </Text>

    {/* Jamming */}
    <Text style={sectionStyles.heading}>
      Jamming
    </Text>
    <Text style={sectionStyles.textDiff}>
      Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers check
    </Text>
    <Text style={sectionStyles.text}>
      The enemy must make an Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers check to use their coms. The difficulty increases by 1 for each additional{" "}
      <Image source={symbolImages.threat} style={sectionStyles.symbol} />
      , and the jamming affects an additional target for each advantage.
    </Text>

    {/* Boost Shields */}
    <Text style={sectionStyles.heading}>
      Boost Shields
    </Text>
    <Text style={sectionStyles.textDiff}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers
    </Text>
    <Text style={sectionStyles.text}>
      The vehicle suffers 1 system strain, and increases the defense of 1 defense zone by 1 until the beginning of his next turn. Additional{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      increase the duration by 1 round per{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      .
    </Text>

    {/* Attack */}
    <Text style={sectionStyles.heading}>
      Combat Check
    </Text>
    <Text style={sectionStyles.textDiff}>
      Gunnery Check
    </Text>
    <Text style={sectionStyles.text}>
      Attack with starship weapons the same as other ranged attacks with difficulty determined by relative ship silhouette.
    </Text>
    <Text style={sectionStyles.textDiff}>
      Attacker Silhouette is..{'\n'}
      2 or more smaller than target: (<Image source={symbolImages.purple} style={sectionStyles.symbol} />){'\n'}
      Equal or within 1 of target: (
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ){'\n'}
      2 larger than target: (
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ){'\n'}
      3 larger than target: (
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ){'\n'}
      4 or more larger than target: (
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
        <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      )
    </Text>
    {/* Expandable/Dropdown Section */}
      <TouchableOpacity onPress={() => setShowExtra(!showExtra)}>
        <Text style={[sectionStyles.text, { color: '#39d', textDecorationLine: 'underline' }]}>
          {showExtra ? 'Hide Advantage Options Table ▲' : 'Spending Advantage Options ▼'}
        </Text>
      </TouchableOpacity>
      {showExtra && <StarshipCombatTable />}
    

    {/* Damage Control */}
    <Text style={sectionStyles.heading}>
      Damage Control
    </Text>
    <Text style={sectionStyles.textDiff}>
      Mechanics Check Based on current vehicle hull trauma or system strain
    </Text>
    <Text style={sectionStyles.textDiff}>
      HT/SS {"<"} half of threshold: Easy (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      )
    </Text>
    <Text style={sectionStyles.textDiff}>
      HT/SS {">"} half of threshold: Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      )
    </Text>
    <Text style={sectionStyles.textDiff}>
      HT/SS {">"} threshold: Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      )
    </Text>
    <Text style={sectionStyles.textDiff}>
      Critical Injury: Critical Injury severity
    </Text>
    <Text style={sectionStyles.text}>
      Can be performed repeatedly to repair system strain, but can only be performed to repair hull trauma once per encounter. On success, the vehicle recovers 1 system strain or hull trauma per{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      . Can also be used to repair Critical Hits.
    </Text>

    {/* Fire Discipline */}
    <Text style={sectionStyles.heading}>
      Fire Discipline
    </Text>
    <Text style={sectionStyles.textDiff}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Leadership or Discipline check
    </Text>
    <Text style={sectionStyles.text}>
      The next crewmember firing a weapon aboard the ship can add{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      to his check. Each additional{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      grants this to an additional crewmember. In addition, the crewmember may spend{" "}
      <Image source={symbolImages.advantage} style={sectionStyles.symbol} />
      to allow every hit from shipboard weapons to inflict 1 system strain on their target as well as regular damage until the beginning of his next turn.
    </Text>

    {/* Scan the Enemy */}
    <Text style={sectionStyles.heading}>
      Scan the Enemy
    </Text>
    <Text style={sectionStyles.textDiff}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Perception
    </Text>
    <Text style={sectionStyles.text}>
      Learn what weapons the ship has, any modifications, and their system strain and hull trauma thresholds.{" "}
      <Image source={symbolImages.advantage} style={sectionStyles.symbol} />
      can be spent to also learn their current system strain and hull trauma levels.
    </Text>

    {/* Slice Enemy’s Systems */}
    <Text style={sectionStyles.heading}>
      Slice Enemy’s Systems
    </Text>
    <Text style={sectionStyles.textDiff}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers check
    </Text>
    <Text style={sectionStyles.text}>
      Reduce the defense of 1 zone on the target vehicle for 1 round per{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      . A{" "}
      <Image source={symbolImages.triumph} style={sectionStyles.symbol} />
      may be spent to disable a weapon system for 1 round, and{" "}
      <Image source={symbolImages.advantage} style={sectionStyles.symbol} />
      may be spent to inflict 1 system strain on the target.
    </Text>

    {/* Spoofing Missiles */}
    <Text style={sectionStyles.heading}>
      Spoofing Missiles
    </Text>
    <Text style={sectionStyles.textDiff}>
      Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers or Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Vigilance check
    </Text>
    <Text style={sectionStyles.text}>
      Any attacks against the crewmember’s ship or vehicle using weapons with the Guided quality upgrade their difficulty by 1 (plus 1 upgrade for every additional) until the start of the crewmember’s next turn.
    </Text>

    {/* Gain the Advantage */}
    <Text style={sectionStyles.heading}>
      Gain the Advantage (Pilot)
    </Text>
    <Text style={sectionStyles.textDiff}>
      Piloting check (difficulty based on the speed advantage)
    </Text>
    <Text style={sectionStyles.text}>
      On success, the pilot ignores all penalties imposed by his own and his opponent's use of Evasive Maneuvers until the end of the following round. On the following turn the opponent may attempt to cancel out the advantage by using Gain the Advantage as well. If so, the difficulty is increased by one for each time the two pilots have successfully Gained the Advantage against the other.
    </Text>
  </View>
  );
};

const StarshipManeuvers = () => (
  <View style={{ backgroundColor: 'transparent', width: popupWidth }}>
    <Text style={sectionStyles.headingMain}>
      Starship Maneuvers
    </Text>
    <Text style={sectionStyles.headingSub}>
      (Silhouette 1-4)
    </Text>

    {/* Accelerate/Decelerate */}
    <Text style={sectionStyles.heading}>
      Accelerate/Decelerate (Pilot)
    </Text>
    <Text style={sectionStyles.text}>
      Increase or decrease vehicle’s speed by 1 (to minimum or maximum speed).
    </Text>

    {/* Aim */}
    <Text style={sectionStyles.heading}>
      Aim Weapons
    </Text>
    <Text style={sectionStyles.text}>
      Anyone using a ships weapon may aim and add 1 boost die to their attack.
    </Text>

    {/* Angle Deflector Shields */}
    <Text style={sectionStyles.heading}>
      Angle Deflector Shields
    </Text>
    <Text style={sectionStyles.text}>
      Reassign 1 point of Defense from one defense zone to another.
    </Text>

    {/* Evasive Maneuvers */}
    <Text style={sectionStyles.heading}>
      Evasive Maneuvers (Pilot) (Speed: 3+)
    </Text>
    <Text style={sectionStyles.text}>
      Upgrade the difficulty of any incoming and outgoing attacks once until the pilot’s next turn.
    </Text>

    {/* Fly/Drive */}
    <Text style={sectionStyles.heading}>
      Fly/Drive (Pilot)
    </Text>
    <Text style={sectionStyles.text}>
      Change range bands based on speed of vehicle. (See Planetary Range Bands Table next page).
    </Text>

    {/* Punch It */}
    <Text style={sectionStyles.heading}>
      Punch It (Pilot)
    </Text>
    <Text style={sectionStyles.text}>
      Immediately accelerate to maximum speed, suffering 1 point of system strain per each point increased.
    </Text>

    {/* Stay on Target */}
    <Text style={sectionStyles.heading}>
      Stay on Target (Pilot) (Speed: 3+)
    </Text>
    <Text style={sectionStyles.text}>
      Upgrade the ability of any incoming and outgoing attacks once until the pilot’s next turn.
    </Text>
    <Text style={sectionStyles.text}>
    </Text>
  </View>
);

export default function InfoPage() {
  const [visibleSection, setVisibleSection] = useState<'section1' | 'section2' | 'section3' | 'section4' | 'section5' | 'section6' | null>(null);
  const [d100Result, setD100Result] = useState<number | null>(null);
  
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


  return (
    <ImageBackground
      source={require('../assets/images/BiggerDataPadCustom.png')}
      style={styles.backgroundInfoPage}
      resizeMode="contain"
      >
        <>
      <Stack.Screen options={{ headerShown: false }} />
        </>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 80, left: 30, zIndex: 1 }}>
        <Text style={styles.menuArrow}>←</Text>
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => router.push('/DiceRoller')}
            style={{ position: 'absolute', top: 120, left: 320, zIndex: 1 }}
          >
            <Image source={require('../assets/dice/TransparentDice/YellowDie.png')} style={{width: 22, height: 22,}}></Image>
          </TouchableOpacity>
      {visibleSection === null && (
      <View style={styles.overlayContainerInfoPage}>
        {/* Buttons was modalbackgroundInfoPageTrent*/}




       <Pressable
  onPress={() => setVisibleSection('section1')}
  style={({ pressed }) => [
    holoStyles.holoWrapper,
    { borderColor: theme.darkerborder },
    pressed && { backgroundColor: theme.onPressed },
  ]}
>
  <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
    <LinearGradient
      colors={buttonGradients[themeName] as [string, string, string]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={holoStyles.holoGradient}
    >
      <Text style={[holoStyles.buttonText, { color: theme.text }]}>
        Actions
      </Text>
    </LinearGradient>
  </BlurView>
</Pressable>


        <Pressable
  onPress={() => setVisibleSection('section2')}
  style={({ pressed }) => [
    holoStyles.holoWrapper,
    { borderColor: theme.darkerborder },
    pressed && { backgroundColor: theme.onPressed },
  ]}
>
  <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
    <LinearGradient
      colors={buttonGradients[themeName] as [string, string, string]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={holoStyles.holoGradient}
    >
      <Text style={[holoStyles.buttonText, { color: theme.text }]}>
        Manuevers
      </Text>
    </LinearGradient>
  </BlurView>
</Pressable>




         <Pressable
  onPress={() => setVisibleSection('section3')}
  style={({ pressed }) => [
    holoStyles.holoWrapper,
    { borderColor: theme.darkerborder },
    pressed && { backgroundColor: theme.onPressed },
  ]}
>
  <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
    <LinearGradient
      colors={buttonGradients[themeName] as [string, string, string]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={holoStyles.holoGradient}
    >
      <Text style={[holoStyles.buttonText, { color: theme.text }]}>
        Critical Injuries
      </Text>
    </LinearGradient>
  </BlurView>
</Pressable>



         <Pressable
  onPress={() => setVisibleSection('section4')}
  style={({ pressed }) => [
    holoStyles.holoWrapper,
    { borderColor: theme.darkerborder },
    pressed && { backgroundColor: theme.onPressed },
  ]}
>
  <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
    <LinearGradient
      colors={buttonGradients[themeName] as [string, string, string]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={holoStyles.holoGradient}
    >
      <Text style={[holoStyles.buttonText, { color: theme.text }]}>
        Starship Actions
      </Text>
    </LinearGradient>
  </BlurView>
</Pressable>




          <Pressable
  onPress={() => setVisibleSection('section5')}
  style={({ pressed }) => [
    holoStyles.holoWrapper,
    { borderColor: theme.darkerborder },
    pressed && { backgroundColor: theme.onPressed },
  ]}
>
  <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
    <LinearGradient
      colors={buttonGradients[themeName] as [string, string, string]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={holoStyles.holoGradient}
    >
      <Text style={[holoStyles.buttonText, { color: theme.text }]}>
        Starship Maneuvers
      </Text>
    </LinearGradient>
  </BlurView>
</Pressable>

<Pressable
  onPress={() => setVisibleSection('section6')}
  style={({ pressed }) => [
    holoStyles.holoWrapper,
    { borderColor: theme.darkerborder },
    pressed && { backgroundColor: theme.onPressed },
  ]}
>
  <BlurView intensity={10} tint="light" style={holoStyles.blurContainer}>
    <LinearGradient
      colors={buttonGradients[themeName] as [string, string, string]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={holoStyles.holoGradient}
    >
      <Text style={[holoStyles.buttonText, { color: theme.text }]}>
        Starship Crit Chart
      </Text>
    </LinearGradient>
  </BlurView>
</Pressable>



        {/*<TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section6')}
        >
          <Text style={styles.buttonText}>Starship Crit Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Buying and Selling?Healing Rules?Crafting Rules?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Landspeader Chase?</Text>
        </TouchableOpacity>*/}
      </View>
      )}

      {/* Modal Section */}
      <Modal
        transparent={true}
        animationType="none"
        visible={visibleSection !== null}
        onRequestClose={() => setVisibleSection(null)}
      >
        <View style={styles.modalbackgroundInfoPageTrent}>
          {/* Back Arrow for Modal */}
          <TouchableOpacity
            onPress={() => setVisibleSection(null)}
            style={{ position: 'absolute', top: 48, left: 30, zIndex: 2 }}
          >
            <Text style={styles.menuArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/DiceRoller')}
            style={{ position: 'absolute', top: 88, left: 320, zIndex: 1 }}
          >
            <Image source={require('../assets/dice/TransparentDice/YellowDie.png')} style={{width: 22, height: 22,}}></Image>
          </TouchableOpacity>
          <View style={[styles.popupcontainerInfoPageTrent, { width: popupWidth, paddingTop: 0, height: 800, paddingBottom: 0 }]}>
            <View style={{ maxHeight: 540, overflow: 'hidden', paddingTop: 0, paddingBottom: 0 }}>
            <ScrollView contentContainerStyle={{
                        flexGrow: 0,
                        paddingTop: 0,
                        paddingBottom: 0,//20
                        alignItems: 'flex-start',
                        backgroundColor: 'transparent',
                      }}
                  >
              {/* d100 button and result for section3 */}
          {((visibleSection === 'section3') || (visibleSection === 'section6')) && (
            <View style={{width: '100%', alignItems: 'flex-start', marginVertical: 0 }}>
              <TouchableOpacity
                style={[styles.button, { width: 120 }]}
                onPress={() => setD100Result(Math.floor(Math.random() * 100) + 1)}
              >
                <Text style={styles.buttonText}>Roll d100</Text>
              </TouchableOpacity>
              {d100Result !== null && (
                <Text style={{ color: '#fff', fontSize: 20, marginTop: 8 }}>
                  Result: {d100Result}
                </Text>
              )}
            </View>
          )}
          {(visibleSection === 'section1' || visibleSection === 'section2' || visibleSection === 'section3' || visibleSection === 'section4' || visibleSection === 'section5' || visibleSection === 'section6') ? (
          <View style={{ backgroundColor: 'transparent', width: popupWidth}}>
            {/*<Text style={{ color: '#fff', fontSize: 18, marginBottom: 12 }}>*/}
              {/* Your custom text for sections*/}
              {
                visibleSection === 'section1'
                ? <CombatActions />
                : visibleSection === 'section2'
                ? <CombatManeuvers />
                : visibleSection === 'section3'
                ? <PersonalCritChart/>
                : visibleSection === 'section4'
                ? <StarshipActions />
                : visibleSection === 'section5'
                ? <StarshipManeuvers />
                : visibleSection === 'section6'
                ? <StarshipCritChart/>
                : null
              }
            {/*</Text>*/}
            {/* You can add more <Text> or other components here */}
          </View>
          ) : (
          <Image
                source={
                    visibleSection === 'section7'
                    ? require('../assets/images/section2.png')
                    : null
                }
                style={{ width: popupWidth, 
                  resizeMode: 'contain',
                  alignSelf: 'flex-start', // Ensures image is at the top
                  height: 700,
                  marginTop: 0,
                  //marginBottom: 100,
                }}
              />
              )}
            </ScrollView>
          </View></View>
          {/* Close Button */}
    <TouchableOpacity
      onPress={() => setVisibleSection(null)}
      style={styles.closeButtonFixed}
    >
      <Text style={styles.closeButtonText}>Close</Text>
    </TouchableOpacity>
        </View>
      </Modal>
      
    </ImageBackground>
  );
}
