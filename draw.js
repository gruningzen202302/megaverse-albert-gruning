import Emoji from "./assets/emojiPixels"
import Model from "./model/model"
import Secrets from "./secrets"

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
  polyanetsLogo:()=>{
    let theGrid = DrawStrategy.init()
    let indexLength = Model.logoLength-1
    let half = Math.ceil(Model.logoLength/2)
    let halfLeaf = Math.ceil(half/2) + 1
    marginIndex= margin + 1
      for (let x = marginIndex; x < half; x++) {
        //if(x<margin) continue
        if(x>halfLeaf) y = x - halfLeaf
        
        let formula = x < halfLeaf ? (x/2):(((half + 1) - x)/2)
        formula = Math.ceil(formula)
        
        let y= x+formula -1
        console.log('X = ',x,'f(x)= ',formula , 'Y = ',y)
        
        theGrid[x][y]= x===14 ? Emoji.white:Emoji.planet
        theGrid[y][x]= x===14 ? Emoji.white:Emoji.planet
        theGrid[indexLength-x][indexLength -y]= x===14 ? Emoji.white:Emoji.planet
        theGrid[indexLength-y][indexLength -x]= x===14 ? Emoji.white:Emoji.planet

        //theGrid[formula+half][(Model.logoLength-1)-margin-x]= x===14 ? Emoji.red:Emoji.planet



        //theGrid[x][x+formula]= Emoji.planet
        //theGrid[x+ (half-2)][x+formula+(half-2)]= Emoji.planet
        //theGrid[x+formula+(half-2)][x+ (half-2)]= Emoji.planet

      }
      theGrid[14][0] = Emoji.white
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
