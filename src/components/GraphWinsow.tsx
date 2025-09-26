import type { Dispatch, SetStateAction } from "react";
import type { Schema } from "../../amplify/data/resource";
import ForceGraph from "./ForceGraph";

type Todo = Schema["Todo"]["type"];

type GraphWindowProps = {
  todos: Todo[];
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;};

export default function GraphWindow({todos, setSelectedTodo}:GraphWindowProps){
    return (
        <div className="main-content">
          DISPLAY NOTES NODES HERE
          <ForceGraph
            todos={todos}
            onNodeSelect={(todo) => setSelectedTodo(todos.find(t => t.id === todo.id) ?? null)}
          />
        </div>
     )
}