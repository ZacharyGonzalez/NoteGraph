import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import TopBar from "./components/TopBar";
import NoteList from "./components/NoteList";
import GraphWindow from "./components/GraphWinsow";
import NoteDisplay from "./components/NoteDisplay";
import NoteCreator from "./components/NoteCreator";

import './layout.css'

type Todo = Schema["Todo"]["type"];

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const {user, signOut} = useAuthenticator();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function deleteTodo( id:string ){
    client.models.Todo.delete({id})
  }

  function createNote() {
    const title = window.prompt("Todo title");
    const content = window.prompt("Todo content");
    if (title !== null && content !== null) {
      client.models.Todo.create({ title, content });
    }
  }

  return (
    <main>
      <div className="layout-container">
        <TopBar user = {user} signOut = {signOut} />
        <NoteList todos = {todos} deleteTodo = {deleteTodo}/>
        <GraphWindow todos = {todos} setSelectedTodo = {setSelectedTodo}/>
        <NoteDisplay selectedTodo = {selectedTodo}/>
        <NoteCreator createNote = {createNote}/>
      </div>
    </main>
  );
}

export default App;
