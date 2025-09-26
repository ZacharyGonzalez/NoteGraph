
type SidebarProps = {
  todos: Todo[];
  deleteTodo: (id: string) => void;
};
export default function sideBar({todos, deleteTodo}:SidebarProps){    
    return (
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
    );
}