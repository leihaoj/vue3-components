<template>
  <div class="">
    <Switch v-model="switchValue"></Switch>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Switch from '@/components/switch';

const switchValue = ref(true);
</script>

<style lang="less"></style>
