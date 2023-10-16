import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const milky = "\u{1F30C}"
const planet = "\u{1FA90}"
const purple = "\u{1F7E3}"
const yellow = "\u{1F7E1}"

const emoji = {
  milky: milky,
  planet: planet,
  purple: purple,
  yellow: yellow,
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

const drawStrategy = (rowCount, grid, lines, columnCount) => {
  const columnOffset = columnCount - 1
  const half = Math.floor(columnCount / 2)
  const margin = 1

  for (let row = 0; row < rowCount; row++) {
    grid[row] = []
    for (let column = 0; column < columnCount; column++) {
      grid[row][column] = emoji.milky
    }
  }
  for (let row = 0; row < half; row++) {
    for (let column = 0; column < half; column++) {
      let opposite = columnOffset - column
      const conditionsForTheShape =
        row === column && column > margin && row > margin
      if (conditionsForTheShape) {
        grid[row][column] = emoji.planet
        grid[row][opposite] = emoji.planet
        grid[opposite][column] = emoji.planet
        grid[opposite][opposite] = emoji.planet
      }
    }
  }
  grid[half][half] = emoji.planet
}

const drawGrid = (rowCount, lines, columns) => {
  let grid = []
  drawStrategy(rows, grid, lines, columns)
  return grid
}

const grid = drawGrid(rows, [milkyLine, planetLine], columns)
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
    //padding: "8%",
  },
  text: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "bold",
  },
})

