import React, { useRef, useEffect, useState } from 'react';

const defaultDrawingBoardSize = {
  width: 0,
  height: 0
};

export const DrawingBoardContext = React.createContext(defaultDrawingBoardSize);

export default function DrawingBoard({ children, className, style }) {
  const drawingBoardRef = useRef(null);
  const [drawingBoardSize, setDrawingBoardSize] = useState(
    defaultDrawingBoardSize
  );
  useEffect(() => {
    const drawingBoardDom = drawingBoardRef.current;
    const { width, height } = drawingBoardDom.getBoundingClientRect();
    setDrawingBoardSize({ width, height });
  }, []);
  return (
    <DrawingBoardContext.Provider value={drawingBoardSize}>
      <div ref={drawingBoardRef} className={className} style={style}>
        {children}
      </div>
    </DrawingBoardContext.Provider>
  );
}
