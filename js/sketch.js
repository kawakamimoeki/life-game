/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

GRID_W = 51
GRID_H = 51

function setup () {
  createCanvas(600, 600)
  noStroke()
  SZ = width / GRID_W
  cellList = createCellList()
}

function draw () {
  frameRate(10)
  cellList = update(cellList)
  cellList.forEach((row) => {
    row.forEach((cell) => {
      cell.display()
    })
  })
}

class Cell {
  constructor (c, r, state = 0) {
    this.c = c
    this.r = r
    this.state = state
  }

  display () {
    if (this.state === 1) {
      fill(0)
    } else {
      fill(255)
    }
    rect(SZ * this.r, SZ * this.c, SZ, SZ)
  }

  checkNeighbors () {
    let neighbors = 0
    const dList = [[-1, -1], [-1, 0], [-1, 1], [1, 0], [1, -1], [1, 1], [0, -1], [0, 1]]
    dList.forEach((d) => {
      try {
        if (cellList[this.r + d[0]][this.c + d[1]].state === 1) {
          neighbors++
        }
      } catch {}
    })
    if (this.state === 1) {
      if ([2, 3].includes(neighbors)) {
        return 1
      } else {
        return 0
      }
    } else {
      if (neighbors === 3) {
        return 1
      } else {
        return 0
      }
    }
  }
}

function createCellList () {
  const newList = []
  for (let j = 0; j < GRID_H; j++) {
    newList.push([])
    for (let i = 0; i < GRID_W; i++) {
      newList[j].push(new Cell(i, j, random([0, 1])))
    }
  }
  newList[int(GRID_H / 2)][int(GRID_W / 2)].state = 1
  return newList
}

function update (cellList) {
  const newList = []
  cellList.forEach((row, r) => {
    newList.push([])
    row.forEach((cell, c) => {
      newList[r].push(new Cell(c, r, cell.checkNeighbors(cellList)))
    })
  })
  return newList
}
