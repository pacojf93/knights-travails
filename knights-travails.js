const Square = (x, y, leavingSquare = null) => {
  const enteringSquares = [];
  return {
    x,
    y,
    leavingSquare,
    coordinates: () => [x, y],
    addEnteringSquares: (square) => enteringSquares.push(square),
    enteringSquares: () => enteringSquares,
  };
};

const moves = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

const getValidMoves = (x, y) =>
  moves.filter(
    (move) =>
      x + move[0] <= 7 &&
      x + move[0] >= 0 &&
      y + move[1] <= 7 &&
      y + move[1] >= 0
  );

const printGraph = (root) => {
  root.edges.forEach((edge) => console.log(`[${edge.x}, ${edge.y}]`));
};

const knightsMoves = (begin, end) => {
  const beginSquare = Square(begin[0], begin[1]);
  const endSquare = Square(end[0], end[1]);

  const level = (traverseBoard = function (queue, level) {
    //search if any of the squares is the end square
    for(let i = 0; i < queue.length; i ++) {
        if((queue[i].x === endSquare.x) && (queue[i].y === endSquare.y)) return level
    }

    //get all the squares from the next level
    let newQueue = []
    queue.forEach(square => {
        const validMoves = getValidMoves(square.x, square.y);
        validMoves.forEach((move) =>
            square.addEnteringSquares(Square(square.x + move[0], square.y + move[1]))
        );
        newQueue = [...newQueue, ...square.enteringSquares()]
    })

    return traverseBoard(newQueue, level + 1)

  })([beginSquare], 0)

  console.log(level)

};

knightsMoves([1, 1], [3, 3]);
