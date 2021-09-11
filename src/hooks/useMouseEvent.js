import { useEffect } from 'react';

const useMouseEvent = (onMouseDown, onMouseMove, onMouseUp) => {
  // 1. 节流函数若重新生成，需将上一个节流函数取消
  // 2. 卸载也将节流的异步任务清除
  useEffect(() => () => onMouseMove.cancel(), [onMouseMove]);

  // 事件监听
  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    return () => {
      document.removeEventListener('mousedown', onMouseDown, false);
      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);
};

export default useMouseEvent;
