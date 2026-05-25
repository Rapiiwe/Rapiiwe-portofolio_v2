import { ref, reactive, watch } from 'vue'

// Reactive Global States
const lang = ref('id')
const soundEnabled = ref(false)
const musicEnabled = ref(false)
const demoActive = ref(false)
const topZIndex = ref(20)

// Auto-Demo Coordinating States
const demoStatusText = ref('')
const terminalCommandInput = ref('')
const terminalExecuteTrigger = ref(0)
const skillsHighlightIndex = ref(-1)
const timelineTab = ref('education-pane')
const projectSearchQuery = ref('')
const projectLanguageFilter = ref('')
const pixelDrawerDrawCoordinates = ref(null)
const contactForm = reactive({
  name: '',
  email: '',
  message: ''
})

// Lightbox Global State
const lightboxActive = ref(false)
const lightboxImg = ref('')
const lightboxCaption = ref('')

// Github Repos state
const githubRepos = ref([])
const repoCount = ref(4) // default fallback count
const reposLoading = ref(true)

// Music object
let musicAudio = null
if (typeof window !== 'undefined') {
  musicAudio = new Audio('https://www.image2url.com/r2/default/audio/1779271457477-053dfbcc-80fb-4bb5-bd76-ebab09f3fb14.mp3')
  musicAudio.loop = true
}

