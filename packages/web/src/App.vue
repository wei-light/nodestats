<script setup lang="ts">
import { ref } from 'vue'
import { connectWebToServer } from '@nodestats/socket/web'
import { IStats } from '@nodestats/socket/type';
import TableView from './components/TableView.vue'
import TheHeader from './components/TheHeader.vue'

const stats = ref<IStats[]>([])

connectWebToServer((data) => {
  stats.value = data.sort((a, b) => Number(b.online) - Number(a.online))
})
</script>

<template>
  <TheHeader />
  <main class="max-w-6xl mx-auto px-6 py-8">
    <TableView :stats="stats" />
  </main>
</template>