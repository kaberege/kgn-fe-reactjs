import React from "react";
import Die from "./Die";
import "./die.css";
import { nanoid } from "nanoid";

export default function AppDie() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    const count = React.useRef(0);

    React.useEffect(() => {
        if (!tenzies) {
            let timer = setInterval(() => {
                setTime(time + 1)
            }, 1000);

            return () => {
                clearInterval(timer);
            }
        }
    }, [time]);

    function timeInterval(value) {
        let s = value % 60;
        let m = parseInt(value / 60) % 60;
        let h = parseInt(value / 3600);
        return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");

    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }



    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }));
            count.current = count.current + 1;
        } else {
            count.current = 0;
            setTenzies(false)
            setDice(allNewDice())
            setTime(0)
        }
    }

    function holdDice(id) {

        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    const styles = !tenzies ? "#ffffff" : "#fffb7d";
    const timer = <div className={!tenzies ? "time-roll" : "off-roll"}>
        <p><em>Time</em>: <span style={{ color: styles }}>{timeInterval(time)}</span></p>
        <p><em>N<sup>o</sup> of rolls</em>: <span style={{ color: styles }}>{count.current}</span></p>
    </div >;

    return (
        <div className="main">
            <h1 className="title">Tenzies</h1>
            {!tenzies ? (
                <p className="instructions">Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.
                </p>
            ) : timer
            }
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            {!tenzies && timer}
        </div>
    )
}