const Square = (coordinates, leavingSquare = null) => {
  const x = coordinates[0];
  const y = coordinates[1];
  const enteringSquares = [];
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
  return {
    coordinates,
    leavingSquare,
    x,
    y,
    addEnteringSquares: (square) => enteringSquares.push(square),
    enteringSquares: () => enteringSquares,
    getValidMoves: () => getValidMoves(x, y),
    toString: () => `[${x}, ${y}]`,
  };
};

const knightsMoves = (begin, end) => {
  const beginSquare = Square(begin);
  const endSquare = Square(end);

  //traverse the board in level order
  const path = (traverseBoard = function (level) {
    //get all the squares from the next level
    let nextLevel = [];
    level.forEach((square) => {
      const validMoves = square.getValidMoves();
      validMoves.forEach((move) =>
        square.addEnteringSquares(
          Square([square.x + move[0], square.y + move[1]], square)
        )
      );
      nextLevel = [...nextLevel, ...square.enteringSquares()];
    });

    //check if any of the squares in level is the end square
    for (var i in nextLevel) {
      const square = nextLevel[i];
      if (square.toString() === endSquare.toString()) {
        //find the way to the top recursively
        const path = (findWayBack = function (squares) {
          return squares[0].leavingSquare === null
            ? squares
            : findWayBack([squares[0].leavingSquare, ...squares]);
        })([square]);
        return path;
      }
    }

    return traverseBoard(nextLevel);
  })([beginSquare], 0);

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((square) => console.log(`[${square.x}, ${square.y}]`));

  return path;
};

const squares = knightsMoves([0, 0], [7, 7]);
