import "./styles/index.css"
import { RxExit } from "react-icons/rx";
import Reset from "./Reset.jsx";

export default function GameOverModal({winner, setGameOver, blackScore, whiteScore, reset}) {

    const handleExitButton = () => {
        setGameOver(false);
    }

    return (
        <div className={"game-over-modal"}>
            <div className={"game-over-display"}>
                <h1 className={"modal-heading"}>GAME OVER</h1>
                <div>
                    <div className={"modal-winner"}>
                        {(winner === "B") ? "Black Wins!!!" : (winner === "W") ? "White Wins!!!" : "Draw!!!"}
                    </div>
                    <div>
                        <h3 className={"modal-score-heading"}></h3>
                        <div className={"modal-score-display"}>
                            <span>Black : </span>
                            <span>{blackScore}</span>
                        </div>
                        <div className={"modal-score-display"}>
                            <span>White : </span>
                            <span>{whiteScore}</span>
                        </div>
                    </div>
                </div>
                <div className={"modal-button-container"}>
                    <Reset onClick={reset} />
                    <button className={"reset-button"} onClick={handleExitButton}>
                        <RxExit size={"24"} />
                    </button>
                </div>
            </div>
        </div>
    )
}