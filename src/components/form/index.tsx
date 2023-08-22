import { DataType } from '@/utils/tool';
import './index.less';
import { defineComponent, provide, ref, watch } from 'vue';
export default defineComponent({
  props: {
    data: Object,
    rules: Object,
  },
  emits: ['submit'],
  setup(props, { emit, slots }) {
    const newRule = ref<any>({});
    const ewriteRules = () => {
      const { data, rules } = props;
      Object.keys(rules).forEach((key: string) => {
        rules[key].forEach((item: any) => {
          // 是否显示error
          item.leShow = false;
          if (!DataType(newRule.value[key], 'array')) {
            newRule.value[key] = [];
          }
          newRule.value[key].push(item);
        });
      });
      // 注入规则，提供给item使用
      provide('leRules', newRule);
    };

    //
    ewriteRules();

    // 表单校验
    const formValidation = (rule: any, value: any) => {
      // 必填时
      if (rule.required) {
        if (value) {
          return true;
        } else {
          return false;
        }
      }
      // 正则时
    };

    // data改变重新校验状态
    const formAgainValidation = () => {
      const { data } = props;
      // 校验
      const keys = Object.keys(newRule.value);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const list = newRule.value[key];
        if (DataType(list, 'array')) {
          for (let j = 0; j < list.length; j++) {
            // 单条规则
            const rule = list[j];
            if (DataType(rule, 'object')) {
              // 校验
              if (formValidation(rule, data[key])) {
                rule.leShow = false;
              } else {
                rule.leShow = true;
              }
            }
          }
        }
      }
    };

    // 提交
    const onSubmit = (event: any) => {
      const { data } = props;
      // 阻止表单跳转
      event.preventDefault();
      // 校验
      const keys = Object.keys(newRule.value);
      // 记录状态
      let status = true;
      // 记录第一个message
      let message = [];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const list = newRule.value[key];
        if (DataType(list, 'array')) {
          for (let j = 0; j < list.length; j++) {
            // 单条规则
            const rule = list[j];
            if (DataType(rule, 'object')) {
              // 第一条不通过的
              if (!formValidation(rule, data[key])) {
                rule.leShow = true;
                status = false;
                message.push(rule.message);
                break;
              }
            }
          }
        }
      }
      // 通知tab_panel
      emit('submit', {
        result: status,
        firstError: message[0],
      });
    };

    watch(props.data, () => {
      formAgainValidation();
    });
    return () => (
      <form class="le-form" onSubmit={onSubmit}>
        {slots.default ? slots.default() : ''}
      </form>
    );
  },
});
