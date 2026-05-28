<template>
  <section id="projects" class="section-neo section-neo--green px-margin-mobile md:px-margin-desktop py-12 text-on-background">
    <div class="section-header">
      <span class="section-num">// 04</span>
      <h2 class="section-title section-title--neo">{{ t('projects-title') }}</h2>
    </div>

    <!-- Featured Projects -->
    <h3 class="curated-title font-heading text-2xl font-black uppercase mb-6 text-left">// {{ t('projects-curated') }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div @mouseenter="playSound('hover')" class="neo-card project-card-neo bg-white flex flex-col p-4">
        <div class="w-full h-56 border-4 border-on-background overflow-hidden shadow-[3px_3px_0_0_rgba(0,0,0,1)] bg-background">
          <img 
            src="/assets/featured_project_1.png" 
            alt="Portfolio Retro" 
            class="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
          >
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="neo-badge bg-yellow">HTML5</span>
          <span class="neo-badge bg-pink">CSS3</span>
          <span class="neo-badge bg-cyan">Vanilla JS</span>
        </div>
        <h4 class="font-heading text-xl font-bold uppercase mt-4 text-left">{{ t('fp1-name') }}</h4>
        <p class="font-body-md text-sm text-left mt-2 leading-relaxed opacity-85">
          {{ t('fp1-desc') }}
        </p>
        <div class="flex gap-4 mt-6">
          <a href="https://github.com/Rapiiwe" target="_blank" @click="playSound('click')" class="neo-btn btn-secondary py-1.5 px-4 text-xs">
            {{ t('fp-btn-source') }}
          </a>
          <a href="#" @click.prevent="playSound('click')" class="neo-btn btn-pink py-1.5 px-4 text-xs">
            {{ t('fp-btn-demo') }}
          </a>
        </div>
      </div>

      <div @mouseenter="playSound('hover')" class="neo-card project-card-neo bg-white flex flex-col p-4">
        <div class="w-full h-56 border-4 border-on-background overflow-hidden shadow-[3px_3px_0_0_rgba(0,0,0,1)] bg-background">
          <img 
            src="/assets/featured_project_2.png" 
            alt="Neo Draw Canvas" 
            class="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
          >
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="neo-badge bg-green">JS Canvas</span>
          <span class="neo-badge bg-yellow">Web Audio</span>
          <span class="neo-badge bg-cyan">Retro GUI</span>
        </div>
        <h4 class="font-heading text-xl font-bold uppercase mt-4 text-left">{{ t('fp2-name') }}</h4>
        <p class="font-body-md text-sm text-left mt-2 leading-relaxed opacity-85">
          {{ t('fp2-desc') }}
        </p>
        <div class="flex gap-4 mt-6">
          <a href="#pixel-drawer" @click="playSound('click')" class="neo-btn btn-green py-1.5 px-4 text-xs">
            {{ t('fp2-btn-run') }}
          </a>
        </div>
      </div>
    </div>

    <div ref="githubWindow" class="neo-window select-none w-full" style="z-index: 10;">
      <div ref="githubHeader" class="window-header draggable" style="background-color: var(--neo-green); color: var(--neo-black);">
        <span>{{ t('projects-dynamic') }} {{ t('projects-drag-me') }}</span>
        <div class="window-controls">
          <span class="window-dot" style="background-color: var(--neo-red);" @click="playSound('clear')"></span>
          <span class="window-dot" style="background-color: var(--neo-yellow);" @click="playSound('click')"></span>
          <span class="window-dot" style="background-color: var(--neo-green);" @click="playSound('success')"></span>
        </div>
      </div>
      
      <div class="window-body text-left" style="background-color: var(--neo-white);">
        <div class="flex flex-col gap-6">
          
          <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <input 
              type="text" 
              v-model="projectSearchQuery"
              :placeholder="t('projects-search-placeholder')"
              class="w-full md:max-w-xs p-3 border-2 border-on-background font-mono text-xs focus:outline-none focus:bg-primary-container"
              style="border: var(--border-main);"
              @input="playSound('hover')"
            >
            
            <div class="flex flex-wrap gap-2 items-center">
              <span 
                class="neo-badge cursor-pointer" 
                :class="!projectLanguageFilter ? 'bg-pink text-white' : 'bg-white text-black'"
                @click="filterLanguage('')"
              >
                * ALL
              </span>
              <span 
                v-for="lang in languages" 
                :key="lang.name"
                class="neo-badge cursor-pointer flex items-center gap-1.5"
                :class="projectLanguageFilter === lang.name ? 'bg-pink text-white' : 'bg-white text-black'"
                @click="filterLanguage(lang.name)"
              >
                <span class="w-2.5 h-2.5 rounded-full border border-black inline-block" :style="{ backgroundColor: LANG_COLORS[lang.name] || '#777' }"></span>
                {{ lang.name }} ({{ lang.count }})
              </span>
            </div>
          </div>

          <div v-if="reposLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="skeleton-card">
              <div class="skeleton-shimmer skeleton-header"></div>
              <div class="skeleton-shimmer skeleton-title"></div>
              <div class="skeleton-shimmer skeleton-line"></div>
              <div class="skeleton-shimmer skeleton-line-short"></div>
              <div class="skeleton-shimmer skeleton-footer"></div>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="repo in filteredRepos" 
              :key="repo.name"
              class="neo-card bg-yellow p-6 flex flex-col justify-between hover:bg-cyan transition-colors duration-250 cursor-pointer"
              @click="openRepo(repo.html_url)"
            >
              <div>
                <div class="project-lang flex items-center gap-2 mb-2 font-mono text-xs font-bold text-gray-700">
                  <span class="w-3 h-3 rounded-full border border-black inline-block" :style="{ backgroundColor: LANG_COLORS[repo.language] || '#777' }"></span>
                  {{ repo.language || 'Unknown' }}
                </div>
                <h4 class="font-heading text-lg font-bold text-left break-all line-clamp-1 mb-2">{{ repo.name }}</h4>
                <p class="font-body-md text-xs text-left line-clamp-3 mb-4 leading-relaxed text-gray-800">
                  {{ repo.description || t('projects-no-desc') }}
                </p>
              </div>
              <div class="flex justify-between items-center mt-auto pt-3 border-t border-dashed border-on-background font-mono text-xs">
                <span class="project-stars flex items-center gap-1 py-0.5 px-2 bg-white border border-black">
                  ⭐ {{ repo.stargazers_count }}
                </span>
                <span class="font-bold border-b border-black">{{ t('projects-view-source') }}</span>
              </div>
            </div>
            
            <div v-if="filteredRepos.length === 0" class="col-span-full py-8 text-center font-mono opacity-60">
              {{ t('projects-no-match') }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePortfolio } from '../composables/usePortfolio'

