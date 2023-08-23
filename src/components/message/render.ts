import { h, createApp, ref } from 'vue';
import Message from './index';
import { messageProps, factory } from './type';

const messages: factory[] = [];

// 设置messageProps的默认值
const defaultMessage: messageProps = {
  content: '',
  clear: true,
};

function createMessage(params: messageProps) {
  const messageRef = ref(null);
  const app = createApp({
    render() {
      return h(Message, { ref: messageRef, ...params });
    },
  });
  const container = document.createElement('div');
  document.body.appendChild(container);

  return {
    app: app,
    container: container,
    messageRef: messageRef,
  };
}

export const showMessage = (message: messageProps) => {
  // 销毁实例
  const destroyFn = (index: number, clear: boolean = false) => {
    let currentApp = messages[index];
    if (currentApp) {
      // 注销setTimeout事件
      if (clear) {
        const refs = currentApp.messageRef.value;
        if (refs.closeDestroyTimeout) {
          refs.closeDestroyTimeout();
        }
      }
      currentApp.app.unmount();
      document.body.removeChild(currentApp.container);
    }
    // 最后一条准备销毁
    if (index == messages.length - 1) {
      messages.length = 0;
    }
  };
  // 参数合并
  const params: messageProps = { ...defaultMessage, ...message };
  // 销毁之前的实例
  if (params.clear) {
    for (let i = 0; i < messages.length; i++) {
      destroyFn(i, true);
    }
  }
  params.index = messages.length;
  params.destroyFn = destroyFn;

  // 创建工厂函数
  const result = createMessage(params);
  messages.push(result);
  result.app.mount(result.container);
};
