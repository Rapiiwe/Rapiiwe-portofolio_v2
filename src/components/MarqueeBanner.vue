<template>
  <div class="marquee-band">
    <div class="marquee">
      <div class="marquee-content flex gap-8 items-center">
        <span v-for="(item, i) in marqueeItems" :key="'a-' + i" class="marquee-item">
          <span class="marquee-icon">{{ item.icon }}</span>
          <span class="marquee-label">{{ item.label }}</span>
        </span>
        <span v-for="(item, i) in marqueeItems" :key="'b-' + i" class="marquee-item">
          <span class="marquee-icon">{{ item.icon }}</span>
          <span class="marquee-label">{{ item.label }}</span>
        </span>
        <span v-for="(item, i) in marqueeItems" :key="'c-' + i" class="marquee-item">
          <span class="marquee-icon">{{ item.icon }}</span>
          <span class="marquee-label">{{ item.label }}</span>
        </span>
      </div>
    </div>
  </div>
  <div class="marquee-band marquee-band--reverse">
    <div class="marquee">
      <div class="marquee-content flex gap-8 items-center">
        <span v-for="(item, i) in marqueeItems" :key="'d-' + i" class="marquee-item">
          <span class="marquee-icon">{{ item.icon }}</span>
          <span class="marquee-label">{{ item.label }}</span>
        </span>
        <span v-for="(item, i) in marqueeItems" :key="'e-' + i" class="marquee-item">
          <span class="marquee-icon">{{ item.icon }}</span>
          <span class="marquee-label">{{ item.label }}</span>
        </span>
        <span v-for="(item, i) in marqueeItems" :key="'f-' + i" class="marquee-item">
          <span class="marquee-icon">{{ item.icon }}</span>
          <span class="marquee-label">{{ item.label }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const marqueeItems = [
  { label: 'Rapii', icon: '★' },
  { label: 'Teknik Informatika', icon: '⚡' },
  { label: 'Portofolio', icon: '◈' }
]
</script>
