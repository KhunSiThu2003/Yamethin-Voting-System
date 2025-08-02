

<template>
  <NavBar></NavBar>
  
  <!-- Loading State -->
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center ">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p class="text-lg text-gray-600 dark:text-gray-300">Loading election results...</p>
    </div>
  </div>

  <!-- Main Content -->
  <div v-else class="min-h-screen ">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 px-4">
      <div class="absolute inset-0"></div>
      <div class="relative max-w-6xl mx-auto text-center">
        <div class="my-8">

          <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Election Results {{ currentYear }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrating the outstanding winners from each major and the university-wide champions. 
            These exceptional students represent the best of TU Yamethin.
          </p>
        </div>
        
        <!-- Results Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Total Participants</h3>
            <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ totalParticipants }}</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Majors</h3>
            <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">4</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Winners</h3>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ totalWinners }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- University Winners Section -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            University Champions
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The top winners representing the entire university community
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ShowResults 
            :king="universityKing" 
            :queen="universityQueen"
            :title="true"
          ></ShowResults>
        </div>
      </div>
    </section>

    <!-- Major Results Sections -->
    <section class="py-16 px-4 bg-white dark:bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Major Winners
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Outstanding students from each engineering major
          </p>
        </div>

        <!-- Electronic Engineering Section -->
        <div class="mb-20">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 mb-8">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-white">Electronic Engineering</h3>
            </div>
            <p class="text-blue-100 text-lg leading-relaxed">
              These exceptional students have designed cutting-edge circuits and systems, 
              pushing the boundaries of modern technology. Their work lays the foundation 
              for the next wave of electronic innovation and sustainability.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ShowResults :king="ECKing" :queen="ECQueen"></ShowResults>
          </div>
        </div>

        <!-- Electrical Power Engineering Section -->
        <div class="mb-20">
          <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 mb-8">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-white">Electrical Power Engineering</h3>
            </div>
            <p class="text-green-100 text-lg leading-relaxed">
              Students in this field are at the forefront of creating sustainable energy solutions. 
              Their work on power systems and renewable energy sources is key to shaping a greener, 
              more efficient future.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ShowResults :king="EPKing" :queen="EPQueen"></ShowResults>
          </div>
        </div>

        <!-- Mechanical Engineering Section -->
        <div class="mb-20">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-white">Mechanical Engineering</h3>
            </div>
            <p class="text-orange-100 text-lg leading-relaxed">
              Mechanical engineers are innovators who design and build solutions that improve lives. 
              These students exemplify the core of engineering, with breakthroughs in product design, 
              robotics, and energy efficiency.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ShowResults :king="MECHKing" :queen="MECHQueen"></ShowResults>
          </div>
        </div>

        <!-- Civil Engineering Section -->
        <div class="mb-20">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 mb-8">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-white">Civil Engineering</h3>
            </div>
            <p class="text-purple-100 text-lg leading-relaxed">
              These students have shown mastery in designing infrastructure that is both durable and sustainable. 
              From bridges to smart cities, their projects represent the backbone of modern society and future development.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ShowResults :king="CKing" :queen="CQueen"></ShowResults>
          </div>
        </div>
      </div>
    </section>

   
  </div>
  
  <Footer></Footer>
</template>

<script>
import ShowResults from "../components/ShowResults";
import { ref, onMounted, computed } from "vue";
import NavBar from "@/components/NavBar.vue";
import { db } from "@/firebase/config";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    ShowResults,
    NavBar,
    Footer
  },

  setup() {
    const currentYear = new Date().getFullYear().toString();
    const isLoading = ref(true);
    const ECKing = ref(null);
    const ECQueen = ref(null);
    const EPKing = ref(null);
    const EPQueen = ref(null);
    const CKing = ref(null);
    const CQueen = ref(null);
    const MECHKing = ref(null);
    const MECHQueen = ref(null);
    const universityKing = ref(null);
    const universityQueen = ref(null);

    // Computed properties for statistics
    const totalParticipants = computed(() => {
      let count = 0;
      if (universityKing.value) count++;
      if (universityQueen.value) count++;
      if (ECKing.value) count++;
      if (ECQueen.value) count++;
      if (EPKing.value) count++;
      if (EPQueen.value) count++;
      if (CKing.value) count++;
      if (CQueen.value) count++;
      if (MECHKing.value) count++;
      if (MECHQueen.value) count++;
      return count;
    });

    const totalWinners = computed(() => {
      let count = 0;
      if (universityKing.value) count++;
      if (universityQueen.value) count++;
      if (ECKing.value) count++;
      if (ECQueen.value) count++;
      if (EPKing.value) count++;
      if (EPQueen.value) count++;
      if (CKing.value) count++;
      if (CQueen.value) count++;
      if (MECHKing.value) count++;
      if (MECHQueen.value) count++;
      return count;
    });

    function listenToResultsAndFilter() {
      try {
        const docRef = db.collection("results").doc(currentYear);

        docRef.onSnapshot((docSnap) => {
          if (docSnap.exists) {
            const results = docSnap.data();
            
            // University results
            universityKing.value = results.universityKing || null;
            universityQueen.value = results.universityQueen || null;

            // Major results
            Object.keys(results).forEach((key) => {
              if (key === "EPKing") EPKing.value = results[key];
              if (key === "EPQueen") EPQueen.value = results[key];
              if (key === "ECKing") ECKing.value = results[key];
              if (key === "ECQueen") ECQueen.value = results[key];
              if (key === "CKing") CKing.value = results[key];
              if (key === "CQueen") CQueen.value = results[key];
              if (key === "MECHKing") MECHKing.value = results[key];
              if (key === "MECHQueen") MECHQueen.value = results[key];
            });
          } else {
            console.log("No results document found");
          }
          
          // Set loading to false after data is processed
          setTimeout(() => {
            isLoading.value = false;
          }, 1000);
        });
      } catch (error) {
        console.error("Error fetching results:", error);
        isLoading.value = false;
      }
    }

    onMounted(() => {
      listenToResultsAndFilter();
    });

    return {
      currentYear,
      isLoading,
      ECKing,
      ECQueen,
      EPKing,
      EPQueen,
      CKing,
      CQueen,
      MECHKing,
      MECHQueen,
      universityKing,
      universityQueen,
      totalParticipants,
      totalWinners
    };
  },
};
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom gradient backgrounds */
.bg-gradient-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Hover effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>