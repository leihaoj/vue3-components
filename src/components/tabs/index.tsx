import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  provide,
  useSlots,
  watch,
  VNodeRef,
} from 'vue';
import './index.less';

export default defineComponent({
  props: {
    modelValue: String,
    theme: {
      type: String,
      default: 'light',
    },
    defaultLineWidth: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const { slots, emit } = context;
    const use_slots = useSlots();
    // 当前tab
    const currentTab = ref(props.modelValue);
    // 通知tab_panel
    provide('currentTab', currentTab);
    // 获取tab_panel的props
    const getTitles = () => {
      if (use_slots.default) {
        const c_titles = use_slots.default().map(({ props }, index) => {
          let label = '';
          let name = '';
          if (props) {
            label = props.label;
            name = props.name;
          }
          return {
            label,
            name,
            index,
          };
        });
        return c_titles;
      }
      return [];
    };

    const titles = ref<
      {
        label: string;
        name: string;
        index: number;
      }[]
    >(getTitles());

    const tab_bar = reactive<{
      width: number | null;
      left: number | null;
      right: number | null;
    }>({
      width: 0,
      left: 0,
      right: 0,
    });
    const getOptionsIndex = () => {
      const { modelValue } = props;
      if (titles && modelValue) {
        let index = titles.value.findIndex(
          (item: any) => item.name == modelValue
        );
        return index !== -1 ? index : 0;
      }
      return 0;
    };
    // 记录当前下标
    const navIndex = ref(getOptionsIndex());
    const navItem = ref<VNodeRef | HTMLElement[]>([]);

    const setRef = (el: any) => {
      if (el) {
        const index = navItem.value.findIndex((item: any) => item === el);
        if (index === -1) {
          navItem.value.push(el);
        }
      }
    };

    // 计算tabs_bar宽度
    const getTabBarWidth = () => {
      nextTick(() => {
        const dom: HTMLElement = navItem.value[navIndex.value];
        if (!dom.clientWidth) {
          tab_bar.width = props.defaultLineWidth;
        } else {
          tab_bar.width = dom.clientWidth;
        }
      });
    };

    // 计算tab_bar的位置
    const getTabBarLocation = () => {
      nextTick(() => {
        let total_width = 0;
        for (let i = 0; i < navIndex.value; i++) {
          total_width += navItem.value[i].clientWidth;
        }
        // 定位到左边
        tab_bar.right = null;
        tab_bar.left = total_width;
      });
    };

    watch(
      () => props.modelValue,
      (v) => {
        if (currentTab.value != v) {
          // 找到对应的下标
          let index = titles.value.findIndex((item: any) => item.name == v);
          if (index !== -1) {
            // 更新tab_bar的位置
            onChange(titles.value[index].name, titles.value[index].index);
          }
        }
      }
    );

    // 切换tab
    const onChange = (name: string, index: number) => {
      currentTab.value = name;
      emit('update:modelValue', name);
      emit('change', name);
      navIndex.value = index;
      // 重新计算tab的宽度
      getTabBarWidth();
      // 计算位置
      getTabBarLocation();
    };

    // 根据主题修改class
    const getActiveClass = (item: any) => {
      if (props.modelValue === item.name) {
        if (props.theme === 'light') {
          return 'c-nav-item_active';
        } else if (props.theme === 'dark2') {
          return 'c-nav-item-_active_dark2';
        } else {
          return 'c-nav-item_active_dark';
        }
      }
      return '';
    };

    const getDefaultClass = () => {
      if (props.theme === 'light') {
        return 'c-nav-item-light';
      } else if (props.theme === 'dark2') {
        return 'c-nav-item-dark2';
      } else {
        return 'c-nav-item-dark';
      }
    };

    onMounted(() => {
      getTabBarWidth();
    });
    return () => (
      <div class="custom-c-tabs">
        <div class="c-tabs-header">
          {slots.rightComponent?.()}
          {titles.value.map((item: any, index) => (
            <div
              key={item.name}
              class={[
                'c-nav-item-default',
                getDefaultClass(),
                getActiveClass(item),
              ]}
              ref={setRef}
              onClick={onChange.bind(this, item.name, index)}
            >
              <div class="c-tabs__nav-item-wrapper">{item.label}</div>
            </div>
          ))}
          {props.theme === 'dark' ? (
            <div
              class="c-tabs__bar"
              style={{
                width: tab_bar.width + 'px',
                left: tab_bar.left + 'px',
                right: tab_bar.right + 'px',
              }}
            ></div>
          ) : (
            ''
          )}
        </div>
        <div class="c-tabs-content">{slots.default?.()}</div>
      </div>
    );
  },
});
