import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  addEdge,
  NodeMouseHandler,
  NodeProps,
  NodeTypes,
} from 'reactflow';
// Importing initial node and edge data along with custom node component
import { nodes as initialNodes, edges as initialEdges } from './data';
import CustomNode from '../CustomNodes/CustomNodes';
import 'reactflow/dist/style.css';
import classes from './RoadMap.module.scss';
import { NODE_TYPES, TYPES } from '../../constants';
import { CustomNodeData, IParams } from './IRoadMap';

const RoadMap = () => {
  // State for managing nodes, edges, delete icon visibility, and other variables
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [deleteIcon, setDeleteIcon] = useState<boolean>(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string>();
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);
  const [doubleClickedNode, setIsDoubleClickedNode] = useState<any>();
  const [nodeTypes, setNodeTypes] = useState<NodeTypes>();

  // Memoized rendering of custom nodes
  const renderCustomNodes = memo(({ data }: { data: CustomNodeData }) => {
    return (
      <CustomNode
        data={data}
        deleteIcon={deleteIcon}
        hoveredNodeId={hoveredNodeId && hoveredNodeId}
        handleDeleteNode={handleDeleteNode}
        doubleClickedNode={doubleClickedNode}
        isDoubleClicked={isDoubleClicked}
        setIsDoubleClicked={setIsDoubleClicked}
        updateNodeData={updateNodeData}
        onConnect={onConnect}
      />
    );
  });

  const updateNodeData = (value: string, id: string) => {
    const updatedNodes = nodes.map((node) => {
      return node.id === id
        ? { ...node, data: { ...node.data, label: value } }
        : node;
    });
    setNodes(updatedNodes);
  };

  useEffect(() => {
    setNodeTypes({ custom: renderCustomNodes });
  }, [deleteIcon, hoveredNodeId, isDoubleClicked]);

  // Function to add a primary node to the graph
  const handleAddPrimaryNode = () => {
    const newNodeId = String(Number(nodes[nodes.length - 1].id) + 1);

    setNodes([
      ...nodes,
      {
        id: newNodeId,
        type: TYPES.CUSTOM,
        data: {
          label: `Primary Node ${newNodeId}`,
          id: newNodeId,
          nodeType: NODE_TYPES.PRIMARY,
          options: [
            { type: TYPES.SOURCE, position: Position.Left, id: '1' },
            { type: TYPES.TARGET, position: Position.Right, id: '2' },
          ],
        },
        className: `${classes.customNode}`,
        position: { x: 100, y: 100 },
      },
    ]);
  };

  // Function to add a secondary node to the graph
  const handleAddSecondaryNode = () => {
    const newNodeId = String(Number(nodes[nodes.length - 1].id) + 1);

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
      },
    ]);
  };

  // Function to delete a node and its associated edges
  const handleDeleteNode = (nodeId: string) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    const updatedEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId,
    );
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  // Callback function for handling edge connections
  const onConnect = useCallback(
    (params: IParams) => {
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

  const handleNodeOnclick: NodeMouseHandler = (
    event: React.MouseEvent,
    node,
  ) => {
    setDeleteIcon(true);
    node && setHoveredNodeId(node.id);
  };

  const handleDoubleClick: NodeMouseHandler = (
    event: React.MouseEvent,
    clickednode,
  ) => {
    const updatedNodes = nodes.filter((node) => node.id === clickednode.id);
    setIsDoubleClicked(true);
    setIsDoubleClickedNode(updatedNodes[0]);
  };

  useEffect(() => {
    addNodeEdges();
  }, []);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default RoadMap;
