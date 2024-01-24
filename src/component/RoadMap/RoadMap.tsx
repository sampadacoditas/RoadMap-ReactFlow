import { useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
} from 'reactflow';
import { nodes as initialNodes, edges as initialEdges } from './data';
import CustomNode from '../CustomNodes/CustomNodes';
import 'reactflow/dist/style.css';
import classes from './RoadMap.module.scss';

const nodeTypes = {
  custom: CustomNode,
};

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addNodeEdges = () => {
    setNodes([
      ...nodes,
      {
        id: '1',
        type: 'custom',
        data: { label: 'Internet' },
        className: `${classes.customNode}`,
        position: { x: 250, y: 0 },
        sourcePosition: Position.Left,
      },
      {
        id: '5',
        data: { label: 'Internet is the main source of data' },
        className: `${classes.childNode}`,
        position: { x: 500, y: 100 },
        targetPosition: Position.Left,
      },
    ]);
    setEdges([
      ...edges,
      {
        id: 'e1-4',
        source: '1',
        target: '4',
        sourceHandle: '1',
        animated: true,
      },
      {
        id: 'e1-5',
        source: '1',
        target: '5',
        sourceHandle: '2',
        animated: true,
      },
    ]);
  };
  useEffect(() => {
    addNodeEdges();
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      nodeTypes={nodeTypes}
    >
      <MiniMap zoomable pannable />
      <Controls />
    </ReactFlow>
  );
};

export default OverviewFlow;