// Translations dictionary
const TRANSLATIONS = {
  en: {
    "nav-about": "About",
    "nav-skills": "Skills",
    "nav-timeline": "Timeline",
    "nav-projects": "Projects",
    "nav-certificates": "Certificates",
    "nav-cv": "Resume",
    "nav-draw": "Draw",
    "nav-contact": "Contact",
    "hero-welcome": "✦ RAPII — hello, friends!",
    "hero-desc": "Learning to code, commit by commit. An Informatics student who loves building interactive, modern web interfaces.",
    "hero-btn-projects": "View Projects ↓",
    "hero-btn-contact": "Get In Touch ✉",
    "hero-btn-sandbox": "Play Sandbox 🎮",
    "about-stat-local": "Local Time:",
    "about-stat-status-label": "Status:",
    "about-stat-status-val": "🟢 Active Coding",
    "about-stat-major": "Major:",
    "about-stat-major-val": "Informatics Engineering",
    "about-title": "About Me",
    "about-p1": "Hello! I'm Rafi, an Informatics Engineering student with a great passion for web development. I love exploring software architecture, designing interactive interfaces, and translating complex logic into clean, functional code.",
    "about-p2": "For me, programming is like solving a fun puzzle — every bug is an exciting challenge to learn something new. Outside class hours, I actively explore modern frameworks and build interactive web projects.",
    "about-p3": "I'm always enthusiastic about learning new technologies, collaborating on open-source projects, and creating useful digital solutions. Let's connect and code together!",
    "about-stat-repos": "Github Repositories",
    "about-stat-active": "Active Since",
    "about-stat-bloopers": "Bugs to Fix",
    "skills-title": "Arsenal",
    "skills-frontend": "Frontend Tech",
    "skills-backend": "Backend Tech",
    "skills-tools": "Dev Tools",
    "journey-title": "My Journey",
    "journey-tab-edu": "Education",
    "journey-tab-exp": "Experience",
    "journey-present": "Present",
    "projects-title": "What I Built",
    "projects-curated": "Featured Projects",
    "projects-dynamic": "GitHub Dynamic Panel",
    "projects-search-placeholder": "🔍 Search repository name...",
    "certs-title": "Certificates",
    "certs-coming-soon": "COMING SOON",
    "certs-status-bar": "STATUS: IN PREPARATION",
    "certs-in-progress": "// IN PROGRESS",
    "cv-title": "Curriculum Vitae",
    "cv-subtitle": "Web Developer & Informatics Student",
    "cv-contact-major": "Informatics Engineering",
    "cv-core-title": "Core Skills",
    "cv-projects-title": "Project History",
    "cv-print-btn": "🖨 Print / Export PDF Resume",
    "draw-title": "Pixel Art Canvas",
    "draw-desc": "🎨 <strong>Instructions:</strong> Click and drag along the boxes to draw pixels. Pick different colors in the palette panel. Turn on Sound in the navbar for retro 8-bit sound effects!",
    "draw-btn-clear": "🧹 Reset Board",
    "draw-btn-download": "💾 Download Image (.png)",
    "contact-title": "Let's Connect",
    "contact-subtitle": "Feel free to reach out to me for project collaborations, job opportunities, or just to say hi! I'm always open to discussing technology.",
    "contact-label-name": "Full Name / Company",
    "contact-label-email": "Your Email Address",
    "contact-label-msg": "Your Message Content",
    "contact-placeholder-name": "John Doe",
    "contact-placeholder-email": "john@company.com",
    "contact-placeholder-msg": "Tell me about your project...",
    "contact-btn-submit": "🚀 Send Message",
    "experience-coming-soon": "Experience Coming Soon",
    "experience-desc": "Currently focusing on college at UPI YPTK Padang and building solid open-source projects. Open to internships and junior developer opportunities.",
    "edu1-role": "Informatics Engineering Student",
    "edu1-org": "UPI YPTK Padang",
    "edu1-desc": "Currently pursuing studies in computer science and software development.",
    "edu1-li1": "Core subjects: Algorithms, Data Structures, Relational Databases, Web Programming.",
    "edu1-li2": "Active member of developer student community and local coding club.",
    "edu2-role": "Self-Taught Programmer",
    "edu2-org": "Independent Learning",
    "edu2-desc": "Supplementing formal academic learning with industry certification paths.",
    "edu2-li1": "Learning from various sources, starting from YouTube, TikTok, and blogs.",
    "edu2-li2": "Focusing on Python, HTML, CSS, responsive layouts, and responsive design systems.",
    "fp1-name": "Portfolio",
    "fp1-desc": "Premium developer portfolio designed with a draggable terminal system, real-time clock widget, soundboard integration, and printable stylesheet.",
    "fp2-name": "Neo Draw Canvas",
    "fp2-desc": "Interactive retro pixel board widget embedded in a web canvas container. Allows pixel grid to be colored, erased, and exported directly to PNG file. Equipped with retro synthesiser Web Audio.",
    "fp-btn-source": "Source Code",
    "fp-btn-demo": "Live Demo",
    "fp2-btn-run": "Run Canvas",
    "nav-sound-on": "🔊 Sound: ON",
    "nav-sound-off": "🔇 Sound: OFF",
    "nav-music-on": "🎵 Music: ON",
    "nav-music-off": "🎵 Music: OFF",
    "nav-shuffle": "🎨 Shuffle",
    "nav-demo-play": "🎮 Play Demo",
    "nav-demo-stop": "🛑 Stop Demo",
    "projects-drag-me": "(Drag Me!)",
    "projects-no-desc": "No description provided.",
    "projects-no-match": "No matching repositories found.",
    "projects-view-source": "VIEW SOURCE ➔",
    "contact-success-alert": "Your message has been sent (Simulation)! Thank you!",
    "footer-built": "BUILT WITH VUE",
    "footer-rights": "All rights reserved.",
    "cv-edu1-role": "Bachelor of Informatics Engineering",
    "cv-edu1-date": "2024 - Present",
    "cv-edu1-desc": "Focusing on basics of algorithms, software engineering, and database systems. Active participant in student programming association.",
    "cv-skill-dev": "Development",
    "cv-skill-tools": "Tools",
    "cv-skill-soft": "Soft Skills",
    "cv-skill-soft-list": "Problem Solving, Fast Self-Learning, Critical Reasoning, Team Collaboration",
    "cv-proj1-role": "Personal Portfolio Web Environment",
    "cv-proj1-desc": "Designed and built an interactive portfolio with retro OS panel, Web Audio synthesizer, and pixel board drawing system.",
    "cv-proj2-role": "Independent Project Development",
    "cv-proj2-date": "2024 - 2025",
    "cv-proj2-desc": "Built several personal open-source projects hosted on GitHub, improving skills in Python, HTML, CSS.",
    "cv-author-name": "Rafi Rahmadani Zain",
    "marquee-frontend": "FRONTEND DEVELOPER",
    "marquee-student": "INFORMATICS STUDENT",
    "marquee-vue": "VUE.JS ENTHUSIAST",
    "marquee-neo": "NEOBRUTAL",
    "marquee-open": "OPEN TO WORK",
    "marquee-brand": "rapiiwe.github.io",
    "terminal-welcome": "Welcome to Rafi's PC Terminal (v1.0.0-release)",
    "terminal-hint": "Type 'help' to see the list of available commands.",
    "terminal-session": "bash - Guest Session (Drag Me!)"
  },
  id: {
    "nav-about": "Tentang",
    "nav-skills": "Keahlian",
    "nav-timeline": "Perjalanan",
    "nav-projects": "Proyek",
    "nav-certificates": "Sertifikat",
    "nav-cv": "Resume",
    "nav-draw": "Gambar",
    "nav-contact": "Kontak",
    "hero-welcome": "✦ RAPII — halo, Teman-teman!",
    "hero-desc": "Belajar ngoding, commit demi commit. Mahasiswa Teknik Informatika yang suka membangun antarmuka web yang interaktif, modern.",
    "hero-btn-projects": "Lihat Proyek ↓",
    "hero-btn-contact": "Hubungi Saya ✉",
    "hero-btn-sandbox": "Main Sandbox 🎮",
    "about-stat-local": "Waktu Lokal:",
    "about-stat-status-label": "Status:",
    "about-stat-status-val": "🟢 Aktif Ngoding",
    "about-stat-major": "Jurusan:",
    "about-stat-major-val": "Teknik Informatika",
    "about-title": "Tentang Saya",
    "about-p1": "Halo! Saya Rafi, seorang mahasiswa Teknik Informatika yang punya passion besar di dunia web development. Saya suka mengulik arsitektur perangkat lunak, mendesain antarmuka interaktif, dan menerjemahkan logika rumit menjadi baris kode yang bersih dan fungsional.",
    "about-p2": "Bagi saya, pemrograman itu seperti memecahkan teka-teki yang seru—setiap bug adalah tantangan menarik untuk belajar hal baru. Di luar jam kuliah, saya aktif mengeksplorasi framework modern dan membangun proyek-proyek web yang interaktif.",
    "about-p3": "Saya selalu antusias untuk mempelajari teknologi baru, berkolaborasi dalam proyek open-source, dan menciptakan solusi digital yang bermanfaat. Let's connect dan mari ngoding bareng!",
    "about-stat-repos": "Repositori Github",
    "about-stat-active": "Aktif Sejak",
    "about-stat-bloopers": "Bug untuk Diperbaiki",
    "skills-title": "Gudang Senjata",
    "skills-frontend": "Teknologi Frontend",
    "skills-backend": "Teknologi Backend",
    "skills-tools": "Alat Pengembang",
    "journey-title": "Perjalanan Saya",
    "journey-tab-edu": "Pendidikan",
    "journey-tab-exp": "Pengalaman",
    "journey-present": "Sekarang",
    "projects-title": "Yang Saya Bangun",
    "projects-curated": "Proyek Pilihan",
    "projects-dynamic": "Panel Dinamis GitHub",
    "projects-search-placeholder": "🔍 Cari nama repositori...",
    "certs-title": "Sertifikat",
    "certs-coming-soon": "SEGERA HADIR",
    "certs-status-bar": "STATUS: DALAM PERSIAPAN",
    "certs-in-progress": "// DALAM PROSES",
    "marquee-neo": "NEOBRUTAL",
    "marquee-open": "TERBUKA UNTUK KERJA",
    "marquee-brand": "rapiiwe.github.io",
    "cv-title": "Daftar Riwayat Hidup",
    "cv-subtitle": "Pengembang Web & Mahasiswa Informatika",
    "cv-contact-major": "Teknik Informatika",
    "cv-core-title": "Keahlian Utama",
    "cv-projects-title": "Riwayat Proyek",
    "cv-print-btn": "🖨 Cetak / Ekspor PDF Resume",
    "draw-title": "Wadah Gambar Piksel",
    "draw-desc": "🎨 <strong>Instruksi:</strong> Klik dan seret di sepanjang kotak untuk menggambar piksel. Pilih warna yang berbeda di panel pilihan. Nyalakan suara di nav bar untuk efek suara 8-bit retro!",
    "draw-btn-clear": "🧹 Reset Papan",
    "draw-btn-download": "💾 Unduh Gambar (.png)",
    "contact-title": "Mari Terhubung",
    "contact-subtitle": "Jangan ragu untuk menghubungi saya untuk kolaborasi proyek, peluang kerja, atau sekadar menyapa! Saya selalu terbuka untuk berdiskusi tentang teknologi.",
    "contact-label-name": "Nama Lengkap / Perusahaan",
    "contact-label-email": "Alamat Email Anda",
    "contact-label-msg": "Isi Pesan Anda",
    "contact-placeholder-name": "John Doe",
    "contact-placeholder-email": "john@company.com",
    "contact-placeholder-msg": "Ceritakan proyek Anda...",
    "contact-btn-submit": "🚀 Kirim Pesan",
    "experience-coming-soon": "Pengalaman Segera Hadir",
    "experience-desc": "Saat ini fokus pada perkuliahan di UPI YPTK Padang dan membangun proyek open-source yang solid. Terbuka untuk magang dan peluang pengembang pemula.",
    "edu1-role": "Mahasiswa Teknik Informatika",
    "edu1-org": "UPI YPTK Padang",
    "edu1-desc": "Saat ini menempuh studi di bidang ilmu komputer dan pengembangan perangkat lunak.",
    "edu1-li1": "Mata kuliah inti: Algoritma, Struktur Data, Basis Data Relasional, Pemrograman Web.",
    "edu1-li2": "Anggota aktif komunitas mahasiswa developer dan klub coding lokal.",
    "edu2-role": "Programmer Otodidak",
    "edu2-org": "Belajar Mandiri",
    "edu2-desc": "Melengkapi pembelajaran akademis formal dengan jalur sertifikasi industri.",
    "edu2-li1": "Belajar dari berbagai sumber, mulai dari YouTube, TikTok, dan blog.",
    "edu2-li2": "Berfokus pada Python, HTML, CSS, tata letak responsif, dan sistem desain responsif.",
    "fp1-name": "Portfolio",
    "fp1-desc": "Portofolio developer premium yang dirancang dengan sistem terminal yang bisa diseret, widget jam real-time, integrasi papan suara, dan stylesheet yang bisa dicetak.",
    "fp2-name": "Neo Draw Canvas",
    "fp2-desc": "Widget papan piksel retro interaktif yang tertanam dalam container canvas web. Memungkinkan grid piksel diwarnai, dihapus, dan diekspor langsung ke file PNG. Dilengkapi suara synthesizer Audio retro.",
    "fp-btn-source": "Kode Sumber",
    "fp-btn-demo": "Demo Langsung",
    "fp2-btn-run": "Jalankan Canvas",
    "nav-sound-on": "🔊 Suara: Aktif",
    "nav-sound-off": "🔇 Suara: Mati",
    "nav-music-on": "🎵 Musik: Aktif",
    "nav-music-off": "🎵 Musik: Mati",
    "nav-shuffle": "🎨 Acak Warna",
    "nav-demo-play": "🎮 Play Demo",
    "nav-demo-stop": "🛑 Stop Demo",
    "projects-drag-me": "(Tarik Saya!)",
    "projects-no-desc": "Tidak ada deskripsi repositori.",
    "projects-no-match": "Tidak ada repositori yang cocok.",
    "projects-view-source": "LIHAT SUMBER ➔",
    "contact-success-alert": "Pesan Anda telah berhasil terkirim (Simulasi)! Terima kasih!",
    "footer-built": "DIBANGUN DENGAN VUE",
    "footer-rights": "Hak cipta dilindungi.",
    "cv-edu1-role": "Sarjana Teknik Informatika",
    "cv-edu1-date": "2024 - Sekarang",
    "cv-edu1-desc": "Berfokus pada dasar-dasar algoritma, rekayasa perangkat lunak, dan sistem basis data. Peserta aktif asosiasi pemrograman mahasiswa.",
    "cv-skill-dev": "Pengembangan",
    "cv-skill-tools": "Alat",
    "cv-skill-soft": "Soft Skills",
    "cv-skill-soft-list": "Pemecahan Masalah, Belajar Mandiri Cepat, Penalaran Kritis, Kolaborasi Tim",
    "cv-proj1-role": "Lingkungan Web Portofolio Pribadi",
    "cv-proj1-desc": "Merancang dan membangun portofolio interaktif dengan panel OS retro, synthesizer Web Audio, dan sistem gambar papan piksel.",
    "cv-proj2-role": "Pengembangan Proyek Mandiri",
    "cv-proj2-date": "2024 - 2025",
    "cv-proj2-desc": "Membangun beberapa proyek open-source pribadi yang dihosting di GitHub, meningkatkan kemampuan dalam Python, HTML, CSS.",
    "cv-author-name": "Rafi Rahmadani Zain",
    "marquee-frontend": "FRONTEND DEVELOPER",
    "marquee-student": "MAHASISWA INFORMATIKA",
    "marquee-vue": "VUE.JS ENTHUSIAST",
    "terminal-welcome": "Selamat datang di Terminal PC Rafi (v1.0.0-release)",
    "terminal-hint": "Ketik 'help' untuk melihat daftar perintah yang tersedia.",
    "terminal-session": "bash - Sesi Tamu (Tarik Saya!)"
  }
}

