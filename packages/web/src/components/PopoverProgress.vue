<script setup lang="ts">
import { NPopover } from 'naive-ui'
import BaseProgress from './BaseProgress.vue'

defineProps<{
  rate: number
  text: string
}>()
</script>

<template>
  <NPopover>
    <template #trigger>
      <BaseProgress v-bind="$attrs" :rate="rate" />
    </template>
    <span>{{ text }}</span>
  </NPopover>
</template>

<style scoped>

</style>
