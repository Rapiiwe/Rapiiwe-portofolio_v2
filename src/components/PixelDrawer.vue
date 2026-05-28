<template>
  <section id="pixel-drawer" class="section-neo px-margin-mobile md:px-margin-desktop py-12 bg-background text-on-background">
    <div class="section-header">
      <span class="section-num">// 07</span>
      <h2 class="section-title section-title--neo">{{ t('draw-title') }}</h2>
    </div>

    <div class="pixel-canvas-widget flex flex-col md:flex-row gap-8 items-center justify-center">
      <div 
        class="pixel-grid-container select-none"
        @mouseleave="isDrawing = false"
      >
        <div 
          v-for="(cellColor, idx) in grid" 
          :key="idx"
          class="pixel-cell"
          :style="{ backgroundColor: cellColor }"
          @mousedown.prevent="handleMouseDown(idx)"
          @mouseenter="handleMouseEnter(idx)"
        ></div>
      </div>

      <div class="pixel-controls flex flex-col items-start gap-4 max-w-sm">
        <div>
          <h4 class="pixel-color-picker-label font-mono font-bold text-xs uppercase text-left mb-2">{{ t('draw-color-tool') }}</h4>
          <div class="pixel-colors flex gap-2">
            <button 
              v-for="color in colors"
              :key="color.value"
              class="pixel-color-btn"
              :class="[color.class, { 'active': activeColor === color.value }]"
              :style="{ backgroundColor: color.value === '#FFFFFF' || color.value === '#000000' ? color.value : '' }"
              @click="selectColor(color.value)"
              :title="color.value"
            ></button>
          </div>
        </div>

        <p class="text-xs text-left font-mono leading-relaxed opacity-80" v-html="t('draw-desc')"></p>

        <div class="pixel-actions flex gap-4 mt-2">
          <button @click="clearGrid" @mouseenter="playSound('hover')" class="neo-btn btn-secondary py-2 px-4 text-xs font-mono">
            {{ t('draw-btn-clear') }}
          </button>
          <button @click="downloadPNG" @mouseenter="playSound('hover')" class="neo-btn btn-pink py-2 px-4 text-xs font-mono">
            {{ t('draw-btn-download') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { usePortfolio } from '../composables/usePortfolio'

const {
  t,
  playSound,
  pixelDrawerDrawCoordinates
} = usePortfolio()

const grid = ref(Array(256).fill('#FFFFFF'))
const activeColor = ref('#FF007F')
const isDrawing = ref(false)

const colors = [
  { value: '#FF007F', class: 'bg-pink' },
  { value: '#00F0FF', class: 'bg-cyan' },
  { value: '#FFF500', class: 'bg-yellow' },
  { value: '#39FF14', class: 'bg-green' },
  { value: '#FF5F00', class: 'bg-orange' },
  { value: '#A367B1', class: 'bg-purple' },
  { value: '#3A4DFF', class: 'bg-blue' },
  { value: '#000000', class: 'bg-black' },
  { value: '#FFFFFF', class: 'bg-white' }
]

function selectColor(color) {
  playSound('click')
  activeColor.value = color
}

function handleMouseDown(index) {
  isDrawing.value = true
  paintCell(index)
}

function handleMouseEnter(index) {
  if (isDrawing.value) {
    paintCell(index)
  }
}

function paintCell(index, color = activeColor.value) {
  if (grid.value[index] !== color) {
    grid.value[index] = color
    playSound('hover')
  }
}

function handleGlobalMouseUp() {
  isDrawing.value = false
}

onMounted(() => {
  window.addEventListener('mouseup', handleGlobalMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', handleGlobalMouseUp)
})

watch(pixelDrawerDrawCoordinates, (coord) => {
  if (coord) {
    const idx = coord.r * 16 + coord.c
    paintCell(idx, coord.color)
  }
})

function clearGrid() {
  playSound('clear')
  grid.value = Array(256).fill('#FFFFFF')
}

function downloadPNG() {
  playSound('success')
  
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  
  const cellSize = 16
  
  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const idx = r * 16 + c
      ctx.fillStyle = grid.value[idx]
      ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize)
    }
  }
  
  const link = document.createElement('a')
  link.download = 'pixel_art.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>
