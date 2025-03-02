import blackDisc from "./assets/Black Peice.png"
import whiteDisc from "./assets/White Peice.png"
import "./index.css"

export default function Tile({value = " ", onClick}){


    return (
        <div className="tile" onClick={onClick}>
            {
                (value == "B")
                ? <img src={blackDisc} alt="Black Disc" className={"disc"} />
                    : (value == "W")
                    ? <img src={whiteDisc} alt="White Disc" className={"disc"} />
                        : <div></div>
            }
        </div>
    )
}