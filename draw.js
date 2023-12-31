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

    let msg = "💚 THE GOAL 💚: \n"
    let ctrl = 15
    for (let y = 0; y < data.goal.length; y++) {
      for (let x = 0; x < data.goal[y].length; x++) {
        if (
          data.goal[y][x] === "POLYANET" &&
          true
          //x>=ctrl
        ) {
          //theGrid[x][y] = Emoji.planet
          theGrid[y][x] = Emoji.hint
          msg += "X=" + x + " Y=" + y + ";" + "\n"
        }
      }
    }
    msg += "💚💚💚💚💚: \n"
    console.log(msg)
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

      theGrid[x][y]= x===ctrl ? Emoji.white:Emoji.blue
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
    const logoPixels = DrawStrategy.getJsonForLogo(theGrid)
    //theGrid = DrawStrategy.drawEmojis(theGrid, logoPixels)
    return theGrid
  },
  getJsonForLogo: (theGrid) => {
    let logoPixels = []

    logoPixels.push({
      candidateId: Secrets.candidateId,
      row: half,
      column: half,
    })

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
          logoPixels.push({
            candidateId: Secrets.candidateId,
            row: row,
            column: column,
          })

          logoPixels.push({
            candidateId: Secrets.candidateId,
            row: opposite,
            column: column,
          })

          logoPixels.push({
            candidateId: Secrets.candidateId,
            row: row,
            column: opposite,
          })

          logoPixels.push({
            candidateId: Secrets.candidateId,
            row: opposite,
            column: opposite,
          })
        }
      }
    }

    return logoPixels
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
    //console.error("fences", x, y)

    let fence = {
      top: [x - 1, y],
      bottom: [x + 1, y],
      left: [x, y - 1],
      right: [x, y + 1],
      cornerTopLeft: [x - 1, y - 1],
      cornerTopRight: [x - 1, y + 1],
      cornerBottomLeft: [x + 1, y - 1],
      cornerBottomRight: [x + 1, y + 1],
    }

    let msg = `⬆️ ${fence.top} ⬇️ ${fence.bottom} ⬅️ ${fence.left} ➡️ ${fence.right}`
    //console.warn(msg)

    return fence
  },
  joinLines: (theGrid, distance, projection) => {
    let center = Math.floor(Model.logoLength / 2)

    let negative = (value) => -1 * value
    let getPixelsForUpCuadrantFour = (center, distance) => [
      center + distance + negative(projection),
      center - distance,
      center + distance,
      center - distance + projection,
    ]

    theGrid[center - distance + projection][center - distance] = Emoji.planet
    theGrid[center - distance][center - distance + projection] = Emoji.planet

    theGrid[center - distance][center + distance + negative(projection)] =
      Emoji.planet
    theGrid[center - distance + projection][center + distance] = Emoji.planet

    theGrid[center + distance + negative(projection)][center + distance] =
      Emoji.planet
    theGrid[center + distance][center + distance + negative(projection)] =
      Emoji.planet

    const [q4topX, q4topY, q4rightX, q4rightY] = getPixelsForUpCuadrantFour(
      center,
      distance
    )
    theGrid[q4topX][q4topY] = Emoji.planet
    theGrid[q4rightX][q4rightY] = Emoji.planet

    return theGrid
  },
  fillConstellation: (theGrid) => {

    theGrid= DrawStrategy.init()
    theGrid = DrawStrategy.polyanetsLogo()
    let countSol = 0
    let countSolInTheGrid = 0
    let countComeths = 0
    let countComethsInTheGrid = 0
    let msg = ""
    //let polyCoordinates

    const goalResponse = GoalResponse
    for (let y = 0; y < goalResponse.goal.length; y++) {
      for (let x = 0; x < goalResponse.goal[y].length; x++) {
        let pixel = goalResponse.goal[y][x]
        if (pixel.endsWith("COMETH")) countComeths++
        else if (pixel.endsWith("SOLOON")) countSol++
      }
    }


    const emojisTotal = countSol + countComeths
    let emojisDrawn = 0

    let soloons = ["WHITE_SOLOON", "RED_SOLOON", "PURPLE_SOLOON", "BLUE_SOLOON"]
    let comeths = ["LEFT_COMETH", "RIGHT_COMETH", "UP_COMETH", "DOWN_COMETH"]

    let currentSoloon = 0
    let currentCometh = 0

    const checkForNeighbours = (polyanetFence, saloonFence) => {
      for (const property in polyanetFence) {
        if (saloonFence.hasOwnProperty(property))
          if (polyanetFence[property] === saloonFence[property]) return true
          else return false
      }
    }

    while (emojisDrawn < emojisTotal) {
      let randX = Math.floor(Math.random() * (Model.logoArrayIndexSize - 1))
      let randY = Math.floor(Math.random() * (Model.logoArrayIndexSize - 1))

      let neighbours = false

      let soloonFence = DrawStrategy.getFences(randX, randY)
      let conditionsForFillPixels =
        soloonFence.top[0] != undefined &&
        soloonFence.top[0] < Model.logoArrayIndexSize &&
        soloonFence.top[1] != undefined &&
        soloonFence.top[1] < Model.logoArrayIndexSize &&
        randX > 0 &&
        randY > 0 &&
        theGrid[randX][randY] !== Emoji.planet

      if (conditionsForFillPixels) {
        let conditionsForSoloons =
          (theGrid[soloonFence.top[0]][soloonFence.top[1]] === Emoji.planet ||
            theGrid[soloonFence.cornerTopRight[0]][
              soloonFence.cornerTopRight[1]
            ] === Emoji.planet ||
            theGrid[soloonFence.right[0]][soloonFence.right[1]] ===
              Emoji.planet ||
            theGrid[soloonFence.cornerBottomRight[0]][
              soloonFence.cornerBottomRight[1]
            ] === Emoji.planet ||
            theGrid[soloonFence.bottom[0]][soloonFence.bottom[1]] ===
              Emoji.planet ||
            theGrid[soloonFence.cornerBottomLeft[0]][
              soloonFence.cornerBottomLeft[1]
            ] === Emoji.planet ||
            theGrid[soloonFence.left[0]][soloonFence.left[1]] ===
              Emoji.planet ||
            theGrid[soloonFence.cornerTopLeft[0]][
              soloonFence.cornerTopLeft[1]
            ] === Emoji.planet) &&
          countSolInTheGrid <= countSol

        if (conditionsForSoloons) {
          if (currentSoloon > soloons.length - 1) currentSoloon = 0
          else {
            theGrid[randX][randY] = Emoji.soloons[currentSoloon]
            currentSoloon++
          }
          countSolInTheGrid++
        } else {
          if (countComethsInTheGrid >= countComeths) continue
          if (currentCometh > comeths.length - 1) currentCometh = 0
          else {
            currentCometh++
          }
          theGrid[randX][randY] = Emoji.cometh 
          countComethsInTheGrid++
        }
      }
      emojisDrawn++
    }

    return theGrid
  },
  drawEmojis: (theGrid, logoPixels) => {
    let countSol = 0
    let countSolInTheGrid = 0
    let countComeths = 0
    let msg = ""
    const goalResponse = GoalResponse
    for (let y = 0; y < goalResponse.goal.length; y++) {
      for (let x = 0; x < goalResponse.goal[y].length; x++) {
        let pixel = goalResponse.goal[y][x]
        if (pixel.endsWith("COMETH")) countComeths++
        else if (pixel.endsWith("SOLOON")) countSol++
      }
    }

    const emojisTotal = countSol + countComeths
    let emojisDrawn = 0

    let soloons = ["WHITE_SOLOON", "RED_SOLOON", "PURPLE_SOLOON", "BLUE_SOLOON"]
    let comeths = ["LEFT_COMETH", "RIGHT_COMETH", "UP_COMETH", "DOWN_COMETH"]

    const checkForNeighbours = (polyanetFence, saloonFence) => {
      for (const property in polyanetFence) {
        if (saloonFence.hasOwnProperty(property))
          if (polyanetFence[property] === saloonFence[property]) return true
          else return false
      }
    }

    while (emojisDrawn < 3) {
      console.log("emojisDrawn", emojisDrawn)

      //emojisTotal) {
      let randX = Math.floor(Math.random() * Model.logoArrayIndexSize)
      let randY = Math.floor(Math.random() * Model.logoArrayIndexSize)
      let soloonFence = DrawStrategy.getFences(randX, randY)
      let neighbours = false

      console.warn("randX", randX, "randY", randY)
      console.warn("SoloonFence", soloonFence.top)

      //debugger
      console.log(
        "Grid coordinates ",
        "X",
        soloonFence.top[0],
        "Y",
        soloonFence.top[1]
      )
      console.log("Grid " + theGrid[soloonFence.top[0]][soloonFence.top[1]])
      conditionsForSoloons = theGrid[randX][randY] !== Emoji.planet //&&
      //countSolInTheGrid < countSol &&

      console.log("conditionsForSoloons", conditionsForSoloons)
      //debugger //TODO REMOVE
        theGrid[soloonFence.top[0]][soloonFence.top[1]] === Emoji.planet //theGrid[randX-1][randY]//randX - 1 //&&
      //soloonFence.top[1] === Emoji.planet //randY

      if (conditionsForSoloons) {
        theGrid[randX][randY] = Emoji.blue //Emoji[soloons[randEmoji]]
        countSolInTheGrid++
      } else continue
      //debugger
    }

    for (let row = 0; row < rowCount; row++) {
      //theGrid[row] = []
      for (let column = 0; column < columnCount; column++) {
        if (theGrid[row][column] === Emoji.planet) {
          //theGrid[row][column] = Emoji.white
        }
        //theGrid[row][column] = Emoji.white
      }
    }
    emojisDrawn++
    return theGrid
  },
}

export default DrawStrategy
