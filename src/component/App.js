import { useState } from "react";
import hang0 from "../assets/images/hang0.png";
import hang1 from "../assets/images/hang1.png";
import hang2 from "../assets/images/hang2.png";
import hang3 from "../assets/images/hang3.png";
import hang4 from "../assets/images/hang4.png";
import hang5 from "../assets/images/hang5.png";
import hang6 from "../assets/images/hang6.png";
import words from "../assets/words.js";

export default function App() {
    const alfabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    const hangs = [hang0, hang1, hang2, hang3, hang4, hang5, hang6];

    const [enabledLettersIndex, setEnabledLettersIndex] = useState([]);
    const [flaws, setFlaws] = useState(0);
    const [hang, setHang] = useState(hangs[0]);
    const [maskedWord, setMaskedWord] = useState([]);
    const [normalizedWord, setNormalizedWord] = useState([]);
    const [remainingHits, setRemainingHits] = useState(0);
    const [started, setStarted] = useState(false);
    const [word, setWord] = useState([]);

    function chooseLetter(choosenLetter, choosenIndex) {
        if(enabledLettersIndex.includes(choosenIndex) && flaws < 6 && remainingHits > 0){
            if (!normalizedWord.includes(choosenLetter)) {
                const flawsUpdate = flaws + 1;
                
                setFlaws(flawsUpdate);
                setHang(hangs[flawsUpdate]);
            } else {
                const newMaskedWord = normalizedWord.map((letter, index) => {
                    if (letter === choosenLetter) {
                        return word[index];
                    } else {
                        return maskedWord[index];
                    }
                });

                setMaskedWord(newMaskedWord);
                setRemainingHits(remainingHits - normalizedWord.filter(letter => letter === choosenLetter).length);
            }

            setEnabledLettersIndex(enabledLettersIndex.filter(index => index !== choosenIndex));
        }
    }

    function pickWord() {
        if (!started) {
            const pickedWord = words[Math.floor(Math.random() * words.length)];
            const wordArray = pickedWord.split("");

            setEnabledLettersIndex(alfabet.map((letter, index) => index));
            setMaskedWord(wordArray.map(letter => " _"));
            setNormalizedWord(pickedWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(""));
            setRemainingHits(pickedWord.length);
            setStarted(true);
            setWord(wordArray);

            console.log(pickedWord);
        }
    }

    return (
        <>
            <div className="container">
                <img src={hang} alt={`Forca no estado ${flaws}`} />

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
                        <h1 className={(remainingHits === 0) ? "won" : ((flaws === 6) ? "lost" : "")}>{maskedWord}</h1>
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
