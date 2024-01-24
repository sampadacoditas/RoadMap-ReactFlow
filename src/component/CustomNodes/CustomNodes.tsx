import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import { ICustomNode } from './ICustomNode';
import { handleIds } from './CustomNodeData';

const CustomNode = (props: ICustomNode) => {
  const { data } = props;

  return (
    <Fragment>
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      <div>{data.label}</div>
      {handleIds.map((item: { id: string; style: {} }) => {
        return (
          <Fragment>
            <Handle
              type="source"
              position={Position.Right}
              id={item.id}
              style={item.style}
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default CustomNode;
