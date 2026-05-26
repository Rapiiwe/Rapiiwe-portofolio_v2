<template>
<footer class="w-full py-12 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter bg-black border-t-4 border-black safe-area-bottom">
  <a href="https://rapiiwe.github.io" target="_blank" rel="noopener noreferrer" class="nav-logo-neo text-sm md:text-base text-black bg-yellow">rapiiwe.github.io</a>
  <div class="flex flex-wrap justify-center gap-8">
    <a class="font-mono font-bold text-sm text-yellow uppercase hover:text-pink transition-colors" href="https://github.com/Rapiiwe" target="_blank">GitHub</a>
    <a class="font-mono font-bold text-sm text-yellow uppercase hover:text-pink transition-colors" href="https://www.instagram.com/_iamrapii?igsh=bWcwYmxndWN6YXE4" target="_blank">Instagram</a>
  </div>
  <div class="font-mono text-xs text-white opacity-70 font-bold">
    © 2026 {{ PROFILE.fullName }} — {{ t('footer-built') }}
  </div>
</footer>
</template>

<script setup>
import { usePortfolio } from '../composables/usePortfolio'
const { PROFILE, t } = usePortfolio()
</script>