import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import ForceGraph from "./ForceGraph";
import { useAuthenticator } from '@aws-amplify/ui-react';
import './layout.css'

const client = generateClient<Schema>();

type Todo = {
  id: string;
  title: string;
  content: string;
};

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);
  function deleteTodo( id:string ){
    client.models.Todo.delete({id})
  }

  function createTodo() {
    client.models.Todo.create({ title: window.prompt("Todo title"),content:window.prompt("Todo content") });
  }

  return (
    <main>
      <div className="layout-container">
        <div className="top-bar">
          <h1>
            {user?.signInDetails?.loginId}'s todos
            <button onClick={signOut}>Sign out</button>
          </h1>
        </div>
        
        <div className="side-bar">
          <strong>LIST OF ALL NOTES</strong>
          <ul>
            {todos.map((todo) => (
              <li 
                onClick = {() => deleteTodo(todo.id)}
                key={todo.id}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="main-content">
          DISPLAY NOTES NODES HERE
          <ForceGraph todos = {todos} onNodeSelect={setSelectedTodo}/>
        </div>
          
        
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

        <div className="bottom-chunk">
          <strong>ADD NEW NOTE</strong>
          <button onClick={createTodo}>+ new</button>
        </div>
      </div>
    </main>
  );
}

export default App;
