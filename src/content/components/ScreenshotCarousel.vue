<template>
  <div class="screenshot-gallery">
    <div class="screenshot-container">
      <img 
        v-for="(screenshot, index) in screenshots" 
        :key="index"
        :src="screenshot.src" 
        :alt="screenshot.alt"
        :class="{ active: index === currentScreenshot }"
        class="screenshot"
      />
    </div>
    <div class="screenshot-dots">
      <button 
        v-for="(screenshot, index) in screenshots"
        :key="index"
        @click="currentScreenshot = index"
        :class="{ active: index === currentScreenshot }"
        class="dot"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  screenshots: {
    type: Array,
    required: true
  },
  autoRotateInterval: {
    type: Number,
    default: 4000
  }
})

const currentScreenshot = ref(0)

let interval
onMounted(() => {
  interval = setInterval(() => {
    currentScreenshot.value = (currentScreenshot.value + 1) % props.screenshots.length
  }, props.autoRotateInterval)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.screenshot-gallery {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f6f8fa;
}

.screenshot-container {
  position: relative;
  width: 100%;
  min-height: 300px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.screenshot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.screenshot.active {
  opacity: 1;
}

.screenshot-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #d0d7de;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background: #24292f;
}

.dot:hover {
  background: #656d76;
}
</style>
