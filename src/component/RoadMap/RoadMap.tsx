import { memo, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  addEdge,
} from 'reactflow';
import { nodes as initialNodes, edges as initialEdges } from './data';
import CustomNode from '../CustomNodes/CustomNodes';
import 'reactflow/dist/style.css';
import classes from './RoadMap.module.scss';
import { NODE_TYPES, TYPES } from '../../constants';


const RoadMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [deleteIcon, setDeleteIcon] = useState<boolean>(false);
  const [hoveredNodeId, setHoveredNodeId] = useState();
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);
  const [doubleClickedNode, setIsDoubleClickedNode] = useState<any>();
  const [nodeTypes, setNodeTypes] = useState<any>({
    custom: '',
  });

  const renderCustomNodes = memo(({ data }: any) => {
    console.log(data);
    return (
      <CustomNode
        data={data}
        deleteIcon={deleteIcon}
        hoveredNodeId={hoveredNodeId}
        handleDeleteNode={handleDeleteNode}
        doubleClickedNode={doubleClickedNode}
        isDoubleClicked={isDoubleClicked}
        setIsDoubleClicked={setIsDoubleClicked}
        setNodes={setNodes}
        updateNodeData={updateNodeData}
        onConnect={onConnect}
        edges={edges}
      />
    );
  });

  const updateNodeData = (value: any, id: string) => {
    const updatedNodes = nodes.map((node: any) => {
      return node.id === id
        ? { ...node, data: { ...node.data, label: value } }
        : node;
    });
    setNodes(updatedNodes);
  };

  useEffect(() => {
    setNodeTypes({ custom: renderCustomNodes });
  }, [deleteIcon, hoveredNodeId, isDoubleClicked]);

  const handleAddPrimaryNode = () => {
    const newNodeId = String(nodes.length + 1);

    setNodes([
      ...nodes,
      {
        id: newNodeId,
        type: TYPES.CUSTOM,
        data: {
          label: `Primary Node ${newNodeId}`,
          id: newNodeId,
          nodeType: NODE_TYPES.PRIMARY,
          edges: edges,
          options: [
            { type: TYPES.SOURCE, position: Position.Left, id: '1' },
            { type: TYPES.TARGET, position: Position.Right, id: '2' },
          ],
        },
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
        type: TYPES.CUSTOM,
        data: {
          label: `Secondary Node ${newNodeId}`,
          id: newNodeId,
          nodeType: NODE_TYPES.SECONDARY,
          options: [
            { type: TYPES.SOURCE, position: Position.Left, id: '1' },
            { type: TYPES.TARGET, position: Position.Right, id: '2' },
          ],
        },
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

  const onConnect = useCallback(
    (params: any) => {
      return setEdges((eds) => addEdge(params, eds));
    },

    [setEdges, edges],
  );

  const addNodeEdges = () => {
    setNodes([
      ...nodes,
      {
        id: '1',
        type: TYPES.CUSTOM,
        data: {
          label: 'Internet',
          options: [
            { type: TYPES.SOURCE, position: Position.Left, id: '1' },
            { type: TYPES.SOURCE, position: Position.Right, id: '2' },
          ],
          id: '1',
          nodeType: NODE_TYPES.PRIMARY,
        },
        className: `${classes.customNode}`,
        position: { x: 250, y: 0 },
        sourcePosition: Position.Left,
      },
      {
        id: '5',
        type: TYPES.CUSTOM,
        data: {
          label: 'Internet is the main source of data',
          options: [{ type: TYPES.TARGET, position: Position.Left, id: '1' }],
          id: '5',
          nodeType: NODE_TYPES.SECONDARY,
        },
        className: `${classes.childNode}`,
        position: { x: 500, y: 100 },
      },
    ]);
    setEdges([
      ...edges,
      {
        id: 'e1-4',
        source: '1',
        target: '4',
        sourceHandle: '2',
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

  const handleNodeOnclick = (event: any, node: any) => {
    setDeleteIcon(true);
    setHoveredNodeId(node.id);
  };

  const handleDoubleClick = (event: any, clickednode: any) => {
    const updatedNodes = nodes.filter((node) => node.id === clickednode.id);
    setIsDoubleClicked(true);
    setIsDoubleClickedNode(updatedNodes[0]);
  };

  useEffect(() => {
    addNodeEdges();
  }, []);

  return (
    <>
      <div className={classes.buttons}>
        <button onClick={handleAddPrimaryNode}>Add Primary Node</button>
        <button onClick={handleAddSecondaryNode}>Add Secondary Node</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeOnclick}
        onNodeDoubleClick={handleDoubleClick}
        onConnect={onConnect}
      >
        <MiniMap zoomable pannable />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default RoadMap;
