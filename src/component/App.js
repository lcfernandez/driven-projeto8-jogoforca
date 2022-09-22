import { useState } from "react";
import forca0 from "../assets/images/forca0.png";
import palavras from "../assets/palavras.js";

export default function App() {
    const alfabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    //const [errors, setError] = useState(0);
    const [enabledLetters, setEnabledLetters] = useState([]);
    const [picked, setPicked] = useState(false);
    const [word, setWord] = useState([]);

    function pickWord() {
        if (!picked) {
            const word = palavras[Math.floor(Math.random() * palavras.length)];
            const maskedWord = word.split("");

            console.log(maskedWord);
            
            setEnabledLetters(alfabet.map((e, index) => index));
            setPicked(true);
            setWord(maskedWord.map(e => " _"));
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
                        <h1>{word}</h1>
                    </div>
                </div>
            </div>

            <div className="letters">
                {alfabet.map((letter, index) =>
                    <button
                        className={`c-button-${enabledLetters.includes(index) ? "enabled" : "disabled"}`}
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
