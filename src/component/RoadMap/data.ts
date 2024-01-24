import { Position } from 'reactflow';

export const nodes = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: 'Input Node',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'HTML',
    },
    style: { backgroundColor: 'yellow' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: {
      label: 'CSS',
    },
    style: { backgroundColor: 'yellow' },
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
  },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e1-3', source: '2', target: '3', animated: true },
];
