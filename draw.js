import Emoji from "./assets/emojiPixels"

let DrawStrategy = {
  draw: (rowCount, grid, lines, columnCount) => {
    const columnOffset = columnCount - 1
    const half = Math.floor(columnCount / 2)
    const margin = 1

    for (let row = 0; row < rowCount; row++) {
      grid[row] = []
      for (let column = 0; column < columnCount; column++) {
        grid[row][column] = Emoji.milky
      }
    }
    for (let row = 0; row < half; row++) {
      for (let column = 0; column < half; column++) {
        let opposite = columnOffset - column
        const conditionsForTheShape =
          row === column && column > margin && row > margin
        if (conditionsForTheShape) {
          grid[row][column] = Emoji.planet
          grid[row][opposite] = Emoji.planet
          grid[opposite][column] = Emoji.planet
          grid[opposite][opposite] = Emoji.planet
        }
      }
    }
    grid[half][half] = Emoji.planet
  },
}
export default DrawStrategy
