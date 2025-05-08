<template>
  <div>
    <!-- Page Content -->
    <main class="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const mobileMenuOpen = ref(false);
const theme = ref( localStorage.getItem("theme") || "light");

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleToggleTheme = () => {
  localStorage.setItem("theme", theme.value);
  document.documentElement.classList.toggle("dark", theme.value === "dark");
};

handleToggleTheme();
</script>
