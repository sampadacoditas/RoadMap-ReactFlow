// import { useCallback, useState } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { initialEdges, initialNodes } from './data';

// function RoadMap() {
//   const initialEdges = [
//     {
//       id: 'e1-2',
//       source: '1',
//       target: '2',
//       style: { stroke: '#00000' },
//     },
//   ];

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   console.log(initialEdges);

//   const onConnect = useCallback(
//     (params: any) =>
//       setEdges((eds) =>
//         addEdge(
//           {
//             ...params,
//             animated: true,
//             style: { stroke: '#000000' },
//           },
//           eds,
//         ),
//       ),
//     [],
//   );

//   return (
//     <>
//       Front End
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </>
//   );
// }
// export default RoadMap;

import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './data';
import CustomNode from '../CustomNodes/CustomNodes';
import 'reactflow/dist/style.css';
import { clearConfigCache } from 'prettier';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: any) =>
  console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  // useEffect(() => {
  //   const onChange = (event: any) => {
  //     setNodes((nds) =>
  //       nds.map((node) => {
  //         if (node.id !== '2') {
  //           return node;
  //         }

  //         const color = event.target.value;

  //         return {
  //           ...node,
  //           data: {
  //             ...node.data,
  //             color,
  //           },
  //         };
  //       }),
  //     );
  //   };

  //   setNodes([
  //     {
  //       id: '1',
  //       type: 'input',
  //       data: { label: 'An input node' },
  //       position: { x: 0, y: 50 },
  //       sourcePosition: Position.Right,
  //     },
  //     {
  //       id: '2',
  //       type: 'selectorNode',
  //       data: { onChange: onChange },
  //       style: { border: '1px solid #777', padding: 10 },
  //       position: { x: 300, y: 50 },
  //     },
  //     {
  //       id: '3',
  //       type: 'output',
  //       data: { label: 'Output A' },
  //       position: { x: 650, y: 25 },
  //       targetPosition: Position.Left,
  //     },
  //     {
  //       id: '4',
  //       type: 'output',
  //       data: { label: 'Output B' },
  //       position: { x: 650, y: 100 },
  //       targetPosition: Position.Left,
  //     },
  //   ]);

  //   setEdges([
  //     {
  //       id: 'e1-2',
  //       source: '1',
  //       target: '2',
  //       animated: true,
  //       style: { stroke: '#fff' },
  //     },
  //     {
  //       id: 'e2a-3',
  //       source: '2',
  //       target: '3',
  //       sourceHandle: 'a',
  //       animated: true,
  //       style: { stroke: '#fff' },
  //     },
  //     {
  //       id: 'e2b-4',
  //       source: '2',
  //       target: '4',
  //       sourceHandle: 'b',
  //       animated: true,
  //       style: { stroke: '#fff' },
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    const onChange = (event: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        }),
      );
    };
    setNodes([
      ...nodes,
      {
        id: '1',
        type: 'custom',
        // data: { onChange: onChange },
        data: { label: 'An input node' },
        style: {
          border: '1px solid #777',
          padding: 10,
          backgroundColor: 'yellow',
        },
        position: { x: 250, y: 0 },
        sourcePosition: Position.Left,
      },
      {
        id: '5',
        // type: 'output',
        // type: 'custom',
        // data: { onChange: onChange },
        data: { label: 'An input node' },
        style: {
          border: '1px solid #777',
          padding: 10,
          backgroundColor: '#FF8000',
        },
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
        sourceHandle: 'a',
        animated: true,
      },
      {
        id: 'e1-5',
        source: '1',
        target: '5',
        sourceHandle: 'b',
        animated: true,
      },
    ]);
  }, []);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
