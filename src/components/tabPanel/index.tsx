import { defineComponent, inject } from 'vue';
import './index.less';

export default defineComponent({
  props: {
    name: String,
    label: String,
  },
  setup(props, { emit, slots }) {
    let currentTab: { value: string } = inject('currentTab');
    return () => {
      return <div v-show={currentTab.value === props.name}>{slots.default?.()}</div>;
    };
  },
});
