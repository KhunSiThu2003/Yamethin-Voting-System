<template>
  <NavBar></NavBar>
  <div class="h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 pt-44 md:pt-16">
    <!-- Loading State -->
    <section v-if="isLoading" class="text-center mb-20">
      <p class="text-xl text-gray-600 dark:text-gray-300">Loading election information...</p>
    </section>

    <!-- Main Content -->
    <section v-else class="text-center mb-20">
      <h1 class="text-2xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        <span class="text-primary-600 dark:text-primary-400">TU Yamethin</span>
        Major King & Queen Elections
      </h1>
      
      <p class="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 text-justify">
        Cast your vote for the most deserving candidates to represent your
        department as this year's Major King and Queen. Your voice matters in
        shaping student leadership!
      </p>

      <!-- Countdown Timer -->
       <CountDown></CountDown>

      <!-- Call to Action -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-14">

        <router-link
          v-if="!votingEnd"
          to="/vote"
          class="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg dark:hover:bg-primary-400 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center"
        >
          Vote Now
        </router-link>
        <router-link
          to="/results"
          class="px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center"
        >
          View Results
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import deadLine from "@/composables/deadLine";
import NavBar from "@/components/NavBar.vue";
import CountDown from "@/components/CountDown.vue";
import { getStudentById } from "@/composables/getStudentById";

export default {
  name: "HomeView",
  components: {
    NavBar,
    CountDown,
  },
  setup() {

    const error = ref(null);
    const userId = localStorage.getItem("userId");

    // Deadline and countdown functionality
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


    return {
      dayString,
      hourString,
      minString,
      secString,
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
      votingEnd,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.countdown-container {
  margin: 1.5rem 0;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}

.countdown-value {
  color: var(--primary-600);
  font-size: 1.75rem;
  line-height: 1;
}

.countdown-label {
  color: var(--gray-500);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.dark .countdown-value {
  color: var(--primary-400);
}

.dark .countdown-label {
  color: var(--gray-400);
}

.router-link {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.router-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>