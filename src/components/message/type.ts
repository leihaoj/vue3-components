import { App } from 'vue';

export interface messageProps {
  content: string;
  type?: string;
  duration?: number;
  destroyFn?: Function;
  index?: number;
  // 是否销毁之前的message
  clear?: boolean;
}

export interface factory {
  app: App<Element>;
  container: HTMLDivElement;
  messageRef: any;
}
