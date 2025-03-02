import {useState, createContext, useEffect} from 'react'
import Header from "./Components/Header.jsx";
import Board from "./Components/Board.jsx";
import Confetti from "react-confetti";
import SideBar from "./Components/SideBar.jsx";
import GameOverModal from "./Components/GameOverModal.jsx";

export const GameContext = createContext();

const copy = (board)=>{
    return board.map((row)=>[...row]);
}

export default function App() {

    const [board, setBoard] = useState([
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", "B", "W", " ", " ", " "],
            [" ", " ", " ", "W", "B", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "]
        ]
    );
    const [currentPlayer, setCurrentPlayer] = useState("B");
    const [whiteScore, setWhiteScore] = useState(0);
    const [blackScore, setBlackScore] = useState(0);
    const [movesPlayed, setMovesPlayed] = useState(4);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(" ");
    const [stack, setStack] = useState([]);
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    const width = window.innerWidth;
    const height = window.innerHeight;


    function valid_coordinates(r, c) {
        return r<=7 && r>=0 && c>=0 && c<=7;
    }
    const possible_traverse_directions = (r, c) => {
        if(board[r][c] !== " ") return [];
        const traverse_list = []
        const opponent = (currentPlayer === "B") ? "W" : "B"

        for(let i = 0 ; i < directions.length ; i++){
            let x = directions[i][0];
            let y = directions[i][1];
            let new_x = r+x;
            let new_y = c+y;
            if(valid_coordinates(new_x, new_y) && board[new_x][new_y] === opponent){
                let flag = true;

                while(board[new_x][new_y] !== currentPlayer){
                    new_x += x;
                    new_y += y;
                    if(!valid_coordinates(new_x, new_y) || board[new_x][new_y] === " "){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    traverse_list.push([x, y])
                }
            }
        }
        return traverse_list;
    }
    const onTileClick = (r, c) => {
        if(gameOver){return ;}
        const traverse_list = possible_traverse_directions(r, c)
        if(traverse_list.length === 0){
            return;
        }

        const newBoard = copy(board);
        const newStack = [];
        for (const nums of stack){
            newStack.push([...nums])
        }
        newStack.push([...newBoard]);
        setStack(newStack);

        setBoard(board=>{
            const newBoard = copy(board);
            newBoard[r][c] = currentPlayer;
            for(let i = 0; i < traverse_list.length; i++){
                let x = traverse_list[i][0];
                let y = traverse_list[i][1];
                let new_x = r+x;
                let new_y = c+y;
                while(board[new_x][new_y] !== currentPlayer){
                    newBoard[new_x][new_y] = currentPlayer;
                    new_x += x;
                    new_y += y;
                }
            }
            return newBoard;
        })

        setCurrentPlayer(prev => (prev === "B") ? "W" : "B")
        setMovesPlayed((prevState) => prevState +1)

    }
    const possible_moves = () => {
        const poss_moves = [];
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] === " ") {
                    const trav_list = possible_traverse_directions(i, j);
                    if (trav_list.length !== 0) {
                        poss_moves.push(trav_list)
                    }
                }
            }
        }
        return poss_moves;
    }
    const undoMove = () => {
        setStack(prevStack => {
            if (prevStack.length === 0) return prevStack;
            const newStack = [...prevStack];
            const newBoard = newStack[newStack.length - 1];
            newStack.pop();
            setBoard(() => newBoard);
            setCurrentPlayer(prev => (prev === "B") ? "W" : "B")
            return newStack;
        });

    };
    const resetGame = () => {
        setWinner(" ")
        setGameOver(false);
        setWhiteScore(0)
        setBlackScore(0)
        setMovesPlayed(0)
        setCurrentPlayer("B")
        setBoard([
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", "B", "W", " ", " ", " "],
                [" ", " ", " ", "W", "B", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "]
        ])
        setStack([])
    }
    useEffect(() => {

        let wCount = 0;
        let bCount = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if(board[i][j] === "B"){
                    bCount++;
                }
                else if (board[i][j] === "W"){
                    wCount++;
                }
            }
        }
        setBlackScore(bCount);
        setWhiteScore(wCount);

    }, [board])
    useEffect(() => {
        if(movesPlayed === 64){
            setGameOver(true);
            return;
        }
        if(!possible_moves()){
            setCurrentPlayer(prev => (prev === "B") ? "W" : "B")
            if(!possible_moves()){
                setGameOver(true);
            }
        }
        if(whiteScore === blackScore && gameOver){
            setWinner("tie")
        }
        else if(gameOver) setWinner((blackScore > whiteScore) ? "B" : "W");
    }, [board, movesPlayed])

    return (
        <div>
            {gameOver && <Confetti width={width} height={height} />}
            <Header />
            <GameContext.Provider value={{
                board, setBoard,
                onTileClick
            }}>
                <div className={"body-container"}>
                    <div className={ "board-container"}>
                        <Board />
                    </div>
                    <SideBar blackScore={blackScore} whiteScore={whiteScore} currentPlayer={currentPlayer} onClick1={undoMove} onClick2={resetGame}/>
                </div>

            </GameContext.Provider>
            {gameOver && <GameOverModal winner={winner} setGameOver={setGameOver} whiteScore={whiteScore} blackScore={blackScore} reset={resetGame}/>}

        </div>
      )
}