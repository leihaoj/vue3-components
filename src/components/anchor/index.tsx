import './index.less';
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
  props: {
    container: String,
  },
  setup(props, { slots }) {
    const getContainer = () => {};
    onMounted(() => {
      // 获取容器
      getContainer();
    });
    return () => <>{slots.default?.()}</>;
  },
});
