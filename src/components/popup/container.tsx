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
  VNode,
  Fragment,
} from 'vue';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { isRectChanged } from '@/utils/tools/dom';
import { dataType } from '@/utils/tools/index';

function useElement<T = HTMLElement>(
  getter: (instance: ComponentInternalInstance) => T
) {
  const instance: ComponentInternalInstance | null = getCurrentInstance();
  const el = ref<T>();

  onMounted(() => {
    if (instance) {
      el.value = getter(instance);
    }
  });
  onUpdated(() => {
    if (instance) {
      const newEl = getter(instance);
      if (el.value !== newEl) {
        el.value = newEl;
      }
    }
  });

  return el;
}

function filterEmpty(children: VNode[] = []) {
  const vnodes: VNode[] = [];
  children.forEach((child: any) => {
    if (dataType(child, 'array')) {
      vnodes.push(...child);
    } else if (child.type === Fragment) {
      vnodes.push(...filterEmpty(child.children as VNode[]));
    } else {
      vnodes.push(child);
    }
  });
  return vnodes.filter(
    (c) =>
      !(
        c &&
        (c.type === Comment ||
          (c.type === Fragment && c.children && c.children.length === 0) ||
          (c.type === Text && (c.children as string).trim() === ''))
      )
  );
}

const Trigger = defineComponent({
  name: 'LePopupTrigger',
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
  props: {
    forwardRef: {
      type: Function,
      default: (e: HTMLElement) => e,
    },
  },
  setup(props, { slots }) {
    const triggerEl = ref();
    return () => (
      <Fragment>
        <Trigger
          forwardRef={(el: HTMLElement) => {
            props.forwardRef(el);
            triggerEl.value = el;
          }}
        >
          {slots.default ? slots.default() : ''}
        </Trigger>
      </Fragment>
    );
  },
});
