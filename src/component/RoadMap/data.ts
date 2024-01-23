// import { MarkerType, Position } from 'reactflow';

// export const initialNodes = [
//   {
//     id: '1',
//     position: { x: 0, y: 0 },
//     data: { label: 'Internet' },
//     sourcePosition: Position.Left,
//     targetPosition: Position.Left,
//     type: 'output',
//   },
//   { id: '2', position: { x: 0, y: 0 }, data: { label: 'HTML' } },
// ];

// export const initialEdges = [
//   {
//     id: 'e1-2',
//     source: '1',
//     target: '2',
//     // style: { stroke: '#00000' },
//   },
// ];

import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes: any = [
  {
    id: '1',
    type: 'custom',
    // type: 'input',
    data: {
      label: 'Input Node',
    },
    position: { x: 250, y: 0 },
    // sourcePosition: Position.Left,
    // targetPosition: Position.Right,
  },
  {
    id: '2',
    data: {
      label: 'Default Node',
    },
    style: { backgroundColor: 'yellow' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: {
      label: 'Output Node',
    },
    style: { backgroundColor: 'yellow' },
    // position: { x: 400, y: 100 },
    position: { x: 100, y: 200 },
  },
  {
    id: '4',
    type: 'output',
    data: {
      label: 'Output Node1',
    },
    style: { backgroundColor: '#FF8000' },
    position: { x: 500, y: -100 },
    targetPosition: Position.Left,
    // position: { x: 100, y: 200 },
  },
  // {
  //   id: '4',
  //   type: 'custom',
  //   position: { x: 100, y: 200 },
  //   data: {
  //     selects: {
  //       'handle-0': 'smoothstep',
  //       'handle-1': 'smoothstep',
  //     },
  //   },
  // },
  // {
  //   id: '5',
  //   // type: 'output',
  //   data: {
  //     label: 'custom style',
  //   },
  //   className: 'circle',
  //   style: {
  //     background: '#2B6CB0',
  //     color: 'white',
  //   },
  //   position: { x: 400, y: 200 },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  // },
  // {
  //   id: '6',
  //   type: 'output',
  //   style: {
  //     background: '#63B3ED',
  //     color: 'white',
  //     width: 100,
  //   },
  //   data: {
  //     label: 'Node',
  //   },
  //   position: { x: 400, y: 325 },
  //   sourcePosition: Position.Right,
  //   targetPosition: Position.Left,
  // },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e1-3', source: '2', target: '3', animated: true },
  // { id: 'e1-4', source: '1', target: '4', animated: true },
  // {
  //   id: 'e4-5',
  //   source: '4',
  //   target: '5',
  //   // type: 'smoothstep',
  //   sourceHandle: 'handle-0',
  //   data: {
  //     selectIndex: 0,
  //   },
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
  // {
  //   id: 'e4-6',
  //   source: '4',
  //   target: '6',
  //   type: 'smoothstep',
  //   sourceHandle: 'handle-1',
  //   data: {
  //     selectIndex: 1,
  //   },
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
];
