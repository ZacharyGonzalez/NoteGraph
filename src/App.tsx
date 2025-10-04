import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import { toString } from "nlcst-to-string";
import { keywordExtraction } from './keywords';
import type { Schema } from "../amplify/data/resource";
import './App.css'

const client = generateClient<Schema>();

function App() {
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
        title: title,
        content: content,
      });
    }
  }

  return (
    <div className ="App">
      <div className="top-bar">
        <h1>NoteGraph</h1>
        <div>
          user
        </div>
      </div>
      <div className="main">
        <div className="top-chunk">
          <h2>Notes</h2>
          <button onClick={createNote}>Create Note</button>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom-chunk">
          <h2>Graph Visualization</h2>
          {/* Graph visualization will go here */}
        </div>
      </div>
    </div>
  );
}

export default App;