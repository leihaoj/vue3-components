// 获取dom元素的clientRect
export const getDomClientRect = (
  element: Element | HTMLDivElement | null | undefined
) => {
  if (element) {
    return element.getBoundingClientRect();
  }
  return false;
};
