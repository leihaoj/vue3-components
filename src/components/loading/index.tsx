import './index.less';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    position: {
      type: String,
      default: 'absolute',
    },
    mask: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => (
      <div
        class="le-loading"
        style={{
          position: props.position,
          width: props.position == 'absolute' ? '100%' : '',
          height: props.position == 'absolute' ? '100%' : '',
          background: props.mask ? 'rgba(0,0,0,0.5)' : '',
        }}
      >
        <div class="le-spinner"></div>
      </div>
    );
  },
});
