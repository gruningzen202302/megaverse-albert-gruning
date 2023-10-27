import { test, expect } from '@jest/globals'
import Emoji from "../assets/emojiPixels"
import DrawStrategy from "../draw"
import GoalResponse from "../files/goal-response.json"

    let theGrid1 = DrawStrategy.init()
    theGrid1 = DrawStrategy.polyanetsLogo()
    let theGrid2 = DrawStrategy.init()

    const data1 = GoalResponse

// test('POLYANET appears in the same positions in data1 and data2', () => {
//     for (let y = 0; y < data1.goal.length; y++) {
//         for (let x = 0; x < data1.goal[y].length; x++) {
//             if (data1.goal[y][x] === 'POLYANET') {
//                 console.log(`x: ${x} y: ${y}`)
//                 theGrid2[y][x] = Emoji.planet
//                 expect(theGrid1[y][x]).toBe(theGrid2[y][x])
//             }
//         }
//     }
// })

describe('getFences', () => {
  it('returns an object with top, bottom, left, and right properties', () => {
    const fences = DrawStrategy.getFences(0, 0);
    expect(fences).toHaveProperty('top');
    expect(fences).toHaveProperty('bottom');
    expect(fences).toHaveProperty('left');
    expect(fences).toHaveProperty('right');
  })

  it('returns the correct fence coordinates for the given x and y', () => {
    const fences = DrawStrategy.getFences(2, 3);
    expect(fences.top).toEqual([1, 3]);
    expect(fences.bottom).toEqual([3, 3]);
    expect(fences.left).toEqual([2, 2]);
    expect(fences.right).toEqual([2, 4]);
  })
})