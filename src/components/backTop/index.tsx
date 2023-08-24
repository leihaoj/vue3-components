import './index.less';
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import BackTopSvg from '@/assets/svg/backtop/backtop.svg';

export default defineComponent({
  props: {
    container: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'TOP',
    },
    icon: {
      type: Function,
      default: () => <BackTopSvg></BackTopSvg>,
    },
  },
  setup(props) {
    // 滚动元素
    const scrollEl = ref<HTMLElement>();
    // 绝对定位的bottom位置
    const backTopBottom = ref(24);
    // 是否正在滚动
    const rolling = ref(false);

    const backTop = () => {
      if (scrollEl.value && scrollEl.value.scrollTop !== 0 && !rolling.value) {
        rolling.value = true;
        // 返回顶部
        scrollEl.value.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const createElementScrollEvent = () => {
      const scrollDom: HTMLElement | null = document.querySelector(
        props.container
      );
      if (scrollDom) {
        scrollEl.value = scrollDom;
        if (!scrollDom.onscroll) {
          // 创建滚动事件
          scrollDom.onscroll = () => {
            backTopBottom.value = -scrollDom.scrollTop + 24;
            // 恢复
            if (scrollDom.scrollTop === 0) {
              rolling.value = false;
            }
          };
        }
      }
    };

    onMounted(() => {
      // 监听元素滚动
      createElementScrollEvent();
    });

    onBeforeUnmount(() => {
      if (scrollEl.value) {
        scrollEl.value.onscroll = null;
      }
    });
    return () => (
      <div
        class="le-backTop"
        onClick={backTop}
        style={{
          bottom: backTopBottom.value + 'px',
        }}
      >
        <div class="le-backTop-icon">{props.icon()}</div>
        <div class="le-backTop-label">{props.label}</div>
      </div>
    );
  },
});
