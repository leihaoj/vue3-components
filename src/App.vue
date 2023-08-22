<template>
  <div class="">
    <Switch></Switch>
    <!-- <Table></Table> -->
    <div style="margin: 12px">
      <Checkbox></Checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Switch from '@/example/switch.vue';
import Table from '@/example/table.vue';
import Checkbox from '@/example/checkbox.vue';
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  background-color: #333333;
}
</style>
