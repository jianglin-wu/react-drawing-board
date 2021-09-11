import { useState, useRef, useCallback, useEffect } from 'react';
import throttle from 'lodash/throttle';
import useMouseEvent from './useMouseEvent';
import { isTargetInside, safeNum } from '../utils';

const useMove = (options = {}) => {
  const [size, setSize] = useState(options.size || { width: 100, height: 100 });
  const [position, setPosition] = useState(
    options.position || { left: 0, right: 0 }
  );
  const editContainer = useRef(null);
  const mouseInfo = useRef(null);
  const stateInfo = useRef({
    position,
    size
  });

  const onMouseDown = useCallback(
    e => {
      if (
        !e.target.className.split(' ').includes('dot-box') &&
        isTargetInside(e.target, editContainer.current)
      ) {
        const { position: positionRef } = stateInfo.current;
        mouseInfo.current = {
          left: positionRef.left,
          top: positionRef.top,
          pageX: e.pageX,
          pageY: e.pageY
        };
      }
    },
    [editContainer, stateInfo, mouseInfo]
  );
  const onMouseMove = useCallback(
    throttle(e => {
      e.preventDefault();
      if (mouseInfo.current) {
        const {
          size: sizeRef,
          drawingBoard: drawingBoardRef
        } = stateInfo.current;
        const prev = mouseInfo.current;
        const offsetX = e.pageX - prev.pageX;
        const offsetY = e.pageY - prev.pageY;
        const left = safeNum(
          prev.left + offsetX,
          drawingBoardRef.width - sizeRef.width
        );
        const top = safeNum(
          prev.top + offsetY,
          drawingBoardRef.height - sizeRef.height
        );
        setPosition({ left, top });
      }
    }, 24),
    [stateInfo, mouseInfo]
  );
  const onMouseUp = useCallback(() => {
    onMouseMove.flush();
    mouseInfo.current = null;
  }, [onMouseMove, mouseInfo]);

  // 将最新的 state 写到 ref，因为事件监听内直接引入 state 在每次 state 更新后都要重新挂载新的函数，使用 ref 则不会
  useEffect(() => {
    stateInfo.current.position = position;
    stateInfo.current.size = size;
    stateInfo.current.drawingBoard = options.drawingBoard;
    return () => (stateInfo.current = {});
  }, [position, size, options.drawingBoard]);
  useMouseEvent(onMouseDown, onMouseMove, onMouseUp);

  return [editContainer, [position, setPosition], [size, setSize]];
};

export default useMove;