// Translate — reads lang.value so templates & scripts stay reactive on language switch
function t(key, fallback) {
  const currentLang = lang.value
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key] !== undefined) {
    return TRANSLATIONS[currentLang][key]
  }
  if (TRANSLATIONS.id && TRANSLATIONS.id[key] !== undefined) {
    return TRANSLATIONS.id[key]
  }
  return fallback !== undefined ? fallback : key
}

// Web Audio API Synthesizer
function playSound(type) {
  if (!soundEnabled.value) return

  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    const now = audioCtx.currentTime

    if (type === 'hover') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(150, now)
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1)
      gainNode.gain.setValueAtTime(0.08, now)
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.1)
      osc.start(now)
      osc.stop(now + 0.1)
    } else if (type === 'click') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(400, now)
      osc.frequency.setValueAtTime(600, now + 0.05)
      gainNode.gain.setValueAtTime(0.12, now)
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.15)
      osc.start(now)
      osc.stop(now + 0.15)
    } else if (type === 'success') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.setValueAtTime(450, now + 0.08)
      osc.frequency.setValueAtTime(600, now + 0.16)
      gainNode.gain.setValueAtTime(0.15, now)
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    } else if (type === 'clear') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(250, now)
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.2)
      gainNode.gain.setValueAtTime(0.1, now)
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.2)
      osc.start(now)
      osc.stop(now + 0.2)
    }
  } catch (e) {
    console.warn('Audio Context not allowed or supported on this browser.')
  }
}

