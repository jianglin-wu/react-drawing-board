import React, { useRef, useCallback, useEffect, Fragment } from 'react';
import throttle from 'lodash/throttle';
import useMouseEvent from './useMouseEvent';
import { safeNum } from '../utils';

const useResize = (controlPosition, controlSize, areaSize) => {
  const dotTopLeft = useRef(null);
  const dotTopMiddel = useRef(null);
  const dotTopRight = useRef(null);
  const dotMiddleLeft = useRef(null);
  const dotMiddleRight = useRef(null);
  const dotBottomLeft = useRef(null);
  const dotBottomMiddle = useRef(null);
  const dotBottomRight = useRef(null);

  const [position, setPosition] = controlPosition;
  const [size, setSize] = controlSize;
  const mouseInfo = useRef(null);
  const stateInfo = useRef({
    position,
    size,
    areaSize
  });

  const isOnAnyDotBox = target => {
    const boxes = [
      dotTopLeft.current,
      dotTopMiddel.current,
      dotTopRight.current,
      dotMiddleLeft.current,
      dotMiddleRight.current,
      dotBottomLeft.current,
      dotBottomMiddle.current,
      dotBottomRight.current
    ];
    return boxes.includes(target);
  };

  const onMouseDown = useCallback(
    e => {
      if (isOnAnyDotBox(e.target)) {
        const { position: positionRef, size: sizeRef } = stateInfo.current;
        mouseInfo.current = {
          target: e.target,
          width: sizeRef.width,
          height: sizeRef.height,
          left: positionRef.left,
          top: positionRef.top,
          pageX: e.pageX,
          pageY: e.pageY
        };
      }
    },
    [stateInfo, mouseInfo]
  );
  const onMouseMove = useCallback(
    throttle(e => {
      if (mouseInfo.current) {
        const { areaSize: areaSizeRef } = stateInfo.current;
        const prev = mouseInfo.current;
        let left = prev.left;
        let top = prev.top;
        let width = prev.width;
        let height = prev.height;
        // 计算指针像素偏移量
        let offsetY = e.pageY - prev.pageY;
        let offsetX = e.pageX - prev.pageX;
        // 改变上边线框
        if (
          [
            dotTopLeft.current,
            dotTopMiddel.current,
            dotTopRight.current
          ].includes(prev.target)
        ) {
          const max = prev.top + prev.height;
          top = safeNum(prev.top + offsetY, max);
          height = max - top;
        }
        // 改变左边线框
        if (
          [
            dotTopLeft.current,
            dotMiddleLeft.current,
            dotBottomLeft.current
          ].includes(prev.target)
        ) {
          const max = prev.left + prev.width;
          left = safeNum(prev.left + offsetX, max);
          width = max - left;
        }
        // 改变右边线框
        if (
          [
            dotTopRight.current,
            dotMiddleRight.current,
            dotBottomRight.current
          ].includes(prev.target)
        ) {
          width = safeNum(prev.width + offsetX, areaSizeRef.width - prev.left);
        }
        // 改变下边线框
        if (
          [
            dotBottomLeft.current,
            dotBottomMiddle.current,
            dotBottomRight.current
          ].includes(prev.target)
        ) {
          height = safeNum(
            prev.height + offsetY,
            areaSizeRef.height - prev.top
          );
        }
        setSize({ width, height });
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
    stateInfo.current.areaSize = areaSize;
    return () => (stateInfo.current = {});
  }, [position, size, areaSize]);
  useMouseEvent(onMouseDown, onMouseMove, onMouseUp);

  return (
    <Fragment>
      <div ref={dotTopLeft} className="dot-box top-left" />
      <div ref={dotTopMiddel} className="dot-box top-middle" />
      <div ref={dotTopRight} className="dot-box top-right" />
      <div ref={dotMiddleLeft} className="dot-box middle-left" />
      <div ref={dotMiddleRight} className="dot-box middle-right" />
      <div ref={dotBottomLeft} className="dot-box bottom-left" />
      <div ref={dotBottomMiddle} className="dot-box bottom-middle" />
      <div ref={dotBottomRight} className="dot-box bottom-right" />
    </Fragment>
  );
};

export default useResize;
