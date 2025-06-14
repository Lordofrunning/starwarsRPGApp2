import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
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

export default function TopHalfReactionGame() {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [bottomIcons, setBottomIcons] = useState<IconData[]>([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const iconId = useRef(0);

  function isPositionValid(x: number, y: number, icons: IconData[]) {
    for (const icon of icons) {
      const dx = icon.x - x;
      const dy = icon.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE) return false;
    }
    return true;
  }

  function getRandomPosition(top: number, bottom: number, existing: IconData[]) {
    let x, y, tries = 0;
    do {
      x = Math.random() * (width - ICON_SIZE);
      y = top + Math.random() * (bottom - top - ICON_SIZE);
      tries++;
      if (tries > 30) break;
    } while (!isPositionValid(x, y, existing));
    return { x, y };
  }

  function spawnIcons() {
    const count = Math.floor(Math.random() * 3) + 1;
    setIcons((current) => {
      const newIcons: IconData[] = [];
      for (let i = 0; i < count; i++) {
        iconId.current++;
        const pos = getRandomPosition(0, height / 2, [...current, ...newIcons]);
        newIcons.push({
          id: iconId.current,
          appearedAt: Date.now(),
          tapped: false,
          x: pos.x,
          y: pos.y,
        });
      }
      return [...current, ...newIcons];
    });
  }

  function spawnBottomIcons() {
    const count = Math.floor(Math.random() * 3) + 1;
    setBottomIcons((current) => {
      const newIcons: IconData[] = [];
      for (let i = 0; i < count; i++) {
        iconId.current++;
        const pos = getRandomPosition(height / 2, height, [...current, ...newIcons]);
        newIcons.push({
          id: iconId.current,
          appearedAt: Date.now(),
          tapped: false,
          x: pos.x,
          y: pos.y,
        });
      }
      return [...current, ...newIcons];
    });
  }

  useEffect(() => {
    const cleaner = setInterval(() => {
      const now = Date.now();
      setIcons((current) =>
        current.filter((icon) => now - icon.appearedAt < ICON_LIFETIME && !icon.tapped)
      );
      setBottomIcons((current) =>
        current.filter((icon) => now - icon.appearedAt < ICON_LIFETIME && !icon.tapped)
      );
    }, 200);
    return () => clearInterval(cleaner);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnIcons, SPAWN_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnBottomIcons, SPAWN_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleIconTap = (id: number, isTop: boolean) => {
    const now = Date.now();
    if (isTop) {
      setIcons((prev) =>
        prev.map((icon) => {
          if (icon.id === id && !icon.tapped) {
            const timeAlive = now - icon.appearedAt;
            const score = timeAlive < 300 ? 3 : timeAlive < 600 ? 2 : 1;
            setPlayer1Score((s) => s + score);
            return { ...icon, tapped: true };
          }
          return icon;
        })
      );
    } else {
      setBottomIcons((prev) =>
        prev.map((icon) => {
          if (icon.id === id && !icon.tapped) {
            const timeAlive = now - icon.appearedAt;
            const score = timeAlive < 300 ? 3 : timeAlive < 600 ? 2 : 1;
            setPlayer2Score((s) => s + score);
            return { ...icon, tapped: true };
          }
          return icon;
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.topHalf}>
        <Text style={styles.scoreText}>P1: {player1Score}</Text>
        {icons.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            style={[styles.icon, { left: icon.x, top: icon.y }]}
            onPress={() => handleIconTap(icon.id, true)}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>🎯</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomHalf}>
        <Text style={styles.scoreText}>P2: {player2Score}</Text>
        {bottomIcons.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            style={[styles.icon, { left: icon.x, top: icon.y - height / 2 }]} // shift y upward since it's inside bottomHalf
            onPress={() => handleIconTap(icon.id, false)}
            activeOpacity={0.7}
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