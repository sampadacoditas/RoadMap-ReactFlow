import { NodeTypes } from 'reactflow';
import { NODE_TYPES } from '../../constants';
import { IParams } from '../RoadMap/IRoadMap';

export interface ICustomNode {
  data: {
    label: string;
    options?: TOption[];
    id: string;
    nodeType: NODE_TYPES.PRIMARY | NODE_TYPES.SECONDARY | NodeTypes;
  };
  deleteIcon: boolean;
  hoveredNodeId?: string;
  handleDeleteNode: (id: string) => void;
  doubleClickedNode: undefined | any;
  isDoubleClicked: boolean;
  setIsDoubleClicked: React.Dispatch<React.SetStateAction<boolean>>;
  updateNodeData: (value: string, id: string) => void;
  onConnect: (params: IParams) => void;
}

export interface TOption {
  type?: string;
  position?: string;
  id?: string;
  className?: string;
}
