import { h, render, createApp, App } from 'vue';
import Message from './index';
import { messageProps, factory } from './type';

const messages: factory[] = [];

function createMessage(params: messageProps) {
  const app = createApp({
    render() {
      return h(Message, params);
    },
  });
  const container = document.createElement('div');
  document.body.appendChild(container);

  return {
    app: app,
    container: container,
  };
}

export const showMessage = ({ content, type, duration }: messageProps) => {
  // 销毁实例
  const destroyFn = (index: number) => {
    let currentApp = messages[index];
    currentApp.app.unmount();
    document.body.removeChild(currentApp.container);
    // 断开对象与引用的联系(等待垃圾回收机制自动回收)
    messages[index] = null;
    // 最后一条准备销毁
    if (index == messages.length - 1) {
      // 当所有的实例都为null时，清空数组
      let nullNum = 0;
      messages.forEach((item: factory) => {
        if (item === null) {
          nullNum += 1;
        }
      });
      if (nullNum === messages.length) {
        messages.length = 0;
        console.log('已全部销毁');
      }
    }
  };
  let params: messageProps = {
    content: content,
    destroyFn: destroyFn,
    index: messages.length,
  };
  if (type) {
    params.type = type;
  }
  if (duration) {
    params.duration = duration;
  }
  const result = createMessage(params);
  messages.push(result);
  result.app.mount(result.container);
};
