<template>
  <NavBar :userData="userData"></NavBar>
  <div class="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col justify-center items-center">
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
        <h1 class="text-transparent font-extrabold tracking-wide py-4 text-base md:text-5xl bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
          Technological University Yamethin
        </h1>
        <h2 class="font-extrabold tracking-wide text-2xl md:text-6xl pb-4 text-gray-700 dark:text-gray-100">King & Queen Elections</h2>
        <p class="md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The official voting platform for TU Yamethin's King & Queen elections {{ currentYear }}. Participate in the democratic process and help choose your representatives.
          <br />
          <span class="block mt-2 text-primary-500 dark:text-primary-400 font-medium">
            Make your voice heard!
          </span>
        </p>
      </div>

      <!-- Enhanced Call to Action -->
      <div class="flex flex-col sm:flex-row justify-center gap-6 mt-8">
        <!-- Vote Now Button - Only show if voting hasn't ended and user is authenticated -->
        <router-link
          v-if="canVote"
          to="/vote"
          class="relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center transition-all duration-300 group overflow-hidden"
        >
          <span class="relative z-10 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
            </svg>
            Vote Now
          </span>
          <span class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </router-link>


        <!-- Voting Ended Message - Show if voting has ended -->
        <div
          v-if="!isVotingActive"
          class="relative px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All Voting Periods Have Ended
          </span>
        </div>

        <!-- Partial Voting Ended Message -->
        <div
          v-if="(votingEnd && !majorVotingEnd) || (!votingEnd && majorVotingEnd)"
          class="relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center mb-4"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span v-if="votingEnd && !majorVotingEnd">University Voting Has Ended</span>
            <span v-else-if="!votingEnd && majorVotingEnd">Major Voting Has Ended</span>
          </span>
        </div>

        <!-- View Results Button - Always show -->
        <router-link
          to="/results"
          class="relative px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-800 font-medium flex items-center justify-center transition-all duration-300 group overflow-hidden"
        >
          <span class="relative z-10 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            View Results
          </span>
          <span class="absolute inset-0 bg-primary-50 dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </router-link>
      </div>

      <!-- Countdown Timer - Show if voting hasn't ended -->
      <div v-if="isVotingActive" class="mt-8 text-center">
        <!-- University Voting Countdown -->
        <div v-if="!votingEnd" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-primary-200 dark:border-gray-700 mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">University Voting Ends In</h3>
          <div class="flex justify-center space-x-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ dayString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ hourString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ minString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ secString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
            </div>
          </div>
        </div>

        <!-- Major Voting Countdown -->
        <div v-if="!majorVotingEnd" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-primary-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Major Voting Ends In</h3>
          <div class="flex justify-center space-x-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ majorDayString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ majorHourString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ majorMinString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ majorSecString }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
            </div>
          </div>
        </div>

        <!-- Voting Status Summary -->
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <div v-if="!votingEnd && !majorVotingEnd" class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Both University and Major voting are active
          </div>
          <div v-else-if="!votingEnd" class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Only University voting is active
          </div>
          <div v-else-if="!majorVotingEnd" class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Only Major voting is active
          </div>
        </div>
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
import { ref, onMounted, computed } from "vue";
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
    const isLoading = ref(true);
    const error = ref(null);
    const currentYear = ref(null);
    const userData = ref(null);

    let {
      dayString,
      hourString,
      minString,
      secString,
      votingEnd,
    } = deadLine("university");

    // Get major deadline as well
    let {
      dayString: majorDayString,
      hourString: majorHourString,
      minString: majorMinString,
      secString: majorSecString,
      votingEnd: majorVotingEnd,
    } = deadLine("major");

    // Computed properties for better reactivity
    const isVotingActive = computed(() => !votingEnd.value || !majorVotingEnd.value);
    const isUserLoggedIn = computed(() => !!userData.value);
    const canVote = computed(() => isVotingActive.value && isUserLoggedIn.value);
    const shouldShowLogin = computed(() => isVotingActive.value && !isUserLoggedIn.value);

    onMounted(() => {
      try {
        userData.value = JSON.parse(localStorage.getItem("userData"));
        currentYear.value = new Date().getFullYear();
        
        // Debug logging
        console.log("HomeView mounted");
        console.log("User data:", userData.value);
        console.log("University voting end status:", votingEnd.value);
        console.log("Major voting end status:", majorVotingEnd.value);
        console.log("Is voting active:", isVotingActive.value);
        console.log("Can vote:", canVote.value);
        
        // Check localStorage for end dates
        const universityEndDate = localStorage.getItem("universityEndDate");
        const majorEndDate = localStorage.getItem("majorEndDate");
        console.log("University end date from localStorage:", universityEndDate);
        console.log("Major end date from localStorage:", majorEndDate);
        
        if (universityEndDate) {
          const endTime = new Date(universityEndDate);
          const now = new Date();
          const timeLeft = endTime - now;
          console.log("Time left until university voting ends:", timeLeft, "ms");
          console.log("University end time:", endTime);
          console.log("Current time:", now);
        }

        if (majorEndDate) {
          const endTime = new Date(majorEndDate);
          const now = new Date();
          const timeLeft = endTime - now;
          console.log("Time left until major voting ends:", timeLeft, "ms");
          console.log("Major end time:", endTime);
          console.log("Current time:", now);
        }
        
        // Set loading to false after a short delay to ensure data is loaded
        setTimeout(() => {
          isLoading.value = false;
        }, 1000);
      } catch (err) {
        console.error("Error loading user data:", err);
        error.value = err;
        isLoading.value = false;
      }
    });


    return {
      isLoading,
      error,
      votingEnd,
      majorVotingEnd,
      userData,
      currentYear,
      dayString,
      hourString,
      minString,
      secString,
      majorDayString,
      majorHourString,
      majorMinString,
      majorSecString,
      isVotingActive,
      isUserLoggedIn,
      canVote,
      shouldShowLogin,
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