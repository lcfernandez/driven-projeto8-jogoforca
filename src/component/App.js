import forca0 from "../assets/images/forca0.png";
import palavras from "../assets/palavras.js";

function pickWord() {
    const word = palavras[Math.floor(Math.random() * palavras.length)];
    console.log(word);
}

function Button(props) {
    return (
        <button className="c-button-disabled">{props.label.toUpperCase()}</button>
    );
}

export default function App() {
    const alfabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    return (
        <>
            <div className="display">
                <img src={forca0} alt="Forca no estado inicial" />
                <button className="pickWord" onClick={pickWord}>Escolher Palavra</button>
            </div>

            <div className="letters">
                {alfabet.map((letter, index) => <Button
                    label={letter}
                    key={index}
                />)}
            </div>

            <div className="guess">
                Já sei a palavra!

                <input disabled></input>

                <button>Chutar</button>
            </div>
        </>
    );
}
