import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';

import { styles } from './index.styles';

import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section1')}
        >
          <Text style={styles.buttonText}>Actions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section2')}
        >
          <Text style={styles.buttonText}>Manuevers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section3')}
        >
          <Text style={styles.buttonText}>Critical Injuries</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section4')}
        >
          <Text style={styles.buttonText}>Starship Actions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisibleSection('section5')}
        >
          <Text style={styles.buttonText}>Starship Maneuvers</Text>
        </TouchableOpacity>
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
          {(visibleSection === 'section4' || visibleSection === 'section5') ? (
          <View style={{ backgroundColor: 'transparent', width: popupWidth }}>
            <Text style={{ color: '#fff', fontSize: 18, marginBottom: 12 }}>
              {/* Your custom text for section 4 or 5 here */}
              {visibleSection === 'section4'
                ? <StarshipActions />
                : <StarshipManeuvers />}
            </Text>
            {/* You can add more <Text> or other components here */}
          </View>
          ) : (
          <Image
                source={
                  visibleSection === 'section1'
                    ? require('../assets/images/Actions.jpg')
                    : visibleSection === 'section2'
                    ? require('../assets/images/Maneuvers.jpg')
                    : visibleSection === 'section3'
                    ? require('../assets/images/section3.jpg')
                    : visibleSection === 'section6'
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
