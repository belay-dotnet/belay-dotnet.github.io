<template>
  <div class="version-selector">
    <div class="current-version">
      <span class="version-badge">{{ currentVersion }}</span>
      <button 
        class="dropdown-toggle" 
        @click="toggleDropdown"
        aria-label="Select API version"
      >
        <ChevronDown :class="{ 'rotate': showDropdown }" />
      </button>
    </div>
    
    <transition name="dropdown">
      <div v-if="showDropdown" class="version-dropdown">
        <div class="dropdown-header">API Versions</div>
        <div class="version-list">
          <a 
            v-for="version in versions" 
            :key="version.tag"
            :href="version.url"
            class="version-item"
            :class="{ 'current': version.tag === currentVersion }"
            @click="selectVersion(version)"
          >
            <div class="version-info">
              <span class="version-tag">{{ version.tag }}</span>
              <span v-if="version.isCurrent" class="current-label">Current</span>
              <span v-else-if="version.isPrerelease" class="prerelease-label">
                {{ version.prereleaseType }}
              </span>
            </div>
            <div v-if="version.releaseDate" class="release-date">
              {{ formatDate(version.releaseDate) }}
            </div>
          </a>
        </div>
        <div class="dropdown-footer">
          <a href="/api/versions" class="all-versions-link">
            View All Versions →
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Version {
  tag: string
  url: string
  releaseDate?: string
  isCurrent: boolean
  isPrerelease: boolean
  prereleaseType?: string
}

const props = defineProps<{
  currentVersion: string
  versions?: Version[]
}>()

const showDropdown = ref(false)

// Default versions if not provided
const defaultVersions: Version[] = [
  {
    tag: 'main',
    url: '/api/',
    isCurrent: true,
    isPrerelease: false
  },
  {
    tag: 'v0.3.0-alpha',
    url: '/api/versions/v0.3.0-alpha/',
    releaseDate: '2025-08-10',
    isCurrent: false,
    isPrerelease: true,
    prereleaseType: 'alpha'
  }
]

const versions = computed(() => props.versions || defaultVersions)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function selectVersion(version: Version) {
  showDropdown.value = false
  // Navigation will be handled by the href
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function handleClickOutside(event: Event) {
  const target = event.target as Element
  if (!target.closest('.version-selector')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Simple chevron down icon component
const ChevronDown = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  `
}
</script>

<style scoped>
.version-selector {
  position: relative;
  display: inline-block;
}

.current-version {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.current-version:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}

.version-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.dropdown-toggle {
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.dropdown-toggle svg.rotate {
  transform: rotate(180deg);
}

.version-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
  z-index: 100;
  min-width: 250px;
}

.dropdown-header {
  padding: 12px 16px 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--vp-c-border);
}

.version-list {
  max-height: 300px;
  overflow-y: auto;
}

.version-item {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.version-item:last-child {
  border-bottom: none;
}

.version-item:hover {
  background: var(--vp-c-bg-soft);
}

.version-item.current {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.version-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.version-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 500;
}

.current-label {
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
}

.prerelease-label {
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
}

.release-date {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.dropdown-footer {
  padding: 8px 16px 12px;
  border-top: 1px solid var(--vp-c-border);
}

.all-versions-link {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.all-versions-link:hover {
  text-decoration: underline;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>