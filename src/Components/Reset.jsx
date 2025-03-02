import { RiRestartLine } from "react-icons/ri";

export default function Reset({onClick}) {
    return (
        <div>
            <button onClick={onClick} className={"reset-button"}>
                <RiRestartLine size={24}/>
            </button>
        </div>
    )
}