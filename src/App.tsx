import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/data";
import { toString } from "nlcst-to-string";
import { keywordExtraction } from './keywords';
import type { Schema } from "../amplify/data/resource";
import './App.css'
import TopBar from './topBar';
import Sidebar from './sideBar';
import TextEditor from './textEditor';
import NoteBoard from './noteBoard';

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [notes, setNotes] = useState<Array<Schema["Note"]["type"]>>([]);
  const [selectedNote, setSelectedNote] = useState<string | null>(null); 

  useEffect(() => {
    client.models.Note.observeQuery().subscribe({
      next: (data) => setNotes([...data.items]),
    });
  }, []);

  function handleSelectNote(noteId: string) {
    setSelectedNote(noteId);
  }

  function handleDeleteNote() {
    if (selectedNote) {
      client.models.Note.delete(selectedNote)
        .then(() => {
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== selectedNote)); 
          setSelectedNote(null); 
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    }
  }

  async function createNote() {
    const title = window.prompt("Note title");
    const content = window.prompt("Note content");

    if (title && content) {
      const words = await keywordExtraction(content);
      if (words.data.keywords) {
        for (const keyword of words.data.keywords) {
          console.log(toString(keyword.matches[0].node));
        }
      }

      if (words.data.keyphrases) {
        for (const phrase of words.data.keyphrases) {
          console.log(toString(phrase.matches[0].nodes));
        }
      }
      await client.models.Note.create({
        title: title,
        content: content,
      });
    }
  }

  return (
    <div className="layout-container">
      {TopBar({ user, signOut })}
      {Sidebar({ notes, createNote, handleDeleteNote })}
      {TextEditor(setNotes, notes)}
      {NoteBoard({ notes, handleSelectNote })}
      {selectedNote && (
        <button onClick={handleDeleteNote} className="delete-note-button">
          Delete Selected Note
        </button>
      )}
    </div>
  );
}

export default App;
