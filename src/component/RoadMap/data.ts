import { Position } from 'reactflow';
import { TYPES } from '../../constants';
export const nodes = [
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
    type: TYPES.OUTPUT,
    data: {
      label: 'CSS',
    },
    style: { backgroundColor: 'yellow' },
    position: { x: 100, y: 200 },
  },
  {
    id: '4',
    type: TYPES.OUTPUT,
    data: {
      label: 'searching the data',
    },
    style: { backgroundColor: '#FF8000' },
    position: { x: 500, y: -100 },
    targetPosition: Position.Left,
  },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', type: TYPES.SMOOTHSTEP },
  { id: 'e1-3', source: '2', target: '3', animated: true },
];
