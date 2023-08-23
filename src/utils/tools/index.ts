// 基本类型数组中是否包含指定值
export const containsValue = (list: any[], value: any) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      return true;
    }
  }
  return false;
};
