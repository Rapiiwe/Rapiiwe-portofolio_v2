<template>
<section class="section-neo section-neo--yellow px-margin-mobile md:px-margin-desktop py-12 text-on-background" id="contact">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
    <div>
      <span class="section-num">// 08</span>
      <h2 class="section-title section-title--neo mt-2">{{ t('contact-title') }}</h2>
      <p class="font-body-lg mt-8 mb-12 max-w-md">{{ t('contact-subtitle') }}</p>
      
      <div class="space-y-6">
        <div class="flex items-center gap-6 text-left">
          <div class="w-16 h-16 bg-primary-container border-border-width border-on-background flex items-center justify-center neo-shadow shrink-0">
            <span class="material-symbols-outlined text-3xl">badge</span>
          </div>
          <div class="min-w-0">
            <p class="font-label-bold opacity-60 uppercase">{{ t('contact-display-name') }}</p>
            <p class="font-headline-md text-lg md:text-xl">{{ PROFILE.fullName }}</p>
          </div>
        </div>

        <a :href="`mailto:${PROFILE.email}`" @click="playSound('success')" class="flex items-center gap-6 group cursor-pointer text-left">
          <div class="w-16 h-16 bg-secondary-container border-border-width border-on-background flex items-center justify-center neo-shadow group-hover:-translate-y-1 transition-transform shrink-0">
            <span class="material-symbols-outlined text-3xl">mail</span>
          </div>
          <div class="min-w-0">
            <p class="font-label-bold opacity-60 uppercase">{{ t('contact-display-email') }}</p>
            <p class="font-headline-md text-lg md:text-xl break-all">{{ PROFILE.email }}</p>
          </div>
        </a>
        
        <a :href="PROFILE.instagramUrl" target="_blank" rel="noopener noreferrer" @click="playSound('success')" class="flex items-center gap-6 group cursor-pointer text-left">
          <div class="w-16 h-16 bg-primary-fixed border-border-width border-on-background flex items-center justify-center neo-shadow group-hover:-translate-y-1 transition-transform shrink-0">
            <span class="material-symbols-outlined text-3xl">photo_camera</span>
          </div>
          <div class="min-w-0">
            <p class="font-label-bold opacity-60 uppercase">Instagram</p>
            <p class="font-headline-md text-lg md:text-xl">{{ PROFILE.instagram }}</p>
          </div>
        </a>
      </div>
    </div>
    
    <div class="bg-surface-container p-10 border-border-width border-on-background neo-shadow">
      <form class="space-y-8 text-left" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="font-label-bold uppercase">{{ t('contact-label-name') }}</label>
          <input 
            class="w-full bg-background border-border-width border-on-background p-4 focus:bg-primary-container focus:outline-none transition-colors neo-shadow-active" 
            :placeholder="t('contact-placeholder-name')" 
            type="text"
            v-model="contactForm.name"
            required
            @input="playSound('hover')"
          />
        </div>
        <div class="space-y-2">
          <label class="font-label-bold uppercase">{{ t('contact-label-email') }}</label>
          <input 
            class="w-full bg-background border-border-width border-on-background p-4 focus:bg-secondary-container focus:outline-none transition-colors neo-shadow-active" 
            :placeholder="t('contact-placeholder-email')" 
            type="email"
            v-model="contactForm.email"
            required
            @input="playSound('hover')"
          />
        </div>
        <div class="space-y-2">
          <label class="font-label-bold uppercase">{{ t('contact-label-msg') }}</label>
          <textarea 
            class="w-full bg-background border-border-width border-on-background p-4 focus:bg-tertiary-fixed focus:outline-none transition-colors neo-shadow-active" 
            :placeholder="t('contact-placeholder-msg')" 
            rows="4"
            v-model="contactForm.message"
            required
            @input="playSound('hover')"
          ></textarea>
        </div>
        <button class="w-full bg-on-background text-background py-6 font-headline-md uppercase border-border-width border-on-background neo-shadow neo-shadow-hover neo-shadow-active">
          {{ t('contact-btn-submit') }}
        </button>
      </form>
    </div>
  </div>
</section>
</template>

<script setup>
import { usePortfolio } from '../composables/usePortfolio'

const {
  PROFILE,
  t,
  playSound,
  contactForm
} = usePortfolio()

function handleSubmit() {
  playSound('success')
  alert(t('contact-success-alert', 'Pesan Anda telah berhasil terkirim (Simulasi)! Terima kasih!'))
  contactForm.name = ''
  contactForm.email = ''
  contactForm.message = ''
}
</script>