// Watchers for Sound/Music
watch(musicEnabled, (val) => {
  if (!musicAudio) return
  if (val) {
    musicAudio.play().catch((e) => {
      console.warn('Music playback blocked by browser interaction policy.', e)
      musicEnabled.value = false
    })
  } else {
    musicAudio.pause()
  }
})

// Toggle actions
function toggleLanguage() {
  lang.value = lang.value === 'id' ? 'en' : 'id'
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang.value
  }
  playSound('click')
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) {
    setTimeout(() => playSound('success'), 50)
  }
}

function toggleMusic() {
  musicEnabled.value = !musicEnabled.value
  playSound('click')
}

// Color Palette Shuffle
const colorPaletteClasses = ['bg-yellow', 'bg-green', 'bg-pink', 'bg-cyan', 'bg-orange', 'bg-purple', 'bg-white']
function shuffleColors() {
  playSound('success')

  const cards = document.querySelectorAll(
    '.neo-card, .timeline-card, .project-card, .featured-card, .about-stat-item, .contact-social-card, .bg-surface-container-highest, .bg-primary-container, .bg-secondary-container, .bg-surface-container-low, .bg-surface-container'
  )

  cards.forEach((card) => {
    colorPaletteClasses.forEach((cls) => {
      card.classList.remove(cls)
      // Strip Tailwind color utilities that might override it
      card.classList.remove('bg-surface-container-highest', 'bg-primary-container', 'bg-secondary-container', 'bg-surface-container-low', 'bg-surface-container')
    })
    card.classList.remove('bg-blue')

    const randomCls = colorPaletteClasses[Math.floor(Math.random() * colorPaletteClasses.length)]
    card.classList.add(randomCls)
  })
}

