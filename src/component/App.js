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

    const [enabledLetters, setEnabledLetters] = useState([]);
    const [guess, setGuess] = useState("");
    const [hang, setHang] = useState(hangs[0]);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [mistakes, setMistakes] = useState(0);
    const [remainingHits, setRemainingHits] = useState(0);
    const [word, setWord] = useState([]);

    // states based on the choosen word, to facilitate the display and the comparison:
    // word with unknown letters replaced by underscores ("_")
    const [maskedWord, setMaskedWord] = useState([]);

    // word with accents/diacritics removed
    const [normalizedWord, setNormalizedWord] = useState([]);

    function chooseLetter(choosenLetter) {
        if (enabledLetters.includes(choosenLetter)){
            if (normalizedWord.includes(choosenLetter)) {

                // replacing the underscores with the letters
                const newMaskedWord = normalizedWord.map((letter, index) => {
                    if (letter === choosenLetter) {
                        return word[index];
                    } else {
                        return maskedWord[index];
                    }
                });

                setMaskedWord(newMaskedWord);

                // calculating how many hits the player got
                const remainingHitsUpdate = remainingHits - normalizedWord.filter(letter => letter === choosenLetter).length;
                setRemainingHits(remainingHitsUpdate);

                // checking if it was the last remaining hit(s)
                if (remainingHitsUpdate === 0) {
                    finishGame();
                    return;
                }

            } else {
                
                // increasing the quantity of mistakes and updating the image
                const mistakesUpdate = mistakes + 1;
                setHang(hangs[mistakesUpdate]);
                setMistakes(mistakesUpdate);

                // checking if it was the last allowed mistake
                if (mistakesUpdate === 6) {
                    finishGame();
                    return;
                }

            }

            setEnabledLetters(enabledLetters.filter(letter => letter !== choosenLetter));
        }
    }

    function chooseWord() {
        const pickedWord = words[Math.floor(Math.random() * words.length)];
        const wordArray = pickedWord.split("");
        setEnabledLetters(alfabet.map(letter => letter));
        setGuess("");
        setHang(hangs[0]);
        setInputDisabled(false);
        setMaskedWord(wordArray.map(letter => " _"));
        setMistakes(0);
        setNormalizedWord(normalizeWord(pickedWord));
        setRemainingHits(pickedWord.length);
        setWord(wordArray);
    }

    function finishGame() {
        setEnabledLetters([]);
        setInputDisabled(true);
    }

    // removes accents/diacritics from the word and return it into an array
    function normalizeWord(originalWord) {
        return originalWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split("");
    }

    return (
        <>
            <div className="top">
                <img
                    alt={`Forca no estado ${mistakes}`}
                    data-identifier="game-image"
                    src={hang}
                />

                <div className="word">
                    <button
                        className="choose-word"
                        data-identifier="choose-word"
                        onClick={chooseWord}
                    >
                        Escolher Palavra
                    </button>

                    <h1
                        className={(remainingHits === 0) ? "won" : ((mistakes === 6) ? "lost" : "")}
                        data-identifier="word"
                    >
                        {(mistakes === 6) ? word : maskedWord}
                    </h1>
                </div>
            </div>

            <div className="bottom">
                <div className="letters">
                    {alfabet.map((letter) =>
                        <button
                            className={`letter ${enabledLetters.includes(letter) ? "enabled" : "disabled"}`}
                            data-identifier="letter"
                            key={letter}
                            onClick={() => chooseLetter(letter)}
                        >
                            {letter.toUpperCase()}
                        </button>
                    )}
                </div>

                <div>
                    Já sei a palavra!

                    <input
                        data-identifier="type-guess"
                        disabled={inputDisabled}
                        onChange={e => setGuess(e.target.value)}
                        value={guess}
                    />

                    <button
                        className="guess-button"
                        data-identifier="guess-button"
                        onClick={
                            () => {
                                if (mistakes < 6 && remainingHits > 0) {
                                    if (!guess) {
                                        alert("Digite uma palavra!");
                                    } else if (guess.match(/[^A-zÀ-ú]/g, '')) { // checking for special characteres, numbers and spaces
                                        alert("Digite apenas letras!");
                                    } else {
                                        const normalizedGuess = normalizeWord(guess.toLowerCase());

                                        if ((JSON.stringify(normalizedGuess) === JSON.stringify(normalizedWord))) {
                                            setMaskedWord(word);
                                            setRemainingHits(0);
                                        } else {
                                            setHang(hangs[6]);
                                            setMistakes(6);
                                        }

                                        finishGame();
                                    }
                                }
                            }
                        }
                    >
                        Chutar
                    </button>
                </div>
            </div>
        </>
    );
}
