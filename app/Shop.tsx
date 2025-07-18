import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';


import { allArmor, allBlackMarketItems, allItems, allWeapons, armor, blackMarketItem, Item, shopNames, weapon } from '../data/shopData';
import { styles } from './index.styles';
import { useTheme } from './ThemeContext';


export default function Page3() {
  const [shopName, setShopName] = useState('');
  const { theme, themeName } = useTheme();

  // menue holders for each item type. (rare, normal item, wepaon, armor)
const [shopSaved, setShopSaved] = useState(false);

const [loading, setLoading] = useState(true);

const [shopItems, setShopItems] = useState<Item[]>([]);

const noBlackMarketMessages = [
  "Nothing shady happening here....",
  "the Imperials are just around the corner! get out of here!!!",
  "Nothing illegal here....",
  "Cleanest shop on the planet.",
  "just a normal shop, selling normal items",
  "No black market contacts here!",
  "Im offended you would think there are illegal items in my shop!"
];
const [blackMarketMessage, setBlackMarketMessage] = useState("");
const [blackMarketItems, setBlackMarketItems] = useState<blackMarketItem[]>([]);
const [weaponItems, setWeaponItems] = useState<weapon[]>([]);
const [armorItems, setArmorItems] = useState<armor[]>([]);

  const router = useRouter();
  const [infoModalVisible, setInfoModalVisible] = useState(false);

 useEffect(() => {
  const load = async () => {
    const saved = await AsyncStorage.getItem('savedShop');
    if (saved) {
      const parsed = JSON.parse(saved);
      setShopName(parsed.shopName);
      setShopItems(parsed.shopItems);
      setBlackMarketItems(parsed.blackMarketItems);
      setWeaponItems(parsed.weaponItems);
      setArmorItems(parsed.armorItems);
      setShopSaved(true);
    } else {
      generateShop();
    }
    setLoading(false);
  };

  load();
}, []);

useEffect(() => {
  if (shopSaved && shopName && shopItems.length) {
    saveShop();
  }
}, [shopSaved, shopName, shopItems, blackMarketItems, weaponItems, armorItems]);


  const toggleSave = async () => {
  const newState = !shopSaved;
  setShopSaved(newState);

  if (!newState) {
    await AsyncStorage.removeItem('savedShop');
  }
};


  

    const getRandomSubset = <T,>(arr: T[], count: number): T[] => {
  const copy = [...arr];
  const result = [];

  while (result.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }

  return result;
};


const saveShop = async () => {
  await AsyncStorage.setItem('savedShop', JSON.stringify({
    shopName,
    shopItems,
    blackMarketItems,
    weaponItems,
    armorItems,
  }));
};

// old generate shop logic, does not change item chance based on rarity. 
//  const generateShop = () => {
//   const name = shopNames[Math.floor(Math.random() * shopNames.length)];
//   setShopName(name);

//   const itemCount = Math.floor(Math.random() * 4) + 7;
//   const blackCount = Math.floor(Math.random() * 3);
//   const weaponCount = Math.floor(Math.random() * 5);
//   const armorCount = Math.floor(Math.random() * 3);

//   // === Priority item logic ===
//   const priorityPool = [
//     { name: 'Stimpack', chance: 1 },
//     { name: 'Medpac', chance: 0.45 },
//     // Add more if you want: { name: 'Radiation Pills', chance: 0.3 }
//   ];

//   // Filter out valid priority items
//   const chosenPriorityItems = priorityPool
//     .map(({ name, chance }) => {
//       const item = allItems.find(i => i.name === name);
//       if (item && Math.random() < chance) {
//         return {
//           ...item,
//           quantity: Math.floor(Math.random() * 8) + 3,
//         };
//       }
//       return null;
//     })
//     .filter(Boolean) as Item[];

//   const remainingCount = Math.max(itemCount - chosenPriorityItems.length, 0);
//   const otherItems = getRandomSubset(allItems.filter(i =>
//     !chosenPriorityItems.some(p => p.name === i.name)), remainingCount)
//     .map(i => ({
//       ...i,
//       quantity: Math.floor(Math.random() * 5) + 1,
//     }));

//   setShopItems([...chosenPriorityItems, ...otherItems]);

//   // === Other categories ===
//   setBlackMarketItems(getRandomSubset(allBlackMarketItems, blackCount));
//   setWeaponItems(getRandomSubset(allWeapons, weaponCount));
//   setArmorItems(getRandomSubset(allArmor, armorCount));
// };

  
   // function template for normal items
  
   const generateShop = () => {
  const name = shopNames[Math.floor(Math.random() * shopNames.length)];
  setShopName(name);

  const blackCount = Math.floor(Math.random() * 3);
  const weaponCount = Math.floor(Math.random() * 5);
  const armorCount = Math.floor(Math.random() * 3);

  const rarityChances: Record<number, number> = {
    0: 1,
    1: 0.75,
    2: 0.75,
    3: 0.6,
    4: 0.5,
    5: 0.5,
    6: 0.35,
    7: 0.25,
    8: 0.15,
    9: 0.1,
    10: 0.05,
  };

  const guaranteedItemNames = ['Stimpack'];

  const guaranteedItems = guaranteedItemNames
    .map(name => allItems.find(i => i.name === name))
    .filter(Boolean)
    .map(item => ({
      ...item,
      quantity: Math.floor(Math.random() * 5) + 1,
    })) as Item[];

  const guaranteedNames = new Set(guaranteedItems.map(i => i.name));

  const remainingItems = allItems.filter(i => !guaranteedNames.has(i.name));

  const passedItems = remainingItems
    .filter(i => Math.random() < (rarityChances[i.rarity] ?? 0))
    .map(i => ({
      ...i,
      quantity: Math.floor(Math.random() * 5) + 1,
    }));

  const min = 8;
  const max = 12;
  const targetCount = Math.floor(Math.random() * (max - min + 1)) + min;

  let finalItems: Item[] = [];

  const slotsLeft = targetCount - guaranteedItems.length;

  if (passedItems.length >= slotsLeft) {
    finalItems = [
      ...guaranteedItems,
      ...getRandomSubset(passedItems, slotsLeft),
    ];
  } else {
    const fillerNeeded = slotsLeft - passedItems.length;
    const fillerPool = remainingItems.filter(
      i =>
        !guaranteedNames.has(i.name) &&
        !passedItems.some(p => p.name === i.name)
    );
    const filler = getRandomSubset(fillerPool, fillerNeeded).map(i => ({
      ...i,
      quantity: Math.floor(Math.random() * 5) + 1,
    }));

    finalItems = [...guaranteedItems, ...passedItems, ...filler];
  }

  finalItems.sort((a, b) => a.rarity - b.rarity);
  setShopItems(finalItems);


const hasBlackMarket = Math.random() < 0.3; // 30% chance

if (hasBlackMarket) {
  const blackCount = Math.floor(Math.random() * 3) + 3; // 2 to 4 items guaranteed
  setBlackMarketItems(getRandomSubset(allBlackMarketItems, blackCount));
  setBlackMarketMessage(""); // Clear message if items exist
} else {
  setBlackMarketItems([]);
  const randomMessage = noBlackMarketMessages[Math.floor(Math.random() * noBlackMarketMessages.length)];
  setBlackMarketMessage(randomMessage); // Set message to display
}



  setWeaponItems(getRandomSubset(allWeapons, weaponCount));
  setArmorItems(getRandomSubset(allArmor, armorCount));
};


  
  
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
          <Text>Quantity: {item.quantity}</Text>
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

      {open && (
  items.length === 0 ? (
    <Text style={styles.emptyMessage}>{blackMarketMessage || "No items here"}</Text>
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

if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading shop...</Text>
    </View>
  );
}
  return (
     //<View style={{ flex: 1, position: 'relative', backgroundColor: '#D3D3D3' }}>
      <View style={{ flex: 1 }}>
       <Image
        source={require('../assets/images/shop_backgroun_image_full.jpg')}
        style={styles.background}
        resizeMode="stretch"
      />
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.transparentContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
              <View
                style={[
                  styles.header,
                  { backgroundColor: theme.background, borderBottomColor: theme.border },
                ]}
              >
                <TouchableOpacity
                  onPress={() => router.push('/')}
                  style={[styles.sideButton, { borderColor: theme.border }]}
                >
                  <Text style={[styles.menuArrow, { color: theme.border }]}>←</Text>
                </TouchableOpacity>
      
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/images/logos/rpg_main_logo.png')}
                    style={styles.smallImage}
                    resizeMode="contain"
                  />
                </View>
      
                <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={[styles.sideButton, { borderColor: theme.border }]}>
                          <Image
                            source={require('../assets/images/Icons/informationIcon1.png')}
                            style={[styles.iconImage, { tintColor: theme.icon }]}
                          />
                        </TouchableOpacity>
              </View>
      
       {/* Fixed background image */}
     

      <Text style={styles.shopTitle}>{shopName}</Text>

         <ItemsDropdown items={shopItems} />
        <BlackMarketDropdown items={blackMarketItems} />
        <WeaponsDropdown items={weaponItems} />
        <ArmorDropdown items={armorItems} />
      

      <View style={styles.section}>
      
    </View>
      
    </View>
    

    </ScrollView>

    <View style={styles.fixedToggle}>
    <Text style={{ marginRight: 8 }}>Save?</Text>
    <Switch value={shopSaved} onValueChange={toggleSave} />
  </View>
                 <Modal
                                visible={infoModalVisible}
                                animationType="slide"
                                transparent={true}
                                onRequestClose={() => setInfoModalVisible(false)}
                              >
                                <View style={styles.modalOverlayBig}>
                                  <View style={styles.modalContentBig}>
                                    <Text style={styles.modalHeaderBig}>Local Shop {"\n"}</Text>
                                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                      <Text style={styles.modalHeaderMedium}>buy any thing</Text>
                                      <Text style={styles.modalDescriptionBig}>
                                        {/* Put your long info text here */}
                                        generate random shops here, or let fate decide the items you can and cannot purchase. 
                                        {"\n"}{"\n"} want to come back to the same store multiple times? just save the shop, and it will be there until you are ready to leave. 
                                      </Text>
                                      <View style={[styles.divider,{marginBottom: 20}]}></View>
                                      
                                      <Text style={styles.modalHeaderMedium}></Text>
                                      <Text style={styles.modalDescriptionBig}>
                                         
                              
                              
                                      </Text>
                                    </ScrollView>
                                    <TouchableOpacity style={styles.closeButtonBig} onPress={() => setInfoModalVisible(false)}>
                                      <Text style={styles.closeButtonTextBig}>Got it</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </Modal>
  
    </View>
    
  );
}