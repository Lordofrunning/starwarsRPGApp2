import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
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
const dieSides = [
      require('../assets/dice/Sabacc/dice_core.jpg'),
require('../assets/dice/Sabacc/dice_core.jpg'),
require('../assets/dice/Sabacc/dice_rim.jpg'),
require('../assets/dice/Sabacc/dice_rim.jpg'),
require('../assets/dice/Sabacc/dice_wild.jpg'),
require('../assets/dice/Sabacc/dice_wild.jpg'),

]

type Card = {
  id: string;
  name: string;
  value: number;
  image: any;
};

export default function GenerateCard() {
    const [modalVisible, setModalVisible] = useState(false);
const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
const [infoModalVisible, setInfoModalVisible] = useState(false);
  const router = useRouter();

  const [hand, setHand] = useState<Card[]>([]);
  const [folded, setFolded] = useState(false);
  const [turnEnded, setTurnEnded] = useState(false);
const [startModalVisible, setStartModalVisible] = useState(true);
const [deck, setDeck] = useState([...sabaccDeck]); // mutable deck

const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
const anyCardFaceDown = hand.some(card => !flippedCards.has(card.id));

const [dice, setDice] = useState([null, null]);

  const rollDice = () => {
    const newDice = [
      dieSides[Math.floor(Math.random() * 6)],
      dieSides[Math.floor(Math.random() * 6)],
    ];
    setDice(newDice);
  };

const toggleFlipCard = (cardId: string) => {
  setFlippedCards(prev => {
    const newSet = new Set(prev);
    if (newSet.has(cardId)) {
      newSet.delete(cardId);
    } else {
      newSet.add(cardId);
    }
    return newSet;
  });
};

 const drawCard = () => {
  if (folded || turnEnded || deck.length === 0) return;

  const newDeck = [...deck];
  const randomIndex = Math.floor(Math.random() * newDeck.length);
  const card = newDeck.splice(randomIndex, 1)[0];

  setDeck(newDeck);
  setHand(prev => [...prev, card]);
};

    const startGame = () => {
  const initialDeck = [...sabaccDeck];
  const playerStartingHand = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * initialDeck.length);
    const card = initialDeck.splice(randomIndex, 1)[0];
    playerStartingHand.push(card);
  }

  setHand(playerStartingHand);
  setDeck(initialDeck);
  setFolded(false);
  setTurnEnded(false);
  setStartModalVisible(false);
};

  const discardCard = (index: number) => {
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
  setFlippedCards(new Set()); // reset all cards to face-down
  startGame();
  setFolded(false);
  setTurnEnded(false);
};

  const totalValue = hand.reduce((sum, card) => sum + card.value, 0);
  const displayTotalValue = anyCardFaceDown ? '???' : totalValue;

  // --- Fan Layout Math ---
  const cardWidth = 150;
  const horizontalSpacing = 30;
  const total = hand.length;
  const startAngle = -10;
  const endAngle = 10;
  const angleStep = total > 1 ? (endAngle - startAngle) / (total - 1) : 0;
  const startX = (Dimensions.get('window').width - (cardWidth + horizontalSpacing * (total - 1))) / 2;

  // switch options and stuff
  const [publicDeck, setpublicDeck] = useState(false);
