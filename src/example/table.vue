<template>
  <div class="test-table">
    <Table :data="data" :columns="columns" :loading="loading"></Table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, onMounted } from 'vue';
import Table from '@/components/table';
import CustomSwitch from '@/components/switch';

const loading = ref(true);
const data = ref([]);

onMounted(() => {
  setTimeout(() => {
    data.value = [
      {
        problem: '你好啊',
        c_status: true,
        get3: 1,
      },
      {
        problem: '你好啊',
        c_status: true,
        get3: 1,
      },
      {
        problem: '你好啊',
        c_status: true,
        get3: 1,
      },
    ];
    loading.value = false;
  }, 3000);
});

const switchChange = () => {
  console.log('我执行了');
};

const rowChange = () => {};

const openConfirmDialog = () => {};

const columns = [
  {
    title: '问题',
    key: 'problem',
    width: '60%',
    className: 'table-problem-td',
  },
  {
    title: '状态',
    key: 'c_status',
    cell: ({ col, row }) => (
      <CustomSwitch
        v-model={row[col.key]}
        id={row.id}
        onChange={switchChange}
      ></CustomSwitch>
    ),
  },
  {
    title: '操作',
    key: 'get3',
    cell: ({ row }) => (
      <div class="edit-box">
        <span class="edit-icon" onClick={rowChange.bind(this, row)}>
          editSvg
        </span>
        <span class="delete-icon" onClick={openConfirmDialog.bind(this, row)}>
          DeleteSvg
        </span>
      </div>
    ),
  },
];
</script>

<style lang="less">
.test-table {
  width: 813px;
}
</style>
