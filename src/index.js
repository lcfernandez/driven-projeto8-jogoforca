import ReactDOM from 'react-dom';

import "./assets/css/reset.css";
import "./assets/css/style.css";

import forca0 from "./assets/images/forca0.png";

function App() {
    return (
        <img src={forca0} alt="Forca no estado inicial" />
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));
