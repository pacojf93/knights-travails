const Square = (x, y) => {
  const edges = [];
  return {
    x,
    y,
    coordinates: () => [x, y],
    addEdge: (square) => edges.push(square),
    edges: () => edges,
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

  (traverseBoard = function (square) {
    const validMoves = getValidMoves(square.x, square.y);
    validMoves.forEach((move) => console.log(move));

    validMoves.forEach((move) =>
        square.addEdge(Square(square.x + move[0], square.y + move[1]))
    );
    square.edges().forEach((edge) => console.log(`[${edge.x}, ${edge.y}]`));
  })(beginSquare)

};

knightsMoves([1, 1], [0, 0]);
