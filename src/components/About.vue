<template>
  <section id="about" class="section-neo section-neo--yellow px-margin-mobile md:px-margin-desktop py-12 text-on-background">
    <div class="section-header">
      <span class="section-num">// 01</span>
      <h2 class="section-title section-title--neo">{{ t('about-title') }}</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-4 flex flex-col items-center">
        <div class="neo-card bg-yellow p-4 w-full max-w-sm flex flex-col items-center">
          <div class="w-full aspect-square border-4 border-on-background overflow-hidden bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <img 
              src="https://avatars.githubusercontent.com/u/202292911?v=4" 
              :alt="PROFILE.fullName" 
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              @mouseenter="playSound('hover')"
            >
          </div>
          <span class="about-photo-tag mt-4 px-4 py-1.5 border-2 border-on-background bg-pink font-mono font-bold text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] rotate-[-2deg] select-none">
            @Rapiiwe
          </span>
        </div>
      </div>

      <div class="lg:col-span-8 flex flex-col gap-6">
        <div class="neo-card bg-white p-6 md:p-8 font-body-lg text-body-lg flex flex-col gap-4 text-left leading-relaxed">
          <p>{{ t('about-p1') }}</p>
          <p>{{ t('about-p2') }}</p>
          <p>{{ t('about-p3') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="neo-card bg-yellow p-6 flex flex-col items-center text-center">
            <div class="stat-num-pop font-display text-4xl md:text-5xl font-black mb-2 font-mono text-on-background select-none">{{ reposLoading ? '...' : repoCount }}</div>
            <div class="font-label-bold text-xs uppercase opacity-70">{{ t('about-stat-repos') }}</div>
          </div>
          <div class="neo-card bg-pink p-6 flex flex-col items-center text-center">
            <div class="stat-num-pop font-display text-4xl md:text-5xl font-black mb-2 font-mono text-on-background select-none">2025</div>
            <div class="font-label-bold text-xs uppercase opacity-70">{{ t('about-stat-active') }}</div>
          </div>
          <div class="neo-card bg-cyan p-6 flex flex-col items-center text-center">
            <div class="stat-num-pop font-display text-4xl md:text-5xl font-black mb-2 font-mono text-on-background select-none">∞</div>
            <div class="font-label-bold text-xs uppercase opacity-70">{{ t('about-stat-bloopers') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolio } from '../composables/usePortfolio'

const {
  PROFILE,
  t,
  repoCount,
  reposLoading,
  fetchGitHubRepos,
  playSound
} = usePortfolio()

onMounted(() => {
  fetchGitHubRepos()
})
</script>