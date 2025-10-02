import '../styles/Block.css'
import Draggable from 'react-draggable'

type BlockProp = {
    id: string;
    title: string;
    content: string;
}

export default function Block({ id, title, content }: BlockProp) {

    return (
        <Draggable>
            <div className="Block">
                {id}
                {title}
                {content}
            </div>
        </Draggable>
    )
}