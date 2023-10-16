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
const title = "MEGAVERSE"

const grid = drawGrid(rows, [milkyLine, planetLine], columns)

export default function App() {
  let [isLoading, setIsLoading] = useState(true)
  let [error, setError] = useState()
  let [response, setResponse] = useState()

  useEffect(() => {
    //Api.get
    fetch(Api.btcUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false), setResponse(result)
        },
        (error) => {
          setIsLoading(false)
          setError(error)
        }
      )
  }, [])

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />
    }
    if (error) {
      console.log(error)
      return <Text style={{ color: "red" }}>{error?.toString()}</Text>
    }
    console.log("API response" + response?.bpi?.USD?.rate)
    return (
      <Text style={{ color: "#ccc" }}>
        API GET called + {response?.bpi?.USD?.rate}
      </Text>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{grid}</Text>
      {getContent()}
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
