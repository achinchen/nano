import { useState } from 'react';

type PanInfo = {
  x: number;
  y: number;
};

export enum Direction {
  'none' = 0,
  'up',
  'down',
  'left',
  'right',
}

const THRESHOLD = 2;

export function usePan() {
  const [pan, setPan] = useState<PanInfo>({
    x: 0,
    y: 0,
  });

  const onStart = ({ x, y }: PanInfo) => {
    setPan({ x, y });
  };

  const onVertical = (y: PanInfo['y']) => {
    const direction =
      y === 0 ? Direction.none : y > 0 ? Direction.down : Direction.up;

    return Math.abs(y) >= THRESHOLD && direction;
  };

  const onHorizontal = (x: PanInfo['x']) => {
    const direction = x > 0 ? Direction.left : Direction.right;
    return Math.abs(x) >= THRESHOLD && direction;
  };

  const onEnd = ({ x: offsetX, y: offsetY }: PanInfo) => {
    const y = pan.y - offsetY;
    const x = pan.x - offsetX;

    const verticalDirection = onVertical(y);
    if (verticalDirection)
      return {
        direction: verticalDirection,
        isVertical: true,
      };

    const horizontalDirection = onHorizontal(x);
    return {
      direction: horizontalDirection || Direction.none,
      isVertical: false,
    };
  };

  return { pan, onStart, onEnd };
}

export default usePan;