// Github API fetch
const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  Java: '#b07219',
  'C++': '#f34b7d',
  PHP: '#4f5d95',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Go: '#00ADD8',
  Rust: '#dea584'
}

async function fetchGitHubRepos() {
  reposLoading.value = true
  try {
    const res = await fetch('https://api.github.com/users/Rapiiwe/repos?sort=updated&per_page=25')
    if (!res.ok) throw new Error('API limit reached or user not found.')
    const repos = await res.json()
    const filtered = repos.filter((repo) => !repo.fork && !repo.private)
    filtered.forEach((repo) => {
      if (repo.name === 'Bio') {
        repo.language = 'Dart'
      }
    })
    githubRepos.value = filtered
    repoCount.value = filtered.length
  } catch (err) {
    console.warn('Using fallback static repos due to API error:', err)
    const fallback = [
      {
        name: "Manajemen_kuliah",
        language: "PHP",
        description: "Sistem manajemen data perkuliahan mahasiswa.",
        stargazers_count: 0,
        updated_at: "2026-05-20T04:21:54Z",
        html_url: "https://github.com/Rapiiwe/Manajemen_kuliah"
      },
      {
        name: "inventory_baju",
        language: "PHP",
        description: "Aplikasi Inventory Baju untuk manajemen stok pakaian.",
        stargazers_count: 0,
        updated_at: "2026-05-19T19:43:23Z",
        html_url: "https://github.com/Rapiiwe/inventory_baju"
      },
      {
        name: "Project_Game_py",
        language: "Python",
        description: "Space War game built in Python using Pygame library.",
        stargazers_count: 0,
        updated_at: "2026-05-19T19:01:39Z",
        html_url: "https://github.com/Rapiiwe/Project_Game_py"
      },
      {
        name: "Bio",
        language: "Dart",
        description: "Aplikasi Biodata Mahasiswa menggunakan Flutter.",
        stargazers_count: 0,
        updated_at: "2026-05-14T19:44:22Z",
        html_url: "https://github.com/Rapiiwe/Bio"
      }
    ]
    githubRepos.value = fallback
    repoCount.value = fallback.length
  } finally {
    reposLoading.value = false
  }
}

