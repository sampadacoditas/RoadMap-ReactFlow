import { Position } from 'reactflow';
import { NODE_TYPES, TYPES } from '../../constants';
import classes from './RoadMap.module.scss';
export const nodes = [
  {
    id: '2',
    type: TYPES.CUSTOM,
    data: {
      label: 'HTML',
      options: [
        { type: TYPES.TARGET, position: Position.Top, id: '1' },
        { type: TYPES.SOURCE, position: Position.Bottom, id: '2' },
      ],
      id: '2',
      nodeType: NODE_TYPES.PRIMARY,
    },
    className: `${classes.customNode}`,
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: TYPES.CUSTOM,
    data: {
      label: 'CSS',
      options: [
        { type: TYPES.TARGET, position: Position.Top, id: '1' },
        { type: TYPES.SOURCE, position: Position.Bottom, id: '2' },
      ],
      id: '3',
      nodeType: NODE_TYPES.PRIMARY,
    },
    className: `${classes.customNode}`,
    position: { x: 100, y: 200 },
  },
  {
    id: '4',
    type: TYPES.CUSTOM,
    data: {
      label: 'searching the data',
      options: [{ type: TYPES.TARGET, position: Position.Left, id: '1' }],
      id: '4',
      nodeType: NODE_TYPES.SECONDARY,
    },
    className: `${classes.childNode}`,
    position: { x: 500, y: -100 },
  },
];

export const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: '1',
    type: TYPES.SMOOTHSTEP,
  },
  { id: 'e2-3', source: '2', target: '3', type: 'default' },
];
