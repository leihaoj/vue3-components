<template>
  <div class="">
    <Dialog v-model="dialogVisible" :placement="placement"> </Dialog>
    <button @click="openDialog">打开弹窗</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from '@/components/dialog';

const dialogVisible = ref<boolean>(false);
const placement = ref<string>('center');

const openDialog = () => {
  dialogVisible.value = true;
};
</script>

<style lang="less"></style>
