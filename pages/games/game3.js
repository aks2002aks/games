import React, { useEffect, useState } from "react";
import styles from "../../styles/game1.module.css";
import { TiTick } from "react-icons/ti";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/router";

function game1() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const riddles = [
    {
      riddle: [
        "I am not alive, but I grow,",
        "I don't have lungs, but I need air.",
        " I don't have a mouth, but water kills me.",
        "What am I ? ",
      ],
      answer: "FIRE",
      clue: "Focus on the properties of fire, such as how it spreads and how it interacts with other elements.",
    },
    {
      riddle: [
        "I am always hungry,",
        "I must always be fed.",
        "The finger I touch, will soon turn red.",
        "What am I ? ",
      ],
      answer: "FIRE",
      clue: "Pay attention to the second sentence, and think about what happens when you touch fire.",
    },
    {
      riddle: [
        "I speak without a mouth,",
        "and hear without ears.",
        "I have no body, but I come alive with wind.",
        "What am I ? ",
      ],
      answer: "ECHO",
      clue: "I am often associated with nature.",
    },
    {
      riddle: [
        "YI am not alive,",
        "but I can die. I don't have wings,",
        "but I can fly. I don't have eyes,",
        "but I can cry.What am I ? ",
      ],
      answer: "BALLON",
      clue: "I am made by humans but not alive.",
    },
    {
      riddle: [
        "I am light as a feather,",
        "yet the strongest man can't hold me,",
        " for much more than a minute.What am I?",
      ],
      answer: "BREATH",
      clue: "This thing is often associated with love, and it can be given as a gift.",
    },
  ];

  const [answer, setanswer] = useState("");
  const [show, setshow] = useState(false);
  const [randRiddle, setRandRiddle] = useState({
    riddle: [
      "IN ORDER TO ESCAPE THE HANGMAN'S WRATH",
      "SOLVE HIS RIDDLE, AND FREE YOUR PATH.",
      "GUESS THE ANSWER PIECE BY PIECE.",
      "GET 7 WRONG, YOUR BREATH WILL CEASE.",
    ],
    answer: "",
  });
  const [Start, setStart] = useState(true);
  const [correct, setcorrect] = useState(false);
  const [chances, setChances] = useState(6);
  const [answerArray, setAnswerArray] = useState([]);
  const router = useRouter();

  const gameStart = () => {
    setStart(false);
    const randIndex = Math.floor(Math.random() * riddles.length);
    const randRiddle = riddles[randIndex];
    setAnswerArray(
      randRiddle.answer
        .split("")
        .map((char) => ({ value: char, guessed: false }))
    );
    setRandRiddle(randRiddle);
    setChances(6);
    console.log(randRiddle);
  };

  const renderMaskedWord = () => {
    return answerArray.map((charObj, index) => (
      <span className="mask" key={index}>
        {charObj.guessed ? charObj.value : "__ "}
      </span>
    ));
  };

  const checkAnswer = async (e) => {
    if (chances > 0) {
      if (answer.toLocaleUpperCase() == randRiddle.answer) {
        setcorrect(true);
        //save user data and update level
        const token = localStorage.getItem("token");

        let res = await fetch("/api/updateUserDataLevel3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, Level: 3, Level3Time: chances }),
        });
        let response = await res.json();

        setTimeout(() => {
          router.push("/allgames");
        }, 2000);
      } else {
        setChances(chances - 1);
      }
    } else {
      router.push("/allgames");
    }
  };

  const handleChangeAnswer = (e) => {
    if (e.target.name == "answer") {
      setanswer(e.target.value);
    }
  };

  const handleShow = (e) => {
    setshow(!show);
  };

  return (
    <>
      <div className={styles.bgimage}>
        <div
          className={`${styles.container} ${styles.gameField}`}
          id="gameField"
        >
          <div className={`${styles.gameHeader} text-center`}>
            <img
              src="https://savsamoylov.github.io/Hangman-Game//assets/images/hmLogo.png"
              alt="Hangman Logo"
            />
            <h1>SKILLOWEEN</h1>
            <div className={styles.lifeCount} id="lifeCount">
              {chances} attempts left
            </div>
          </div>
          {correct && <div className="text-center">!!!!! CORRECT !!!!!</div>}

          <div className={styles.messageField} id="messageField">
            {randRiddle.riddle[0]}
            <br />
            {randRiddle.riddle[1]}
            <br />
            {randRiddle.riddle[2]}
            <br />
            {randRiddle.riddle[3]}
            <br />
          </div>

          <div className={styles.gameFooter}>
            <div className={styles.btnWrap}>
              {Start && (
                <button
                  id="startBtn"
                  className={`${styles.btn} ${styles.startBtn}`}
                  autoFocus
                  onClick={gameStart}
                >
                  START GAME
                </button>
              )}
              {renderMaskedWord()}

              {!Start && (
                <div
                  className={`${styles.btnWrap} py-2 flex items-center justify-center`}
                >
                  <input
                    className="px-6 rounded py-2 text-black "
                    placeholder="Enter your answer"
                    value={answer}
                    onChange={handleChangeAnswer}
                    name="answer"
                    id="answer"
                  ></input>
                  <TiTick color="#000000" size={50} onClick={checkAnswer} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`${styles.container} ${styles.instructionsField}`}
          id="instructionsField"
        >
          <h3>Instructions</h3>
          <ol>
            <li>
              1) You will be presented with a riddle, and blank spaces ( _ )
              representing the exact number of letters in the answer.
            </li>
            <li>2) Use your Keyboard to type in text box </li>
            <li>3) If you enter 6 times wrong word then u lose . </li>
          </ol>
          <footer className={`${styles.footer}`}>
            <div id="wrongGuesses">Wrong Guesses: {6 - chances}</div>
            <div id="clue" className="flex ">
              {!show && (
                <AiOutlineEyeInvisible
                  size={30}
                  onClick={handleShow}
                ></AiOutlineEyeInvisible>
              )}
              {show && (
                <AiOutlineEye size={30} onClick={handleShow}></AiOutlineEye>
              )}
              {!Start && (
                <p className="px-2">Clue: {show && randRiddle.clue}</p>
              )}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default game1;
