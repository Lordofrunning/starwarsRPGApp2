import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles as sharedStyles } from './index.styles';

const sabaccDeck = [
  // Circle cards
  { id: '1_green_c', name: '1 Green Circle', value: 1, image: require('../assets/Cards/Circle/1_green_c.png') },
  { id: '1_red_c', name: '1 Red Circle', value: -1, image: require('../assets/Cards/Circle/1_red_c.png') },
  { id: '2_green_c', name: '2 Green Circle', value: 2, image: require('../assets/Cards/Circle/2_green_c.png') },
  { id: '2_red_c', name: '2 Red Circle', value: -2, image: require('../assets/Cards/Circle/2_red_c.png') },
  { id: '3_green_c', name: '3 Green Circle', value: 3, image: require('../assets/Cards/Circle/3_green_c.png') },
  { id: '3_red_c', name: '3 Red Circle', value: -3, image: require('../assets/Cards/Circle/3_red_c.png') },
  { id: '4_green_c', name: '4 Green Circle', value: 4, image: require('../assets/Cards/Circle/4_green_c.png') },
  { id: '4_red_c', name: '4 Red Circle', value: -4, image: require('../assets/Cards/Circle/4_red_c.png') },
  { id: '5_green_c', name: '5 Green Circle', value: 5, image: require('../assets/Cards/Circle/5_green_c.png') },
  { id: '5_red_c', name: '5 Red Circle', value: -5, image: require('../assets/Cards/Circle/5_red_c.png') },
  { id: '6_green_c', name: '6 Green Circle', value: 6, image: require('../assets/Cards/Circle/6_green_c.png') },
  { id: '6_red_c', name: '6 Red Circle', value: -6, image: require('../assets/Cards/Circle/6_red_c.png') },
//   { id: '7_green_c', name: '7 Green Circle', value: 7, image: require('../assets/Cards/Circle/7_green_c.png') },
//   { id: '7_red_c', name: '7 Red Circle', value: -7, image: require('../assets/Cards/Circle/7_red_c.png') },
  { id: '8_green_c', name: '8 Green Circle', value: 8, image: require('../assets/Cards/Circle/8_green_c.png') },
  { id: '8_red_c', name: '8 Red Circle', value: -8, image: require('../assets/Cards/Circle/8_red_c.png') },
  { id: '9_green_c', name: '9 Green Circle', value: 9, image: require('../assets/Cards/Circle/9_green_c.png') },
  { id: '9_red_c', name: '9 Red Circle', value: -9, image: require('../assets/Cards/Circle/9_red_c.png') },
  { id: '10_green_c', name: '10 Green Circle', value: 10, image: require('../assets/Cards/Circle/10_green_c.png') },
  { id: '10_red_c', name: '10 Red Circle', value: -10, image: require('../assets/Cards/Circle/10_red_c.png') },

  // Triangle cards
  { id: '1_green_t', name: '1 Green Triangle', value: 1, image: require('../assets/Cards/Triangle/1_green_t.png') },
  { id: '1_red_t', name: '1 Red Triangle', value: -1, image: require('../assets/Cards/Triangle/1_red_t.png') },
  { id: '2_green_t', name: '2 Green Triangle', value: 2, image: require('../assets/Cards/Triangle/2_green_t.png') },
  { id: '2_red_t', name: '2 Red Triangle', value: -2, image: require('../assets/Cards/Triangle/2_red_t.png') },
  { id: '3_green_t', name: '3 Green Triangle', value: 3, image: require('../assets/Cards/Triangle/3_green_t.png') },
  { id: '3_red_t', name: '3 Red Triangle', value: -3, image: require('../assets/Cards/Triangle/3_red_t.png') },
  { id: '4_green_t', name: '4 Green Triangle', value: 4, image: require('../assets/Cards/Triangle/4_green_t.png') },
  { id: '4_red_t', name: '4 Red Triangle', value: -4, image: require('../assets/Cards/Triangle/4_red_t.png') },
  { id: '5_green_t', name: '5 Green Triangle', value: 5, image: require('../assets/Cards/Triangle/5_green_t.png') },
  { id: '5_red_t', name: '5 Red Triangle', value: -5, image: require('../assets/Cards/Triangle/5_red_t.png') },
  { id: '6_green_t', name: '6 Green Triangle', value: 6, image: require('../assets/Cards/Triangle/6_green_t.png') },
  { id: '6_red_t', name: '6 Red Triangle', value: -6, image: require('../assets/Cards/Triangle/6_red_t.png') },
//   { id: '7_green_t', name: '7 Green Triangle', value: 7, image: require('../assets/Cards/Triangle/7_green_t.png') },
//   { id: '7_red_t', name: '7 Red Triangle', value: -7, image: require('../assets/Cards/Triangle/7_red_t.png') },
  { id: '8_green_t', name: '8 Green Triangle', value: 8, image: require('../assets/Cards/Triangle/8_green_t.png') },
  { id: '8_red_t', name: '8 Red Triangle', value: -8, image: require('../assets/Cards/Triangle/8_red_t.png') },
  { id: '9_green_t', name: '9 Green Triangle', value: 9, image: require('../assets/Cards/Triangle/9_green_t.png') },
  { id: '9_red_t', name: '9 Red Triangle', value: -9, image: require('../assets/Cards/Triangle/9_red_t.png') },
  { id: '10_green_t', name: '10 Green Triangle', value: 10, image: require('../assets/Cards/Triangle/10_green_t.png') },
  { id: '10_red_t', name: '10 Red Triangle', value: -10, image: require('../assets/Cards/Triangle/10_red_t.png') },

  // Square cards
  { id: '1_green_s', name: '1 Green Square', value: 1, image: require('../assets/Cards/Square/1_green_s.png') },
  { id: '1_red_s', name: '1 Red Square', value: -1, image: require('../assets/Cards/Square/1_red_s.png') },
  { id: '2_green_s', name: '2 Green Square', value: 2, image: require('../assets/Cards/Square/2_green_s.png') },
  { id: '2_red_s', name: '2 Red Square', value: -2, image: require('../assets/Cards/Square/2_red_s.png') },
  { id: '3_green_s', name: '3 Green Square', value: 3, image: require('../assets/Cards/Square/3_green_s.png') },
  { id: '3_red_s', name: '3 Red Square', value: -3, image: require('../assets/Cards/Square/3_red_s.png') },
  { id: '4_green_s', name: '4 Green Square', value: 4, image: require('../assets/Cards/Square/4_green_s.png') },
  { id: '4_red_s', name: '4 Red Square', value: -4, image: require('../assets/Cards/Square/4_red_s.png') },
  { id: '5_green_s', name: '5 Green Square', value: 5, image: require('../assets/Cards/Square/5_green_s.png') },
  { id: '5_red_s', name: '5 Red Square', value: -5, image: require('../assets/Cards/Square/5_red_s.png') },
  { id: '6_green_s', name: '6 Green Square', value: 6, image: require('../assets/Cards/Square/6_green_s.png') },
  { id: '6_red_s', name: '6 Red Square', value: -6, image: require('../assets/Cards/Square/6_red_s.png') },
//   { id: '7_green_s', name: '7 Green Square', value: 7, image: require('../assets/Cards/Square/7_green_s.png') },
//   { id: '7_red_s', name: '7 Red Square', value: -7, image: require('../assets/Cards/Square/7_red_s.png') },
  { id: '8_green_s', name: '8 Green Square', value: 8, image: require('../assets/Cards/Square/8_green_s.png') },
  { id: '8_red_s', name: '8 Red Square', value: -8, image: require('../assets/Cards/Square/8_red_s.png') },
  { id: '9_green_s', name: '9 Green Square', value: 9, image: require('../assets/Cards/Square/9_green_s.png') },
  { id: '9_red_s', name: '9 Red Square', value: -9, image: require('../assets/Cards/Square/9_red_s.png') },
  { id: '10_green_s', name: '10 Green Square', value: 10, image: require('../assets/Cards/Square/10_green_s.png') },
  { id: '10_red_s', name: '10 Red Square', value: -10, image: require('../assets/Cards/Square/10_red_s.png') },

  { id: 'green_sylop', name: 'Green Sylop', value: 0, image: require('../assets/Cards/Sylop/sylop_green.png') },
  { id: 'red_sylop', name: 'Red Sylop', value: 0, image: require('../assets/Cards/Sylop/sylop_red.png') },
  { id: 'card_back', name: 'Card Back', value: 0, image: require('../assets/Cards/card_back.png') },
];

 

