import {useContext} from "react";
import {GameContext} from "../App.jsx";
import Tile from "./Tile.jsx";
import "./styles/index.css"


export default function Board(){

    const {board, setBoard, onTileClick} = useContext(GameContext);

    return (
        <div id='board'>
            {board.map((row, r) =>
                row.map((cell, c) =>
                    <Tile value={cell} onClick={() => onTileClick(r, c)}/>
                )
            )}
        </div>
    )
}