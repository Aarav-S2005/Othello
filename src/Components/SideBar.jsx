import ScoreLabel from "./ScoreLabel.jsx";
import ToPlay from "./ToPlay.jsx";
import Undo from "./Undo.jsx";
import Reset from "./Reset.jsx";


export default function SideBar({whiteScore, blackScore, currentPlayer, onClick1, onClick2}) {
    const bg = {
        backgroundColor: (currentPlayer === "W") ? "#91c577" : "#345a2c",
    }
    return (
        <div className={"side-bar"} style={bg}>
            <div className={"score-container"}>
                <div className={"scores"}>
                    <ScoreLabel color={"W"} score={whiteScore}/>
                    <ScoreLabel color={"B"} score={blackScore}/>
                </div>
                <ToPlay curPlayer={currentPlayer}/>
            </div>
            <hr/>
            <div className={"reset-undo-container"}>
                <Undo onClick={onClick1}/>
                <Reset onClick={onClick2}/>
            </div>
        </div>
    )
}