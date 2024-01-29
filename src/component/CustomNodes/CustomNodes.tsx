import { Fragment, useState } from 'react';
import { Handle, Position } from 'reactflow';
import classes from './CustomNode.module.scss';
import { MdDelete } from 'react-icons/md';
import { NODE_TYPES } from '../../constants';

const CustomNode = (props: any) => {
  const {
    data,
    deleteIcon,
    hoveredNodeId,
    handleDeleteNode,
    doubleClickedNode,
    isDoubleClicked,
    setIsDoubleClicked,
    updateNodeData,
    onConnect,
    edges,
  } = props;
  const { label, options, id, nodeType } = data;

  const [labelData, setLabelData] = useState(label);

  const handleOnChange = (event: any) => {
    setLabelData(event.target.value);
  };
  const handleSubmit = () => {
    updateNodeData(labelData, doubleClickedNode.id);
    setIsDoubleClicked(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <Fragment>
      {hoveredNodeId === id && deleteIcon && (
        <MdDelete
          onClick={() => handleDeleteNode(id)}
          className={classes.delete}
        />
      )}
      {isDoubleClicked && doubleClickedNode.id === id ? (
        <div>
          <input
            onChange={handleOnChange}
            defaultValue={labelData}
            onKeyDown={handleKeyPress}
            className={
              nodeType === NODE_TYPES.PRIMARY
                ? classes.inputbox
                : classes.inputSecondary
            }
          />
        </div>
      ) : (
        <div>{labelData}</div>
      )}
      {options?.map(({ type, position, id, className = '' }: any) => {
        return (
          <Fragment>
            <Handle
              type={type}
              position={position}
              id={id}
              className={className}
              onConnect={(params) => onConnect(params)}
              // edges={edges}
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default CustomNode;
