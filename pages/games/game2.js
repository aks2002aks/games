import styles from "../../styles/TicTacToe.module.css";
import { useEffect, useState } from "react";
import img from "../../public/R_cleanup.jpeg";
import { useRouter } from "next/router";

const players = {
  CPU: {
    SYM: "O",
    NAME: "CPU",
  },
  HUMAN: {
    SYM: "X",
    NAME: "You",
  },
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export default function TicTacToe() {
  // const [board, setBoard] = useState(Array(9).fill(""));

  const router = useRouter();
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isCPUNext, setIsCPUNext] = useState(false);
  const [winner, setWinner] = useState(null);

  function playFn(arrayIndex, index) {
    if (isCPUNext) return;
    if (winner) return;
    board[arrayIndex][index] = players?.HUMAN?.SYM;
    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(true);
  }

  const [time, setTime] = useState(0); // initialize time as 0
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // increment time every second
      }, 1000);
    }
    return () => clearInterval(timer); // clear the interval only when isPlaying changes to false
  }, [isPlaying]);

  async function handleFinishGame() {
    setIsPlaying(false); // set isPlaying to false when the player finishes the game
    let score = 0;

    if (time <= 25) {
      score = 10;
    } else if (time <= 50) {
      score = 8;
    } else if (time >= 100) {
      score = 5;
    }

    const token = localStorage.getItem("token");

    let res = await fetch("/api/updateUserDataLevel2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, Level: 2, Level2Time: score }),
    });
    let response = await res.json();

    setTimeout(() => {
      router.push("/allgames");
    }, 2000);
  }

  useEffect(() => {
    if (winner) return;
    if (isCPUNext) {
      cPUPlay();
    }
  }, [isCPUNext]);

  function cPUPlay() {
    if (winner) return;
    sleep(1000);

    const cPUMove = getCPUTurn();

    board[cPUMove.arrayIndex][cPUMove.index] = players?.CPU?.SYM;

    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(false);
  }

  function getCPUTurn() {
    const emptyIndexes = [];
    board.forEach((row, arrayIndex) => {
      row.forEach((cell, index) => {
        if (cell === "") {
          emptyIndexes.push({ arrayIndex, index });
        }
      });
    });
    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  }

  function checkWinner() {
    // check same row
    for (let index = 0; index < board.length; index++) {
      const row = board[index];
      if (row.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        handleFinishGame();

        return;
      } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        handleFinishGame();

        return;
      }
    }

    // check same column
    for (let i = 0; i < 3; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        handleFinishGame();
        return;
      } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        handleFinishGame();
        return;
      }
    }

    // check same diagonal
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      handleFinishGame();
      return;
    } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      handleFinishGame();
      return;
    } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      handleFinishGame();
      return;
    } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      handleFinishGame();
      return;
    } else if (board.flat().every((cell) => cell !== "")) {
      setWinner("draw");
      handleFinishGame();
      return;
    } else {
      setWinner(null);
      return;
    }
  }

  function displayWinner() {
    if (winner === "draw") {
      return "It's a draw!";
    } else if (winner) {
      return `${winner} won!`;
    }
  }

  function displayTurn() {
    if (isCPUNext) {
      return "CPU's turn";
    } else {
      return "Your turn";
    }
  }

  function playAgainFn() {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWinner(null);
    setIsCPUNext(false);
    setIsPlaying(true);
    setTime(0);
  }

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: "url(/R_cleanup.jpeg)", // wrap with url() function
      }}
    >
      <div className="text-xl font-bold text-center py-5 text-white">
        {!winner && displayTurn()}
      </div>
      <div
        className={`${styles.container} items-center justify-item-center border-black text-white`}
      >
        <div className={styles.col}>
          <span onClick={() => playFn(0, 0)} className={styles.cell}>
            {board[0][0]}
          </span>
          <span onClick={() => playFn(0, 1)} className={styles.cell}>
            {board[0][1]}
          </span>
          <span onClick={() => playFn(0, 2)} className={styles.cell}>
            {board[0][2]}
          </span>
        </div>
        <div className={styles.col}>
          <span onClick={() => playFn(1, 0)} className={styles.cell}>
            {board[1][0]}
          </span>
          <span onClick={() => playFn(1, 1)} className={styles.cell}>
            {board[1][1]}
          </span>
          <span onClick={() => playFn(1, 2)} className={styles.cell}>
            {board[1][2]}
          </span>
        </div>
        <div className={styles.col}>
          <span onClick={() => playFn(2, 0)} className={styles.cell}>
            {board[2][0]}
          </span>
          <span onClick={() => playFn(2, 1)} className={styles.cell}>
            {board[2][1]}
          </span>
          <span onClick={() => playFn(2, 2)} className={styles.cell}>
            {board[2][2]}
          </span>
        </div>
      </div>
      {winner && <h2 className="text-center py-3">{displayWinner()}</h2>}
      {winner == "draw" && (
        <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center text-white ">
          <button
            onClick={playAgainFn}
            className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded text-xl"
          >
            PlayAgain
          </button>
        </div>
      )}
      <h2
        className="text-center py-3 text-white"
        onClick={() => {
          setIsPlaying(false);
        }}
      >
        TIMER : {time}
      </h2>
    </div>
  );
}
