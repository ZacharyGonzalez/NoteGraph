type NoteCreatorProp = {
    createNote: ()=> void;
}

export default function NoteCreator({createNote}:NoteCreatorProp){
    return (
        <div className="bottom-chunk">
        <strong>ADD NEW NOTE</strong>
        <button onClick={createNote}>+ new</button>
        </div>
    )
}