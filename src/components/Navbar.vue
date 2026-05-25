<template>
  <nav class="sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-yellow border-b-4 border-on-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
    <!-- Logo -->
    <a href="https://rapiiwe.github.io" target="_blank" rel="noopener noreferrer" @click="handleLinkClick" @mouseenter="playSound('hover')" class="nav-logo-neo text-on-background cursor-pointer select-none text-xs sm:text-sm md:text-base max-w-[45vw] truncate md:max-w-none md:truncate-none">
      rapiiwe.github.io
    </a>

    <!-- Desktop Navigation Links -->
    <div class="hidden xl:flex gap-6 items-center">
      <a class="nav-link-neo text-on-background transition-transform" href="#about" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-about') }}</a>
      <a class="nav-link-neo text-on-background transition-transform" href="#skills" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-skills') }}</a>
      <a class="nav-link-neo text-on-background transition-transform" href="#timeline" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-timeline') }}</a>
      <a class="nav-link-neo text-on-background transition-transform" href="#projects" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-projects') }}</a>
      <a class="nav-link-neo text-on-background transition-transform" href="#certificates" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-certificates') }}</a>
      <a class="nav-link-neo text-on-background transition-transform" href="#cv" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-cv') }}</a>
      <a class="nav-link-neo text-on-background transition-transform" href="#pixel-drawer" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-draw') }}</a>
      <a class="nav-link-neo text-on-background transition-transform" href="#contact" @click="handleLinkClick" @mouseenter="playSound('hover')">{{ t('nav-contact') }}</a>
    </div>

    <!-- Actions Control Board -->
    <div class="hidden lg:flex gap-2 items-center">
      <button @click="runDemo" @mouseenter="playSound('hover')" class="neo-btn btn-green py-1.5 px-3 text-xs" :class="{ 'btn-pink': demoActive }">
        {{ demoActive ? t('nav-demo-stop') : t('nav-demo-play') }}
      </button>
      <button @click="toggleLanguage" @mouseenter="playSound('hover')" class="neo-btn btn-pink py-1.5 px-3 text-xs">
        {{ lang === 'id' ? '🇬🇧 English' : '🇮🇩 Indonesia' }}
      </button>
      <button @click="shuffleColors" @mouseenter="playSound('hover')" class="neo-btn btn-secondary py-1.5 px-3 text-xs">
        {{ t('nav-shuffle') }}
      </button>
      <button @click="toggleSound" @mouseenter="playSound('hover')" class="neo-btn btn-secondary py-1.5 px-3 text-xs">
        {{ soundEnabled ? t('nav-sound-on') : t('nav-sound-off') }}
      </button>
      <button @click="toggleMusic" @mouseenter="playSound('hover')" class="neo-btn btn-secondary py-1.5 px-3 text-xs">
        {{ musicEnabled ? t('nav-music-on') : t('nav-music-off') }}
      </button>
    </div>

    <!-- Mobile Menu Hamburger & Action triggers -->
    <div class="xl:hidden flex items-center gap-3">
      <!-- Demo Button visible on smaller screens as it is cool -->
      <button @click="runDemo" @mouseenter="playSound('hover')" class="lg:hidden neo-btn btn-green py-1 px-2.5 text-xs" :class="{ 'btn-pink': demoActive }" style="box-shadow: 2px 2px 0px var(--neo-black) !important;">
        {{ demoActive ? '🛑' : '🎮' }}
      </button>
      
      <button class="w-11 h-11 border-2 border-on-background flex flex-col justify-center items-center gap-1.5 bg-secondary-container neo-shadow cursor-pointer active:translate-y-0.5" @click="toggleMobileMenu" aria-label="Toggle Menu">
        <span class="w-6 h-0.5 bg-on-background transition-transform duration-300" :class="{ 'rotate-45 translate-y-2': mobileMenuOpen }"></span>
        <span class="w-6 h-0.5 bg-on-background transition-opacity duration-300" :class="{ 'opacity-0': mobileMenuOpen }"></span>
        <span class="w-6 h-0.5 bg-on-background transition-transform duration-300" :class="{ '-rotate-45 -translate-y-2': mobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Drawer Menu Overlay -->
    <div v-if="mobileMenuOpen" class="fixed top-[81px] left-0 w-full bg-background border-b-4 border-on-background z-40 p-6 flex flex-col gap-6 xl:hidden shadow-lg animate-in slide-in-from-top duration-250">
      <ul class="flex flex-col gap-4 font-mono font-bold text-lg">
        <li><a href="#about" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-about') }}</span> <span>➔</span></a></li>
        <li><a href="#skills" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-skills') }}</span> <span>➔</span></a></li>
        <li><a href="#timeline" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-timeline') }}</span> <span>➔</span></a></li>
        <li><a href="#projects" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-projects') }}</span> <span>➔</span></a></li>
        <li><a href="#certificates" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-certificates') }}</span> <span>➔</span></a></li>
        <li><a href="#cv" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-cv') }}</span> <span>➔</span></a></li>
        <li><a href="#pixel-drawer" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-draw') }}</span> <span>➔</span></a></li>
        <li><a href="#contact" @click="handleLinkClick" class="flex justify-between items-center py-2 border-b border-dashed border-on-background hover:text-primary"><span>// {{ t('nav-contact') }}</span> <span>➔</span></a></li>
      </ul>
      <div class="grid grid-cols-2 gap-3 mt-2">
        <button @click="runDemo(); mobileMenuOpen = false" class="neo-btn btn-green text-xs col-span-2 py-2" :class="{ 'btn-pink': demoActive }">
          {{ demoActive ? t('nav-demo-stop') : t('nav-demo-play') }}
        </button>
        <button @click="toggleLanguage" class="neo-btn btn-pink text-xs py-2">
          {{ lang === 'id' ? '🇬🇧 English' : '🇮🇩 Indonesia' }}
        </button>
        <button @click="shuffleColors" class="neo-btn btn-secondary text-xs py-2">
          {{ t('nav-shuffle') }}
        </button>
        <button @click="toggleSound" class="neo-btn btn-secondary text-xs py-2 col-span-2">
          {{ soundEnabled ? t('nav-sound-on') : t('nav-sound-off') }}
        </button>
        <button @click="toggleMusic" class="neo-btn btn-secondary text-xs py-2 col-span-2">
          {{ musicEnabled ? t('nav-music-on') : t('nav-music-off') }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { usePortfolio } from '../composables/usePortfolio'

const {
  lang,
  soundEnabled,
  musicEnabled,
  demoActive,
  t,
  playSound,
  toggleLanguage,
  toggleSound,
  toggleMusic,
  shuffleColors,
  runDemo
} = usePortfolio()

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  playSound('click')
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function handleLinkClick() {
  playSound('click')
  mobileMenuOpen.value = false
}
</script>