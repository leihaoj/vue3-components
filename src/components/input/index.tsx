import './index.less';
import {
  defineComponent,
  Transition,
  reactive,
  ref,
  watch,
  onMounted,
  PropType,
  computed,
} from 'vue';
import { RulesType, TextAlign } from './type';
import PrivatePwdSvg from '@/assets/svg/login/privatePwd.svg';
import PublicPwdSvg from '@/assets/svg/login/publicPwd.svg';

const emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,8}){1,2}$/;

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    num: {
      type: Number,
      default: 0,
    },
    rules: {
      type: Array<RulesType>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    needSelect: {
      type: Boolean,
      default: false,
    },
    selectList: {
      type: Array,
      default: [],
    },
    align: {
      type: String as PropType<TextAlign>,
      default: 'center',
    },
    height: {
      type: String,
      default: '32px',
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    borderRadius: {
      type: String,
      default: '4px',
    },
    width: {
      type: String,
      default: '200px',
    },
    id: {
      type: [String, Number],
      default: '',
    },
    blurNum: {
      type: Number,
      default: 1,
    },
  },
  emits: [
    'update:modelValue',
    'submitType',
    'submitAccount',
    'inputChange',
    'inputBlur',
  ],
  setup(props, { emit, slots }) {
    const inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(value: string | number) {
        formValidation();
        emit('update:modelValue', value);
      },
    });
    // element
    const customInput = ref<HTMLInputElement>();
    // 是否聚焦
    const inputFocus = ref(false);
    // 校验显示的错误
    const ruleError = reactive({
      status: false,
      message: '',
    });
    const inputType = ref<string>('text');
    // 当输入框类型为password时，展示私有密码svg
    const passwordCurrentType = ref<string>('private');
    // 输入框输入校验
    const numberInput = (e: string | number) => {
      const { type } = props;
      if (type == 'number') {
        inputValue.value = (e + '').replace(/[^\d]/g, '');
      }
      // 提交输入事件
      emit('inputChange', inputValue.value);
    };
    // 聚焦事件
    const onInputFocus = () => {
      if (props.needSelect) {
        inputFocus.value = true;
      }
    };
    // 失去焦点
    const onInputBlur = () => {
      if (props.needSelect) {
        inputFocus.value = false;
      }
      emit('inputBlur', inputValue.value, props.id);
    };
    // 错误状态
    const errorinput = (rule: any) => {
      ruleError.status = true;
      ruleError.message = rule.message;
      // 提交失败信息
      emit('submitType', false);
    };
    // 提交用户的账号密码
    const quickInputAccount = (item: any) => {
      emit('submitAccount', item);
    };
    // 重置输入框状态
    const resetInput = () => {
      ruleError.status = false;
      ruleError.message = '';
      // 提交通过信息
      emit('submitType', true);
    };
    if (props.type == 'password') {
      inputType.value = props.type;
    }

    //
    const changePwd = (value: string) => {
      if (value === 'text') {
        passwordCurrentType.value = 'public';
      } else {
        passwordCurrentType.value = 'private';
      }
      inputType.value = value;
    };
    // 表单校验
    const formValidation = () => {
      const { rules } = props;
      let v = inputValue.value;
      if (rules) {
        for (let i in rules) {
          let rule: any = rules[i];
          if (rule.required && !v) {
            // 校验空input
            errorinput(rule);
            return;
          } else {
            resetInput();
          }
          // 自定义校验逻辑
          if (rule.validator) {
            let res = rule.validator(v);
            if (!res.status) {
              errorinput(res);
              return;
            } else {
              resetInput();
            }
          }
          // 邮箱验证模块
          if (rule.type == 'email') {
            if (!emailReg.test(v + '')) {
              // 邮箱校验不通过
              errorinput(rule);
              return;
            } else {
              resetInput();
            }
          }
          // 输入框最小长度校验
          if (rule.min && (v + '').length < rule.min) {
            errorinput(rule);
            return;
          } else {
            resetInput();
          }
        }
      }
    };

    // 自动聚焦
    onMounted(() => {
      if (props.autoFocus && customInput.value) {
        customInput.value.focus();
      }
    });

    watch(
      () => props.num,
      () => {
        // 校验
        formValidation();
      }
    );

    watch(
      () => props.blurNum,
      () => {
        customInput.value && customInput.value.focus();
      }
    );

    // 密码输入框右侧图标
    const showPasswordIconOnRight = () => {
      if (props.type === 'password') {
        return (
          <span class="custom-pwd-hide-button">
            {passwordCurrentType.value === 'private' ? (
              <span onClick={changePwd.bind(this, 'text')}>
                <PrivatePwdSvg></PrivatePwdSvg>
              </span>
            ) : (
              <span onClick={changePwd.bind(this, 'password')}>
                <PublicPwdSvg></PublicPwdSvg>
              </span>
            )}
          </span>
        );
      }
      return '';
    };

    return () => (
      <div
        class={['custom-input-global', props.className]}
        style={{
          width: props.width,
        }}
      >
        <div
          style={{
            height: props.height,
            borderRadius: props.borderRadius,
          }}
          class={{
            'custom-input-box': true,
            'custom-input-error': ruleError.status,
            'dark-input-box': props.theme === 'dark',
            'light-input-box': props.theme === 'light',
            'opacity-input-box': props.theme === 'opacity',
          }}
        >
          {slots.leftIcon ? (
            slots.leftIcon
          ) : (
            <span class="left-input-icon"></span>
          )}
          <input
            ref={customInput}
            type={inputType.value}
            v-model={inputValue.value}
            class="cust-input"
            disabled={props.disabled}
            placeholder={props.placeholder}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onInput={numberInput.bind(this, inputValue.value)}
            style={{
              'text-align': props.align,
              borderRadius: props.borderRadius,
            }}
          />
          {showPasswordIconOnRight()}
          {slots.rightIcon ? slots.rightIcon() : ''}
          <Transition name="remember-fade">
            {props.needSelect && inputFocus.value && props.selectList.length ? (
              <div class="remember-select-box">
                {props.selectList.map((item: any) => (
                  <div
                    key={item.account}
                    class="line"
                    onClick={quickInputAccount.bind(this, item)}
                  >
                    <div class="account">{item.account}</div>
                    <div class="password">********</div>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </Transition>
        </div>
        {props.rules && props.rules.length ? (
          <div class="custom-input-rule">{ruleError.message}</div>
        ) : (
          ''
        )}
      </div>
    );
  },
});