const [enableFanning, setEnableFanning] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={sharedStyles.container}>
        {/* Header */}
        <View style={sharedStyles.header}>
          <TouchableOpacity
                onPress={() => {
                    resetDeck();       // ← Call your function
                    router.push('/');  // ← Then navigate
                }}
                style={sharedStyles.sideButton}
                >
                <Text style={sharedStyles.menuArrow}>←</Text>
        </TouchableOpacity>
          <View style={sharedStyles.logoContainer}>
            <Image
              source={require('../assets/images/logos/rpg_main_logo.png')}
              style={sharedStyles.smallImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity onPress={() => setInfoModalVisible(true)} style={localStyles.sideButton}>
                              <Image
                                  source={require('../assets/images/Icons/informationIcon1.png')}
                                  style={[localStyles.profileImage, { backgroundColor: 'white' }]}
                              />
                          </TouchableOpacity>
        </View>

            {/* start game menue modal here */}
        <Modal
  visible={startModalVisible}
  transparent
  animationType="slide"
>
  <View style={localStyles.modalOverlay}>
    <View style={localStyles.modalContent}>
      <Text style={localStyles.modalTextHeader}>Sabacc</Text>

      {/* You can add future options here */}

       <View style={localStyles.toggleRow}>
  <Text style={localStyles.toggleLabel}>Special Sabacc Shift Rules/dice</Text>
  <Switch
    value={publicDeck}
    onValueChange={setpublicDeck}
    thumbColor={publicDeck ? '#33dd33' : '#888'}
    trackColor={{ false: '#444', true: '#77cc77' }}
  />
</View>

<View style={localStyles.toggleRow}>
  <Text style={localStyles.toggleLabel}>Enable Card Fanning</Text>
  <Switch
    value={enableFanning}
    onValueChange={setEnableFanning}
    thumbColor={enableFanning ? '#33ddff' : '#888'}
    trackColor={{ false: '#444', true: '#33ccff' }}
  />
</View>



      <TouchableOpacity
  style={ [localStyles.modalButton2, {backgroundColor: 'green', padding: 20}    ]}
  onPress={startGame}
>
  <Text style={localStyles.modalButtonText}>Start Game</Text>
</TouchableOpacity>

    </View>
  </View>
</Modal>
{/* // modal for info button */}

        <Modal
          visible={infoModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setInfoModalVisible(false)}
        >
          <View style={localStyles.modalOverlayBig}>
            <View style={localStyles.modalContentBig}>
              <Text style={localStyles.modalHeaderBig}>Game Info {"\n"}</Text>
              <ScrollView contentContainerStyle={localStyles.scrollViewContent}>
                <Text style={localStyles.modalHeaderMedium}>Basic Sabacc</Text>
                <Text style={localStyles.modalDescriptionBig}>
                  {/* Put your long info text here */}
                  the goal of sabacc is to get zero, or as close as you can. there are 3 suits of cards, with 20 cards each. 1 through 10, -1 through -10, and 2 sylop cards worth 0
                  {"\n\n"} a turn has 4 stages. a betting stage, a rolling stage, a calling stage, and a drawing stage. these stages loop until a player calls the game. once the game is called, each player shows their cards, and the closest to zero wins. (tiebreaker info further down)
                  {"\n\n"}you may bet, rais, call, and junk/fold. on a players turn, they must match the bet or fold.
                  {"\n\n"}the Roll: after betting the dice are rolled for a Sabacc Shift. if doubles roll, a Sabacc Shift occurs. 
                  {"\n\n"}Calling: after the roll, but before drawing, if more than 2 rounds have passed, any player may call the game. you cannot call the game on your own turn. if it is your turn and the calling stage, you must ask if anybody wants to call the hand.
                  {"\n\n"}
                  {"\n\n"}
                  {"\n\n"}                 
                  {"\n\n"}the fourth part of a players turn can be used in any one of these actions
                  {"\n"} Action 1: 
                  {"\n"}    - Draw one card from the deck. may choose to also discard one card after drawing.  
                  {"\n\n"} Action 2:
                  {'\n'}    - Swap one of your cards with the top card of the cycle or discard pile 
                  {"\n\n"} Action 3:
                  {'\n'}    - Stand. pass your turn without taking any action
                  {"\n\n"} Action 4:
                  {'\n'}    - Junk. junk or fold your cards. you are out for this round, and cant win, and don't need to match any more bets
                  
                  
                  {"\n\n"} - Sabacc Shift: once, after each betting stage, the dice are rolled. if they land on doubles, a Sabacc Shift happens. each player discards all their cards, and gets new a new card for each discarded card. 
                  {"\n\n"} - Static Field: anytime during a players turn, they may place a card into the Static Field to prevent them from being discarded during a Sabacc Shift. to do, place your card face up. once done, it cant be taken back.

                </Text>
                <View style={[localStyles.divider,{marginBottom: 20}]}></View>
                
                <Text style={localStyles.modalHeaderMedium}>Dual/Spinning</Text>
                <Text style={localStyles.modalDescriptionBig}>
                    for going Head to Head with another person, a 2v2, or even 3v3
                     {"\n\n"} the best way is to have 2 wheels going at the same time. but you could go one after the other.
                    {"\n\n"}players battle to end with the most amount of credits. if playing in teams, you add your credits and your teamates credits after locking them in.
                    {"\n\n"} you may stop spinning at any time, and lock in your current credit amount
                    {"\n\n"} each player/team spins their own wheel.
        
        
                </Text>
              </ScrollView>
              <TouchableOpacity style={localStyles.closeButtonBig} onPress={() => setInfoModalVisible(false)}>
                <Text style={localStyles.closeButtonTextBig}>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Main */}
 <View style={localStyles.main}>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {hand.map((card, index) => (
                <TouchableOpacity key={card.id} 
                onPress={() => toggleFlipCard(card.id)}
                onLongPress={() => {setSelectedCardIndex(index);setModalVisible(true); }} 
                style={{ alignItems: 'center' }}>

                <Image  source={flippedCards.has(card.id) ? card.image : require('../assets/Cards/card_back.png') } 
                style={[localStyles.cardImage, { width: 120, height: 180 }]} />

            <View style={{ height: 30, justifyContent: 'center' }}>
                {flippedCards.has(card.id) && (
            <Text
            style={[
                localStyles.cardName,
                { color: flippedCards.has(card.id) ? 'white' : 'transparent' }
            ]}
            >
            {card.name}
            </Text>

            )}
            </View>
                
                </TouchableOpacity>
                
            ))}
    </View>



          {/* Total Value */}
          <Text style={localStyles.totalValueText}>Total Value: {displayTotalValue}</Text>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 80, width: '100%' }}>
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

                 <View style={localStyles.absoluteDiceWrapper}>
                        <View style={localStyles.diceContainer}>
                            {dice.map((img, idx) => (
                            <Image
                                key={idx}
                                source={img || require('../assets/dice/Sabacc/dice_blank.jpg')}
                                style={localStyles.die}
                            />
                            ))}
                        </View>

                        <TouchableOpacity style={localStyles.rollButton} onPress={rollDice}>
                            <Text style={localStyles.buttonText}>Roll Dice</Text>
                        </TouchableOpacity>
                </View>

             <TouchableOpacity style={[ localStyles.resetButton,{height: 50, position: 'absolute', bottom: 80, justifyContent: 'center'} ]} onPress={resetDeck}>
              <Text style={localStyles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            

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

    modalTextHeader: {
  color: 'white',
  fontSize: 25,
  marginBottom: 100,
  textAlign: 'center',
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
modalButton2: {
  padding: 10,
  marginHorizontal: 5,
  borderRadius: 6,
  alignItems: 'center',
},
modalButtonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 20,        
},

// big modal stuff here 
  modalOverlayBig: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentBig: {
    backgroundColor: "#222",
    borderRadius: 12,
    width: '90%',  // almost full width
    height: '85%', // limit max height so it doesn't cover entire screen
    padding: 20,
  },
    sideButton: {
  width: 50,
  alignItems: 'center',
},
 resetButton: {
    backgroundColor: '#CC3333', // deep red
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  resetButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },


// toggle stuff
toggleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
  width: '100%',
},
toggleLabel: {
  color: 'white',
  fontSize: 16,
},
  divider: {
  height: 4,
  backgroundColor: "#0ff", // or white, gray, etc.
   marginVertical: 5, // spacing above and below the line
  width: '100%',
},
scrollViewContent: {
    paddingBottom: 20,  // add space below scroll content for comfortable scrolling
  },
  modalHeaderBig: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0ff",
    marginBottom: 12,
  },
  modalHeaderMedium: {
    fontSize: 22,
    fontWeight: "bold",
    color: "yellow",
    marginBottom: 12,
  },
   modalDescriptionBig: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  closeButtonBig: {
    backgroundColor: "#0f0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: "center",
  },
  closeButtonTextBig: {
    color: "#000",
    fontWeight: "bold",
  },
   profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18, // makes it circular
    borderWidth: 1,
    borderColor: '#fff',
  },

  absoluteDiceWrapper: {
    position: 'absolute',
    right: 10,
    top: '55%',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)', // Temporary for visibility
    padding: 10,
    borderRadius: 10,
  },
  diceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  die: {
    width: 60,
    height: 60,
    marginVertical: 5,
    resizeMode: 'contain',
    backgroundColor: '#111', // Helps visually spot missing images
  },
  rollButton: {
    backgroundColor: '#228822',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});