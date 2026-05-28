<template>
  <nav
    ref="navRef"
    class="sticky top-0 w-full z-[10001] flex justify-between items-center px-margin-mobile md:px-margin-desktop py-3 md:py-4 bg-yellow border-b-4 border-on-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] safe-area-top"
  >
    <a
      href="https://rapiiwe.github.io"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleLinkClick"
      @mouseenter="playSound('hover')"
      class="nav-logo-neo text-on-background cursor-pointer select-none text-xs sm:text-sm md:text-base max-w-[42vw] sm:max-w-[50vw] truncate md:max-w-none md:truncate-none shrink min-w-0"
    >
      rapiiwe.github.io
    </a>

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

    <div class="hidden lg:flex gap-2 items-center shrink-0">
      <button type="button" @click="runDemo" @mouseenter="playSound('hover')" class="neo-btn btn-green py-1.5 px-3 text-xs" :class="{ 'btn-pink': demoActive }">
        {{ demoActive ? t('nav-demo-stop') : t('nav-demo-play') }}
      </button>
      <button type="button" @click="toggleLanguage" @mouseenter="playSound('hover')" class="neo-btn btn-pink py-1.5 px-3 text-xs">
        {{ lang === 'id' ? '🇬🇧 English' : '🇮🇩 Indonesia' }}
      </button>
      <button type="button" @click="shuffleColors" @mouseenter="playSound('hover')" class="neo-btn btn-secondary py-1.5 px-3 text-xs">
        {{ t('nav-shuffle') }}
      </button>
      <button type="button" @click="toggleSound" @mouseenter="playSound('hover')" class="neo-btn btn-secondary py-1.5 px-3 text-xs">
        {{ soundEnabled ? t('nav-sound-on') : t('nav-sound-off') }}
      </button>
      <button type="button" @click="toggleMusic" @mouseenter="playSound('hover')" class="neo-btn btn-secondary py-1.5 px-3 text-xs">
        {{ musicEnabled ? t('nav-music-on') : t('nav-music-off') }}
      </button>
    </div>

    <div class="xl:hidden flex items-center gap-2 sm:gap-3 shrink-0">
      <button
        type="button"
        @click="runDemo"
        @mouseenter="playSound('hover')"
        class="lg:hidden neo-btn btn-green py-1 px-2.5 text-xs min-h-[44px] min-w-[44px] flex items-center justify-center"
        :class="{ 'btn-pink': demoActive }"
        style="box-shadow: 2px 2px 0px var(--neo-black) !important;"
        :aria-label="demoActive ? t('nav-demo-stop') : t('nav-demo-play')"
      >
        {{ demoActive ? '🛑' : '🎮' }}
      </button>

      <button
        type="button"
        class="nav-hamburger w-11 h-11 min-w-[44px] min-h-[44px] border-2 border-on-background flex flex-col justify-center items-center gap-1.5 bg-secondary-container neo-shadow cursor-pointer touch-manipulation"
        :class="{ 'nav-hamburger--open': mobileMenuOpen }"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-nav-drawer"
        aria-label="Toggle Menu"
        @click.stop="toggleMobileMenu"
      >
        <span class="nav-hamburger__line"></span>
        <span class="nav-hamburger__line"></span>
        <span class="nav-hamburger__line"></span>
      </button>
    </div>
  </nav>

  <Teleport to="body">
    <Transition name="mobile-nav">
      <div
        v-if="mobileMenuOpen"
        class="mobile-nav-root xl:hidden"
        role="dialog"
        aria-modal="true"
        id="mobile-nav-drawer"
        :style="{ '--nav-height': `${navHeight}px` }"
      >
        <button
          type="button"
          class="mobile-nav-backdrop"
          aria-label="Close menu"
          @click="closeMobileMenu"
        ></button>

        <div class="mobile-nav-panel">
          <ul class="flex flex-col gap-1 font-mono font-bold text-base sm:text-lg">
            <li v-for="item in mobileNavItems" :key="item.href">
              <a
                :href="item.href"
                class="mobile-nav-link"
                @click="handleLinkClick"
              >
                <span>// {{ t(item.key) }}</span>
                <span aria-hidden="true">➔</span>
              </a>
            </li>
          </ul>

          <div class="grid grid-cols-2 gap-3 mt-4">
            <button type="button" @click="runDemo(); closeMobileMenu()" class="neo-btn btn-green text-xs col-span-2 py-2.5 min-h-[44px]" :class="{ 'btn-pink': demoActive }">
              {{ demoActive ? t('nav-demo-stop') : t('nav-demo-play') }}
            </button>
            <button type="button" @click="toggleLanguage(); closeMobileMenu()" class="neo-btn btn-pink text-xs py-2.5 min-h-[44px]">
              {{ lang === 'id' ? '🇬🇧 EN' : '🇮🇩 ID' }}
            </button>
            <button type="button" @click="shuffleColors()" class="neo-btn btn-secondary text-xs py-2.5 min-h-[44px]">
              {{ t('nav-shuffle') }}
            </button>
            <button type="button" @click="toggleSound()" class="neo-btn btn-secondary text-xs py-2.5 col-span-2 min-h-[44px]">
              {{ soundEnabled ? t('nav-sound-on') : t('nav-sound-off') }}
            </button>
            <button type="button" @click="toggleMusic()" class="neo-btn btn-secondary text-xs py-2.5 col-span-2 min-h-[44px]">
              {{ musicEnabled ? t('nav-music-on') : t('nav-music-off') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
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

const mobileNavItems = [
  { href: '#about', key: 'nav-about' },
  { href: '#skills', key: 'nav-skills' },
  { href: '#timeline', key: 'nav-timeline' },
  { href: '#projects', key: 'nav-projects' },
  { href: '#certificates', key: 'nav-certificates' },
  { href: '#cv', key: 'nav-cv' },
  { href: '#pixel-drawer', key: 'nav-draw' },
  { href: '#contact', key: 'nav-contact' }
]

const mobileMenuOpen = ref(false)
const navRef = ref(null)
const navHeight = ref(72)

function measureNav() {
  if (navRef.value) {
    navHeight.value = Math.ceil(navRef.value.getBoundingClientRect().height)
  }
}

function setBodyScrollLock(locked) {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('mobile-nav-open', locked)
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function toggleMobileMenu() {
  playSound('click')
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function handleLinkClick() {
  playSound('click')
  closeMobileMenu()
}

function onKeydown(e) {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

function onResize() {
  measureNav()
  if (window.innerWidth >= 1280 && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

watch(mobileMenuOpen, (open) => {
  setBodyScrollLock(open)
  if (open) measureNav()
})

onMounted(() => {
  measureNav()
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  setBodyScrollLock(false)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
})
</script>
