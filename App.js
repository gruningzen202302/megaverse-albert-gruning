import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View , ActivityIndicator} from "react-native"
import DrawStrategy from "./draw"
import { useState , useEffect} from "react"

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

const drawGrid = (rowCount, lines, columns) => {
  let grid = []
  DrawStrategy.draw(rows, grid, lines, columns)
  return grid
}
const title = "MEGAVERSE"

const grid = drawGrid(rows, [milkyLine, planetLine], columns)
export default function App() {
  let [isLoading, setIsLoading] = useState(false)
  let [error, setError]= useState()
  let [response, setResponse] = useState()

  const getContent =()=>{
    return <ActivityIndicator size="large"/>
  }
  return (
    <View style={styles.container}>
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
