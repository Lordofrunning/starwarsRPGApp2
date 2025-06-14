import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SideCard = {
  value: number;         // The numeric value (positive or negative)
  flexible: boolean;     // True if ±3 card (player chooses +3 or -3)
  used: boolean;
};

const SIDE_CARD_COUNT = 4;
const WIN_TARGET = 3; // Best of 5 => first to 3 wins

function randomSideCard(): SideCard {
  const type = Math.floor(Math.random() * 3);
  if (type === 2) {
    return { value: 3, flexible: true, used: false };
  } else {
    const val = Math.floor(Math.random() * 6) + 1;
    return { value: type === 0 ? val : -val, flexible: false, used: false };
  }
}

export default function PazaakScreen() {
  // Match state
  const [roundNumber, setRoundNumber] = useState(1);
  const [playerRoundWins, setPlayerRoundWins] = useState(0);
  const [npcRoundWins, setNpcRoundWins] = useState(0);
  const [matchOver, setMatchOver] = useState(false);

  // Round state
  const [playerScore, setPlayerScore] = useState(0);
  const [npcScore, setNpcScore] = useState(0);
  const [playerSideDeck, setPlayerSideDeck] = useState<SideCard[]>([]);
  const [roundOver, setRoundOver] = useState(false);
  const [roundWinner, setRoundWinner] = useState<string | null>(null);

  useEffect(() => {
    if (roundNumber > 5 || playerRoundWins === WIN_TARGET || npcRoundWins === WIN_TARGET) {
      setMatchOver(true);
      return;
    }
    resetRound();
  }, [roundNumber]);

  function resetRound() {
    setPlayerScore(0);
    setNpcScore(0);
    setRoundOver(false);
    setRoundWinner(null);
    const newSideDeck = Array.from({ length: SIDE_CARD_COUNT }, () => randomSideCard());
    setPlayerSideDeck(newSideDeck);
  }

  const drawCard = (): number => Math.floor(Math.random() * 10) + 1;

  const handleDraw = () => {
    if (roundOver || matchOver) return;
    const card = drawCard();
    const newScore = playerScore + card;
    setPlayerScore(newScore);
    if (newScore > 20) {
      handleStand(true); // Auto-stand on bust
    }
  };

  const useSideCard = (index: number) => {
    if (roundOver || matchOver) return;
    const card = playerSideDeck[index];
    if (card.used) return;

    if (card.flexible) {
      Alert.alert(
        'Use Side Card',
        'Choose +3 or -3',
        [
          { text: '+3', onPress: () => applySideCardValue(index, 3) },
          { text: '-3', onPress: () => applySideCardValue(index, -3) },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } else {
      applySideCardValue(index, card.value);
    }
  };

  const applySideCardValue = (index: number, value: number) => {
    setPlayerScore(prev => prev + value);
    setPlayerSideDeck(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], used: true };
      return copy;
    });
  };

  const handleStand = (playerBusted = false) => {
    if (roundOver || matchOver) return;

    let npcTotal = 0;
    while (npcTotal < 16) {
      npcTotal += drawCard();
    }
    setNpcScore(npcTotal);

    let winner = 'Draw';
    if (playerBusted && npcTotal > 20) {
      winner = 'None';
    } else if (playerBusted) {
      winner = 'NPC';
    } else if (npcTotal > 20) {
      winner = 'Player';
    } else if (playerScore > npcTotal) {
      winner = 'Player';
    } else if (npcTotal > playerScore) {
      winner = 'NPC';
    }

    setRoundWinner(winner);
    setRoundOver(true);

    if (winner === 'Player') setPlayerRoundWins(prev => prev + 1);
    else if (winner === 'NPC') setNpcRoundWins(prev => prev + 1);

    Alert.alert(
      'Round Over',
      `Winner: ${winner}\nPlayer: ${playerScore} | NPC: ${npcTotal}`,
      [
        { text: 'Next Round', onPress: () => setRoundNumber(prev => prev + 1), style: 'default' },
      ]
    );
  };

  const handleResetMatch = () => {
    setRoundNumber(1);
    setPlayerRoundWins(0);
    setNpcRoundWins(0);
    setMatchOver(false);
    resetRound();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🃏 Pazaak - Best of 5</Text>

      <Text style={styles.score}>
        Round: {roundNumber > 5 || matchOver ? 'Match Over' : roundNumber} {'\n'}
        Player Wins: {playerRoundWins} | NPC Wins: {npcRoundWins}
      </Text>

      {matchOver ? (
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.matchOverText}>
            {playerRoundWins > npcRoundWins ? '🎉 You won the match!' : '😞 NPC won the match!'}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetMatch}>
            <Text style={styles.resetButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Player Score Box */}
          <View style={styles.scoreBox}>
            <Text style={styles.scoreBoxText}>Player Score: {playerScore}</Text>
          </View>

          <Text style={styles.score}>NPC Score: {roundOver ? npcScore : '???'}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, roundOver && styles.disabledButton]} disabled={roundOver} onPress={handleDraw}>
              <Text style={styles.buttonText}>Draw Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, roundOver && styles.disabledButton]} disabled={roundOver} onPress={() => handleStand()}>
              <Text style={styles.buttonText}>Stand</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>Side Deck (Use once per round)</Text>
          <View style={styles.buttonRow}>
            {playerSideDeck.map((card, i) => {
              const used = card.used;
              const display = card.flexible ? '±3' : card.value > 0 ? `+${card.value}` : `${card.value}`;
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.sideCardButton, used && styles.sideCardUsed]}
                  disabled={used || roundOver}
                  onPress={() => useSideCard(i)}
                >
                  <Text style={[styles.sideCardText, used && styles.sideCardTextUsed]}>{display}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {roundOver && (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={styles.resetButton} onPress={() => setRoundNumber(prev => prev + 1)}>
                <Text style={styles.resetButtonText}>Next Round</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#feda4a',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
    textAlign: 'center',
  },
  scoreBox: {
    backgroundColor: '#222',
    borderWidth: 2,
    borderColor: '#feda4a',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginVertical: 10,
    minWidth: 180,
    alignItems: 'center',
  },
  scoreBoxText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#feda4a',
  },
  matchOverText: {
    fontSize: 24,
    color: '#0f0',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#feda4a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    fontSize: 20,
    color: '#aaa',
    marginBottom: 10,
    textAlign: 'center',
  },
  sideCardButton: {
    backgroundColor: '#444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 6,
    minWidth: 50,
    alignItems: 'center',
  },
  sideCardUsed: {
    backgroundColor: '#222',
  },
  sideCardText: {
    color: '#feda4a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sideCardTextUsed: {
    color: '#555',
    textDecorationLine: 'line-through',
  },
  resetButton: {
    backgroundColor: '#feda4a',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});