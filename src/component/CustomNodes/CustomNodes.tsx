import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import { ICustomNode } from './ICustomNode';
import { handleIds } from './CustomNodeData';
import classses from './CustomNode.module.scss';
import { TYPES } from '../../constants';
// @ts-ignore
import { MdDelete } from 'react-icons/md';

const CustomNode = (props: ICustomNode) => {
  const { data, deleteIcon } = props;

  return (
    <>
      <Handle
        type={TYPES.SOURCE}
        position={Position.Top}
        className={classses.hanel1}
      />
      {deleteIcon && <MdDelete />}
      <div>{data.label}</div>
      {handleIds.map((item: { id: string; className: string }) => {
        return (
          <Fragment>
            <Handle
              type={TYPES.SOURCE}
              position={Position.Right}
              id={item.id}
              className={item.className}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default CustomNode;
