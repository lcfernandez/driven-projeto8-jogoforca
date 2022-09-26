import { useState } from "react";
import GlobalStyle from "./GlobalStyle"
import hang0 from "./assets/images/forca0.png";
import hang1 from "./assets/images/forca1.png";
import hang2 from "./assets/images/forca2.png";
import hang3 from "./assets/images/forca3.png";
import hang4 from "./assets/images/forca4.png";
import hang5 from "./assets/images/forca5.png";
import hang6 from "./assets/images/forca6.png";
import styled from "styled-components";
import words from "./assets/palavras.js";

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
        setMaskedWord(wordArray.map(() => " _"));
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
        <Content>
            <Top>
                <Hang
                    alt={`Forca no estado ${mistakes}`}
                    data-identifier="game-image"
                    src={hang}
                />

                <WordContainer>
                    <ChooseWord
                        data-identifier="choose-word"
                        onClick={chooseWord}
                    >
                        Escolher Palavra
                    </ChooseWord>

                    <Word
                        data-identifier="word"
                        remainingHits={remainingHits}
                        mistakes={mistakes}
                    >
                        {(mistakes === 6) ? word : maskedWord}
                    </Word>
                </WordContainer>
            </Top>

            <Bottom>
                <Letters>
                    {alfabet.map((letter) =>
                        <Letter
                            data-identifier="letter"
                            enabled={enabledLetters.includes(letter) ? true : false}
                            key={letter}
                            onClick={() => chooseLetter(letter)}
                        >
                            {letter.toUpperCase()}
                        </Letter>
                    )}
                </Letters>

                <div>
                    Já sei a palavra!

                    <TypeGuess
                        data-identifier="type-guess"
                        disabled={inputDisabled}
                        onChange={e => setGuess(e.target.value)}
                        value={guess}
                    />

                    <GuessButton
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
                    </GuessButton>
                </div>
            </Bottom>

            <GlobalStyle />
        </Content>
    );
}

const Bottom = styled.div`
    text-align: center;
`;

const ChooseWord = styled.button`
    background-color: #27ae60;
    border: none;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 6px 9px 0px;
    color: #ffffff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    height: 45px;
    margin-top: 5%;
    max-width: 95%;
    padding: 0 10px;
`;

const Content = styled.div`
    font-family: Tahoma, Geneva, Verdana, sans-serif;
    margin: 0 auto;
    max-width: 800px;
`;

const GuessButton = styled.button`
    background-color: #e1ecf4;
    border: 1px solid #39739d;
    border-radius: 5px;
    color: #39739d;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    height: 40px;
    margin: 5px 0;
    width: 70px;
`;

const Hang = styled.img`
    width: 45%;
`;

const Letter = styled.button`
    align-items: center;
    background-color: ${props => props.enabled ? "#e1ecf4" : "#9faab5"};
    border: ${props => props.enabled ? "1px solid #39739d" : "none"};
    border-radius: 2px;
    box-sizing: border-box;
    color: ${props => props.enabled ? "#39739d" : "#61676f"};
    cursor: pointer;
    display: inherit;
    font-size: 1rem;
    font-weight: bold;
    height: 40px;
    justify-content: inherit;
    margin: 4px;
    width: 40px;
    ${props => props.enabled ? "&:hover {background-color: #b3d3ea}" : ""}
`;

const Letters = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px auto;
    max-width: 624px;
    padding: 0 5px;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;

const TypeGuess = styled.input`
    border-radius: 5px;
    height: 30px;
    margin: 0 10px;
    width: 40%;
`;

const Word = styled.h1`
    color: ${props => (props.remainingHits === 0) ? "#27ae60" : ((props.mistakes === 6) ? "#ff0000" : "#000000")};
    font-size: 2rem;
    font-weight: bold;
    margin: 10px;
    max-width: 95%;
    text-align: right;
    word-wrap: break-word;
`;

const WordContainer = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
`;
