import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { DiceSettingsProvider } from './DiceRoller'; //SettingsContext
import { ThemeProvider } from './ThemeContext';

export default function RootLayout() {
  useEffect(() => {
    // Prevent background music from stopping
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }, []);
  
  return (
    <ThemeProvider>
      <DiceSettingsProvider>
        <Stack />
      </DiceSettingsProvider>
    </ThemeProvider>
  );
}
