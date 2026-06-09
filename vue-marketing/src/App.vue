<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const isScrolled = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const chartData = {
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
  datasets: [{
    label: 'Efficiency',
    backgroundColor: 'rgba(94, 106, 210, 0.2)',
    borderColor: '#5e6ad2',
    data: [30, 45, 40, 60, 75, 95],
    fill: true,
    tension: 0.4
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { 
    x: { display: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8f98' } }, 
    y: { display: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8f98' } } 
  }
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
  window.addEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="app-wrapper">
    <!-- Dynamic glow following mouse -->
    <div 
      class="mouse-glow" 
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    ></div>

    <!-- Animated Mesh Background -->
    <div class="mesh-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="noise-overlay"></div>
    </div>

    <nav :class="['navbar', { 'scrolled': isScrolled }]">
      <div class="nav-container">
        <div class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span class="logo-text">NextHire</span>
        </div>
        <div class="nav-items">
          <a href="#platform" class="nav-link">Platform</a>
          <a href="#solutions" class="nav-link">Solutions</a>
          <button class="btn-glow">Start Free</button>
        </div>
      </div>
    </nav>

    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="pill-badge">
            <span class="pulse-dot"></span> Next-Gen HR Automation
          </div>
          <h1 class="title">
            Onboarding that <br />
            <span class="text-gradient">Doesn't Suck.</span>
          </h1>
          <p class="subtitle">
            Say goodbye to boring PDFs and endless email threads. Welcome your new hires with an immersive, automated experience that screams premium.
          </p>
          <div class="cta-group">
            <button class="btn-primary">
              Deploy Workspace
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button class="btn-secondary">View Live Demo</button>
          </div>
        </div>

        <!-- Floating UI Mockup -->
        <div class="mockup-container">
          <div class="mockup-window glass-panel">
            <div class="mockup-header">
              <div class="traffic-lights">
                <span></span><span></span><span></span>
              </div>
              <div class="address-bar">app.nexthire.io</div>
            </div>
            <div class="mockup-body">
              <div class="sidebar"></div>
              <div class="main-area">
                <div class="card-grid">
                  <div class="skeleton card-1"></div>
                  <div class="skeleton card-2"></div>
                  <div class="skeleton card-3"></div>
                </div>
                <div class="chart-area glass-panel" style="padding: 1rem; position: relative;">
                  <Line :data="chartData" :options="chartOptions" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bento Grid Features -->
      <section class="bento-section">
        <div class="bento-container">
          <div class="bento-header">
            <h2>Not just another HR tool.</h2>
            <p>Engineered for speed, designed for humans.</p>
          </div>
          
          <div class="bento-grid">
            <div class="bento-box bento-large glass-panel">
              <div class="bento-content">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                <h3>Lightning Fast Setup</h3>
                <p>Deploy a fully branded onboarding portal in minutes, not weeks. Syncs instantly with your existing tech stack.</p>
              </div>
            </div>
            
            <div class="bento-box glass-panel">
              <div class="bento-content">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
                <h3>Real-time Analytics</h3>
                <p>Track completion rates and engagement metrics effortlessly.</p>
              </div>
            </div>

            <div class="bento-box glass-panel">
              <div class="bento-content">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-tertiary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <h3>Bank-grade Security</h3>
                <p>SOC2 compliant infrastructure protecting your data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