// Window Draggable logic (helper for ref-based templates)
function bringToFront(el) {
  topZIndex.value++
  el.style.zIndex = topZIndex.value
}

function initDraggable(el, headerEl) {
  if (!el || !headerEl) return

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

  headerEl.onmousedown = dragMouseDown
  headerEl.ontouchstart = dragTouchStart

  function dragMouseDown(e) {
    if (e.target.classList.contains('window-dot')) return
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
    bringToFront(el)
  }

  function elementDrag(e) {
    e.preventDefault()
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    el.style.top = (el.offsetTop - pos2) + 'px'
    el.style.left = (el.offsetLeft - pos1) + 'px'
    el.style.position = 'fixed'
  }

  function dragTouchStart(e) {
    if (e.target.classList.contains('window-dot')) return
    pos3 = e.touches[0].clientX
    pos4 = e.touches[0].clientY
    document.ontouchend = closeDragElement
    document.ontouchmove = elementTouchDrag
    bringToFront(el)
  }

  function elementTouchDrag(e) {
    pos1 = pos3 - e.touches[0].clientX
    pos2 = pos4 - e.touches[0].clientY
    pos3 = e.touches[0].clientX
    pos4 = e.touches[0].clientY
    el.style.top = (el.offsetTop - pos2) + 'px'
    el.style.left = (el.offsetLeft - pos1) + 'px'
    el.style.position = 'fixed'
  }

  function closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
    document.ontouchend = null
    document.ontouchmove = null
  }
}

