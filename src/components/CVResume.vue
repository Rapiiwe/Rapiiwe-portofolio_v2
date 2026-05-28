<template>
  <section id="cv" class="section-neo section-neo--pink px-margin-mobile md:px-margin-desktop py-12 text-on-background">
    <div class="section-header">
      <span class="section-num">// 06</span>
      <h2 class="section-title section-title--neo">{{ t('cv-title') }}</h2>
    </div>

    <div class="cv-container">
      <div class="cv-panel text-left">
        
        <div class="cv-header">
          <div>
            <h3 class="cv-name font-heading font-black">{{ t('cv-author-name') }}</h3>
            <span class="cv-subtitle font-mono font-bold text-sm" style="color: var(--neo-orange);">{{ t('cv-subtitle') }}</span>
          </div>
          <div class="cv-contact-info text-right font-mono text-xs">
            <span>📧 {{ PROFILE.email }}</span>
            <span>💻 {{ t('cv-contact-major') }}</span>
            <span>🌐 github.com/Rapiiwe</span>
          </div>
        </div>

        <div class="cv-section">
          <h4 class="cv-section-title font-heading font-black">{{ t('journey-tab-edu') }}</h4>
          <div class="cv-item mt-4">
            <div class="cv-item-header flex justify-between font-mono font-bold text-sm">
              <span class="cv-item-role" style="color: var(--neo-pink);">{{ t('cv-edu1-role') }}</span>
              <span class="cv-item-date">{{ t('cv-edu1-date') }}</span>
            </div>
            <div class="cv-item-org font-bold text-xs uppercase" style="color: var(--neo-blue);">UPI YPTK Padang</div>
            <p class="cv-item-desc mt-2 text-sm opacity-90">{{ t('cv-edu1-desc') }}</p>
          </div>
        </div>

        <div class="cv-section">
          <h4 class="cv-section-title font-heading font-black">{{ t('cv-core-title') }}</h4>
          <div class="cv-skills-grid mt-4">
            <div class="cv-skills-cat">
              <h5 class="font-mono font-bold text-xs" style="color: var(--neo-pink);">{{ t('cv-skill-dev') }}</h5>
              <p class="cv-skills-list text-xs opacity-90">HTML5, CSS3, JavaScript, ReactJS, Vite, Bootstrap, TailwindCSS, Flutter, Node.js (dasar)</p>
            </div>
            <div class="cv-skills-cat">
              <h5 class="font-mono font-bold text-xs" style="color: var(--neo-blue);">{{ t('cv-skill-tools') }}</h5>
              <p class="cv-skills-list text-xs opacity-90">Git, GitHub, VS Code, NPM, Command Line, Android Studio</p>
            </div>
            <div class="cv-skills-cat col-span-1 md:col-span-1">
              <h5 class="font-mono font-bold text-xs" style="color: var(--neo-green);">{{ t('cv-skill-soft') }}</h5>
              <p class="cv-skills-list text-xs opacity-90">{{ t('cv-skill-soft-list') }}</p>
            </div>
          </div>
        </div>

        <div class="cv-section">
          <h4 class="cv-section-title font-heading font-black">{{ t('cv-projects-title') }}</h4>
          <div class="cv-item mt-4">
            <div class="cv-item-header flex justify-between font-mono font-bold text-sm">
              <span class="cv-item-role" style="color: var(--neo-pink);">{{ t('cv-proj1-role') }}</span>
              <span class="cv-item-date">2026</span>
            </div>
            <p class="cv-item-desc mt-2 text-sm opacity-90">{{ t('cv-proj1-desc') }}</p>
          </div>
          
          <div class="cv-item mt-4">
            <div class="cv-item-header flex justify-between font-mono font-bold text-sm">
              <span class="cv-item-role" style="color: var(--neo-pink);">{{ t('cv-proj2-role') }}</span>
              <span class="cv-item-date">{{ t('cv-proj2-date') }}</span>
            </div>
            <p class="cv-item-desc mt-2 text-sm opacity-90">{{ t('cv-proj2-desc') }}</p>
          </div>
        </div>

      </div>

      <div class="cv-action-footer mt-6">
        <button @click="printCV" @mouseenter="playSound('hover')" class="neo-btn btn-pink text-xs">
          🖨 {{ t('cv-print-btn') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { usePortfolio } from '../composables/usePortfolio'

const {
  PROFILE,
  t,
  playSound
} = usePortfolio()

function printCV() {
  playSound('success')
  window.print()
}
</script>
