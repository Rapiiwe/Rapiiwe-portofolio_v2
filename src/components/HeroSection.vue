<template>
  <section id="hero" class="section-neo hero-grid-section min-h-[90vh] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-12 relative overflow-hidden">
    <span class="hero-sticker hero-sticker--1" aria-hidden="true">v3.0 LIVE</span>
    <span class="hero-sticker hero-sticker--2" aria-hidden="true">// neo mode</span>
    <div class="neo-deco neo-deco--circle absolute top-[20%] left-[3%] w-10 h-10 bg-pink opacity-90" aria-hidden="true"></div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
      <!-- Intro Info (Left) -->
      <div class="lg:col-span-6 flex flex-col justify-center space-y-6">
        <span class="neo-badge hero-welcome self-start">{{ t('hero-welcome') }}</span>
        <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase leading-tight font-black section-title--neo">
          Rafi Rahmadani <span class="hero-name-pop">Zain.</span>
        </h1>
        <p class="font-body-lg text-body-lg max-w-xl">
          {{ t('hero-desc') }}
        </p>
        <div class="flex flex-wrap gap-4 pt-2">
          <a href="#projects" @click="playSound('click')" @mouseenter="playSound('hover')" class="neo-btn btn-pink">
            {{ t('hero-btn-projects') }}
          </a>
          <a href="#contact" @click="playSound('click')" @mouseenter="playSound('hover')" class="neo-btn btn-green">
            {{ t('hero-btn-contact') }}
          </a>
          <a href="#pixel-drawer" @click="playSound('click')" @mouseenter="playSound('hover')" class="neo-btn btn-cyan">
            {{ t('hero-btn-sandbox') }}
          </a>
        </div>
      </div>

      <!-- Draggable Terminal & Stats (Right) -->
      <div class="lg:col-span-6 flex flex-col gap-6 relative">
        <!-- Interactive Terminal Jendela -->
        <div ref="terminalWindow" class="neo-window w-full select-none" style="z-index: 10;">
          <div ref="terminalHeader" class="window-header draggable">
            <span>{{ t('terminal-session') }}</span>
            <div class="window-controls">
              <span class="window-dot dot-close" title="Tutup" @click="playSound('clear')"></span>
              <span class="window-dot dot-min" title="Minimalkan" @click="playSound('click')"></span>
              <span class="window-dot dot-max" title="Maksimalkan" @click="playSound('success')"></span>
            </div>
          </div>
          <div class="window-body terminal overflow-y-auto max-h-64 h-64 flex flex-col justify-between" style="background-color: #121212;">
            <div class="terminal-output flex flex-col text-left">
              <div v-for="(line, idx) in terminalLines" :key="idx" class="terminal-line whitespace-pre-wrap" style="color: var(--neo-green);">
                {{ line }}
              </div>
            </div>
            <form @submit.prevent="handleTerminalSubmit" class="terminal-input-line flex items-center mt-2">
              <span class="terminal-prompt text-neo-cyan font-mono" style="color: var(--neo-cyan); margin-right: 0.5rem;">tamu@rafi-pc:~$</span>
              <input 
                type="text" 
                v-model="terminalInput" 
                autocomplete="off" 
                spellcheck="false" 
                class="flex-grow bg-transparent border-none text-neo-green font-mono focus:outline-none placeholder-opacity-50"
                style="color: var(--neo-green); outline: none; border: none; background: transparent;"
              />
              <span class="terminal-cursor" style="background-color: var(--neo-green);"></span>
            </form>
          </div>
        </div>

        <!-- Stats Board -->
        <div class="stats-board select-none">
          <div class="stats-board-row">
            <span class="stats-board-label">{{ t('about-stat-local') }}</span>
            <span class="stats-board-value font-mono">{{ localTime }}</span>
          </div>
          <div class="stats-board-row">
            <span class="stats-board-label">{{ t('about-stat-status-label') }}</span>
            <span class="stats-board-value font-bold" style="background-color: var(--neo-green);">{{ t('about-stat-status-val') }}</span>
          </div>
          <div class="stats-board-row">
            <span class="stats-board-label">{{ t('about-stat-major') }}</span>
            <span class="stats-board-value font-bold">{{ t('about-stat-major-val') }}</span>
          </div>
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
  lang,
  playSound,
  initDraggable,
  terminalCommandInput,
  terminalExecuteTrigger
} = usePortfolio()

