import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const milky = "\u{1F30C}";
const planet = "\u{1FA90}";
const columns = 11;
const rows = 11;

let matrix = [];

const drawpixel = (arr, mil) => arr.push(mil);
const drawRaw = (mat, row) => mat.push(row);

const drawLine = (emoji, columns) => {
  let line = [];
  for (let position = 0; position < columns; position++) {
    drawpixel(line, emoji);
  }
  return line;
};

const milkyLine = drawLine(milky, columns);
const planetLine = drawLine(planet, columns);

const drawGrid = () => {
  for (let i = 0; i < rows; i++) {
    if (i % 2 === 0) {
      drawRaw(matrix, milkyLine);
    } else {
      drawRaw(matrix, planetLine);
    }
  }
};
drawGrid();

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{matrix}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#307BAA",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  text: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "bold",
  },
});
