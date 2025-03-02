

export default function ScoreLabel({color, score}) {
    const style = {
        color: (color === "B")? "black" : "white"
    }
    return(
        <div className={"score"} style={style}>
            {score}
        </div>
    )
}