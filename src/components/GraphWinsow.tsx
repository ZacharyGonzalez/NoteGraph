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
            todos={todos.map(todo => ({
              id: todo.id,
              title: todo.title ?? "",
              content: todo.content ?? ""
            }))}
            onNodeSelect={(todo) => setSelectedTodo(todos.find(t => t.id === todo.id) ?? null)}
          />
        </div>
     )
}