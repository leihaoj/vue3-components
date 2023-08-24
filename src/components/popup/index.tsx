import './index.less';
import {
  defineComponent,
  computed,
  watch,
  Teleport,
  ref,
  Transition,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { getDomClientRect } from '@/utils/tools/dom';
import { containsValue } from '@/utils/tools';
import Container from './container';
import {
  placementValues,
  defaultPlacement,
  defaultTrigger,
  triggerValues,
} from '@/components/props/popup';

export default defineComponent({
  props: {
    modelValue: Boolean,
    attach: {
      type: String,
      default: 'body',
    },
    // 隐藏时是否销毁元素
    destroyOnClose: {
      type: Boolean,
      default: false,
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
  emits: ['update:modelValue', 'close'],
  setup(props, { emit, slots }) {
    let animationTimeout: any = null;
    let debounceTimeout: any = null;
    // popup与触发元素的距离
    const distance = 8;
    // 动画时长
    const animationDuration = 300; // 毫秒
    // popup元素
    const popupRef = ref<HTMLElement>();
    // 触发popup的元素
    const triggerEl = ref<HTMLElement>();
    // 元素显示和隐藏
    const visibility = ref<'visible' | 'hidden'>(
      props.modelValue ? 'visible' : 'hidden'
    );
    // 元素是否加载
    const popupLoad = ref(props.destroyOnClose ? false : true);
    // x轴位置
    const popupX = ref(0);
    // y轴位置
    const popupY = ref(0);

    const visible = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    // 取消隐藏动画的timeout
    const closeAnimationTimeout = () => {
      window.clearTimeout(animationTimeout);
      clearTimeout(animationTimeout);
      animationTimeout = null;
    };

    // 清空
    const closeDebounceTimeout = () => {
      window.clearTimeout(debounceTimeout);
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
    };

    // 全局点击事件，判断点击的元素是否包含popup
    const popupEvent = (event: Event) => {
      if (
        visible.value &&
        popupRef.value &&
        triggerEl.value &&
        !popupRef.value.contains(event.target as Node) &&
        !triggerEl.value.contains(event.target as Node)
      ) {
        visible.value = false;
        popupHideEvent();
      }
    };

    // popup改变状态
    const popupStatusChange = (status: boolean | null = null) => {
      if (typeof status === 'boolean') {
        visible.value = status;
      } else {
        visible.value = !visible.value;
      }
      if (!visible.value) {
        popupHideEvent();
      }
    };

    // 隐藏popup时要执行的事件
    const popupHideEvent = () => {
      closeAnimationTimeout();
      animationTimeout = window.setTimeout(() => {
        visibility.value = 'hidden';
        if (props.destroyOnClose) {
          popupLoad.value = false;
        }
      }, animationDuration);
    };

    // 鼠标进入和离开
    const handleMouseEvent = (status: boolean) => {
      closeDebounceTimeout();
      debounceTimeout = window.setTimeout(() => {
        const { trigger } = props;
        // hover类型才触发
        if (trigger === 'hover') {
          popupStatusChange(status);
        }
      }, 200);
    };

    // 触发元素的点击事件
    const slotDefaultClick = (event: Event) => {
      if (props.trigger === 'click') {
        if (triggerEl.value && triggerEl.value.contains(event.target as Node)) {
          popupStatusChange();
        }
      }
    };

    // 计算popup的位置
    const calculatePopupPosition = () => {
      const dom = triggerEl.value;
      if (dom) {
        const client: DOMRect | boolean = getDomClientRect(dom);
        const popupClient: DOMRect | boolean = getDomClientRect(popupRef.value);
        if (client) {
          const { placement } = props;
          // 同类项操作
          if (popupClient) {
            // left一致
            if (containsValue(['left-bottom', 'left', 'left-top'], placement)) {
              popupX.value = client.left - popupClient.width - distance;
            }
            // top一致
            if (containsValue(['top-left', 'top', 'top-right'], placement)) {
              popupY.value = client.top - popupClient.height - distance;
            }
            // left一致
            if (containsValue(['bottom', 'top'], placement)) {
              popupX.value =
                client.left - (popupClient.width - client.width) / 2;
            }
            // right一致
            if (containsValue(['bottom-right', 'top-right'], placement)) {
              popupX.value = client.left + client.width - popupClient.width;
            }
            // right-top中top一致
            if (containsValue(['right-top', 'left-top'], placement)) {
              popupY.value =
                client.top -
                (popupClient.height - client.height) -
                (client.height / 5) * 4;
            }
            // right left 的top一致
            if (containsValue(['right', 'left'], placement)) {
              popupY.value =
                client.top - (popupClient.height - client.height) / 2;
            }
          }
          // bottom一致
          if (
            containsValue(['bottom', 'bottom-left', 'bottom-right'], placement)
          ) {
            popupY.value = client.top + client.height + distance;
          }

          // left一致
          if (containsValue(['bottom-left', 'top-left'], placement)) {
            popupX.value = client.left;
          }

          // right-top中left一致
          if (
            containsValue(['right-top', 'right', 'right-bottom'], placement)
          ) {
            popupX.value = client.left + client.width + distance;
          }

          // left-bottom right-bottom 的top一致
          if (containsValue(['left-bottom', 'right-bottom'], placement)) {
            popupY.value = client.top + client.height - client.height / 5;
          }
        }
      }
    };

    watch(
      () => visible.value,
      (v) => {
        if (v) {
          if (props.destroyOnClose) {
            popupLoad.value = true;
          }
          closeAnimationTimeout();
          setTimeout(() => {
            calculatePopupPosition();
          }, 0);
          visibility.value = 'visible';
        } else {
          popupHideEvent();
        }
      }
    );

    onMounted(() => {
      window.addEventListener('click', popupEvent);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('click', popupEvent);
      // 销毁trigger的事件
      if (triggerEl.value) {
        triggerEl.value.onclick = null;
        triggerEl.value.onmouseenter = null;
        triggerEl.value.onmouseleave = null;
      }
    });

    return () => (
      <>
        {popupLoad.value ? (
          <Teleport to={props.attach}>
            <Transition name="le-popup-transition">
              <div
                class={[
                  'le-popup',
                  visible.value ? 'le-popup-enter' : 'le-popup-leave',
                ]}
                ref={popupRef}
                style={{
                  transform: `translate(${popupX.value}px,${popupY.value}px)`,
                  visibility: visibility.value,
                }}
              >
                <div class="le-popup-content">
                  {slots.body ? slots.body() : ''}
                </div>
              </div>
            </Transition>
          </Teleport>
        ) : (
          ''
        )}
        <Container
          forwardRef={(el: HTMLElement) => {
            triggerEl.value = el;
            // 事件绑定
            if (triggerEl.value) {
              // 点击
              if (!triggerEl.value.onclick && props.trigger === 'click') {
                triggerEl.value.onclick = slotDefaultClick;
              }
              // 鼠标移入
              if (!triggerEl.value.onmouseenter && props.trigger === 'hover') {
                triggerEl.value.onmouseenter = handleMouseEvent.bind(
                  this,
                  true
                );
              }
              // 鼠标移出
              if (!triggerEl.value.onmouseleave && props.trigger === 'hover') {
                triggerEl.value.onmouseleave = handleMouseEvent.bind(
                  this,
                  false
                );
              }
            }
          }}
        >
          {slots.default ? slots.default() : ''}
        </Container>
      </>
    );
  },
});
