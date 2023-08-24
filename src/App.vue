<template>
  <div class="example">
    <div class="dark">
      <div>
        <Switch></Switch>
      </div>
      <!-- <Table></Table> -->
      <div>
        <Checkbox></Checkbox>
      </div>
    </div>

    <div>
      <Dialog></Dialog>
    </div>
    <div>
      <Message></Message>
    </div>
    <Popup></Popup>
    <ToolTip></ToolTip>
    <Input></Input>
    <Divider></Divider>
  </div>
</template>

<script lang="ts" setup>
import Switch from '@/example/switch.vue';
import Table from '@/example/table.vue';
import Checkbox from '@/example/checkbox.vue';
import Dialog from '@/example/dialog.vue';
import Message from '@/example/message.vue';
import Popup from '@/example/popup.vue';
import ToolTip from '@/example/tooltip.vue';
import Input from '@/example/input.vue';
import Divider from '@/example/divider.vue';
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .example {
    .dark {
      background-color: #333333;
      padding: 12px;
      & > * {
        margin: 12px;
      }
    }
  }
}
</style>
