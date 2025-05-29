import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './index.styles';


export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>

         {/* Popup Menu */}
      <Modal visible={menuVisible} transparent animationType="none">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.menuBox}>
            <TouchableOpacity>
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
             {/* 🔻 Close button */}
          <View style={styles.menuDivider} />

            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuItem}>Close</Text>
            </TouchableOpacity>
          </View>
          
        </TouchableOpacity>
      </Modal>



        <Text style={styles.headerTitle}>My Hype App</Text>

        <TouchableOpacity onPress={() => console.log('Profile pressed')}>
          <Image
            source={require('../assets/images/empty_profile_pic.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Main content below */}
      <View style={styles.content}>
        <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.container}>
        <Image
          source={require('../assets/images/logos/rpg_main_logo.png')}
          style={styles.image}
          resizeMode="contain"
        />

         {/* Button stack */}
            <View style={styles.buttonStack}>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/page1')}>
                <Text style={styles.buttonText}>page1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/page2')}>
                <Text style={styles.buttonText}>page2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/page3')}>
                <Text style={styles.buttonText}>page3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/page4')}>
                <Text style={styles.buttonText}>page4</Text>
              </TouchableOpacity>
            </View>
              </View>
                </View>
              </View>
  );
}
     




