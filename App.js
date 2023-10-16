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

const drawStrategy = (rowCount, grid, lines, columns) => {
  const columnOffset = columns + 1
  for (let row = 0; row < rowCount; row++) {
    grid[row] = []
    for (let column = 0; column < Math.floor(columns / 2); column++) {
      let oppositeColumn = columnOffset - column
      grid[row][column] = emoji.milky
      grid[row][oppositeColumn] = emoji.planet
    }
  }

  // for (let rawPosition = 0; rawPosition < rowCount; rawPosition++) {
  //   lines[0][0] = emoji.purple
  //   lines[0][1] = emoji.yellow
  //   if (rawPosition % 2 === 0) {
  //     drawRaw(grid, lines[0])
  //   } else {
  //     drawRaw(grid, lines[1])
  //   }
  // }
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
  },
  text: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "bold",
  },
})

