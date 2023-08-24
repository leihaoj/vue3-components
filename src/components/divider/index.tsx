import './index.less';
import { defineComponent, PropType } from 'vue';
import { propsLayout, propsAlign, layoutHorizontal } from './type';

export default defineComponent({
  props: {
    layout: {
      type: String as PropType<propsLayout>,
      default: 'vertical',
    },
    align: {
      type: String as PropType<propsAlign>,
      default: 'center',
    },
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={[
          'le-divider',
          props.layout === layoutHorizontal ? `le-divider-${props.align}` : '',
          `le-divider-${props.layout}`,
        ]}
      >
        <span class="le-divider-text">{slots.default?.()}</span>
      </div>
    );
  },
});
