import './index.less';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const checkValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
        emit('change', value);
      },
    });

    const change = () => {
      checkValue.value = !props.modelValue;
    };

    return () => (
      <div class="le-checkbox" onClick={change}>
        <div
          class={[
            'le-checkbox-input',
            checkValue.value ? 'le-checkbox-active' : '',
          ]}
        ></div>
        <div class="le-checkbox-label">
          {slots.default ? slots.default() : ''}
        </div>
      </div>
    );
  },
});
