import React from 'react';
import { Button, View } from 'react-native';
type Props = {
  onRed: () => void;
  onGreen: () => void;
};

export default function ColorButtons({ onRed, onGreen }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Button title="Red" onPress={onRed} />
      <Button title="Green" onPress={onGreen} />
    </View>
  );
}