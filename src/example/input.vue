<template>
  <div class="">
    <Input v-model="inputValue" :num="num"></Input>
    <button @click="onAdd">点击重新校验</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Input from '@/components/input';

const inputValue = ref('');
const num = ref(1);
const onAdd = () => {
  num.value++;
};
</script>

<style lang="less"></style>
