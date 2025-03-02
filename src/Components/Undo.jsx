import { FaUndoAlt } from "react-icons/fa";

export default function Undo({onClick}){
    return (
        <div>
            <button onClick={onClick} className={"undo-button"}>
                <FaUndoAlt  size={24}/>
            </button>
        </div>
    )
}