const terminalWindow = ref(null)
const terminalHeader = ref(null)
const terminalInput = ref('')
const terminalLines = ref([
  t('terminal-welcome'),
  t('terminal-hint')
])

// Reset terminal welcome lines when language changes
watch(lang, () => {
  terminalLines.value = [
    t('terminal-welcome'),
    t('terminal-hint')
  ]
})

const localTime = ref('00:00:00 WIB')
let timeInterval = null

function updateTime() {
  const options = {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  const formatter = new Intl.DateTimeFormat('id-ID', options)
  localTime.value = formatter.format(new Date()) + ' WIB'
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  if (terminalWindow.value && terminalHeader.value) {
    initDraggable(terminalWindow.value, terminalHeader.value)
  }
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})

// Watch terminal command input from usePortfolio for auto-typing
watch(terminalCommandInput, (newVal) => {
  terminalInput.value = newVal
})

// Watch terminal execute trigger from usePortfolio
watch(terminalExecuteTrigger, () => {
  if (terminalInput.value.trim()) {
    executeCommand(terminalInput.value)
  }
})

function handleTerminalSubmit() {
  executeCommand(terminalInput.value)
}

function executeCommand(cmd) {
  const cleanCmd = cmd.trim().toLowerCase()
  if (!cleanCmd) return

  // Append user command
  terminalLines.value.push(`tamu@rafi-pc:~$ ${cmd}`)
  playSound('click')

  // Process command
  let response = ''
  if (cleanCmd === 'help') {
    response = lang.value === 'id' 
      ? 'Perintah tersedia: help, about, skills, journey, projects, contact, clear'
      : 'Available commands: help, about, skills, journey, projects, contact, clear'
  } else if (cleanCmd === 'about') {
    response = lang.value === 'id'
      ? 'Rafi Rahmadani Zain - Mahasiswa Teknik Informatika di UPI YPTK Padang. Sangat tertarik dengan web development, desain retro, dan membuat antarmuka web interaktif.'
      : 'Rafi Rahmadani Zain - Informatics Student at UPI YPTK Padang. Passionate about web development, retro designs, and building interactive web interfaces.'
  } else if (cleanCmd === 'skills') {
    response = lang.value === 'id'
      ? 'Frontend: HTML, CSS, JS, Vue.js, TailwindCSS, Flutter, Bootstrap. Backend: Node.js (dasar), SQL, Python. Alat: Git, GitHub, VS Code.'
      : 'Frontend: HTML, CSS, JS, Vue.js, TailwindCSS, Flutter, Bootstrap. Backend: Node.js (basics), SQL, Python. Tools: Git, GitHub, VS Code.'
  } else if (cleanCmd === 'journey') {
    response = lang.value === 'id'
      ? '2024-Sekarang: Mahasiswa Teknik Informatika di UPI YPTK Padang. 2023-Sekarang: Programmer otodidak yang mengeksplorasi framework modern.'
      : '2024-Present: Informatics Student at UPI YPTK Padang. 2023-Present: Self-taught programmer exploring modern frameworks.'
  } else if (cleanCmd === 'projects') {
    response = lang.value === 'id'
      ? 'Unggulan: Portfolio Retro, Neo Draw Canvas. Lihat bagian Proyek di bawah untuk melihat repositori GitHub saya!'
      : 'Featured: Retro Portfolio, Neo Draw Canvas. Check out the Projects section below to see my GitHub repositories!'
  } else if (cleanCmd === 'contact') {
    response = 'Email: rafirahmadanizain@gmail.com | Instagram: @_iamrapii | GitHub: github.com/Rapiiwe'
  } else if (cleanCmd === 'clear') {
    terminalLines.value = []
    terminalInput.value = ''
    terminalCommandInput.value = ''
    return
  } else {
    response = lang.value === 'id'
      ? `Perintah tidak ditemukan: '${cmd}'. Ketik 'help' untuk melihat daftar perintah.`
      : `Command not found: '${cmd}'. Type 'help' for available commands.`
  }

  terminalLines.value.push(response)
  terminalInput.value = ''
  terminalCommandInput.value = ''
  
  // Auto scroll terminal body
  setTimeout(() => {
    const termBody = document.querySelector('.terminal')
    if (termBody) {
      termBody.scrollTop = termBody.scrollHeight
    }
  }, 50)
}
</script>