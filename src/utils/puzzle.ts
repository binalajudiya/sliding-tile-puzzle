import { ElMessageBox } from "element-plus"
import type { Action } from "element-plus"
import { IMode } from "./utils"

export interface IPuzzle {
  isStart: boolean
  randomData: Array<number>
  finishData: string
  gameImg: string
  level: number
  step: number
}

// Puzzles
class Puzzle implements IPuzzle {
  isStart = false
  randomData: Array<number> = []
  finishData = ""
  gameImg = "zdg"
  level = 3
  step = 0
  constructor() {}
  // initialization
  init({ gameImg, level }: IMode) {
    this.step = 0
    this.level = level
    this.gameImg = gameImg
    this.randomData = this.getRandomData()
    this.isStart = !this.isStart
    if (this.isStart) this.finishData = this.getFinishData()
  }
  // Mouse moving picture
  move(idx: number) {
    let level = this.level
    let target = this.randomData.indexOf(idx) // Current selected position subscript
    let space = this.randomData.indexOf(Math.pow(level, 2)) // blank position index

    // Filter it. When the blank position is on the far left, you can also swap it by clicking on the previous number on the right.
     // And the blank position can also be exchanged when clicking the next number on the left on the far right.
    let condition =
      (space % level == 0 && target % level == level - 1) ||
      (space % level == level - 1 && target % level == 0)

    if (!condition) {
// Click on the target, if there is a blank space above or below or left or right, the position will be swapped.
      if (
        target == space - level ||
        target == space + level ||
        target == space - 1 ||
        target == space + 1
      ) {
        this.change(space, target)
      }
    }
  }
  // Keyboard events
  onKeydown(code: number) {
    let level = this.level
    // Target position index
    let target
    // blank position index
    let space = this.randomData.indexOf(Math.pow(level, 2))
    switch (code) {
      case 37:
        target = space + 1
        if (space % level == level - 1) return
        this.change(space, target)
        break
      case 38:
        target = space + level
        if (target > this.randomData.length - 1) return
        this.change(space, target)
        break
      case 39:
        target = space - 1
        if (space % level == 0) return
        this.change(space, target)
        break
      case 40:
        target = space - level
        if (target < 0) return
        this.change(space, target)
        break
    }
  }
  change(space: number, target: number) {
    // Replace empty positions with target positions
    this.randomData[space] = this.randomData[target]
    // The target position is the maximum value, and the replacement is completed.
    this.randomData[target] = Math.pow(this.level, 2)
    this.step += 1
    this.finish()
  }
  // Check if the puzzle is complete
  finish() {
    if (this.randomData.join("") == this.finishData) {
      ElMessageBox.alert(`恭喜你，闯关成功，仅用${this.step}步`, "提示", {
        confirmButtonText: "OK",
        callback: (action: Action) => {
          this.randomData = []
          this.step = 0
          this.isStart = false
        },
      })
    }
  }
  // Switch game picture
  setImg(img: string) {
    this.gameImg = img
  }
  // Generate puzzle completion data based on different difficulties for comparison to determine whether it is completed.
  getFinishData(): string {
    let str = ""
    for (let i = 1, len = Math.pow(this.level, 2); i <= len; i++) {
      str += i
    }
    return str
  }
  // Generate an array of small picture numbers
  getRandomData() {
    let randomData = []
    // The maximum value is generated based on the game level, minus 1 because the maximum value is reserved as a blank space and placed at the end.
    let max = Math.pow(this.level, 2) - 1
    while (randomData.length < max) {
      // Generate random numbers within a range
      let random = Math.floor(Math.random() * max) + 1
      if (randomData.indexOf(random) == -1) {
        // Add if there are no duplicates
        randomData.push(random)
      }
    }
    // Add maximum number as blank space
    randomData.push(max + 1)
    return randomData
  }
}
export default new Puzzle()
