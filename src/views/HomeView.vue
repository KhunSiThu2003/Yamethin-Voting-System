<template>
  <NavBar></NavBar>
  <div
    class="h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900"
  >
    <!-- Hero Section -->
    <section class="text-center mb-20">
      <h1
        class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
      >
        <span class="text-primary-600 dark:text-primary-400">TU Yamethin</span>
        Major King & Queen Elections 2024
      </h1>
      <p
        class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
      >
        Cast your vote for the most deserving candidates to represent your
        department as this year's Major King and Queen. Your voice matters in
        shaping student leadership!
      </p>

      <!-- Call to Action -->
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link
          v-if="!votingEnd"
          to="/login"
          class="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg dark:hover:bg-primary-400 transition-colors duration-300 font-semibold shadow-lg flex items-center justify-center"
        >
          Vote Now
        </router-link>
        <router-link
          to="/results"
          class="px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors duration-300 font-medium flex items-center justify-center"
        >
          View Results
        </router-link>
      </div>
    </section>
  </div>
</template>
  
  <script>
import { watch } from "vue";
import deadLine from "@/composables/deadLine";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "HomeView",
  components: {
    NavBar,
  },
  setup() {
    const {
      dayString,
      hourString,
      minString,
      secString,
      updateCountdown,
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
      isLoading,
      votingEnd,
    } = deadLine();

    updateCountdown();

    return {
      dayString,
      hourString,
      minString,
      secString,
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
      isLoading,
      votingEnd,
    };
  },
};
</script>
  
  <style scoped>
/* Animation for call-to-action buttons */
.router-link {
  transition: all 0.3s ease;
  transform: translateY(0);
}

.router-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>