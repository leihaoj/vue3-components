<template>
  <div class="">
    <Checkbox v-model="checkValue" @change="change">记住密码</Checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Checkbox from '@/components/checkbox';

const checkValue = ref(false);

const change = (value: boolean) => {
  console.log(value);
};
</script>

<style lang="less"></style>
