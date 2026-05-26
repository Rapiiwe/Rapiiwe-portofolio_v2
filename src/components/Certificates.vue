<template>
  <section id="certificates" class="section-neo section-neo--glass px-margin-mobile md:px-margin-desktop py-16 relative overflow-hidden">
    <div class="cert-bg-pattern" aria-hidden="true"></div>
    <div class="neo-deco neo-deco--star cert-deco-1" aria-hidden="true">★</div>
    <div class="neo-deco neo-deco--circle cert-deco-2" aria-hidden="true"></div>

    <div class="section-header relative z-10">
      <span class="section-num">// 05</span>
      <h2 class="section-title section-title--neo">{{ t('certs-title') }}</h2>
      <p class="font-body-lg mt-4 max-w-2xl opacity-90">{{ t('certs-subtitle') }}</p>
    </div>

    <div class="cert-grid relative z-10 mt-10">
      <article
        v-for="cert in CERTIFICATE_ITEMS"
        :key="cert.id"
        class="cert-card"
        @click="openCertificate(cert)"
        @mouseenter="playSound('hover')"
        @keydown.enter.prevent="openCertificate(cert)"
        tabindex="0"
        role="button"
        :aria-label="`${t(cert.titleKey)} — ${t('certs-zoom-hint')}`"
      >
        <div class="cert-img-wrap">
          <img
            :src="cert.image"
            :alt="t(cert.titleKey)"
            class="cert-img"
            loading="lazy"
            decoding="async"
          />
          <span class="cert-zoom-icon" aria-hidden="true">🔍</span>
        </div>
        <div class="cert-body">
          <span class="cert-issuer">{{ t(cert.issuerKey) }}</span>
          <h3 class="cert-title">{{ t(cert.titleKey) }}</h3>
          <span class="cert-date">{{ t(cert.dateKey) }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { usePortfolio } from '../composables/usePortfolio'

const {
  CERTIFICATE_ITEMS,
  t,
  playSound,
  openLightbox
} = usePortfolio()

function openCertificate(cert) {
  playSound('click')
  const caption = `${t(cert.titleKey)} · ${t(cert.dateKey)}`
  openLightbox(cert.image, caption)
}
</script>

<style scoped>
.cert-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

.cert-deco-1 {
  top: 12%;
  right: 8%;
  animation: sticker-spin 12s linear infinite;
}

.cert-deco-2 {
  bottom: 18%;
  left: 6%;
  width: 48px;
  height: 48px;
  background: var(--neo-cyan);
  animation: float-gentle 5s ease-in-out infinite;
}

.cert-card:focus-visible {
  outline: 3px solid var(--neo-pink);
  outline-offset: 4px;
}

@keyframes sticker-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
