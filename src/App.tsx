import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import { keywordExtraction } from './keywords';
import type { Schema } from "../amplify/data/resource";
import Block from './components/Block';
import TopBar from "./components/TopBar";
import './styles/layout.css'
import { toString } from 'nlcst-to-string'

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
      const words = await keywordExtraction(content); //need to check content length 
      if (words.data.keywords) {
        for (const keyword of words.data.keywords) {
          console.log(toString(keyword.matches[0].node))
        }
      }

      if (words.data.keyphrases) {
        for (const phrase of words.data.keyphrases) {
          console.log(toString(phrase.matches[0].nodes))
        }
      }
      await client.models.Note.create({
        title:[title],
        content:[content],
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
