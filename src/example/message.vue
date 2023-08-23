<template>
  <div class="">
    <button @click="onMessage">点击显示全局通知1</button>
    <button @click="onMessage2">点击显示全局通知2</button>
  </div>
</template>

<script lang="ts" setup>
import { showMessage } from '@/components/message/render';

const onMessage = () => {
  showMessage({
    content: '你好',
    type: 'problem',
    clear: false,
  });
};
const onMessage2 = () => {
  showMessage({
    content: '你们好',
    // type: 'success',
  });
};
</script>

<style lang="less"></style>
