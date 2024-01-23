import { clearConfigCache } from 'prettier';
import React, { memo, ChangeEvent, FC } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode: FC<any> = memo(({ data, isConnectable }) => {
  console.log('hello', isConnectable);
  return (
    <>
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#555' }}
        // onConnect={(params) => console.log('handle onConnect', params)}
        // isConnectable={isConnectable}
      />
      <div>Custom Color Picker Node:</div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 10, background: '#555' }}
        // isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        // isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="c"
        style={{ top: 35, bottom: 10, background: '#555' }}
        // isConnectable={isConnectable}
      />
    </>
  );
});

export default CustomNode;
