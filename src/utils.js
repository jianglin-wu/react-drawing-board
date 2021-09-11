export const isTargetInside = (target, parent) => {
  if (target instanceof Element && parent instanceof Element) {
    while (target) {
      if (target === parent) {
        return true;
      }
      target = target.parentElement;
    }
  }
  return false;
};

export const safeNum = (current, max = Infinity, min = 0) => {
  if (isNaN(current)) {
    console.error('[safeNum] current isNaN', current);
    return 0;
  }
  return Math.max(Math.min(current, max), min);
};
