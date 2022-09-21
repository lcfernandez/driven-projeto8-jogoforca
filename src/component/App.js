import forca0 from "../assets/images/forca0.png";

function Button(props) {
    return (
        <button>{props.label.toUpperCase()}</button>
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
                <button className="pickWord">Escolher Palavra</button>
            </div>

            <div className="letters">
                {alfabet.map((letter) => <Button
                    label={letter}
                    key={letter}
                />)}
            </div>

            <div className="guess">
                Já sei a palavra!

                <input></input>

                <button>Chutar</button>
            </div>
        </>
    );
}
