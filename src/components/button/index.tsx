import './index.less';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    theme: {
      type: String,
      default: 'green',
    },
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const click = () => {
      emit('click');
    };
    return () => (
      <button onClick={click} class={['le-button', `le-button-${props.theme}`]}>
        {slots.default ? slots.default() : ''}
      </button>
    );
  },
});
