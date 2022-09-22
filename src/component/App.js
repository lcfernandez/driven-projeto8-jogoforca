import { useState } from "react";
import forca0 from "../assets/images/forca0.png";
import forca1 from "../assets/images/forca1.png";
import forca2 from "../assets/images/forca2.png";
import forca3 from "../assets/images/forca3.png";
import forca4 from "../assets/images/forca4.png";
import forca5 from "../assets/images/forca5.png";
import forca6 from "../assets/images/forca6.png";
import palavras from "../assets/palavras.js";

export default function App() {
    const alfabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    const hangs = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

    const [enabledLettersIndex, setEnabledLettersIndex] = useState([]);
    const [errors, setError] = useState(0);
    const [hang, setHang] = useState(hangs[0]);
    const [maskedWord, setMaskedWord] = useState([]);
    const [normalizedWord, setNormalizedWord] = useState([]);
    const [started, setStarted] = useState(false);
    const [word, setWord] = useState([]);

    function chooseLetter(choosenLetter, choosenIndex) {
        if(enabledLettersIndex.includes(choosenIndex) && errors < 6){
            if (!normalizedWord.includes(choosenLetter)) {
                const newErrorsAmount = errors + 1;
                setError(newErrorsAmount);
                setHang(hangs[newErrorsAmount]);
            } else {
                const newMaskedWord = normalizedWord.map((letter, index) => {
                    if (letter === choosenLetter) {
                        return word[index];
                    } else {
                        return maskedWord[index];
                    }
                });

                setMaskedWord(newMaskedWord);
            }

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
                <img src={hang} alt={`Forca no estado ${errors}`} />

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
