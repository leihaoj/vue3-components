import { onBeforeUnmount, Ref, watch } from 'vue';
export const useResizeObserver = (
  element: Ref<HTMLElement>,
  resizeFun: (data: ResizeObserverEntry[]) => void
) => {
  if (typeof window === 'undefined') return;

  const isSupport =
    window && (window as Window & typeof globalThis).ResizeObserver;
  if (!isSupport) return;

  let containerObserver: ResizeObserver | null = null;

  const cleanupObserver = () => {
    if (!containerObserver) return;
    containerObserver.unobserve(element.value);
    containerObserver.disconnect();
    containerObserver = null;
  };

  const addObserver = (el: HTMLElement) => {
    containerObserver = new ResizeObserver(resizeFun);
    containerObserver.observe(el);
  };

  if (element) {
    watch(
      element,
      (el) => {
        cleanupObserver();
        el && addObserver(el);
      },
      { immediate: true, flush: 'post' }
    );
  }

  onBeforeUnmount(() => {
    cleanupObserver();
  });
};
