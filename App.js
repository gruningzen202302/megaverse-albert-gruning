import { StatusBar } from "expo-status-bar"
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
} from "react-native"
import { useState, useEffect } from "react"

import DrawStrategy from "./draw"
import Emoji from "./assets/emojiPixels"
import Api from "./api"
import Model from "./model/model"

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

const milkyLine = drawLine(Emoji.milky, Model.columns)
const planetLine = drawLine(Emoji.planet, Model.columns)

const drawGrid = (rowCount, lines, columns) => {
  let grid = []
  DrawStrategy.draw(Model.rows, grid, lines, Model.columns)
  return grid
}
const title = "MEGAVERSE"

const grid = drawGrid(Model.rows, [milkyLine, planetLine], Model.columns)

export default function App() {
  let [row, setRow] = useState(0)
  let [column, setColumn] = useState(0)
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
  const Apiget = () => {
    console.warn("testing API GET effects")
  }
  useEffect(() => {
    Apiget()
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
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Row "
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => setRow(value)}
        ></TextInput>
        <TextInput
          placeholder="Column "
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => setColumn(value)}
        ></TextInput>
      </View>
      <Text style={styles.text}>{grid}</Text>
      {getContent()}
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Delete"
          color="red"
          margin="15"
          padding="15"
          onPress={() => Alert.alert("R U sure ?")}
        />
        <Button
          title="Post"
          style={styles.button}
          onPress={() => Alert.alert("P O S T")}
        ></Button>
      </View>
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
  input: {
    //alignSelf: "stretch",
    width: "50%",
    margin: 8,
    padding: 4,
    backgroundColor: "#ccc",
    fontWeight: "bold",
    fontSize: 15,
  },
})
