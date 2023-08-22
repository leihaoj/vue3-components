import './index.less';
import { defineComponent, Transition, onMounted, ref } from 'vue';
import CloseSvg from '@/assets/svg/close.svg';
import SuccessSvg from '@/assets/svg/message/success.svg';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'success',
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
  },
  setup(props) {
    // message动画时长
    const animationDuration = 300; // 毫秒
    // 弹窗是否显示
    const messageVisible = ref<boolean>(false);

    // 离开
    const onLeave = (duration: number = 0) => {
      setTimeout(() => {
        messageVisible.value = false;
      }, duration);
    };

    // 销毁
    const onDestroy = (duration: number = 0) => {
      setTimeout(() => {
        props.destroyFn(props.index);
      }, duration);
    };
    // 关闭消息框
    const onClose = () => {
      onLeave();
      onDestroy(animationDuration);
    };

    // 获取消息的类型icon
    const getMessageIcon = () => {
      const { type } = props;
      if (type == 'success') {
        return <SuccessSvg></SuccessSvg>;
      }
    };

    onMounted(() => {
      messageVisible.value = true;
      // 提前走离开动画
      onLeave(props.duration - animationDuration);
      // 销毁
      onDestroy(props.duration);
    });
    return () => (
      <Transition name="le-message">
        <div class="le-global-message" v-show={messageVisible.value}>
          <div class="le-message-type">{getMessageIcon()}</div>
          <div class="message-label">{props.content}</div>
          <div class="close-icon" onClick={onClose}>
            <CloseSvg></CloseSvg>
          </div>
        </div>
      </Transition>
    );
  },
});
