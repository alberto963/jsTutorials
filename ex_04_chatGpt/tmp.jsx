import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeMove, restartGame } from "../store/actions";

const TicTacToe = () => {
  const board = useSelector((state) => state.board);
  const player = useSelector((state) => state.player);
  const winner = useSelector((state) => state.winner);
  const dispatch = useDispatch();

  const handleClick = (index) => {
    if (!winner && !board[index]) {
      dispatch(makeMove(index));
    }
  };

  const handleRestart = () => {
    dispatch(restartGame());
  };

  const isBoardFull = () => {
    return board.every((cell) => cell !== null);
  };

  // Computer's move logic (random move)
  useEffect(() => {
    if (!winner && player === "O") {
      const emptyCells = board.reduce(
        (acc, cell, index) => (cell === null ? [...acc, index] : acc),
        []
      );
      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomMove = emptyCells[randomIndex];
        setTimeout(() => dispatch(makeMove(randomMove)), 500);
      } else if (!isBoardFull()) {
        // In case of a rare edge case when the board is full but no winner is found
        setTimeout(() => dispatch(restartGame()), 500);
      }
    }
  }, [player, board, winner, dispatch]);

  const renderCell = (index) => (
    <div className="cell" onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  );

  return (
    <div className="tic-tac-toe">
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="board-row">
            {renderCell(index)}
          </div>
        ))}
      </div>
      {winner ? (
        <div className="message">
          {winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`}
        </div>
      ) : (
        <div className="message">
          {player === "X" ? "Player X's turn" : "Computer's turn"}
        </div>
      )}
      <button className="restart-button" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default TicTacToe;
