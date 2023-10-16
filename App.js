import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View , ActivityIndicator} from "react-native"
import { useState, useEffect } from "react"

import DrawStrategy from "./draw"
import Emoji from "./assets/emojiPixels"
import Api from "./assets/api"

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

const milkyLine = drawLine(Emoji.milky, columns)
const planetLine = drawLine(Emoji.planet, columns)

const drawGrid = (rowCount, lines, columns) => {
  let grid = []
  DrawStrategy.draw(rows, grid, lines, columns)
  return grid
}
const title = Api.post //"MEGAVERSE"

const grid = drawGrid(rows, [milkyLine, planetLine], columns)
export default function App() {
  let [isLoading, setIsLoading] = useState(true)
  let [error, setError] = useState()
  let [response, setResponse] = useState()

  const getContent = () => {
    return <ActivityIndicator size="large" />
  }
  return (
    <View style={styles.container}>
      {getContent()}
      <Text style={styles.text}>{title}</Text>
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
