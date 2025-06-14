import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [diceOption1, setDiceOption1State] = useState(false);
  const [diceOption2, setDiceOption2State] = useState(false);
  const [diceOption3, setDiceOption3State] = useState(false);

  // Load stored values on mount
  useEffect(() => {
    const loadSettings = async () => {
      const option1 = await AsyncStorage.getItem('diceOption1');
      const option2 = await AsyncStorage.getItem('diceOption2');
      const option3 = await AsyncStorage.getItem('diceOption3');
      if (option1 !== null) setDiceOption1State(option1 === 'true');
      if (option2 !== null) setDiceOption2State(option2 === 'true');
      if (option3 !== null) setDiceOption3State(option3 === 'true');
    };
    loadSettings();
  }, []);

  // Save to AsyncStorage when values change
  const setDiceOption1 = (value: boolean) => {
    setDiceOption1State(value);
    AsyncStorage.setItem('diceOption1', value.toString());
  };

  const setDiceOption2 = (value: boolean) => {
    setDiceOption2State(value);
    AsyncStorage.setItem('diceOption2', value.toString());
  };

  const setDiceOption3 = (value: boolean) => {
    setDiceOption3State(value);
    AsyncStorage.setItem('diceOption3', value.toString());
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
  return useContext(DiceSettingsContext);
};
