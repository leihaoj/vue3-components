import './index.less';
import { defineComponent, ref } from 'vue';
import Popup from '@/components/popup';
export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
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
