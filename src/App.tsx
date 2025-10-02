import { useAuthenticator } from '@aws-amplify/ui-react';
import TopBar from "./components/TopBar";
import Draggable from 'react-draggable';
import './layout.css'
import createBlock from './components/Block';
import { useEffect, useState } from 'react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [notes, setNotes] = useState<Array<Schema["Note"]["type"]>>([]);

  useEffect(() => {
    async function fetchTodos() {
      const result = await client.models.Note.list();
      setNotes(result.data);
    }

    fetchTodos();
  }, []);



  async function createNote() {
    const title = window.prompt("Note title");
    const content = window.prompt("Note content");

    if (title && content) {

      await client.models.Note.create({
        title,
        content,
      });
    }
  }
  return (
    <main>
      <button onClick={createNote}>New Note</button>

      <div>
        <TopBar user={user} signOut={signOut} />
        <ul>
          {notes.map((note) => (
            <li key = {note.id}>
              {note.title}
              {note.content}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
