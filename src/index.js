import ReactDOM from 'react-dom';

import "./assets/css/reset.css";
import "./assets/css/style.css";

import forca0 from "./assets/images/forca0.png";

function App() {
    return (
        <>
            <div className="display">
                <img src={forca0} alt="Forca no estado inicial" />
                <button className="pickWord">Escolher Palavra</button>
            </div>

            <div className="letters">
                <button>A</button>
                <button>B</button>
                <button>C</button>
                <button>D</button>
                <button>E</button>
                <button>F</button>
                <button>G</button>
                <button>H</button>
                <button>I</button>
                <button>J</button>
                <button>K</button>
                <button>L</button>
                <button>M</button>
                <button>N</button>
                <button>O</button>
                <button>P</button>
                <button>Q</button>
                <button>R</button>
                <button>S</button>
                <button>T</button>
                <button>U</button>
                <button>V</button>
                <button>X</button>
                <button>W</button>
                <button>Y</button>
                <button>Z</button>
            </div>

            <div className="guess">
                Já sei a palavra!

                <input></input>

                <button>Chutar</button>
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));
