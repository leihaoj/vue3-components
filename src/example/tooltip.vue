<template>
  <div style="margin: 50px">
    <ToolTip content="你好，我是tooltip">
      <div class="tooltip-trigger">鼠标移入</div>
    </ToolTip>
  </div>
</template>

<script lang="ts" setup>
import ToolTip from '@/components/tooltip';
</script>

<style lang="less">
.tooltip-trigger {
  display: inline-block;
}
</style>
