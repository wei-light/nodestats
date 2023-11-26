<script setup lang="ts">
import { IStats } from '@nodestats/socket/type';
import { format } from '../utils/format'
import PopoverProgress from './PopoverProgress.vue'

defineProps<{
  rowData: IStats
}>()
</script>

<template>
  <div>
    <p>磁盘分区</p>
    <div class="w-1/2 space-y-2">
      <div v-for="([used, total], key) in rowData.diskPartition" :key="key" class="flex gap-3">
        <span class="w-20 line-clamp-1" :title="key">{{ key }}</span>
        <PopoverProgress class="flex-1" :rate="used / total" :text="`${format.bytes(used)} | ${format.bytes(total)}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
