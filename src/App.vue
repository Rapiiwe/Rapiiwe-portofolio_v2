<template>
  <div class="page-shell">
  <!-- Auto-Demo Floating Top Banner -->
  <div class="demo-banner" :class="{ 'active': demoActive }">
    <div class="demo-banner-text text-left">
      <span class="demo-banner-pulse"></span>
      <span>AUTO-DEMO ACTIVE: {{ demoStatusText }}</span>
    </div>
    <button @click="stopDemo" class="neo-btn btn-pink py-1 px-3 text-xs">
      Hentikan Demo
    </button>
  </div>

  <!-- localeKey forces full re-render when language changes -->
  <div :key="lang">
  <Navbar />
  <HeroSection />
  <MarqueeBanner />
  <About />
  <Skills />
  <Experience />
  <Projects />
  <Certificates />
  <CVResume />
  <PixelDrawer />
  <Contact />
  <Footer />
  </div>

  <!-- Certificate / piagam lightbox -->
  <div
    class="lightbox"
    :class="{ active: lightboxActive }"
    role="dialog"
    aria-modal="true"
    :aria-label="lightboxCaption"
    @click.self="closeLightbox"
  >
    <div class="lightbox-content">
      <button type="button" class="lightbox-close" aria-label="Close" @click="closeLightbox">×</button>
      <div class="lightbox-body">
        <img :src="lightboxImg" class="lightbox-img" :alt="lightboxCaption" />
        <p class="lightbox-caption">{{ lightboxCaption }}</p>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeBanner from './components/MarqueeBanner.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Projects from './components/Projects.vue'
import Certificates from './components/Certificates.vue'
import CVResume from './components/CVResume.vue'
import PixelDrawer from './components/PixelDrawer.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

import { usePortfolio } from './composables/usePortfolio'

const {
  lang,
  demoActive,
  demoStatusText,
  playSound,
  lightboxActive,
  lightboxImg,
  lightboxCaption,
  closeLightbox
} = usePortfolio()

function onLightboxKeydown(e) {
  if (e.key === 'Escape' && lightboxActive.value) {
    closeLightbox()
    playSound('click')
  }
}

const particleColors = ['bg-yellow', 'bg-pink', 'bg-cyan', 'bg-green', 'bg-orange']

function createParticle(e) {
  if (Math.random() > 0.35) return

  const x = e.pageX || (e.touches && e.touches[0].pageX)
  const y = e.pageY || (e.touches && e.touches[0].pageY)
  if (!x || !y) return

  const size = Math.floor(Math.random() * 8) + 8
  const rotation = Math.floor(Math.random() * 360)
  const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)]

  const p = document.createElement('div')
  p.className = `gesture-particle ${randomColor}`
  p.style.width = `${size}px`
  p.style.height = `${size}px`
  p.style.left = `${x - size / 2}px`
  p.style.top = `${y - size / 2}px`
  p.style.setProperty('--rot', `${rotation}deg`)

  document.body.appendChild(p)

  setTimeout(() => {
    p.remove()
  }, 700)
}

function handleMouseMove(e) {
  createParticle(e)
}

function handleTouchMove(e) {
  if (document.body.classList.contains('mobile-nav-open')) return
  createParticle(e)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('touchmove', handleTouchMove, { passive: true })
  window.addEventListener('keydown', onLightboxKeydown)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('keydown', onLightboxKeydown)
})

function stopDemo() {
  playSound('clear')
  demoActive.value = false
}
</script>