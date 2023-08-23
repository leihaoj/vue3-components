import './index.less';
import { Teleport, defineComponent, computed, Transition } from 'vue';
import CloseSvg from '@/assets/svg/close.svg';
import Button from '@/components/button';

export default defineComponent({
  props: {
    modelValue: Boolean,
    // 组件提升
    attach: {
      type: String,
      default: 'body',
    },
    // 弹出显示位置
    placement: {
      type: String,
      default: 'center',
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true,
    },
    // 点击遮罩位置是否关闭弹窗
    maskClose: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'close', 'confirm'],
  setup(props, { emit, slots }) {
    // 弹窗状态
    const visible = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    // 关闭
    const onClose = (close: boolean = true) => {
      if (close) {
        visible.value = false;
      }
    };

    // 确定事件
    const onConfirm = () => {
      emit('confirm');
    };

    return () => (
      <>
        <Teleport to={props.attach}>
          <Transition name="le-dialog-default-transition">
            <div
              v-show={visible.value}
              class={['le-dialog', `le-dialog-${props.placement}`]}
            >
              <div
                class={[props.mask ? 'le-dialog-mask' : '']}
                onClick={onClose.bind(this, props.maskClose)}
              ></div>
              <Transition name={`dialog-animation-${props.placement}`}>
                <div
                  v-show={visible.value}
                  class={[
                    'le-dialog-body',
                    `le-dialog-body-${props.placement}`,
                  ]}
                >
                  <div class="le-dialog-close" onClick={() => onClose()}>
                    <CloseSvg></CloseSvg>
                  </div>
                  <div class="le-dialog-header">
                    {slots.header ? slots.header() : ''}
                  </div>
                  <div class="le-dialog-content">
                    {slots.default ? slots.default() : ''}
                    {slots.body ? slots.body() : ''}
                  </div>
                  <div class="le-dialog-footer">
                    {slots.footer ? (
                      slots.footer()
                    ) : (
                      <div class="le-dialog-footer__default">
                        <Button theme="transparent" onClick={() => onClose()}>
                          取消
                        </Button>
                        <Button onClick={onConfirm}>确认</Button>
                      </div>
                    )}
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </Teleport>
      </>
    );
  },
});
