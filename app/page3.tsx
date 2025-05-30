import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { allArmor, allBlackMarketItems, allItems, allWeapons, armor, blackMarketItem, Item, shopNames, weapon } from './data/shopData';
import { styles } from './index.styles';


export default function Page3() {
  const [shopName, setShopName] = useState('');
  

  // menue holders for each item type. (rare, normal item, wepaon, armor)
const [shopItems, setShopItems] = useState<Item[]>([]);
const [blackMarketItems, setBlackMarketItems] = useState<blackMarketItem[]>([]);
const [weaponItems, setWeaponItems] = useState<weapon[]>([]);
const [armorItems, setArmorItems] = useState<armor[]>([]);

  const router = useRouter();

  useEffect(() => {
    generateShop();
  }, []);

  const rollRarity = (): number => {
    const roll = Math.random();
    if (roll < 0.5) return 0;
    if (roll < 0.7) return 1;
    if (roll < 0.8) return 2;
    if (roll < 0.87) return 3;
    if (roll < 0.92) return 4;
    if (roll < 0.96) return 5;
    if (roll < 0.98) return 6;
    if (roll < 0.99) return 7;
    if (roll < 0.995) return 8;
    if (roll < 0.998) return 9;
    return 10;
  };

    const getRandomSubset = (arr, count) => {
  const copy = [...arr];
  const result = [];

  while (result.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }

  return result;
};
  const generateShop = () => {
  const name = shopNames[Math.floor(Math.random() * shopNames.length)];
  setShopName(name);

  const itemCount = Math.floor(Math.random() * 4) + 7;     // 7–10
  const blackCount = Math.floor(Math.random() * 3);        // 0–2
  const weaponCount = Math.floor(Math.random() * 5);       // 0–4
  const armorCount = Math.floor(Math.random() * 3);        // 0–2

  setShopItems(getRandomSubset(allItems, itemCount));
  setBlackMarketItems(getRandomSubset(allBlackMarketItems, blackCount));
  setWeaponItems(getRandomSubset(allWeapons, weaponCount));
  setArmorItems(getRandomSubset(allArmor, armorCount));
};

  
   // function template for normal items
  function ItemsDropdown({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Basic Items</Text>
        <Text>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && 
      (
        items.length === 0 ? (
          <Text style={styles.emptyMessage}>No items here</Text>
        ) : (
          items.map((item, index) => (
        <View key={index} style={styles.itemBox}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>Cost: {item.cost}</Text>
          <Text>Rarity: {item.rarity}</Text>
          <Text>Description: {item.description}</Text>
        </View>
          ))
      )
    )}
    </View>
  );
}


// function template for blackMarket items
 function BlackMarketDropdown({ items }: { items: blackMarketItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Black Market Goods</Text>
        <Text>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && 
      (
        items.length === 0 ? (
          <Text style={styles.emptyMessage}>No items here</Text>
        ) : (
          items.map((item, index) => (
        <View key={index} style={styles.itemBox}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>Cost: {item.cost}</Text>
          <Text>Rarity: {item.rarity}</Text>
          <Text>Description: {item.description}</Text>
        </View>
          ))
      ))}
    </View>
  );
}

// function template for weapon items
 function WeaponsDropdown({ items }: { items: weapon[] }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Weapons</Text>
        <Text>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open &&
      (
        items.length === 0 ? (
          <Text style={styles.emptyMessage}>No items here</Text>
        ) : (
           items.map((item, index) => (
        <View key={index} style={styles.itemBox}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>Cost: {item.cost}</Text>
          <Text>Rarity: {item.rarity}</Text>
          <Text>Description: {item.description}</Text>
        </View>
           ))
      ))}
    </View>
  );
}

// function template for armor items
   function ArmorDropdown({ items }: { items: armor[] }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Armor</Text>
        <Text>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && 
      (
        items.length === 0 ? (
          <Text style={styles.emptyMessage}>No items here</Text>
        ) : (
          items.map((item, index) => (
        <View key={index} style={styles.itemBox}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>Cost: {item.cost}</Text>
          <Text>Rarity: {item.rarity}</Text>
          <Text>Description: {item.description}</Text>
        </View>
          ))
      ))}
    </View>
  );
}





  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.sideButton}>
          <Text style={styles.menuArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logos/rpg_main_logo.png')}
            style={styles.smallImage}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity onPress={() => console.log('Profile pressed')} style={styles.sideButton}>
          <Image
            source={require('../assets/images/empty_profile_pic.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.shopTitle}>{shopName}</Text>

         <ItemsDropdown items={shopItems} />
        <BlackMarketDropdown items={blackMarketItems} />
        <WeaponsDropdown items={weaponItems} />
        <ArmorDropdown items={armorItems} />
      

      <View style={styles.section}>
    

    </View>

    </View>
    </ScrollView>
  );
}