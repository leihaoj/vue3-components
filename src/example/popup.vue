<template>
  <div style="margin: 200px">
    <Popup
      :destroyOnClose="true"
      v-model="popupVisible"
      :placement="placement"
      :showArrow="true"
    >
      <button>打开popup</button>
    </Popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Popup from '@/components/popup';
const popupVisible = ref(false);
const placement = ref('right');
</script>

<style lang="less"></style>
