import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Page1() {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text>Welcome to Page 1!</Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.redButton}>
          <Text style={styles.buttonText}>Red</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter a number"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />

        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>Green</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 80,
  },
  redButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  greenButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    marginHorizontal: 15,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
  },
});
