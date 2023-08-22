import './index.less';
import { defineComponent, inject, ref } from 'vue';
export default defineComponent({
  props: {
    name: String,
  },
  setup(props, { emit, slots }) {
    const leRules: { value: object } = inject('leRules');
    const { name } = props;
    return () => {
      return (
        <div class="le-form-item">
          {slots.default ? slots.default() : ''}
          <div class="le-form-item-tip">
            {leRules && leRules.value[name]
              ? leRules.value[name].map((item: any) =>
                  item.leShow ? (
                    <div class={[`form-item-${item.type}`]} key={item.message}>
                      {item.message}
                    </div>
                  ) : (
                    ''
                  ),
                )
              : ''}
          </div>
        </div>
      );
    };
  },
});
