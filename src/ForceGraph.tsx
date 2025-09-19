import ForceGraph2D from 'react-force-graph-2d';
import { useEffect, useState } from 'react';

type Todo = {
  id: string;
  title: string;
  content: string;
};

type Node = {
  id: string;
  title: string;
  content: string;
};

type Link = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

export default function ForceGraph({
  todos,
  onNodeSelect
}: {
  todos: Todo[];
  onNodeSelect: (todo: Todo) => void;
}) {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const nodes = todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      content: todo.content,
    }));

    const links: Link[] = [];
    for (let i = 0; i < todos.length - 1; i++) {
      links.push({
        source: todos[i].id,
        target: todos[i + 1].id,
      });
    }

    setGraphData({ nodes, links });
  }, [todos]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ForceGraph2D
        graphData={graphData}
        onNodeClick={(node) => {
          const todoNode = node as Node;
          onNodeSelect(todoNode);
        }}
        nodeLabel="title"
        nodeAutoColorBy="id"
      />
    </div>
  );
}
