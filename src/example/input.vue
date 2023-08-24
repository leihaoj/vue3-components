<template>
  <div class="">
    <Input v-model="inputValue"></Input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Input from '@/components/input';

const inputValue = ref('');
</script>

<style lang="less"></style>
