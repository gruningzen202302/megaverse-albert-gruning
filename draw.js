import { Alert } from "react-native"
import Emoji from "./assets/emojiPixels"
import Model from "./model/model"
import Secrets from "./secrets"
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
    grid[rowCount]=[]
    
    for (let index = 0; index < Math.ceil(columnCount/2)-2; index++) {
      grid[rowCount][index] = index.toString().padStart(3, "|");
    }
    grid[rowCount][0]="00"

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
    let data =
    {
        "goal": [
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "RIGHT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "UP_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "WHITE_SOLOON",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "LEFT_COMETH",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "BLUE_SOLOON",
                "POLYANET",
                "POLYANET",
                "PURPLE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "LEFT_COMETH",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "RIGHT_COMETH"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "WHITE_SOLOON",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "DOWN_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "BLUE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "RED_SOLOON",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "PURPLE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "WHITE_SOLOON",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "BLUE_SOLOON",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "PURPLE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "RED_SOLOON",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "UP_COMETH",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "UP_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "PURPLE_SOLOON",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "BLUE_SOLOON",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "LEFT_COMETH",
                "SPACE",
                "SPACE",
                "DOWN_COMETH",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "RIGHT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "WHITE_SOLOON",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "BLUE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "LEFT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "WHITE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "RIGHT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "DOWN_COMETH",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "BLUE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "BLUE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "PURPLE_SOLOON",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "UP_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "PURPLE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "RED_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "WHITE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "RIGHT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "RED_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "WHITE_SOLOON",
                "POLYANET",
                "POLYANET",
                "PURPLE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "RED_SOLOON",
                "POLYANET",
                "POLYANET",
                "BLUE_SOLOON",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "LEFT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "POLYANET",
                "RED_SOLOON",
                "SPACE",
                "SPACE",
                "DOWN_COMETH",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "UP_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "POLYANET",
                "POLYANET",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "DOWN_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "DOWN_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "UP_COMETH",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "LEFT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "RIGHT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "LEFT_COMETH",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ],
            [
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE",
                "SPACE"
            ]
        ]
    }
    let msg =''
    let ctrl = 15
    for (let y = 0; y < data.goal.length; y++) {
        for (let x = 0; x < data.goal[y].length; x++) {
            if (
              data.goal[y][x] === 'POLYANET'
              &&
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
  polyanetsLogo:()=>{
    let theGrid = DrawStrategy.init()
    let indexLength = Model.logoLength-1
    let half = Math.ceil(Model.logoLength/2)
    let halfLeaf = Math.ceil(half/2) + 1
    let ctrl = 0
    let strategCenterIndex = 8
    marginIndex= margin + 1

    for (let x = marginIndex ; x < halfLeaf; x++) {
      let formula = 2*(x-1)
      console.log('CORNER','X = ',x,'f(x)= ',formula)
      let y = x + formula
      


    }
      for (let x = strategCenterIndex; x < half; x++) {
      //for (let x = marginIndex; x < half; x++) {
        //if(x<margin) continue
        if(x>halfLeaf) y = x - halfLeaf
        
        let formula = x < halfLeaf ? (x/2):(((half + 1) - x)/2)
        formula = Math.ceil(formula)
        
        let y= x+formula -1
        let __x = indexLength - x //read it as minus x (not -x variable in JS)
        let __y = indexLength - y

        let _x_ = indexLength - formula
        let _y_ = indexLength - __y
        if(x===12)console.log(
          'X = ',x,
          'f(x)= ',formula , 
          'Y = ',y,
          '-X=', __x,
          '-Y=', __y,
          'Y(c)', _y_
          )
          //theGrid[x][y]= x===ctrl ? Emoji.white:Emoji.blue
          theGrid[x][y]= x===ctrl ? Emoji.white:Emoji.planet
          
          theGrid[y][x]= x===ctrl ? Emoji.white:Emoji.planet
          theGrid[__x][__y]= x===ctrl ? Emoji.white:Emoji.planet
          theGrid[__y][__x]= x===ctrl ? Emoji.white:Emoji.planet
          theGrid[x][__y]= x===ctrl ? Emoji.white:Emoji.planet
          theGrid[__y][x]= x === ctrl ? Emoji.white:Emoji.planet
          
          theGrid[y][__x]= x===ctrl ? Emoji.white:Emoji.planet
          theGrid[__x][y]= x===ctrl ? Emoji.white:Emoji.planet
          
        }
        //theGrid[ctrl][0] = Emoji.white
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
}

export default DrawStrategy
