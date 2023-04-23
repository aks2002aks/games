import React, { useEffect, useState } from "react";
import styles from "../../styles/game1.module.css";
import { TiTick } from "react-icons/ti";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

function game1() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const riddles = [
    {
      riddle: [
        "The thunder comes before the lightning,",
        "And the lightning comes before the cloud,",
        "The rain dries all the land it touches,",
        "Wrapping the earth in a blood red shroud.",
      ],
      answer: "VOLCANO",
      clue: "This phenomenon dries up the earth it touches.",
    },
    {
      riddle: [
        "It may only be given,",
        "Not taken or bought,",
        "What the sinner desires,",
        "But the saint does not.",
      ],
      answer: "FORGIVENESS",
      clue: "No amount of money can buy this, it can only be given freely.",
    },
    {
      riddle: [
        "Made of ten but two we make,",
        "When assembled others quake,",
        "Five apart and we are weak,",
        "Five together havoc wreak.",
      ],
      clue: "This thing is made of ten parts but only two are used at a time",
      answer: "FIST",
    },
    {
      riddle: [
        "Bury deep,",
        "Pile on stones,",
        "My mind will always,",
        "Dig up them bones.",
      ],
      answer: "MEMORIES",
      clue: "What you hide and sometimes forget.",
    },
    {
      riddle: [
        "You may think you know me,",
        "But that's where you're wrong.",
        "For many alike have pondered me long.",
        "My secret is simple, but locked up tight.",
        "You hold the key, it is in your sight.",
      ],
      answer: "RIDDLE",
      clue: "The key to solving this riddle is in your sight.",
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

        let res = await fetch("/api/updateUserDataLevel1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, Level: 1, Level1Time: chances }),
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
