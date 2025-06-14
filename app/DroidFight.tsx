import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

type IconData = {
  id: number;
  appearedAt: number;
  tapped: boolean;
  x: number;
  y: number;
};

const ICON_SIZE = 50;
const ICON_LIFETIME = 1000;
const SPAWN_INTERVAL = 700;
const MIN_DISTANCE = 60;

export default function TwoPlayerGame() {
   
  const [playing, setPlaying] = useState(false);
  const [winner, setWinner] = useState<"P1" | "P2" | null>(null);
const [topIcons, setTopIcons] = useState<IconData[]>([]);
const [bottomIcons, setBottomIcons] = useState<IconData[]>([]);

  // Settings
  const [endScore, setEndScore] = useState(20);
  const [spawnSpeed, setSpawnSpeed] = useState(700);
  const [randomSpawnCount, setRandomSpawnCount] = useState(true);

  const startGame = () => {
    setWinner(null);
    setPlaying(true);
  };

  const handleWin = (who: "P1" | "P2") => {
    setWinner(who);
    setPlaying(false);

    // Optional: Auto return to menu after 3 seconds
    setTimeout(() => {
      setWinner(null);
    }, 3000);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* GAME LAYER — always rendered */}
      <GameArea
        playing={playing}
        endScore={endScore}
        spawnSpeed={spawnSpeed}
        randomSpawnCount={randomSpawnCount}
        onWin={handleWin}
      />

      {/* MENU / WINNER OVERLAY */}
      {(winner !== null || !playing) && (
        <View style={styles.menuOverlay}>
          {winner ? (
            <View style={styles.menuBox}>
              <Text style={styles.title}>
                {winner === "P1" ? "Player 1 Wins!" : "Player 2 Wins!"}
              </Text>
              <Text style={styles.label}>Returning to menu...</Text>
            </View>
          ) : (
            <View style={styles.menuBox}>
              <Text style={styles.title}>2 Player Reaction Game</Text>

              <Text style={styles.label}>End Score</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={endScore.toString()}
                onChangeText={(text) => setEndScore(Number(text))}
              />

              <Text style={styles.label}>Spawn Speed (ms)</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={spawnSpeed.toString()}
                onChangeText={(text) => setSpawnSpeed(Number(text))}
              />

              <View style={styles.row}>
                <Text style={styles.label}>Random Spawn Count</Text>
                <Switch value={randomSpawnCount} onValueChange={setRandomSpawnCount} />
              </View>

              <TouchableOpacity onPress={startGame} style={styles.startButton}>
                <Text style={styles.startText}>Start Game</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
function GameArea({
  playing,
  endScore,
  spawnSpeed,
  randomSpawnCount,
  onWin,
}: {
  playing: boolean;
  endScore: number;
  spawnSpeed: number;
  randomSpawnCount: boolean;
  onWin: (who: "P1" | "P2") => void;
}) {
  const [scoreP1, setScoreP1] = useState(0);
  const [scoreP2, setScoreP2] = useState(0);
  const [topIcons, setTopIcons] = useState<IconData[]>([]);
  const [bottomIcons, setBottomIcons] = useState<IconData[]>([]);
  const iconIdRef = useRef(0);

  useEffect(() => {
    if (!playing) {
      setScoreP1(0);
      setScoreP2(0);
      setTopIcons([]);
      setBottomIcons([]);
      return;
    }

    const interval = setInterval(() => {
      spawnIcons(setTopIcons, 0, height / 2);
      spawnIcons(setBottomIcons, height / 2, height);
    }, spawnSpeed);

    const cleaner = setInterval(() => {
      const now = Date.now();
      setTopIcons((icons) => icons.filter((icon) => now - icon.appearedAt < ICON_LIFETIME && !icon.tapped));
      setBottomIcons((icons) => icons.filter((icon) => now - icon.appearedAt < ICON_LIFETIME && !icon.tapped));
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(cleaner);
    };
  }, [playing, spawnSpeed]);

  useEffect(() => {
    if (scoreP1 >= endScore) onWin("P1");
    else if (scoreP2 >= endScore) onWin("P2");
  }, [scoreP1, scoreP2]);

  function spawnIcons(setIcons: Function, minY: number, maxY: number) {
    const count = randomSpawnCount ? Math.floor(Math.random() * 2) + 1 : 1;
    setIcons((prev: IconData[]) => {
      const newIcons: IconData[] = [];
      for (let i = 0; i < count; i++) {
        iconIdRef.current++;
        newIcons.push({
          id: iconIdRef.current,
          appearedAt: Date.now(),
          tapped: false,
          x: Math.random() * (width - ICON_SIZE),
          y: minY + Math.random() * (maxY - minY - ICON_SIZE),
        });
      }
      return [...prev, ...newIcons];
    });
  }

  const handleTap = (iconId: number, area: "top" | "bottom") => {
    const now = Date.now();
    const setIcons = area === "top" ? setTopIcons : setBottomIcons;
    const icons = area === "top" ? topIcons : bottomIcons;

    const tappedIcon = icons.find((icon) => icon.id === iconId);
    if (!tappedIcon || tappedIcon.tapped) return;

    const timeAlive = now - tappedIcon.appearedAt;
    const points = timeAlive < 300 ? 3 : timeAlive < 600 ? 2 : 1;

    if (area === "top") {
      setScoreP1((s) => s + points);
    } else {
      setScoreP2((s) => s + points);
    }

    setIcons((prev: IconData[]) =>
      prev.map((icon) =>
        icon.id === iconId ? { ...icon, tapped: true } : icon
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      
      <View style={styles.topHalf}>
        <Text style={styles.scoreText}>Player 1: {scoreP1}</Text>
        {topIcons.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            style={[
              styles.icon,
              { top: icon.y, left: icon.x, backgroundColor: icon.tapped ? "#888" : "#feda4a" },
            ]}
            onPress={() => handleTap(icon.id, "top")}
          >
            <Text style={styles.iconText}>🎯</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomHalf}>
        <Text style={styles.scoreText}>Player 2: {scoreP2}</Text>
        {bottomIcons.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            style={[
              styles.icon,
              { top: icon.y - height / 2, left: icon.x, backgroundColor: icon.tapped ? "#888" : "#4af" },
            ]}
            onPress={() => handleTap(icon.id, "bottom")}
          >
            <Text style={styles.iconText}>🎯</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  topHalf: {
    height: height / 2,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    position: "relative",
  },
  bottomHalf: {
    height: height / 2,
    position: "relative",
  },
  icon: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#feda4a",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 28,
  },
  scoreText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 8,
  },
   menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuBox: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  title: {
    fontSize: 22,
    color: "#feda4a",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#feda4a",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  startText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  winnerBox: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  winnerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  winnerSubText: {
    color: "#bbb",
    marginTop: 10,
  },

});