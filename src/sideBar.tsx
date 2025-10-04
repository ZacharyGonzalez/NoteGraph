type SidebarProps = {
  notes: Array<any>;
  createNote: () => void;
  handleDeleteNote: (id: string) => void;
};

export default function SideBar({ notes, createNote, handleDeleteNote }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button onClick={createNote} className="create-note-button">
          Create Note
        </button>
      </div>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <button 
              onClick={() => handleDeleteNote(note.id)}
              className="delete-note-button"
            >
              Delete
            </button>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
