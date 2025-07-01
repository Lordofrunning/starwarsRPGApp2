/*import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
export default DiceSettingsProvider;*/