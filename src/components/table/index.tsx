import './index.less';
import { defineComponent } from 'vue';
import Loading from '@/components/loading';

export default defineComponent({
  props: {
    rowKey: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    handleRowClick: {
      type: [Function, Boolean],
      default: false,
    },
  },
  emits: ['update:loading'],
  setup(props) {
    // 行点击事件
    const rowClick = (item: any) => {
      const { handleRowClick } = props;
      if (handleRowClick && typeof handleRowClick !== 'boolean') {
        handleRowClick(item);
      }
    };
    // 当前显示的元素
    const currentShowElement = () => {
      const { loading, data } = props;
      if (data.length) {
        return props.data.map((item: any, index: number) => (
          <tr
            key={props.rowKey ? item[props.rowKey] : index}
            onClick={rowClick.bind(this, item)}
          >
            {props.columns.map((column: any) => (
              <td
                class={column.className}
                style={{
                  width: column.width ? column.width : '',
                  textAlign: column.align ? column.align : 'left',
                }}
              >
                {column.cell
                  ? column.cell({
                      col: column,
                      row: item,
                    })
                  : item[column.key]}
              </td>
            ))}
          </tr>
        ));
      } else {
        return (
          <tr class="le-table__empty-row">
            <td colspan={props.columns.length}>
              <div class="le-table__empty">暂无数据</div>
            </td>
          </tr>
        );
      }
    };
    return () => (
      <div class="le-table-parent">
        <table class="le-table">
          <thead>
            <tr>
              {props.columns.map((column: any) => (
                <th
                  style={{
                    width: column.width ? column.width : '',
                    textAlign: column.align ? column.align : 'left',
                  }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{currentShowElement()}</tbody>
        </table>
        <div class="le-table-loading" v-show={props.loading}>
          <Loading mask={true}></Loading>
        </div>
      </div>
    );
  },
});
