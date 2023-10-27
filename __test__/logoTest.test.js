import { test, expect } from '@jest/globals'
import Emoji from "../assets/emojiPixels"
import DrawStrategy from "../draw"
import GoalResponse from "../files/goal-response.json"

    let theGrid1 = DrawStrategy.init()
    theGrid1 = DrawStrategy.polyanetsLogo()
    let theGrid2 = DrawStrategy.init()

    const data1 = GoalResponse

test('POLYANET appears in the same positions in data1 and data2', () => {
    for (let y = 0; y < data1.goal.length; y++) {
        for (let x = 0; x < data1.goal[y].length; x++) {
            if (data1.goal[y][x] === 'POLYANET') {
                console.log(`x: ${x} y: ${y}`)
                theGrid2[y][x] = Emoji.planet
                expect(theGrid1[y][x]).toBe(theGrid2[y][x])
            }
        }
    }
});