export default function GenerateCard() {
    const [modalVisible, setModalVisible] = useState(false);
const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const router = useRouter();

  const [hand, setHand] = useState([]);
  const [folded, setFolded] = useState(false);
  const [turnEnded, setTurnEnded] = useState(false);
const [deck, setDeck] = useState([...sabaccDeck]);

  const drawCard = () => {
  if (folded || turnEnded || deck.length === 0) return;

  const randomIndex = Math.floor(Math.random() * deck.length);
  const drawn = deck[randomIndex];

  // Remove that card from the deck
  const newDeck = [...deck];
  newDeck.splice(randomIndex, 1);
  setDeck(newDeck);

  // Add card to hand
  setHand(prev => [...(prev || []), drawn]);
};

  const discardCard = (index) => {
    const newHand = [...hand];
    newHand.splice(index, 1);
    setHand(newHand);
  };

  const passTurn = () => {
    if (folded) return;
    setTurnEnded(true);
  };

  const foldHand = () => {
    setFolded(true);
    setHand([]);
  };

  const resetDeck = () => {
  setDeck([...sabaccDeck]);
  setHand([]);
  setFolded(false);
  setTurnEnded(false);
};

  const totalValue = hand.reduce((sum, card) => sum + card.value, 0);

  // --- Fan Layout Math ---
  const cardWidth = 150;
  const horizontalSpacing = 30;
  const total = hand.length;
  const startAngle = -10;
  const endAngle = 10;
  const angleStep = total > 1 ? (endAngle - startAngle) / (total - 1) : 0;
  const startX = (Dimensions.get('window').width - (cardWidth + horizontalSpacing * (total - 1))) / 2;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={sharedStyles.container}>
        {/* Header */}
        <View style={sharedStyles.header}>
          <TouchableOpacity onPress={() => router.push('/')} style={sharedStyles.sideButton}>
            <Text style={sharedStyles.menuArrow}>←</Text>
          </TouchableOpacity>

          <View style={sharedStyles.logoContainer}>
            <Image
              source={require('../assets/images/logos/rpg_main_logo.png')}
              style={sharedStyles.smallImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity onPress={() => console.log('Profile pressed')} style={sharedStyles.sideButton}>
            <Image
              source={require('../assets/images/empty_profile_pic.png')}
              style={sharedStyles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Main */}
        <View style={localStyles.main}>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
  {hand.map((card, index) => (
    <TouchableOpacity key={card.id} onPress={() => {
  setSelectedCardIndex(index);
  setModalVisible(true);
}} style={{ alignItems: 'center' }}>
      <Image source={card.image} style={[localStyles.cardImage, { width: 120, height: 180 }]} />
      <Text style={localStyles.cardName}>{card.name}</Text>
      <Text style={{ color: 'red', fontSize: 14 }}>Tap to Discard</Text>
    </TouchableOpacity>
  ))}
</View>

          {/* Total Value */}
          <Text style={localStyles.totalValueText}>Total Value: {totalValue}</Text>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '100%' }}>
            <TouchableOpacity style={localStyles.actionButton} onPress={drawCard}>
              <Text style={localStyles.cardButtonText}>Draw</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionButton} onPress={passTurn}>
              <Text style={localStyles.cardButtonText}>Pass</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionButton} onPress={foldHand}>
              <Text style={localStyles.cardButtonText}>Junk</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          {folded && <Text style={{ color: 'red', marginTop: 10 }}>You folded your hand.</Text>}
          {turnEnded && !folded && <Text style={{ color: 'yellow', marginTop: 10 }}>You passed your turn.</Text>}
        </View>
      </ScrollView>

    {/* confirm button to discard card */}
      <Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={localStyles.modalOverlay}>
    <View style={localStyles.modalContent}>
      <Text style={localStyles.modalText}>Are you sure you want to discard this card?</Text>
      <View style={localStyles.modalButtons}>
        <TouchableOpacity
          style={[localStyles.modalButton, { backgroundColor: '#cc4444' }]}
          onPress={() => {
            if (selectedCardIndex !== null) {
              discardCard(selectedCardIndex);
              setSelectedCardIndex(null);
            }
            setModalVisible(false);
          }}
        >
          <Text style={localStyles.modalButtonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[localStyles.modalButton, { backgroundColor: '#555' }]}
          onPress={() => {
            setModalVisible(false);
            setSelectedCardIndex(null);
          }}
        >
          <Text style={localStyles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </>
  );
}

const localStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  cardImage: {
    resizeMode: 'contain',
    marginBottom: 5,
  },
  cardName: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  totalValueText: {
    fontSize: 22,
    color: 'lightgreen',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
  },
  cardButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#222',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  alignItems: 'center',
},
modalText: {
  color: 'white',
  fontSize: 16,
  marginBottom: 20,
  textAlign: 'center',
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
modalButton: {
  flex: 1,
  padding: 10,
  marginHorizontal: 5,
  borderRadius: 6,
  alignItems: 'center',
},
modalButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
});