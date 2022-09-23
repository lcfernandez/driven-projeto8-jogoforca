import { useState } from "react";
import hang0 from "../assets/images/forca0.png";
import hang1 from "../assets/images/forca1.png";
import hang2 from "../assets/images/forca2.png";
import hang3 from "../assets/images/forca3.png";
import hang4 from "../assets/images/forca4.png";
import hang5 from "../assets/images/forca5.png";
import hang6 from "../assets/images/forca6.png";
import words from "../assets/palavras.js";

export default function App() {
    const alfabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    const hangs = [hang0, hang1, hang2, hang3, hang4, hang5, hang6];

    const [enabledLettersIndex, setEnabledLettersIndex] = useState([]);
    const [finished, setFinished] = useState(false);
    const [flaws, setFlaws] = useState(0);
    const [guess, setGuess] = useState("");
    const [hang, setHang] = useState(hangs[0]);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [maskedWord, setMaskedWord] = useState([]);
    const [normalizedWord, setNormalizedWord] = useState([]);
    const [remainingHits, setRemainingHits] = useState(0);
    const [started, setStarted] = useState(false);
    const [word, setWord] = useState([]);

    function chooseLetter(choosenLetter, choosenIndex) {
        if(enabledLettersIndex.includes(choosenIndex) && flaws < 6 && remainingHits > 0){
            if (!normalizedWord.includes(choosenLetter)) {
                const flawsUpdate = flaws + 1;
                
                if (flawsUpdate === 6) {
                    finishGameStatus();
                }

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

                const remainingHitsUpdate = remainingHits - normalizedWord.filter(letter => letter === choosenLetter).length;

                if (remainingHitsUpdate === 0) {
                    finishGameStatus();
                }

                setMaskedWord(newMaskedWord);
                setRemainingHits(remainingHitsUpdate);
            }

            setEnabledLettersIndex(enabledLettersIndex.filter(index => index !== choosenIndex));
        }
    }

    function finishGameStatus() {
        enabledLettersIndex.length = 0

        setEnabledLettersIndex(enabledLettersIndex);
        setFinished(true);
        setGuess("");
        setInputDisabled(true);
        setStarted(false);
    }

    function normalizeWordToArray(originalWord) {
        return originalWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split("");
    }

    function pickWord() {
        if (!started) {
            const pickedWord = words[Math.floor(Math.random() * words.length)];
            const wordArray = pickedWord.split("");

            setEnabledLettersIndex(alfabet.map((letter, index) => index));
            setInputDisabled(false);
            setMaskedWord(wordArray.map(letter => " _"));
            setNormalizedWord(normalizeWordToArray(pickedWord));
            setRemainingHits(pickedWord.length);
            setStarted(true);
            setWord(wordArray);
        }

        if (finished) {
            setFinished(false);
            setFlaws(0);
            setHang(hangs[0]);
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
                        <h1 className={
                            (remainingHits === 0) ? "won" : ((flaws === 6) ? "lost" : "")
                        }>
                                {(flaws === 6) ? word : maskedWord}
                        </h1>
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

                <input
                    disabled={inputDisabled}
                    value={guess}
                    onChange={
                        e => setGuess(e.target.value)
                    }
                />

                <button
                    onClick={
                        () => {
                            if (started && !finished) {
                                if (guess.trim().length === 0) {
                                    alert("Tente uma palavra válida!");
                                } else {
                                    const normalizedGuess = normalizeWordToArray(guess.toLowerCase());

                                    if ((JSON.stringify(normalizedGuess) === JSON.stringify(normalizedWord))) {
                                        setMaskedWord(word);
                                        setRemainingHits(0);
                                    } else {
                                        setFlaws(6);
                                        setHang(hangs[6]);
                                    }

                                    finishGameStatus();
                                }
                            }
                        }
                    }
                >
                    Chutar
                </button>
            </div>
        </>
    );
}
