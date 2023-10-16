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

let DrawStrategy = {
  draw: (rowCount, grid, lines, columnCount) => {
    const columnOffset = columnCount - 1
    const half = Math.floor(columnCount / 2)
    const margin = 1

    for (let row = 0; row < rowCount; row++) {
      grid[row] = []
      for (let column = 0; column < columnCount; column++) {
        grid[row][column] = emoji.milky
      }
    }
    for (let row = 0; row < half; row++) {
      for (let column = 0; column < half; column++) {
        let opposite = columnOffset - column
        const conditionsForTheShape =
          row === column && column > margin && row > margin
        if (conditionsForTheShape) {
          grid[row][column] = emoji.planet
          grid[row][opposite] = emoji.planet
          grid[opposite][column] = emoji.planet
          grid[opposite][opposite] = emoji.planet
        }
      }
    }
    grid[half][half] = emoji.planet
  },
}
export default DrawStrategy
