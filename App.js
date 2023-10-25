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
import Secrets from "./secrets"

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

const title = "MEGAVERSE"

const theGrid = DrawStrategy.init()

export default function App() {
  let [row, setRow] = useState(0)
  let [column, setColumn] = useState(0)
  let [isLoading, setIsLoading] = useState(true)
  let [error, setError] = useState()
  let [nameFromWiki, setNameFromWiki] = useState(undefined)
  let [grid, setGrid] = useState(theGrid)

  const getWiki = async () => {
    let res = await Api.getWiki()
    res = await res.resultWiki
    console.log("once " + res)
    setNameFromWiki(res)
  }

  const crossPolyanetsClick = async () => {
    console.log("crossPolyanetsClick")
    const drawShapeMatrix = DrawStrategy.polyanets()
    console.log(drawShapeMatrix)

    //let res = await Api.getPolyanets()
    console.log("crosPolyanets res from AppJs")
    //console.log(res)
  }

  const postClick = () => {
    polyGrid = DrawStrategy.polyanets()
    let polyanet = Model.polyanet
    polyanet.row = row
    polyanet.column = column
    polyanet.candidateId = Secrets.candidateId
    Api.postPolyanet(polyanet)
    //let res = async () => await
    //Api.drawPolyanet(polyanet)
    setGrid(polyGrid)
    setRow(0)
    setColumn(0)
  }

  useEffect(() => {
    getWiki()
    setIsLoading(false)
  }, [])

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />
    }
    if (error) {
      console.error(error)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {getContent()}
      {
        <Text style={styles.secondaryText}>
          {nameFromWiki ? nameFromWiki : "John Doe"}
        </Text>
      }
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
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Delete"
          color="red"
          margin="15"
          padding="15"
          onPress={() => Alert.alert("R U sure ?")}
        />
        <Button
          title="Polyanets"
          style={styles.button}
          onPress={() => postClick()}
        />
        <Button title="Shape" color="green" onPress={() => crossPolyanetsClick()} />
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
  secondaryText: {
    color: "#FFD700",
    fontSize: 9,
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
