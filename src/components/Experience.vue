<template>
  <section id="timeline" class="section-neo section-neo--cyan px-margin-mobile md:px-margin-desktop py-12 text-on-background">
    <!-- Header -->
    <div class="section-header">
      <span class="section-num">// 03</span>
      <h2 class="section-title section-title--neo">{{ t('journey-title') }}</h2>
    </div>

    <!-- Tabs -->
    <div class="timeline-tabs flex justify-center gap-4 mb-8">
      <button 
        class="neo-btn py-2 px-4 font-mono text-sm" 
        :class="timelineTab === 'education-pane' ? 'btn-pink' : 'btn-secondary'" 
        @click="setTab('education-pane')"
      >
        {{ t('journey-tab-edu') }}
      </button>
      <button 
        class="neo-btn py-2 px-4 font-mono text-sm" 
        :class="timelineTab === 'experience-pane' ? 'btn-pink' : 'btn-secondary'" 
        @click="setTab('experience-pane')"
      >
        {{ t('journey-tab-exp') }}
      </button>
    </div>

    <!-- Education Pane -->
    <div v-show="timelineTab === 'education-pane'" class="timeline-pane active">
      <!-- Card 1 -->
      <div class="timeline-card bg-pink">
        <div class="timeline-meta">
          <span class="timeline-date font-mono">2024 - {{ t('journey-present') }}</span>
        </div>
        <h3 class="timeline-role font-heading text-xl font-bold text-left">{{ t('edu1-role') }}</h3>
        <h4 class="timeline-location cv-item-org font-mono text-sm font-bold text-left" style="color: var(--neo-blue);">{{ t('edu1-org') }}</h4>
        <div class="timeline-desc mt-2 text-left">
          <p>{{ t('edu1-desc') }}</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>{{ t('edu1-li1') }}</li>
            <li>{{ t('edu1-li2') }}</li>
          </ul>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="timeline-card bg-green">
        <div class="timeline-meta">
          <span class="timeline-date font-mono">2023 - {{ t('journey-present') }}</span>
        </div>
        <h3 class="timeline-role font-heading text-xl font-bold text-left">{{ t('edu2-role') }}</h3>
        <h4 class="timeline-location cv-item-org font-mono text-sm font-bold text-left" style="color: var(--neo-blue);">{{ t('edu2-org') }}</h4>
        <div class="timeline-desc mt-2 text-left">
          <p>{{ t('edu2-desc') }}</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>{{ t('edu2-li1') }}</li>
            <li>{{ t('edu2-li2') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Experience Pane -->
    <div v-show="timelineTab === 'experience-pane'" class="timeline-pane active">
      <div class="timeline-card bg-yellow flex flex-col items-center text-center p-8">
        <div class="text-5xl mb-4">💼</div>
        <h3 class="timeline-role font-heading text-xl font-bold uppercase mb-2">{{ t('experience-coming-soon') }}</h3>
        <p class="max-w-xl text-sm leading-relaxed mb-4">
          {{ t('experience-desc') }}
        </p>
        <span class="neo-badge bg-pink font-mono text-xs">{{ t('certs-stay-tuned') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { usePortfolio } from '../composables/usePortfolio'

const {
  t,
  lang,
  playSound,
  timelineTab
} = usePortfolio()

function setTab(tab) {
  playSound('click')
  timelineTab.value = tab
}
</script>