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

  const calculateWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return "draw";
    }

    return null;
  };

  const minimax = (board, depth, maximizingPlayer) => {
    const winner = calculateWinner(board);

    if (winner === "X") {
      return -10 + depth;
    }
    if (winner === "O") {
      return 10 - depth;
    }
    if (winner === "draw") {
      return 0;
    }

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          const newBoard = [...board];
          newBoard[i] = "O";
          const eval = minimax(newBoard, depth + 1, false);
          maxEval = Math.max(maxEval, eval);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          const newBoard = [...board];
          newBoard[i] = "X";
          const eval = minimax(newBoard, depth + 1, true);
          minEval = Math.min(minEval, eval);
        }
      }
      return minEval;
    }
  };

  useEffect(() => {
    if (!winner && player === "O") {
      let bestMove = null;
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          const newBoard = [...board];
          newBoard[i] = "O";
          const score = minimax(newBoard, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      if (bestMove !== null) {
        setTimeout(() => dispatch(makeMove(bestMove)), 500);
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
