import type { Schema } from "../../amplify/data/resource";

type Todo = Schema["Todo"]["type"];

type NoteDisplayProp = {
        selectedTodo: Todo | null;
    }

export default function NoteDisplay({selectedTodo}:NoteDisplayProp){
    return (
        <div className="right-chunk"> 
        <h3>Note Info</h3>
        {selectedTodo ? (
            <div>
            <strong>{selectedTodo.title}</strong>
            <p>{selectedTodo.content}</p>
            </div>
        ) : (
            <p>No note selected</p>
        )}
        </div>
    )
}