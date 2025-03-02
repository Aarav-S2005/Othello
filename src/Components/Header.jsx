import logo from "./assets/logo.png"
import './styles/index.css'

export default function Header(){
    return (
        <div className={"header"}>
            <img src={logo} className={"logo"} alt="logo"/>
            <h1 className={"heading"}>Othello</h1>
        </div>
    )
}