import { useState } from "react";
import forca0 from "../assets/images/forca0.png";
import palavras from "../assets/palavras.js";

export default function App() {
    const alfabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    //const [errors, setError] = useState(0);
    const [enabledLettersIndex, setEnabledLettersIndex] = useState([]);
    const [maskedWord, setMaskedWord] = useState([]);
    const [normalizedWord, setNormalizedWord] = useState([]);
    const [started, setStarted] = useState(false);
    const [word, setWord] = useState([]);

    function chooseLetter(choosenLetter, choosenIndex) {
        if(enabledLettersIndex.includes(choosenIndex)){
            const letterIndex = [];

            for (let i = 0; i < normalizedWord.length; i++) {
                if (choosenLetter === normalizedWord[i]) {
                    letterIndex.push(i);
                }
            }

            console.log(letterIndex);

            setEnabledLettersIndex(enabledLettersIndex.filter(index => index !== choosenIndex));
        }
    }

    function pickWord() {
        if (!started) {
            const word = palavras[Math.floor(Math.random() * palavras.length)];
            const normalizedWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const wordArray = word.split("");
            const normalizedWordArray = normalizedWord.split("");

            setEnabledLettersIndex(alfabet.map((letter, index) => index));
            setMaskedWord(wordArray.map(letter => " _"));
            setNormalizedWord(normalizedWordArray);
            setStarted(true);
            setWord(wordArray);

            console.log(wordArray);
            console.log(normalizedWordArray);
        }
    }

    return (
        <>
            <div className="container">
                <img src={forca0} alt="Forca no estado inicial" />

                <div className="word-box">
                    <div>
                        <button
                            className="pickWord"
                            onClick={pickWord}
                        >
                            Escolher Palavra
                        </button>
                    </div>

                    <div>
                        <h1>{maskedWord}</h1>
                    </div>
                </div>
            </div>

            <div className="letters">
                {alfabet.map((letter, index) =>
                    <button
                        className={`c-button-${enabledLettersIndex.includes(index) ? "enabled" : "disabled"}`}
                        onClick={() => chooseLetter(letter, index)}
                        key={index}
                    >
                        {letter.toUpperCase()}
                    </button>
                )}
            </div>

            <div className="guess">
                Já sei a palavra!

                <input disabled></input>

                <button>Chutar</button>
            </div>
        </>
    );
}
