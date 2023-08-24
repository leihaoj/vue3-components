<template>
  <div style="margin: 50px">
    <ToolTip content="你好，我是tooltip">
      <div class="tooltip-trigger" @click="changeText">
        鼠标移入
        <div>{{ text }}</div>
      </div>
    </ToolTip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ToolTip from '@/components/tooltip';

const text = ref('222333333333333333');

const changeText = () => {
  text.value = '111';
};
</script>

<style lang="less">
.tooltip-trigger {
  display: inline-block;
}
</style>
