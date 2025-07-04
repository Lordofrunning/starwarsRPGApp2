// ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'imperial' | 'rebel' | 'jedi' ;

const themes = {
  imperial: {
    background: '#1A1A1A',
    border: '#FF3C3C',
    text: '#FFFFFF',
    icon: '#FF3C3C',
  },
    rebel: {
  background: '#1C2238',   // Deep starship navy
  border: '#FFCB05',       // Warm tactical yellow
  text: '#FFFFFF',         // Clean readable white
  icon: '#FFCB05',         // Same accent yellow
},
   jedi: {
    background: '#2E3A46',
    border: '#5CADAA',
    text: '#D4E6E1',
    icon: '#81B7B1',
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