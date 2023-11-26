<script setup lang="ts">
import { h } from 'vue'
import { NDataTable, NTag, type DataTableColumns } from 'naive-ui'
import type { IStats } from '@nodestats/socket/type'
import { format } from '../utils/format'
import BaseProgress from './BaseProgress.vue'
import RowExpand from './RowExpand.vue'
import PopoverProgress from './PopoverProgress.vue'

defineProps<{
  stats: IStats[]
}>()

const columns: DataTableColumns<IStats> = [
  {
    type: 'expand',
    expandable: rowData => !!rowData.online,
    renderExpand: (rowData) => {
      return h(RowExpand, { rowData })
    },
  },
  {
    title: '状态',
    key: 'status',
    render: (rowData) => {
      return h(NTag, { type: rowData.online ? 'success' : 'warning' }, () => rowData.online ? '在线' : '未连接')
    },
  },
  {
    title: '节点名称',
    key: 'name',
  },
  {
    title: '操作系统',
    key: 'os',
  },
  {
    title: '地区',
    key: 'location',
  },
  {
    title: '运行时间',
    key: 'uptime',
    render: rowData => rowData.online && rowData.uptime ? format.seconds(rowData.uptime * 1000) : 'NULL',
  },
  {
    title: '负载',
    key: 'avgLoad',
    render: rowData => rowData.online ? rowData.avgLoad : 'NULL',
  },
  {
    title: 'CPU',
    key: 'cpu',
    render: (rowData) => {
      return rowData.online && rowData.cpuUsage ? h(BaseProgress, { rate: rowData.cpuUsage / 100 }) : 'NULL'
    },
  },
  {
    title: 'RAM',
    key: 'ram',
    render: (rowData) => {
      return rowData.online && rowData.memoryUsed && rowData.memoryTotal
      ? h(PopoverProgress, { rate: rowData.memoryUsed / rowData.memoryTotal, text: `${format.bytes(rowData.memoryUsed)} |  ${format.bytes(rowData.memoryTotal)}` }) 
      : 'NULL'
    },
  },
  {
    title: 'ROM',
    key: 'rom',
    render: (rowData) => {
      return rowData.online && rowData.diskUsed && rowData.diskTotal
      ? h(PopoverProgress, { rate: rowData.diskUsed / rowData.diskTotal, text: `${format.bytes(rowData.diskUsed)} |  ${format.bytes(rowData.diskTotal)}` }) 
      : 'NULL'
    },
  },
]
</script>

<template>
  <NDataTable :columns="columns" :data="stats" />
</template>
