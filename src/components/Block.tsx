import '../styles/Block.css'
import Draggable from 'react-draggable'
export default function createBlock() {

    const content = "test data"

    return (
        <Draggable>
            <div className="Block">
                {content}
            </div>
        </Draggable>
    )
}