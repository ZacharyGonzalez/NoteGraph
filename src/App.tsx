import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import { keywordExtraction } from './keywords';
import type { Schema } from "../amplify/data/resource";
import './styles/layout.css'
import { toString } from 'nlcst-to-string'
import { InteractiveGridPattern } from "@/components/ui/shadcn-io/interactive-grid-pattern";


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
        title: [title],
        content: [content],
      });
    }
  }


  function Dashboard() {
    return (
      <div className="relative h-screen">
        <InteractiveGridPattern
          className="absolute inset-0"
          squares={[20, 20]}
        />
        <div className="relative z-10">
          {/* Your content */}
        </div>
      </div>
    );
  }


  return (
    <main>
      {Dashboard()}
      <div>
        <button onClick={createNote}>New Note</button>
        <button onClick={signOut}>Sign Out {user?.username}</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title}
            {note.content}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
