import { App } from 'vue';

export interface messageProps {
  content: string;
  type?: string;
  duration?: number;
  destroyFn: Function;
  index: number;
}

export interface factory {
  app: App<Element>;
  container: HTMLDivElement;
}
