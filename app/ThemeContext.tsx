// ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'imperial' | 'rebel' | 'jedi' | 'mandalorian' | 'republic' | 'separatist';

const themes = {
  imperial: {
    name: 'imperial',
    background: '#1A1A1A',
    border: '#FF3C3C',
    darkerborder: '#5A1E1E',
    text: '#FFFFFF',
    icon: '#FF3C3C',
     onPressed: 'rgba(255, 60, 60, 0.3)',
     
  },
 rebel: {
  name: 'rebel',
  background: '#3C3B37',    // Desaturated warm gray-brown (like worn metal)
  border: '#D6B400',        // Desaturated golden yellow (tactical, not neon)
  text: '#F0E6D2',          // Pale warm parchment (for contrast)
  icon: '#D6B400',          // Same golden yellow for icon consistency
  darkerborder: '#455649',
  onPressed: 'rgba(214, 180, 0, 0.25)',
 
},
    
   jedi: {
    name: 'jedi',
    background: '#2E3A46',
    border: '#5CADAA',
    darkerborder: '#E8F9FF',
    text: '#9DDBDA',
    icon: '#81B7B1',
    onPressed: 'rgba(92, 173, 170, 0.25)',
    
  },

  mandalorian: {
    name: 'mandalorian',
  background: '#2E211D',      // A neutral ground: deep reddish-brown leather with grey undertones
  border: '#7C5B3C',          // Bronze-tinted brown (blend of metallic and leather)
  darkerborder: '#632B21',    // Keep this for grounding and shadow
  text: '#E8D8C3',            // Slightly warmer aged parchment
  icon: '#A47C48',            // Keep the bronze/gold icon — distinct and stylish
  onPressed: 'rgba(108, 61, 42, 0.25)',  // Desaturated leather red for pressed effect
},

republic: {
   name: 'republic',
  background: '#F5F3F0',     // soft off-white
  border: '#B22222',         // firebrick red
  darkerborder: '#7C1B1B',   // deep red
  text: '#000000',           // solid black for strong contrast
  icon: '#B22222',           // match with border
  onPressed: 'rgba(178, 34, 34, 0.25)', // subtle red tint
},

separatist: {
  name: 'separatist',
  background: '#72757A',        // lighter grey
  border: '#276DE0',            // Vivid separatist/droid blue
  darkerborder: '#1C1C1E',      // Almost black for shadowy effect
  text: '#E0E0E3',              // Pale steel white for readable contrast
  icon: '#276DE0',              // SVivid separatist/droid blue
  onPressed: 'rgba(77, 144, 254, 0.25)', // translucent blue press effect
},
 
};

const ThemeContext = createContext<{
  theme: typeof themes['imperial'];
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}>({
  theme: themes.imperial,
  themeName: 'imperial',
  setThemeName: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('imperial');

  useEffect(() => {
    AsyncStorage.getItem('selectedTheme').then((stored) => {
      if (stored && stored in themes) setThemeName(stored as ThemeName);
    });
  }, []);

  const changeTheme = (name: ThemeName) => {
    setThemeName(name);
    AsyncStorage.setItem('selectedTheme', name);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, setThemeName: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};