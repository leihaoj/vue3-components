import './index.less';
import {
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  PropType,
  watch,
} from 'vue';

function useElement<T = HTMLElement>(
  getter: (instance: ComponentInternalInstance) => T
) {
  const instance = getCurrentInstance();
  const el = ref<T>();

  onMounted(() => {
    el.value = getter(instance);
  });
  onUpdated(() => {
    const newEl = getter(instance);
    if (el.value !== newEl) {
      el.value = newEl;
    }
  });

  return el;
}
const Trigger = defineComponent({
  name: 'TPopupTrigger',
  props: {
    forwardRef: Function as PropType<(el: HTMLElement) => void>,
  },
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const el = useElement((vm: any) => {
      const containerNode = vm.parent.vnode;
      return containerNode.el.nextElementSibling;
    });
    const contentRect = ref<DOMRectReadOnly>();

    watch(el, () => {
      props.forwardRef?.(el.value);
    });

    useResizeObserver(el, ([{ contentRect: newContentRect }]) => {
      contentRect.value = newContentRect;
    });

    watch(contentRect, (newRect, oldRect) => {
      if (isRectChanged(newRect, oldRect)) {
        emit('resize');
      }
    });

    return () => {
      const children = filterEmpty(slots.default?.());
      if (children.length > 1 || children[0]?.type === Text) {
        return <span>{children}</span>;
      }
      return children[0];
    };
  },
});
export default defineComponent({
  setup(props, { slots }) {
    const defaultSlotRef = ref();
    onMounted(() => {});
    return () => <>{slots.default ? slots.default() : ''}</>;
  },
});
