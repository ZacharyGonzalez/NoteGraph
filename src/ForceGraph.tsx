import ForceGraph2D from 'react-force-graph-2d';
import { useEffect, useState } from 'react';

type Todo = {
    id: string;
    content: string;
}
type Node = {
  id: string;
  name?: string;
};

type Link = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

export default function ForceGraph({ todos }: {todos: Todo[]}) {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const nodes = todos.map((todo) => ({
        id:todo.id,
        content:todo.content,
    }));
    const links: Link[] = [];
    for (let i =0; i<todos.length -1; i++){
        links.push({
            source: todos[i].id,
            target: todos[i+1].id,
        });
    }
    setGraphData({nodes,links});
  }, [todos]);

  return (
    <div style={{ height: '600px' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="content"
        nodeAutoColorBy="id"
      />
    </div>
  );
}