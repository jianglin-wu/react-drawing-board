import React, { useContext, cloneElement } from 'react';
import useMove from './hooks/useMove';
import useResize from './hooks/useResize';
import { DrawingBoardContext } from './DrawingBoard';

const DEFAULT_SIZE = {
  width: 100,
  height: 100
};
const DEFAULT_POSITION = {
  left: 0,
  top: 0
};
const EditWarp = ({
  children,
  defaultSize = DEFAULT_SIZE,
  defaultPosition = DEFAULT_POSITION
}) => {
  const drawingBoard = useContext(DrawingBoardContext);
  const [editContainer, controlPosition, controlSize] = useMove({
    drawingBoard,
    size: defaultSize,
    position: defaultPosition
  });
  const dotBoxes = useResize(controlPosition, controlSize, drawingBoard);
  const [position] = controlPosition;
  const [size] = controlSize;

  const childrenStyle = {
    width: size.width,
    height: size.height
  };
  return (
    <div
      ref={editContainer}
      className="edit-container"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate(${position.left}px, ${position.top}px)`
      }}
    >
      {dotBoxes}
      {cloneElement(children, { style: childrenStyle })}
    </div>
  );
};

export default EditWarp;
