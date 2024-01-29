export interface ICustomNode {
  data: {
    label: string;
    options?:TOption[]
  };
  deleteIcon: any;
}

type TOption = {
  type?:string;
  position?:string;
  id?:string;
  className?: string;
}
