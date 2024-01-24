import { memo, useEffect, useState } from 'react';
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
import { TYPES } from '../../constants';
// @ts-ignore

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [deleteIcon, setDeleteIcon] = useState<boolean>(false);
  const [nodeTypes, setNodeTypes] = useState<any>({
    custom: '',
  });

  const CustomNodes = memo(({ data }: any) => {
    return <CustomNode data={data} deleteIcon={deleteIcon} />;
  });

  useEffect(() => {
    setNodeTypes({ custom: CustomNodes });
  }, [deleteIcon]);

  const handleAddPrimaryNode = () => {
    const newNodeId = String(nodes.length + 1);

    setNodes([
      ...nodes,
      {
        id: newNodeId,
        type: TYPES.CUSTOM,
        data: { label: `Primary Node ${newNodeId}` },
        className: `${classes.customNode}`,
        position: { x: 100, y: 100 },
        sourcePosition: Position.Left,
      },
    ]);
  };
  const handleAddSecondaryNode = () => {
    const newNodeId = String(nodes.length + 1);
    setNodes([
      ...nodes,
      {
        id: newNodeId,
        data: { label: `Secondary Node ${newNodeId}` },
        className: `${classes.childNode}`,
        position: { x: 300, y: 200 },
        targetPosition: Position.Left,
      },
    ]);
  };
  const handleDeleteNode = (nodeId: any) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    const updatedEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId,
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };
  const addNodeEdges = () => {
    setNodes([
      ...nodes,
      {
        id: '1',
        type: TYPES.CUSTOM,
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

  const handleMouseEnter = () => {
    setDeleteIcon(true);
  };
  const handleMouseLeave = () => {
    setDeleteIcon(false);
  };
  useEffect(() => {
    addNodeEdges();
  }, []);

  return (
    <>
      <div className={classes.buttons}>
        <button onClick={handleAddPrimaryNode}>Add Primary Node</button>
        <button onClick={handleAddSecondaryNode}>Add Secondary Node</button>
        <button onClick={() => handleDeleteNode('1')}>Delete Node</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        onNodeMouseEnter={handleMouseEnter}
        onNodeMouseLeave={handleMouseLeave}
      >
        <MiniMap zoomable pannable />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default OverviewFlow;
