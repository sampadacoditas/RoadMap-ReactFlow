import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import { ICustomNode } from './ICustomNode';
import { handleIds } from './CustomNodeData';
import classses from './CustomNode.module.scss';
import { TYPES } from '../../constants';

const CustomNode = (props: ICustomNode) => {
  const { data } = props;

  return (
    <Fragment>
      <Handle
        type={TYPES.SOURCE}
        position={Position.Left}
        className={classses.hanel1}
      />
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
    </Fragment>
  );
};

export default CustomNode;
