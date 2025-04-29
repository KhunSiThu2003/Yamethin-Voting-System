<template>
  <div :class="theme === 'dark' ? 'dark' : ''">
    <!-- Page Content -->
    <main class="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <router-view />
    </main>
    <!-- Theme toggle button using SVG -->
    <button
      @click="handleToggleTheme"
      class="p-2 rounded-full absolute right-3 bottom-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-all duration-300"
    >
      <svg
        v-if="theme === 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12h1m15.364 4.95l.707.707M4.222 5.636l.707.707m0 11.314l.707-.707m15.364-15.364l.707-.707M12 5a7 7 0 000 14 7 7 0 000-14z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// Theme state
const theme = ref("light");
const mobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Toggle theme
const handleToggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme.value);
};

// Load theme on mounted
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.value = savedTheme;
  } else {
    theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
});
</script>
