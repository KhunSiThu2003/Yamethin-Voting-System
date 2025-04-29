<template>
  <div >
    <!-- Page Content -->
    <main class="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const mobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

</script>