const {
  t,
  playSound,
  initDraggable,
  githubRepos,
  reposLoading,
  projectSearchQuery,
  projectLanguageFilter,
  LANG_COLORS
} = usePortfolio()

const githubWindow = ref(null)
const githubHeader = ref(null)

onMounted(() => {
  if (githubWindow.value && githubHeader.value) {
    initDraggable(githubWindow.value, githubHeader.value)
  }
})

const filteredRepos = computed(() => {
  return githubRepos.value.filter(repo => {
    const name = repo.name ? repo.name.toLowerCase() : ''
    const desc = repo.description ? repo.description.toLowerCase() : ''
    const query = projectSearchQuery.value.toLowerCase()
    
    const matchesSearch = name.includes(query) || desc.includes(query)
    const matchesLang = !projectLanguageFilter.value || repo.language === projectLanguageFilter.value
    
    return matchesSearch && matchesLang
  })
})

const languages = computed(() => {
  const counts = {}
  githubRepos.value.forEach(repo => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1
    }
  })
  return Object.entries(counts).map(([name, count]) => ({ name, count }))
})

function filterLanguage(langName) {
  playSound('click')
  projectLanguageFilter.value = langName
}

function openRepo(url) {
  playSound('success')
  window.open(url, '_blank')
}
</script>