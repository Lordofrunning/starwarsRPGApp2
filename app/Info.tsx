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

export const symbolImages = {
  success: require('../assets/dice/symbols/Success.png'),
  advantage: require('../assets/dice/symbols/Advantage.png'),
  threat: require('../assets/dice/symbols/Threat.png'),
  triumph: require('../assets/dice/symbols/Triumph.png'),
  failure: require('../assets/dice/symbols/Failure.png'),
  despair: require('../assets/dice/symbols/Despair.png'),
  purple: require('../assets/dice/PurpleDiceFull.jpg'),
  blue: require('../assets/dice/PurpleDiceFull.jpg'),
  black: require('../assets/dice/PurpleDiceFull.jpg'),
  // ...add others as needed
};

const screenWidth = Dimensions.get('window').width;
const popupWidth = screenWidth * 0.75;
const { width } = Dimensions.get('window');
const router = useRouter();

const Section4Content = () => (
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
    <Text style={sectionStyles.text}>
      Piloting check: Make a check to navigate a hazard.
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
    <Text style={sectionStyles.text}>
      Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Piloting check.{"\n"}
      Each{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      downgrades the difficulty of the pilot’s next piloting check by 1.
    </Text>

    {/* Jamming */}
    <Text style={sectionStyles.heading}>
      Jamming
    </Text>
    <Text style={sectionStyles.text}>
      Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers check.{"\n"}
      The enemy must make an Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers check to use their coms. The difficulty increases by 1 for each additional{" "}
      <Image source={symbolImages.threat} style={{ width: 18, height: 18 }} />
      , and the jamming affects an additional target for each advantage.
    </Text>

    {/* Boost Shields */}
    <Text style={sectionStyles.heading}>
      Boost Shields
    </Text>
    <Text style={sectionStyles.text}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers.{"\n"}
      The vehicle suffers 1 system strain, and increases the defense of 1 defense zone by 1 until the beginning of his next turn. Additional{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      increase the duration by 1 round per{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      .
    </Text>

    {/* Damage Control */}
    <Text style={sectionStyles.heading}>
      Damage Control
    </Text>
    <Text style={sectionStyles.text}>
      Mechanics Check.{"\n"}
      Can be performed repeatedly to repair system strain, but can only be performed to repair hull trauma once per encounter. On success, the vehicle recovers 1 system strain or hull trauma per{" "}
      <Image source={symbolImages.success} style={sectionStyles.symbol} />
      . Can also be used to repair Critical Hits.
    </Text>

    {/* Fire Discipline */}
    <Text style={sectionStyles.heading}>
      Fire Discipline
    </Text>
    <Text style={sectionStyles.text}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Leadership or Discipline check.{"\n"}
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
    <Text style={sectionStyles.text}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Perception.{"\n"}
      Learn what weapons the ship has, any modifications, and their system strain and hull trauma thresholds.{" "}
      <Image source={symbolImages.advantage} style={sectionStyles.symbol} />
      can be spent to also learn their current system strain and hull trauma levels.
    </Text>

    {/* Slice Enemy’s Systems */}
    <Text style={sectionStyles.heading}>
      Slice Enemy’s Systems
    </Text>
    <Text style={sectionStyles.text}>
      Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers check.{"\n"}
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
    <Text style={sectionStyles.text}>
      Average (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Computers or Hard (
      <Image source={symbolImages.purple} style={sectionStyles.symbol} />
      ) Vigilance check.{"\n"}
      Any attacks against the crewmember’s ship or vehicle using weapons with the Guided quality upgrade their difficulty by 1 (plus 1 upgrade for every additional) until the start of the crewmember’s next turn.
    </Text>

    {/* Gain the Advantage */}
    <Text style={sectionStyles.heading}>
      Gain the Advantage (Pilot)
    </Text>
    <Text style={sectionStyles.text}>
      Perform Piloting check, difficulty based on the speed advantage. On success, the pilot ignores all penalties imposed by his own and his opponent's use of Evasive Maneuvers until the end of the following round. On the following turn the opponent may attempt to cancel out the advantage by using Gain the Advantage as well. If so, the difficulty is increased by one for each time the two pilots have successfully Gained the Advantage against the other.
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
        <TouchableOpacity
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
        </TouchableOpacity>
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
                ? <Section4Content />
                : `Maneuvers`}
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
