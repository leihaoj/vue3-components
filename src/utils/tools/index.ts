/**
 * 防抖--可选择首次是否执行
 * @param func -fn
 * @param delay -time
 * @param Immediate -首次立即执行
 * @returns
 */
export function debounce(
  func: Function,
  delay: number,
  Immediate: boolean = false
) {
  let timer: any = null;
  let closeImmed: any = null;
  let immed = Immediate;
  return function (this: any, ...args: any) {
    const context = this;
    if (Immediate) {
      if (closeImmed) {
        clearTimeout(closeImmed);
      }
      if (immed) {
        func.call(context, ...args);
        immed = false;
        closeImmed = setTimeout(() => {
          immed = true;
        }, delay);
        return;
      }
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.call(context, ...args);
      immed = true;
    }, delay);
  };
}

// 基本类型数组中是否包含指定值
export const containsValue = (list: any[], value: any) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      return true;
    }
  }
  return false;
};
