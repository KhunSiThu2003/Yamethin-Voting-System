<template>
  <Loading v-if="clickSubmit" />
  <SideBar></SideBar>

  <div class="sm:ml-64 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
    <!-- Enhanced Header -->
    <div class="relative overflow-hidden bg-white dark:bg-gray-700 rounded-b-[3rem] shadow-2xl mb-8">

      
      <div class="relative z-10 px-8 py-12">  
        <div class="flex items-center gap-6">
          <div class="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-xl border border-white/30">
            <i class="fas fa-calendar-alt fa-3x text-black dark:text-white"></i>
          </div>
          <div>
            <h1 class="text-4xl font-bold text-black dark:text-white mb-2 tracking-tight">Voting Deadlines</h1>
            <p class="text-lg text-gray-700 dark:text-gray-300 font-medium">Set and manage voting end dates</p>
            <div class="flex items-center gap-4 mt-3">
              <div class="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-full px-4 py-2">
                <i class="fas fa-clock text-black dark:text-white"></i>
                <span class="text-sm text-black dark:text-white font-medium">Deadline Management</span>
              </div>
              <div class="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-full px-4 py-2">
                <i class="fas fa-shield-alt text-black dark:text-white"></i>
                <span class="text-sm text-black dark:text-white font-medium">Admin Control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <!-- Enhanced Major Voting Card -->
      <div class="bg-white dark:bg-gray-700 backdrop-blur-sm rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl border border-white/20 dark:border-gray-700/50">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Major Voting Deadline</h2>
          </div>
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            <i class="fas fa-crown mr-2"></i>
            Major Elections
          </div>
        </div>
        
        <CountDown :type="'major'" />
        
        <!-- Enhanced Success Message -->
        <div v-if="majorSuccess" class="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center">
          <div class="bg-green-500 rounded-full p-2 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-green-800 dark:text-green-200">Success!</h3>
            <p class="text-sm text-green-700 dark:text-green-300">{{ majorSuccessMessage }}</p>
          </div>
        </div>
        
        <form id="majorVotingForm" @submit.prevent="showMajorOptionsModal = true" class="space-y-6">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800/30">
            <label for="majorVotingEndDate" class="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-3">
              <i class="fas fa-calendar-plus mr-2 text-blue-500"></i>
              Select Major Voting End Date <span class="text-red-500">*</span>
            </label>
            <input 
              type="datetime-local" 
              v-model="majorEndDate" 
              id="majorVotingEndDate"
              class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white dark:bg-gray-800 shadow-sm"
              :class="{ 'border-red-500 ring-red-500': majorErr }" 
              required 
            />
          </div>
          
          <div v-if="majorErr" class="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center">
            <div class="bg-red-500 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-red-800 dark:text-red-200">Error</h3>
              <p class="text-sm text-red-700 dark:text-red-300">{{ majorErr }}</p>
            </div>
          </div>
          
          <div class="flex justify-center">
            <button 
              type="submit"
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              :disabled="clickSubmit"
              :class="{ 'opacity-75 cursor-not-allowed transform-none': clickSubmit }"
            >
              <i class="fas fa-save"></i>
              {{ clickSubmit ? 'Processing...' : 'Set Major Voting Deadline' }}
            </button>
          </div>
        </form>
      </div>
      
      <!-- Enhanced University Voting Card -->
      <div v-if="majorEnded" class="bg-white dark:bg-gray-700 backdrop-blur-sm rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl border border-white/20 dark:border-gray-700/50">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">University Voting Deadline</h2>
          </div>
          <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            <i class="fas fa-university mr-2"></i>
            University Elections
          </div>
        </div>
        
        <CountDown :type="'university'" />
        
        <div v-if="universitySuccess" class="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center">
          <div class="bg-green-500 rounded-full p-2 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-green-800 dark:text-green-200">Success!</h3>
            <p class="text-sm text-green-700 dark:text-green-300">{{ universitySuccessMessage }}</p>
          </div>
        </div>
        
        <form id="universityVotingForm" @submit.prevent="showUniversityOptionsModal = true" class="space-y-6">
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800/30">
            <label for="universityVotingEndDate" class="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-3">
              <i class="fas fa-calendar-plus mr-2 text-green-500"></i>
              Select University Voting End Date <span class="text-red-500">*</span>
            </label>
            <input 
              type="datetime-local" 
              v-model="universityEndDate" 
              id="universityVotingEndDate"
              class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white dark:bg-gray-800 shadow-sm"
              :class="{ 'border-red-500 ring-red-500': universityErr }" 
              required 
            />
          </div>
          
          <div v-if="universityErr" class="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center">
            <div class="bg-red-500 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-red-800 dark:text-red-200">Error</h3>
              <p class="text-sm text-red-700 dark:text-red-300">{{ universityErr }}</p>
            </div>
          </div>
          
          <div class="flex justify-center">
            <button 
              type="submit"
              class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              :disabled="clickSubmit"
              :class="{ 'opacity-75 cursor-not-allowed transform-none': clickSubmit }"
            >
              <i class="fas fa-save"></i>
              {{ clickSubmit ? 'Processing...' : 'Set University Voting Deadline' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Enhanced Major Options Modal -->
    <div
      v-if="showMajorOptionsModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 dark:border-gray-700/50"
      >
        <div class="text-center mb-6">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4 w-fit mx-auto mb-4">
            <i class="fas fa-cog fa-2x text-white"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Choose an option
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Do you want to update the deadline or create a new major voting session?
          </p>
        </div>

        <div class="space-y-4">
          <button
            @click="setMajorEndDate(false)"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
            Just Update Deadline
          </button>

          <button
            @click="setMajorEndDate(true)"
            class="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Create New Major Voting (Delete All Data)
          </button>

          <button
            @click="showMajorOptionsModal = false"
            class="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-4 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced University Options Modal -->
    <div
      v-if="showUniversityOptionsModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 dark:border-gray-700/50"
      >
        <div class="text-center mb-6">
          <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-fit mx-auto mb-4">
            <i class="fas fa-cog fa-2x text-white"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Choose an option
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Do you want to update the deadline or create a new university voting session?
          </p>
        </div>

        <div class="space-y-4">
          <button
            @click="setUniversityEndDate(false)"
            class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
            Just Update Deadline
          </button>

          <button
            @click="showUniversityOptionsModal = false"
            class="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-4 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../adminComponents/Loading";
import SideBar from "../adminComponents/SideBar";
import CountDown from "../adminComponents/CountDown";
import { ref } from "vue";
import { db } from "@/firebase/config";

export default {
  name: "HomeView",
  components: {
    Loading,
    CountDown,
    SideBar,
  },

  setup() {
    // Major voting state
    const majorEndDate = ref(null);
    const majorErr = ref("");
    const majorSuccess = ref(false);
    const majorSuccessMessage = ref("");
    const showMajorOptionsModal = ref(false);

    // University voting state
    const universityEndDate = ref(null);
    const universityErr = ref("");
    const universitySuccess = ref(false);
    const universitySuccessMessage = ref("");
    const showUniversityOptionsModal = ref(false);

    const clickSubmit = ref(false);

    const majorEnded = ref(false);

    majorEnded.value = localStorage.getItem("majorEnded");

    const setMajorEndDate = async (resetVoting) => {
      showMajorOptionsModal.value = false;
      majorErr.value = "";
      majorSuccess.value = false;

      if (!majorEndDate.value) {
        majorErr.value = "Please select a voting end date.";
        return;
      }

      const selectedDate = new Date(majorEndDate.value);
      const now = new Date();

      if (selectedDate <= now) {
        majorErr.value = "The voting end date must be in the future.";
        return;
      }

      clickSubmit.value = true;

      try {
        // Update the major deadline
        await db.collection("admin").doc("majorDeadline").set({
          deadline: majorEndDate.value,
        });

        if (resetVoting) {
          // Delete all major candidates and results if creating new voting
          const currentYear = new Date().getFullYear().toString();

          // Delete all candidates
          const candidatesSnapshot = await db.collection("candidates").get();
          const batch = db.batch();
          candidatesSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          await batch.commit();

          // Delete all major results
          const resultsDoc = await db
            .collection("results")
            .doc(`${currentYear}_major`)
            .get();
          if (resultsDoc.exists) {
            await db.collection("results").doc(`${currentYear}_major`).delete();
          }

          
          const voteCollections = ["results","voteMajorKing", "voteMajorQueen", "voteUniversityKing", "voteUniversityQueen"];
          for (const collection of voteCollections) {
            const votesSnapshot = await db.collection(collection).get();
            const votesBatch = db.batch();
            votesSnapshot.forEach((doc) => {
              votesBatch.delete(doc.ref);
            });
            await votesBatch.commit();
          }

          majorSuccessMessage.value =
            "New major voting session created successfully! All major candidates, votes, and results have been reset.";
        } else {
          majorSuccessMessage.value =
            "Major voting deadline updated successfully!";
        }

        window.location.reload();
        majorSuccess.value = true;
        majorEndDate.value = null;
      } catch (error) {
        majorErr.value =
          error.message || "Failed to update major voting. Please try again.";
      } finally {
        clickSubmit.value = false;
      }
    };

    const setUniversityEndDate = async (resetVoting) => {
      showUniversityOptionsModal.value = false;
      universityErr.value = "";
      universitySuccess.value = false;

      if (!universityEndDate.value) {
        universityErr.value = "Please select a voting end date.";
        return;
      }

      const selectedDate = new Date(universityEndDate.value);
      const now = new Date();

      if (selectedDate <= now) {
        universityErr.value = "The voting end date must be in the future.";
        return;
      }

      clickSubmit.value = true;

      try {
        // Update the university deadline
        await db.collection("admin").doc("universityDeadline").set({
          deadline: universityEndDate.value,
        });

        if (resetVoting) {
          // Delete all university candidates and results if creating new voting
          const currentYear = new Date().getFullYear().toString();

          // Delete university candidates
          const candidatesSnapshot = await db
            .collection("candidates")
            .where("type", "==", "university")
            .get();
          const candidatesBatch = db.batch();
          candidatesSnapshot.forEach((doc) => {
            candidatesBatch.delete(doc.ref);
          });
          await candidatesBatch.commit();

          // Delete university results
          const resultsDoc = await db
            .collection("results")
            .doc(`${currentYear}_university`)
            .get();
          if (resultsDoc.exists) {
            await db
              .collection("results")
              .doc(`${currentYear}_university`)
              .delete();
          }

          // Delete university votes
          const voteCollections = ["voteUniversityKing", "voteUniversityQueen"];
          for (const collection of voteCollections) {
            const votesSnapshot = await db.collection(collection).get();
            const votesBatch = db.batch();
            votesSnapshot.forEach((doc) => {
              votesBatch.delete(doc.ref);
            });
            await votesBatch.commit();
          }

          universitySuccessMessage.value =
            "New university voting session created successfully! All university candidates, votes, and results have been reset.";
        } else {
          universitySuccessMessage.value =
            "University voting deadline updated successfully!";
        }
        window.location.reload();
        universitySuccess.value = true;
        universityEndDate.value = null;
      } catch (error) {
        universityErr.value =
          error.message ||
          "Failed to update university voting. Please try again.";
      } finally {
        clickSubmit.value = false;
      }
    };

    return {
      // Major voting
      majorEndDate,
      majorErr,
      majorSuccess,
      majorSuccessMessage,
      showMajorOptionsModal,
      setMajorEndDate,
      majorEnded,

      // University voting
      universityEndDate,
      universityErr,
      universitySuccess,
      universitySuccessMessage,
      showUniversityOptionsModal,
      setUniversityEndDate,

      // Common
      clickSubmit,
    };
  },
};
</script>

<style scoped>
/* Enhanced animations and transitions */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
  animation-delay: 1s;
}

.delay-2000 {
  animation-delay: 2s;
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Enhanced shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions for all elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Hover effects for interactive elements */
.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

/* Gradient backgrounds */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Enhanced focus states */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Responsive design improvements */
@media (max-width: 640px) {
  .sm\:ml-64 {
    margin-left: 0;
  }
  
  .text-4xl {
    font-size: 2rem;
    line-height: 2.5rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  
  .max-w-4xl {
    max-width: 100%;
  }
}

/* Dark mode enhancements */
.dark .bg-white\/80 {
  background-color: rgba(31, 41, 55, 0.8);
}

.dark .border-white\/20 {
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .border-gray-700\/50 {
  border-color: rgba(55, 65, 81, 0.5);
}

/* Modal enhancements */
.modal-backdrop {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Form input enhancements */
input[type="datetime-local"] {
  font-family: inherit;
  font-size: inherit;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}

.dark input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

/* Button enhancements */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-danger {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Card hover effects */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Success and error message animations */
.message-enter {
  animation: slideInUp 0.5s ease-out;
}

.message-exit {
  animation: fadeOut 0.3s ease-in;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Enhanced border radius */
.rounded-\[3rem\] {
  border-radius: 3rem;
}

.rounded-3xl {
  border-radius: 1.5rem;
}

/* Glass morphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass-effect {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Icon animations */
.icon-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Progress bar animations */
.progress-bar {
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced typography */
.font-bold {
  font-weight: 700;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>