import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import { RestApi } from 'aws-cdk-lib/aws-apigateway';

import type { Schema } from "../amplify/data/resource";
import Block from './components/Block';
import TopBar from "./components/TopBar";
import './styles/layout.css'

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
  RestApi
  async function callLambda() {
    const res = await fetch('https://660o9213q2.execute-api.us-east-2.amazonaws.com/dev/keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords: "data" })
    });

    const data = await res.json();
    console.log(data);
  }
  return (
    <main>
      <button onClick={createNote}>New Note</button>
      <button onClick={() => callLambda()}>
        Call Lambda
      </button>
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
