import './index.less';
import { defineComponent, Transition, onMounted, ref } from 'vue';
import CloseSvg from '@/assets/svg/close.svg';
import SuccessSvg from '@/assets/svg/message/success.svg';
import WarnSvg from '@/assets/svg/message/warn.svg';
import InfoSvg from '@/assets/svg/message/info.svg';
import ErrorSvg from '@/assets/svg/message/error.svg';
import ProblemSvg from '@/assets/svg/message/problem.svg';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'warn',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    destroyFn: {
      type: Function,
      default: () => '',
    },
    // 函数组件销毁时的操作
    index: {
      type: Number,
      default: 0,
    },
    clear: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let leaveInterval: any = null;
    let destroyInterval: any = null;
    // message动画时长
    const animationDuration = 300; // 毫秒
    // 弹窗是否显示
    const messageVisible = ref<boolean>(false);

    // 离开
    const onLeave = (duration: number = 0) => {
      leaveInterval = window.setTimeout(() => {
        messageVisible.value = false;
      }, duration);
    };

    // 销毁
    const onDestroy = (duration: number = 0) => {
      destroyInterval = window.setTimeout(() => {
        props.destroyFn(props.index);
      }, duration);
    };

    // 去除setTimeout
    const closeDestroyTimeout = () => {
      if (leaveInterval) {
        window.clearTimeout(leaveInterval);
        clearTimeout(leaveInterval);
        leaveInterval = null;
      }
      if (destroyInterval) {
        window.clearTimeout(destroyInterval);
        clearTimeout(destroyInterval);
        destroyInterval = null;
      }
    };

    // 关闭消息框
    const onClose = () => {
      // 立即关闭
      messageVisible.value = false;
      window.setTimeout(() => {
        props.destroyFn(props.index);
      }, animationDuration);
      // 取消onMounted的关闭事件
      closeDestroyTimeout();
    };

    // 获取消息的类型icon
    const getMessageIcon = () => {
      const { type } = props;
      if (type == 'success') {
        return <SuccessSvg></SuccessSvg>;
      } else if (type == 'warn') {
        return <WarnSvg></WarnSvg>;
      } else if (type == 'info') {
        return <InfoSvg></InfoSvg>;
      } else if (type == 'error') {
        return <ErrorSvg></ErrorSvg>;
      } else if (type == 'problem') {
        return <ProblemSvg></ProblemSvg>;
      }
    };

    onMounted(() => {
      messageVisible.value = true;
      // 提前走离开动画
      onLeave(props.duration - animationDuration);
      // 销毁
      onDestroy(props.duration);
    });

    return { messageVisible, closeDestroyTimeout, onClose, getMessageIcon };
  },
  render() {
    return (
      <Transition name="le-message">
        <div class="le-global-message" v-show={this.messageVisible}>
          <div class="le-message-type">{this.getMessageIcon()}</div>
          <div class="message-label">{this.$props.content}</div>
          <div class="close-icon" onClick={this.onClose}>
            <CloseSvg></CloseSvg>
          </div>
        </div>
      </Transition>
    );
  },
});
