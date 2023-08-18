import './index.less';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: Boolean,
    size: {
      type: String,
      defualt: '24px',
    },
    label: {
      type: Array,
      default: () => ['开', '关'],
    },
    // 用于循环渲染，切换之后要知道自己的下标
    id: {
      type: [String, Number],
      defualt: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const switchValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
        emit('change', value, props.id);
      },
    });

    const switchChange = () => {
      switchValue.value = !switchValue.value;
    };

    return () => (
      <div
        class={['le-switch', switchValue.value ? 'le-switch-checked' : '']}
        onClick={switchChange}
      >
        <span class="le-switch__handle"></span>
        <div class="le-switch__content">
          {switchValue.value ? props.label[0] : props.label[1]}
        </div>
      </div>
    );
  },
});
