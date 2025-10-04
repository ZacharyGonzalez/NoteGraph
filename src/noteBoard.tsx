export default function noteBoard({ notes }: { notes: Array<any> }) {
    return (
        <div className="note-board">
            <h2>Note Board</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}