// Typewriter helper for simple refs
async function typeWriter(targetRef, text, delay = 100) {
  targetRef.value = ''
  for (let i = 0; i < text.length; i++) {
    if (!demoActive.value) return
    targetRef.value += text[i]
    playSound('hover')
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}

// Typewriter helper for reactive object properties
async function typeWriterReactive(obj, key, text, delay = 80) {
  obj[key] = ''
  for (let i = 0; i < text.length; i++) {
    if (!demoActive.value) return
    obj[key] += text[i]
    playSound('hover')
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}

// Run Auto-Demo sequence
async function runDemo() {
  if (demoActive.value) {
    demoActive.value = false
    demoStatusText.value = ''
    return
  }

  demoActive.value = true
  soundEnabled.value = true // automatically turn on sound for maximum wow factor
  
  const scrollTo = (selector) => {
    const el = document.querySelector(selector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  try {
    // 1. HERO & TERMINAL
    scrollTo('#hero')
    demoStatusText.value = 'Membuka Sesi Terminal Tamu...'
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (!demoActive.value) return

    demoStatusText.value = 'Mengetik perintah "help" di Terminal...'
    await typeWriter(terminalCommandInput, 'help', 100)
    if (!demoActive.value) return
    await new Promise(resolve => setTimeout(resolve, 500))
    terminalExecuteTrigger.value++
    playSound('success')
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (!demoActive.value) return

    demoStatusText.value = 'Mengetik perintah "about" di Terminal...'
    await typeWriter(terminalCommandInput, 'about', 100)
    if (!demoActive.value) return
    await new Promise(resolve => setTimeout(resolve, 500))
    terminalExecuteTrigger.value++
    playSound('success')
    await new Promise(resolve => setTimeout(resolve, 3000))
    if (!demoActive.value) return

    // 2. ABOUT
    scrollTo('#about')
    demoStatusText.value = 'Mempelajari Profil & Statistik...'
    await new Promise(resolve => setTimeout(resolve, 2500))
    if (!demoActive.value) return

    // 3. SKILLS
    scrollTo('#skills')
    demoStatusText.value = 'Menelusuri Keahlian & Senjata...'
    for (let i = 0; i < 8; i++) {
      if (!demoActive.value) return
      skillsHighlightIndex.value = i
      playSound('hover')
      await new Promise(resolve => setTimeout(resolve, 400))
    }
    skillsHighlightIndex.value = -1
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (!demoActive.value) return

    // 4. TIMELINE / EXPERIENCE
    scrollTo('#timeline')
    demoStatusText.value = 'Membuka Riwayat Perjalanan...'
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (!demoActive.value) return
    
    timelineTab.value = 'experience-pane'
    playSound('click')
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (!demoActive.value) return

    timelineTab.value = 'education-pane'
    playSound('click')
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (!demoActive.value) return

    // 5. PROJECTS
    scrollTo('#projects')
    demoStatusText.value = 'Mengecek Repositori GitHub...'
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (!demoActive.value) return

    demoStatusText.value = 'Mencari proyek "game" di Panel GitHub...'
    await typeWriter(projectSearchQuery, 'game', 120)
    if (!demoActive.value) return
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    projectSearchQuery.value = ''
    demoStatusText.value = 'Menyaring repositori berdasarkan bahasa PHP...'
    projectLanguageFilter.value = 'PHP'
    playSound('click')
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (!demoActive.value) return

    projectLanguageFilter.value = ''
    playSound('click')
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 6. PIXEL DRAWER
    scrollTo('#pixel-drawer')
    demoStatusText.value = 'Menggambar Seni Piksel Retro...'
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (!demoActive.value) return

    // Coordinates for drawing a heart shape on 16x16 grid (0-indexed)
    const heartCoords = [
      { r: 3, c: 4 }, { r: 3, c: 5 }, { r: 3, c: 10 }, { r: 3, c: 11 },
      { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }, { r: 4, c: 6 }, { r: 4, c: 9 }, { r: 4, c: 10 }, { r: 4, c: 11 }, { r: 4, c: 12 },
      { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }, { r: 5, c: 6 }, { r: 5, c: 7 }, { r: 5, c: 8 }, { r: 5, c: 9 }, { r: 5, c: 10 }, { r: 5, c: 11 }, { r: 5, c: 12 }, { r: 5, c: 13 },
      { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }, { r: 6, c: 6 }, { r: 6, c: 7 }, { r: 6, c: 8 }, { r: 6, c: 9 }, { r: 6, c: 10 }, { r: 6, c: 11 }, { r: 6, c: 12 }, { r: 6, c: 13 },
      { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 }, { r: 7, c: 7 }, { r: 7, c: 8 }, { r: 7, c: 9 }, { r: 7, c: 10 }, { r: 7, c: 11 }, { r: 7, c: 12 },
      { r: 8, c: 4 }, { r: 8, c: 5 }, { r: 8, c: 6 }, { r: 8, c: 7 }, { r: 8, c: 8 }, { r: 8, c: 9 }, { r: 8, c: 10 }, { r: 8, c: 11 },
      { r: 9, c: 5 }, { r: 9, c: 6 }, { r: 9, c: 7 }, { r: 9, c: 8 }, { r: 9, c: 9 }, { r: 9, c: 10 },
      { r: 10, c: 6 }, { r: 10, c: 7 }, { r: 10, c: 8 }, { r: 10, c: 9 },
      { r: 11, c: 7 }, { r: 11, c: 8 }
    ]

    for (const coord of heartCoords) {
      if (!demoActive.value) return
      pixelDrawerDrawCoordinates.value = { r: coord.r, c: coord.c, color: '#FF007F' }
      playSound('click')
      await new Promise(resolve => setTimeout(resolve, 80))
    }
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (!demoActive.value) return

    // 7. CONTACT
    scrollTo('#contact')
    demoStatusText.value = 'Mengisi Form Kontak...'
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (!demoActive.value) return

    await typeWriterReactive(contactForm, 'name', 'Rafi Rahmadani Zain', 80)
    if (!demoActive.value) return
    await new Promise(resolve => setTimeout(resolve, 500))

    await typeWriterReactive(contactForm, 'email', 'rafirahmadanizain@gmail.com', 80)
    if (!demoActive.value) return
    await new Promise(resolve => setTimeout(resolve, 500))

    await typeWriterReactive(contactForm, 'message', 'Halo! Portofolio ini sangat luar biasa, interaktif, dan penuh estetika retro.', 50)
    if (!demoActive.value) return
    await new Promise(resolve => setTimeout(resolve, 1000))

    demoStatusText.value = 'Mengirim Pesan...'
    playSound('success')
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (!demoActive.value) return

    contactForm.name = ''
    contactForm.email = ''
    contactForm.message = ''

    // 8. FINISH
    scrollTo('#hero')
    demoStatusText.value = 'Demo Selesai! Terima Kasih!'
    playSound('success')
    await new Promise(resolve => setTimeout(resolve, 2500))
  } catch (err) {
    console.error('Error during demo run:', err)
  } finally {
    demoActive.value = false
    demoStatusText.value = ''
  }
}

// Expose States & Actions
export function usePortfolio() {
  return {
    lang,
    soundEnabled,
    musicEnabled,
    demoActive,
    topZIndex,
    demoStatusText,
    terminalCommandInput,
    terminalExecuteTrigger,
    skillsHighlightIndex,
    timelineTab,
    projectSearchQuery,
    projectLanguageFilter,
    pixelDrawerDrawCoordinates,
    contactForm,
    runDemo,
    t,
    playSound,
    toggleLanguage,
    toggleSound,
    toggleMusic,
    shuffleColors,
    githubRepos,
    repoCount,
    reposLoading,
    fetchGitHubRepos,
    LANG_COLORS,
    bringToFront,
    initDraggable,
    lightboxActive,
    lightboxImg,
    lightboxCaption
  }
}
