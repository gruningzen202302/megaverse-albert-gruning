import Emoji from "./assets/emojiPixels"
import Model from "./model/model"
import Secrets from "./secrets"

const rowCount = Model.rows
const columnCount = Model.columns
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
    
    //console.log("polyanets")
    //console.log(polyanets)
    return polyanets
  },
}

export default DrawStrategy
