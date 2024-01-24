import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import { ICustomNode } from './ICustomNode';
import { handleIds } from './CustomNodeData';
import classses from './CustomNode.module.scss';

const CustomNode = (props: ICustomNode) => {
  const { data } = props;

  return (
    <Fragment>
      <Handle
        type="source"
        position={Position.Left}
        className={classses.hanel1}
      />
      <div>{data.label}</div>
      {handleIds.map((item: { id: string; className: any }) => {
        return (
          <Fragment>
            <Handle
              type="source"
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
