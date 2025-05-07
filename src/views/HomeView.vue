<template>
  <NavBar :userData="userData"></NavBar>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
    <!-- Loading State -->
    <section v-if="isLoading" class="flex flex-col items-center justify-center h-[60vh]">
      <div class="animate-pulse flex flex-col items-center">
        <div class="h-12 w-12 bg-primary-500 rounded-full mb-4"></div>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Loading election information...
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section v-else class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
            TU Yamethin
          </span>
          <br>King & Queen Elections
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The official voting platform for TU Yamethin's King & Queen elections 2024.
          <span class="block mt-2 text-primary-500 dark:text-primary-400 font-medium">
            Make your voice heard!
          </span>
        </p>
      </div>

      <!-- Call to Action -->
      <div class="flex flex-col sm:flex-row justify-center gap-6 mt-8">
        <router-link
          v-if="!votingEnd"
          to="/vote"
          class="relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center transition-all duration-300 group overflow-hidden"
        >
          <span class="relative z-10 flex items-center">
            Vote Now
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
            </svg>
          </span>
          <span class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </router-link>

        <router-link
          to="/results"
          class="relative px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-800 font-medium flex items-center justify-center transition-all duration-300 group overflow-hidden"
        >
          <span class="relative z-10 flex items-center">
            View Results
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </span>
          <span class="absolute inset-0 bg-primary-50 dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </router-link>
      </div>

      <!-- Additional Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-primary-500">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-primary-100 dark:bg-gray-700 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Secure Voting</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">Your vote is encrypted and anonymous. We ensure the integrity of the election process.</p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-primary-500">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-primary-100 dark:bg-gray-700 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Real-time Results</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">See the election results as they come in after the voting period ends.</p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-primary-500">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-primary-100 dark:bg-gray-700 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Campus Democracy</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">Participate in shaping your campus community by voting for your representatives.</p>
        </div>
      </div>
    </section>
  </div>
  <Footer></Footer>
</template>

<script>
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import deadLine from "@/composables/deadLine";

export default {
  name: "HomeView",
  components: {
    NavBar,
    Footer,
  },
  setup() {
    const isLoading = ref(false);
    const error = ref(null);

    const userData = ref(null);
    userData.value = JSON.parse(localStorage.getItem("userData"));

    onMounted(() => {
      userData.value = JSON.parse(localStorage.getItem("userData"));
    });

    let {
      votingEnd,
    } = deadLine("university");

    return {
      isLoading,
      error,
      votingEnd,
      userData,
    };
  },
};
</script>

<style scoped>
.router-link {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.router-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>