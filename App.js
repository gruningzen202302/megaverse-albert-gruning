import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const milky = "\u{1F30C}";
const planet = "\u{1FA90}"

const emoji = {
  milky: milky,
  planet: planet,
}

const columns = 11
const rows = 11

let matrix = []

const drawpixel = (arr, mil) => arr.push(mil)
const drawRaw = (mat, row) => mat.push(row)

const drawLine = (emoji, columns) => {
  let line = []
  for (let position = 0; position < columns; position++) {
    drawpixel(line, emoji)
  }
  return line
}

const milkyLine = drawLine(emoji.milky, columns)
const planetLine = drawLine(emoji.planet, columns)

const drawStrategy = (rowCount, grid, lines) => {
  for (let rawPosition = 0; rawPosition < rowCount; rawPosition++) {
    if (rawPosition % 2 === 0) {
      drawRaw(grid, lines[0])
    } else {
      drawRaw(grid, lines[1])
    }
  }
}
const drawGrid = (rowCount, lines) => {
  let grid = []
  drawStrategy(rows, grid, lines)
  return grid
}
const grid = drawGrid(rows, [milkyLine, planetLine])

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{grid}</Text>
      <StatusBar style="auto" />
    </View>
  )
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
})

