import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DataPage() {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/images/BiggerDataPadCustom.png')}
      style={styles.background}
      resizeMode="contain"
    >
      <View style={styles.container}>
        {/* Section 1 */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setExpanded1(!expanded1)}
        >
          <Text style={styles.headerText}>Section 1</Text>
        </TouchableOpacity>
        {expanded1 && (
          <ScrollView style={styles.contentBox}>
            <Image
              source={require('../assets/images/section1.png')}
              style={styles.contentImage}
              resizeMode="contain"
            />
            {/* Add more images or text if desired */}
          </ScrollView>
        )}

        {/* Section 2 */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setExpanded2(!expanded2)}
        >
          <Text style={styles.headerText}>Section 2</Text>
        </TouchableOpacity>
        {expanded2 && (
          <ScrollView style={styles.contentBox}>
            <Image
              source={require('../assets/images/section2.png')}
              style={styles.contentImage}
              resizeMode="contain"
            />
            {/* Add more images or text if desired */}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    paddingTop: 80,
    alignItems: 'center',
  },
  headerButton: {
    width: width * 0.75,
    backgroundColor: '#ffffffaa',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentBox: {
    width: width * 0.75,
    maxHeight: 300,
    backgroundColor: '#ffffffcc',
    marginBottom: 20,
    borderRadius: 10,
  },
  contentImage: {
    width: '100%',
    height: 250,
  },
});


/*import React, { useState } from 'react';
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
*/