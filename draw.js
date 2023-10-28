import { Alert } from "react-native"
import Emoji from "./assets/emojiPixels"
import Model from "./model/model"
import Secrets from "./secrets"
import GoalResponse from "./files/goal-response.json"
//import { test, expect } from '@jest/globals'


const rowCount = Model.logoRows
const columnCount = Model.logoColumns
const columnOffset = columnCount - 1
const half = Math.floor(columnCount / 2)
const margin = 1

const DrawStrategy = {
  init: () => {
    let grid = []
    for (let row = 0; row < rowCount; row++) {
      grid[row] = []
      for (let column = 0; column < columnCount; column++) {
        grid[row][column] = Emoji.milky
      }
    }
    grid[rowCount] = []

    for (let index = 0; index < Math.ceil(columnCount / 2) - 2; index++) {
      grid[rowCount][index] = index.toString().padStart(3, "|")
    }
    grid[rowCount][0] = "00"

    //grid[0][30] = Emoji.planet// use to calibrate
    //grid[30][0] = Emoji.planet// use to calibrate
    return grid
  },
  initSmall: () => {
    let grid = []
    for (let row = 0; row < rowCount; row++) {
      grid[row] = []
      for (let column = 0; column < columnCount; column++) {
        grid[row][column] = Emoji.milky
      }
    }
    // grid[0][11] = Emoji.planet// use to calibrate
    // grid[11][0] = Emoji.planet// use to calibrate
    return grid
  },
  polyanets: () => {
    let theGrid = DrawStrategy.init()
    for (let row = 0; row < half; row++) {
      for (let column = 0; column < half; column++) {
        let opposite = columnOffset - column
        const conditionsForTheShape =
          row === column && column > margin && row > margin
        if (conditionsForTheShape) {
          theGrid[row][column] = Emoji.planet
          theGrid[row][opposite] = Emoji.planet
          theGrid[opposite][column] = Emoji.planet
          theGrid[opposite][opposite] = Emoji.planet
        }
      }
    }
    theGrid[half][half] = Emoji.planet
    return theGrid
  },
  hintLogo: () => {
    let theGrid = DrawStrategy.init()
    theGrid = DrawStrategy.polyanetsLogo()
    let data = GoalResponse

    let msg = ""
    let ctrl = 15
    for (let y = 0; y < data.goal.length; y++) {
      for (let x = 0; x < data.goal[y].length; x++) {
        if (
          data.goal[y][x] === "POLYANET" &&
          true
          //x>=ctrl
        ) {
          //theGrid[x][y] = Emoji.planet
          theGrid[y][x] = Emoji.white
          msg += "X=" + x + " Y=" + y + ";" + "\n"
        }
      }
    }

    //console.log(msg)
    return theGrid
    //Alert.alert(msg)
  },
  polyanetsLogo: () => {
    let theGrid = DrawStrategy.init()
    let indexLength = Model.logoLength - 1
    let half = Math.ceil(Model.logoLength / 2)
    let halfLeaf = Math.ceil(half / 2) + 1
    let ctrl = 0
    let strategCenterIndex = 7
    marginIndex = margin + 1
    const halfCorner = Math.floor(Model.logoLength / 4)

    for (let x = marginIndex; x < halfCorner; x++) {
      let formula = 2 * (x - 1)
      let y = formula
      let __y = indexLength - y
      let __x = indexLength - x
      let _y_ = indexLength - formula
      let _x_ = indexLength - formula

      console.log("CORNER", "X = ", x, "f(x)= ", formula, "Y=", [y, y + 1])
      theGrid[x][y] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[x][++y] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[x][__y] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[x][--__y] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[y][x] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[--y][x] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[__y][x] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[++__y][x] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[__x][__y] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[__x][--__y] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[__x][y] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[__x][++y] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[y][__x] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[--y][__x] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[__y][__x] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[++__y][__x] = x === ctrl ? Emoji.white : Emoji.planet
    }
    for (let x = strategCenterIndex; x < half; x++) {
      if (x > halfLeaf) y = x - halfLeaf

      let formula = x < halfLeaf ? x / 2 : (half + 1 - x) / 2
      formula = Math.ceil(formula)

      let y = x + formula - 1
      let __x = indexLength - x //read it as minus x (not -x variable in JS)
      let __y = indexLength - y

      let _x_ = indexLength - formula
      let _y_ = indexLength - __y
      if (x === 12)
        console.log(
          "X = ",
          x,
          "f(x)= ",
          formula,
          "Y = ",
          y,
          "-X=",
          __x,
          "-Y=",
          __y,
          "Y(c)",
          _y_
        )
      //theGrid[x][y]= x===ctrl ? Emoji.white:Emoji.blue
      theGrid[x][y] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[y][x] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[__x][__y] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[__y][__x] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[x][__y] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[__y][x] = x === ctrl ? Emoji.white : Emoji.planet

      theGrid[y][__x] = x === ctrl ? Emoji.white : Emoji.planet
      theGrid[__x][y] = x === ctrl ? Emoji.white : Emoji.planet
    }
    //DrawStrategy.getFences(5, 8)
    theGrid = DrawStrategy.joinLines(theGrid, 7, 4)
    return theGrid
  },
  polyanetsCoordinates: () => {
    let polyanets = []

    polyanets.push({
      candidateId: Secrets.candidateId,
      row: half,
      column: half,
    })
    let theGrid = DrawStrategy.init()

    for (let row = 0; row < half; row++) {
      for (let column = 0; column < half; column++) {
        let opposite = columnOffset - column
        const conditionsForTheShape =
          row === column && column > margin && row > margin
        if (conditionsForTheShape) {
          //console.log("ROW " + row + " COLUMN " + column)
          let polyanet = Model.polyanet
          polyanet.row = row
          polyanet.column = column
          polyanets.push({
            candidateId: Secrets.candidateId,
            row: row,
            column: column,
          })

          polyanets.push({
            candidateId: Secrets.candidateId,
            row: opposite,
            column: column,
          })

          polyanets.push({
            candidateId: Secrets.candidateId,
            row: row,
            column: opposite,
          })

          polyanets.push({
            candidateId: Secrets.candidateId,
            row: opposite,
            column: opposite,
          })
        }
      }
    }

    return polyanets
  },
  getFences: (x, y) => {
    console.error("fences", x, y)

    let fence = {
      top: [x - 1, y],
      bottom: [x + 1, y],
      left: [x, y - 1],
      right: [x, y + 1],
    }

    let msg = `⬆️ ${fence.top} ⬇️ ${fence.bottom} ⬅️ ${fence.left} ➡️ ${fence.right}`
    console.warn(msg)

    return fence
  },
  joinLines:(theGrid,distance, projection)=>{
    let center = Math.floor(Model.logoLength / 2)
    console.log("center", center)

    let cuadrantOne = theGrid[center - distance][center - distance]
    let cuadrantTwo = theGrid[center + distance][center - distance]
    let cuadrantThree = theGrid[center - distance][center + distance]
    let cuadrantFour = theGrid[center + distance][center + distance]

    //theGrid[center - distance][center - distance] = Emoji.white
    theGrid[center - distance + (projection)][center - distance] = Emoji.red
    theGrid[center - distance][center - distance + projection] = Emoji.red

    theGrid[center - distance][center + distance] = Emoji.white
    theGrid[center - distance][center + distance] = Emoji.white

    theGrid[center + distance][center + distance] = Emoji.white
    theGrid[center + distance][center + distance] = Emoji.white

    theGrid[center + distance][center - distance] = Emoji.white
    theGrid[center + distance][center - distance] = Emoji.white

    return theGrid
  }
}

export default DrawStrategy
