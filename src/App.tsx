import { useAuthenticator } from '@aws-amplify/ui-react';
import TopBar from "./components/TopBar";
import './styles/layout.css'
import { useEffect, useState } from 'react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Block from './components/Block';
const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [notes, setNotes] = useState<Array<Schema["Note"]["type"]>>([]);

  useEffect(() => {
    client.models.Note.observeQuery().subscribe({
      next: (data) => setNotes([...data.items]),
    });
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
        {notes.map((note) => (
          <Block id={note.id} title={note.title} content={note.content} />
        ))}
      </div>
    </main>
  );
}

export default App;
