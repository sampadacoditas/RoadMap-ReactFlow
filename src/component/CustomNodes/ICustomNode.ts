export interface ICustomNode {
  data: {
    label: string;
    options?: TOption[];
    id: string;
    nodeType: any;
  };
  deleteIcon: any;
  hoveredNodeId: string;
  handleDeleteNode: (id: string) => void;
  doubleClickedNode: undefined | any;
  isDoubleClicked: boolean;
  setIsDoubleClicked: any;
  updateNodeData: (value: string, id: string) => void;
  onConnect: (params: any) => void;
}

type TOption = {
  type?: string;
  position?: string;
  id?: string;
  className?: string;
};
