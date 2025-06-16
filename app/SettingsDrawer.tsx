import React from 'react';
import { Animated, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDiceSettings } from './DiceSettingsContext';
const translateX = React.useRef(new Animated.Value(300)).current; // Start off-screen to the right (adjust 300 as needed)
type SettingsDrawerProps = {
  visible: boolean;
  onClose: () => void;
};


const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ visible, onClose }) => {
  const {
    diceOption1, setDiceOption1,
    diceOption2, setDiceOption2,
    diceOption3, setDiceOption3
  } = useDiceSettings();

  React.useEffect(() => {
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
            <Text style={setstyles.optionSubText}>Proficiency and Challenge dice are a tiny bit better.</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>Replaces blank space with the two normal symbols for that die.</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text></Text>
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Nerf Ability Die</Text>
            <Switch value={diceOption2} onValueChange={setDiceOption2} />
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>Green (ability) has the two success and two advantage sides reduced to one.</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}></Text>
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Dice Option 3</Text>
            <Switch value={diceOption3} onValueChange={setDiceOption3} />
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionSubText}>Proficiency and Challenge dice are a tiny bit better.
               Replaces blank space with the two normal symbols for that die.</Text>
          </View>
          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}></Text>
          </View>
        
      </Animated.View>
      </View>
    </Modal>
  );
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
});

export default SettingsDrawer;
