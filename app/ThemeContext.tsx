// ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'imperial' | 'rebel' | 'jedi' ;

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