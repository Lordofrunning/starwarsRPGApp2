import React from 'react';
import { Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDiceSettings } from './DiceSettingsContext';

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

  return (
    <Modal
      visible={visible}
      animationType="slide"  // You can use "fade", "slide", or "none"
      transparent={true}
      onRequestClose={onClose}  // Handles hardware back button on Android
    >
      <View style={setstyles.overlay}>
        <View style={setstyles.drawer}>
          <View style={setstyles.header}>
            <Text style={setstyles.title}>Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={setstyles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Dice Option 1</Text>
            <Switch value={diceOption1} onValueChange={setDiceOption1} />
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Dice Option 2</Text>
            <Switch value={diceOption2} onValueChange={setDiceOption2} />
          </View>

          <View style={setstyles.optionRow}>
            <Text style={setstyles.optionText}>Dice Option 3</Text>
            <Switch value={diceOption3} onValueChange={setDiceOption3} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const setstyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',  // Dim the background
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 20,
    color: 'blue',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsDrawer;
