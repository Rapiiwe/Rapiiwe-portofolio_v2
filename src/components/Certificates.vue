<template>
  <section id="certificates" class="section-neo section-neo--glass px-margin-mobile md:px-margin-desktop py-16 relative overflow-hidden">
    <div class="cert-bg-pattern" aria-hidden="true"></div>
    <div class="neo-deco neo-deco--star cert-deco-1" aria-hidden="true">★</div>
    <div class="neo-deco neo-deco--circle cert-deco-2" aria-hidden="true"></div>

    <div class="section-header relative z-10">
      <span class="section-num">// 05</span>
      <h2 class="section-title section-title--neo">{{ t('certs-title') }}</h2>
    </div>

    <div class="flex justify-center items-center py-4 relative z-10">
      <div class="cert-coming-soon-card" @mouseenter="playSound('hover')">
        <div class="cert-cs-topbar">
          <span class="cert-cs-status-dot"></span>
          <span class="font-mono text-xs font-bold">{{ t('certs-status-bar') }}</span>
        </div>

        <div class="cert-cs-body">
          <div class="cert-cs-icon-cluster" aria-hidden="true">
            <div class="cert-cs-trophy">🏆</div>
            <div class="cert-cs-orbit cert-cs-orbit-1">📜</div>
            <div class="cert-cs-orbit cert-cs-orbit-2">⭐</div>
            <div class="cert-cs-orbit cert-cs-orbit-3">🎯</div>
          </div>

          <h3 class="cert-cs-title">{{ t('certs-coming-soon') }}</h3>

          <div class="cert-cs-divider">
            <span class="cert-cs-divider-line"></span>
            <span class="neo-badge bg-pink font-mono text-xs px-3 py-1">{{ t('certs-in-progress') }}</span>
            <span class="cert-cs-divider-line"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { usePortfolio } from '../composables/usePortfolio'

const { t, playSound } = usePortfolio()
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

.cert-coming-soon-card {
  position: relative;
  background-color: var(--neo-white);
  border: 3.5px solid var(--neo-black);
  box-shadow: 10px 10px 0px var(--neo-black);
  max-width: 700px;
  width: 100%;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
}

.cert-coming-soon-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 14px 14px 0 var(--neo-black);
}

.cert-cs-topbar {
  background-color: var(--neo-black);
  color: var(--neo-yellow);
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.cert-cs-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--neo-yellow);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: status-blink 1.4s ease-in-out infinite;
}

.cert-cs-body {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.75rem;
  background-color: var(--neo-yellow);
}

.cert-cs-icon-cluster {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cert-cs-trophy {
  font-size: 4rem;
  line-height: 1;
  animation: trophy-pulse 2s ease-in-out infinite;
  filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.25));
  z-index: 2;
}

.cert-cs-orbit {
  position: absolute;
  font-size: 1.4rem;
  animation: orbit-spin 6s linear infinite;
  transform-origin: 50px 50px;
}

.cert-cs-orbit-1 { animation-delay: 0s; }
.cert-cs-orbit-2 { animation-delay: -2s; }
.cert-cs-orbit-3 { animation-delay: -4s; }

.cert-cs-title {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--neo-black);
  line-height: 1.1;
}

.cert-cs-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.cert-cs-divider-line {
  display: block;
  height: 3px;
  width: 60px;
  background-color: var(--neo-black);
}

@keyframes status-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes trophy-pulse {
  0%, 100% { transform: scale(1) rotate(-3deg); }
  50% { transform: scale(1.1) rotate(3deg); }
}

@keyframes orbit-spin {
  from { transform: rotate(0deg) translateX(54px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(54px) rotate(-360deg); }
}

@keyframes sticker-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
