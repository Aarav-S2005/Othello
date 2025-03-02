import "./index.css"

export default function ToPlay({curPlayer}) {

    const style = {
        backgroundColor : (curPlayer === "B") ? "black" : "white",
        color : (curPlayer === "W") ? "black" : "white",
        border : `2px solid ${curPlayer === "W" ? "black" : "white"}`,
    }

    return(
        <div style={style} className={"to-play"}>
            <div>
            {(curPlayer === "B") ? "Black" : "White"}
            </div>
            <div  style={{fontSize: "20px"}}>
                To Play
            </div>
        </div>
    )
}