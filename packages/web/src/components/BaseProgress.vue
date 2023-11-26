<script setup lang="ts">
defineProps<{
  rate: number
}>()
</script>

<template>
  <div class="relative flex flex-col justify-center h-5 bg-gray-200 rounded overflow-hidden">
    <span class="relative z-10 text-xs ml-1 text-white">{{ `${(rate * 100).toFixed(0)}%` }}</span>
    <div class="absolute inset-0" :class="[rate < 0.6 ? 'bg-green-500' : rate < 0.8 ? 'bg-yellow-500' : 'bg-red-500']" :style="{ width: `${rate * 100}%` }" />
  </div>
</template>
