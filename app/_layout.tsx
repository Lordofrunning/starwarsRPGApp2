import { Stack } from "expo-router";
import { DiceSettingsProvider } from './DiceSettingsContext';

export default function RootLayout() {
  return (
    <DiceSettingsProvider>
      <Stack />
    </DiceSettingsProvider>
  );
}
