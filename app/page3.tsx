import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './index.styles';



export default function Page3() {
  const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

  return (
    <View style={styles.container}>
    {/* Custom Header */}
      <Stack.Screen options={{ headerShown: false }} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.menuArrow}>←</Text>
            </TouchableOpacity>
    
         
            <TouchableOpacity
              style={styles.modalBackground}
              onPress={() => router.push('../index')}
              activeOpacity={1}
            >
              
            </TouchableOpacity>
          
    
    
    
            <Text style={styles.headerTitleCenter}>store name here?</Text>
    
            
          </View>
        </View>
  );
}