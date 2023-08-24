import './index.less';
import { defineComponent, ref } from 'vue';
import Popup from '@/components/popup';
import {
  placementValues,
  defaultPlacement,
  defaultTrigger,
  triggerValues,
} from '@/components/props/popup';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
    // popup触发方式
    trigger: {
      type: String,
      validator(value: string) {
        return triggerValues.indexOf(value) !== -1;
      },
      default: defaultTrigger,
    },
    // 位置
    placement: {
      type: String,
      // 参数限制
      validator(value: string) {
        return placementValues.indexOf(value) !== -1;
      },
      default: defaultPlacement,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots }) {
    const visible = ref(false);
    return () => (
      <div class="le-tooltip">
        <Popup
          v-model={visible.value}
          v-slots={{
            body: () => props.content,
          }}
        >
          {slots.default ? slots.default() : ''}
        </Popup>
      </div>
    );
  },
});
