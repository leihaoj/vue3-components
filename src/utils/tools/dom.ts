// 获取dom元素的clientRect
export const getDomClientRect = (
  element: Element | HTMLDivElement | null | undefined
) => {
  if (element) {
    return element.getBoundingClientRect();
  }
  return false;
};

// 判断domRect是否全等
export const isRectChanged = (
  newRect: DOMRect | undefined,
  oldRect: DOMRect | undefined
) => {
  if (newRect && oldRect) {
    const keys = Object.keys(newRect);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (newRect[key as keyof DOMRect] !== oldRect[key as keyof DOMRect]) {
        return true;
      }
    }
    return false;
  } else {
    if (!newRect && !oldRect) {
      return false;
    } else if (!newRect || !oldRect) {
      return true;
    }
  }
};
