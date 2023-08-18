import './index.less';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: Boolean,
    background: String,
    label: {
      type: Array,
      default: () => ['yes', 'no'],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const switchValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });
    return () => (
      <div class={['le-switch', switchValue.value ? 'le-switch-checked' : '']}>
        <div>{switchValue.value ? props.label[0] : props.label[1]}</div>
      </div>
    );
  },
});
