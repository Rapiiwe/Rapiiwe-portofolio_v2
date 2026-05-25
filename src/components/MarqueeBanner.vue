<template>
  <div class="marquee-band">
    <div class="marquee">
      <div class="marquee-content flex gap-8 items-center">
        <span v-for="(item, i) in marqueeItems" :key="'a-' + i">{{ item.label }} {{ item.icon }}</span>
        <span v-for="(item, i) in marqueeItems" :key="'b-' + i">{{ item.label }} {{ item.icon }}</span>
        <span v-for="(item, i) in marqueeItems" :key="'c-' + i">{{ item.label }} {{ item.icon }}</span>
      </div>
    </div>
  </div>
  <div class="marquee-band marquee-band--reverse">
    <div class="marquee">
      <div class="marquee-content flex gap-8 items-center">
        <span v-for="(item, i) in marqueeItems" :key="'d-' + i">{{ item.label }} {{ item.icon }}</span>
        <span v-for="(item, i) in marqueeItems" :key="'e-' + i">{{ item.label }} {{ item.icon }}</span>
        <span v-for="(item, i) in marqueeItems" :key="'f-' + i">{{ item.label }} {{ item.icon }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const marqueeItems = [
  { label: 'Rapii', icon: '★' },
  { label: 'Teknik Informatika', icon: '⚡' },
  { label: 'Porofolio', icon: '◈' }
]
</script>
