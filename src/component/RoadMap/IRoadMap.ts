import { NODE_TYPES, TYPES } from './../../constants';

export interface IParams {
  source: string | null;
  sourceHandle: string | null;
  target: string | null;
  targetHandle: string | null;
}

interface CustomNodePositionAbsolute {
  x: number;
  y: number;
}

export interface CustomNodeData {
  label: string;
  options?: {
    type?: string;
    position?: string;
    id?: string;
  }[];
  id: string;
  nodeType: NODE_TYPES.PRIMARY | NODE_TYPES.SECONDARY;
}

export interface INode {
  id?: string;
  type?:
    | TYPES.CUSTOM
    | TYPES.OUTPUT
    | TYPES.SMOOTHSTEP
    | TYPES.SOURCE
    | TYPES.TARGET;
  data?: CustomNodeData;
  className?: string;
  position?: CustomNodePositionAbsolute;
}
