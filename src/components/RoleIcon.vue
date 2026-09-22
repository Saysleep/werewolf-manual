<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <template v-if="name === 'wolf'">
      <path d="M4 20 L6 8 L10 12 L12 5 L14 12 L18 8 L20 20 Z" />
      <circle cx="9.5" cy="15.5" r="0.4" fill="currentColor" />
      <circle cx="14.5" cy="15.5" r="0.4" fill="currentColor" />
    </template>
    <template v-else-if="name === 'eye'">
      <path d="M2 12 C6 6, 18 6, 22 12 C18 18, 6 18, 2 12 Z" />
      <circle cx="12" cy="12" r="3" />
    </template>
    <template v-else-if="name === 'potion'">
      <path d="M10 3 h4 M11 3 v5 l-5 9 a3 3 0 0 0 2.6 4.5 h6.8 A3 3 0 0 0 18 17 l-5 -9 v-5" />
      <path d="M7.5 15 h9" />
    </template>
    <template v-else-if="name === 'gun'">
      <path d="M3 9 h14 l3 -2 v5 h-3 l-1 3 h-4 l-1 5 H7 l1.5 -5 H5 a2 2 0 0 1 -2 -2 Z" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M12 3 L20 6 v6 c0 5 -3.5 8 -8 9 c-4.5 -1 -8 -4 -8 -9 V6 Z" />
      <path d="M12 7 v6" />
    </template>
    <template v-else-if="name === 'joker'">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M12 8 l1.2 2.4 2.6 .4 -1.9 1.9 .5 2.7 -2.4 -1.3 -2.4 1.3 .5 -2.7 -1.9 -1.9 2.6 -.4 Z" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'crystal'">
      <circle cx="12" cy="11" r="6" />
      <path d="M8 21 h8 M10 17 h4" />
    </template>
    <template v-else-if="name === 'heart'">
      <path d="M12 20 C5 14.5, 3 10, 5.5 7 C7.5 4.8, 10.5 5.5, 12 8 C13.5 5.5, 16.5 4.8, 18.5 7 C21 10, 19 14.5, 12 20 Z" />
    </template>
    <template v-else-if="name === 'folk'">
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 21 c0 -4 3 -6.5 7 -6.5 s7 2.5 7 6.5" />
    </template>
    <template v-else-if="name === 'crown'">
      <path d="M4 18 L3 7 l5 4 4 -7 4 7 5 -4 -1 11 Z" />
      <path d="M7 21 h10" />
    </template>
    <template v-else-if="name === 'moon'">
      <path d="M19 13.5 A7.5 7.5 0 1 1 10.5 5 A6 6 0 0 0 19 13.5 Z" />
    </template>
    <template v-else-if="name === 'shadow'">
      <circle cx="10" cy="10" r="5" />
      <path d="M14 14 c2 0 6 1 6 5 H8 c0 -3 3 -5 6 -5 Z" />
    </template>
    <template v-else-if="name === 'eclipse'">
      <circle cx="12" cy="12" r="8" />
      <circle cx="14.5" cy="10.5" r="6" fill="var(--bg)" stroke="none" />
      <path d="M12 4 a8 8 0 0 0 0 16" />
    </template>
    <template v-else-if="name === 'gear'">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8 v3 M12 18.2 v3 M2.8 12 h3 M18.2 12 h3 M5.5 5.5 l2.1 2.1 M16.4 16.4 l2.1 2.1 M18.5 5.5 l-2.1 2.1 M7.6 16.4 l-2.1 2.1" />
    </template>
    <template v-else-if="name === 'burst'">
      <path d="M12 2.5 v4.5 M12 17 v4.5 M2.5 12 h4.5 M17 12 h4.5 M5.3 5.3 l3.2 3.2 M15.5 15.5 l3.2 3.2 M18.7 5.3 l-3.2 3.2 M8.5 15.5 l-3.2 3.2" />
    </template>
    <template v-else-if="name === 'hidden'">
      <path d="M4 5.5 C8 3.5, 16 3.5, 20 5.5 C21.5 6.3, 21.5 9.5, 20 12 C18.5 16, 15 18.5, 12 18.5 C9 18.5, 5.5 16, 4 12 C2.5 9.5, 2.5 6.3, 4 5.5 Z" />
      <path d="M5 9.5 h14" />
    </template>
    <template v-else-if="name === 'puppet'">
      <path d="M12 1.5 v4 M7.5 1.5 l2.7 4 M16.5 1.5 l-2.7 4" />
      <circle cx="12" cy="9.5" r="4" />
      <path d="M8 22 c0 -4 1.7 -6.5 4 -6.5 s4 2.5 4 6.5" />
    </template>
    <template v-else-if="name === 'swap'">
      <path d="M4 8 h13 M14 4.5 l3.5 3.5 -3.5 3.5" />
      <path d="M20 16 H7 M10 12.5 l-3.5 3.5 3.5 3.5" />
    </template>
    <template v-else-if="name === 'mask'">
      <path d="M4 4.5 h16 v6.5 c0 5 -3.6 8.5 -8 8.5 s-8 -3.5 -8 -8.5 Z" />
      <path d="M7.6 9.3 c.9 -.9 2.2 -.9 3 0 M13.4 9.3 c.9 -.9 2.2 -.9 3 0" />
      <path d="M9.3 14.2 c1.6 1.3 3.8 1.3 5.4 0" />
    </template>
    <template v-else-if="name === 'lock'">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5 V7.5 a3.5 3.5 0 0 1 7 0 v3" />
      <path d="M12 14 v2.5" />
    </template>
    <template v-else-if="name === 'dream'">
      <path d="M15 14.5 A6.5 6.5 0 1 1 8.5 4 A5.2 5.2 0 0 0 15 14.5 Z" />
      <path d="M16.5 3 h4 l-4 4.5 h4" />
    </template>
    <template v-else-if="name === 'dancer'">
      <circle cx="7" cy="17.5" r="2.5" />
      <circle cx="17" cy="15.5" r="2.5" />
      <path d="M9.5 17.5 V5.5 l10 -2 v12" />
    </template>
    <template v-else-if="name === 'wand'">
      <path d="M4.5 19.5 L15 9" />
      <path d="M17.5 2.5 v3 M17.5 9.5 v2 M14 6 h-2.5 M21.5 6 H19" />
      <path d="M15 4 l1.2 1.2 M20 4 l-1.2 1.2" />
    </template>
    <template v-else-if="name === 'flag'">
      <path d="M6 21.5 V3.5" />
      <path d="M6 4 c3 -1.6 6 1.6 12 0 v9 c-6 1.6 -9 -1.6 -12 0" />
    </template>
    <template v-else-if="name === 'paw'">
      <circle cx="12" cy="15.5" r="3.4" />
      <circle cx="6.8" cy="9.8" r="1.7" />
      <circle cx="10.4" cy="7.2" r="1.7" />
      <circle cx="13.6" cy="7.2" r="1.7" />
      <circle cx="17.2" cy="9.8" r="1.7" />
    </template>
    <template v-else-if="name === 'drop'">
      <path d="M12 3 C9.2 7.8 6.5 11 6.5 14.5 a5.5 5.5 0 0 0 11 0 C17.5 11 14.8 7.8 12 3 Z" />
    </template>
    <template v-else-if="name === 'veil'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 11 h17" />
    </template>
    <template v-else-if="name === 'sword'">
      <path d="M5 19 L16 8 L20 4" />
      <path d="M13 11 l-3.2 3.2" />
      <path d="M16 4.5 l3.5 3.5" />
    </template>
    <template v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5 v2.5 M12 19 v2.5 M2.5 12 h2.5 M19 12 h2.5 M5.3 5.3 l1.8 1.8 M16.9 16.9 l1.8 1.8 M18.7 5.3 l-1.8 1.8 M7.1 16.9 l-1.8 1.8" />
    </template>
    <template v-else-if="name === 'half'">
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
    </template>
    <template v-else-if="name === 'bag'">
      <path d="M9 4 h6 v3.2 c2.4 1.6 4 4.7 4 8 a7 7 0 0 1 -14 0 c0 -3.3 1.6 -6.4 4 -8 Z" />
      <path d="M9 7.2 h6" />
    </template>
    <template v-else-if="name === 'gem'">
      <path d="M7 3 h10 l4 6 -9 12 L3 9 Z" />
      <path d="M3 9 h18 M7 3 l3 6 2 -6 2 6 3 -6" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="8" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, default: 'folk' },
  size: { type: [Number, String], default: 22 },
})
</script>
