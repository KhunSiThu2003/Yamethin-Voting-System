<template>
  <NavBar></NavBar>
  <div class="text-gray-900 rounded-lg dark:text-gray-200 pt-16">
    <!-- Hero Section -->
    <section class="text-center p-3">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-blue-500 dark:text-blue-400">
          King & Queen Election Results
        </h1>
        <p class="text-sm sm:text-base md:text-xl prose text-justify text-gray-600 dark:text-gray-300">
          Join us in celebrating the winners from each major. These exceptional
          individuals have earned recognition for their leadership and
          contributions to their communities.
        </p>
      </div>
    </section>

    <!-- Major Results Sections -->
    <section id="major-results" class="p-3 md:p-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-4xl md:text-5xl mb-4 font-semibold text-center text-indigo-700 dark:text-indigo-400">
          Major Results
        </h2>

        <!-- Electronic Engineering Section -->
        <div class="mb-16">
          <h3 class="text-xl sm:text-3xl md:text-4xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
            Electronic Engineering
          </h3>
          <p class="text-sm sm:text-base md:text-xl text-gray-600 mb-6 dark:text-gray-300 prose text-justify">
            These exceptional students have designed cutting-edge circuits and
            systems, pushing the boundaries of modern technology. Their work
            lays the foundation for the next wave of electronic innovation and
            sustainability.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 md:gap-12 gap-3">
            <ShowResults :king="ECKing" :queen="ECQueen"></ShowResults>
          </div>
        </div>

        <!-- Electrical Power Engineering Section -->
        <div class="mb-16">
          <h3 class="text-xl sm:text-3xl md:text-4xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
            Electrical Power Engineering
          </h3>
          <p class="text-sm sm:text-base md:text-xl text-gray-600 mb-6 dark:text-gray-300 prose text-justify">
            Students in this field are at the forefront of creating sustainable
            energy solutions. Their work on power systems and renewable energy
            sources is key to shaping a greener, more efficient future.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 md:gap-12 gap-3">
            <ShowResults :king="EPKing" :queen="EPQueen"></ShowResults>
          </div>
        </div>

        <!-- Mechanical Engineering Section -->
        <div class="mb-16">
          <h3 class="text-xl sm:text-3xl md:text-4xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
            Mechanical Engineering
          </h3>
          <p class="text-sm sm:text-base md:text-xl text-gray-600 mb-6 dark:text-gray-300 prose text-justify">
            Mechanical engineers are innovators who design and build solutions
            that improve lives. These students exemplify the core of
            engineering, with breakthroughs in product design, robotics, and
            energy efficiency.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 md:gap-12 gap-3">
            <ShowResults :king="MECHKing" :queen="MECHQueen"></ShowResults>
          </div>
        </div>

        <!-- Civil Engineering Section -->
        <div class="">
          <h3 class="text-xl sm:text-3xl md:text-4xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
            Civil Engineering
          </h3>
          <p class="text-sm sm:text-base md:text-xl text-gray-600 mb-6 dark:text-gray-300 prose text-justify">
            These students have shown mastery in designing infrastructure that
            is both durable and sustainable. From bridges to smart cities, their
            projects represent the backbone of modern society and future
            development.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 md:gap-12 gap-3">
            <ShowResults :king="CKing" :queen="CQueen"></ShowResults>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ShowResults from "../components/ShowResults";
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
import { db } from "@/firebase/config";

export default {
  components: {
    ShowResults,
    NavBar,
  },

  setup() {
    const year = new Date().getFullYear().toString(); // Current year
    const ECKing = ref(null);
    const ECQueen = ref(null);
    const EPKing = ref(null);
    const EPQueen = ref(null);
    const CKing = ref(null);
    const CQueen = ref(null);
    const MECHKing = ref(null);
    const MECHQueen = ref(null);

    function listenToResultsAndFilter() {
      try {
        // Set up real-time listener for the 'results' collection
        const docRef = db.collection("results").doc(year);

        // Use onSnapshot to listen for real-time updates
        docRef.onSnapshot((docSnap) => {
          if (docSnap.exists) {
            const results = docSnap.data(); // All data from the document

            // Filter specific objects
            Object.keys(results).forEach((key) => {
              if (key === "EPKing") {
                EPKing.value = results[key];
              }
              if (key === "EPQueen") {
                EPQueen.value = results[key];
              }
              if (key === "ECKing") {
                ECKing.value = results[key];
              }
              if (key === "ECQueen") {
                ECQueen.value = results[key];
              }
              if (key === "CKing") {
                CKing.value = results[key];
              }
              if (key === "CQueen") {
                CQueen.value = results[key];
              }
              if (key === "MECHKing") {
                MECHKing.value = results[key];
              }
              if (key === "MECHQueen") {
                MECHQueen.value = results[key];
              }
            });
          } else {
            console.log("No such document!");
          }
        });
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    }

    // Initialize the listener when component mounts
    onMounted(() => {
      listenToResultsAndFilter();
    });

    return {
      ECKing,
      ECQueen,
      EPKing,
      EPQueen,
      CKing,
      CQueen,
      MECHKing,
      MECHQueen,
    };
  },
};
</script>

<style>
/* Add any custom styles here if needed */
</style>