<template>
  <Loading v-if="clickSubmit"></Loading>
  <SideBar></SideBar>

  <div
    class="sm:ml-64 bg-gray-100 text-gray-900 rounded-lg dark:bg-gray-900 dark:text-gray-200"
  >
    <!-- Main Content Container -->
    <div class="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <!-- Major Voting Card -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-20 transition-all duration-300 hover:shadow-lg"
      >
        <!-- Major Voting Section -->
        <CountDown :type="'major'"></CountDown>

        <h1
          class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6"
        >
          Set Major Voting End Date
        </h1>

        <!-- Success Message -->
        <div
          v-if="majorSuccess"
          class="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ majorSuccessMessage }}
        </div>

        <!-- Form Section -->
        <form
          id="majorVotingForm"
          @submit.prevent="showMajorOptionsModal = true"
        >
          <div class="mb-6">
            <label
              for="majorVotingEndDate"
              class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
            >
              Select Major Voting End Date
              <span class="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              v-model="majorEndDate"
              id="majorVotingEndDate"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              :class="{ 'border-red-500': majorErr }"
              required
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="majorErr"
            class="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ majorErr }}
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button
              type="submit"
              class="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 flex items-center"
              :disabled="clickSubmit"
              :class="{
                'opacity-75 cursor-not-allowed': clickSubmit,
                'hover:bg-indigo-600': clickSubmit,
              }"
            >
              {{ clickSubmit ? "Processing..." : "Set Major Voting Deadline" }}
            </button>
          </div>
        </form>
      </div>

      <!-- University Voting Card -->
      <div v-if="majorEnded"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-20 transition-all duration-300 hover:shadow-lg"
      >
        <!-- University Voting Section -->
        <CountDown :type="'university'"></CountDown>

        <h1
          class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6"
        >
          Set University Voting End Date
        </h1>

        <!-- Success Message -->
        <div
          v-if="universitySuccess"
          class="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ universitySuccessMessage }}
        </div>

        <!-- Form Section -->
        <form
          id="universityVotingForm"
          @submit.prevent="showUniversityOptionsModal = true"
        >
          <div class="mb-6">
            <label
              for="universityVotingEndDate"
              class="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
            >
              Select University Voting End Date
              <span class="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              v-model="universityEndDate"
              id="universityVotingEndDate"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              :class="{ 'border-red-500': universityErr }"
              required
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="universityErr"
            class="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ universityErr }}
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button
              type="submit"
              class="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 flex items-center"
              :disabled="clickSubmit"
              :class="{
                'opacity-75 cursor-not-allowed': clickSubmit,
                'hover:bg-indigo-600': clickSubmit,
              }"
            >
              {{
                clickSubmit ? "Processing..." : "Set University Voting Deadline"
              }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Major Options Modal -->
    <div
      v-if="showMajorOptionsModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Choose an option
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Do you want to update the deadline or create a new major voting
          session?
        </p>

        <div class="flex flex-col space-y-3">
          <button
            @click="setMajorEndDate(false)"
            class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
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
            class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-150 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
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
            class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- University Options Modal -->
    <div
      v-if="showUniversityOptionsModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Choose an option
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Do you want to update the deadline or create a new university voting
          session?
        </p>

        <div class="flex flex-col space-y-3">
          <button
            @click="setUniversityEndDate(false)"
            class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
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
            @click="setUniversityEndDate(true)"
            class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-150 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Create New University Voting (Delete All Data)
          </button>

          <button
            @click="showUniversityOptionsModal = false"
            class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
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

    console.log(majorEnded)

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

          // Delete major candidates
          const candidatesSnapshot = await db
            .collection("candidates")
            .where("type", "==", "major")
            .get();
          const candidatesBatch = db.batch();
          candidatesSnapshot.forEach((doc) => {
            candidatesBatch.delete(doc.ref);
          });
          await candidatesBatch.commit();

          // Delete major results
          const resultsDoc = await db
            .collection("results")
            .doc(`${currentYear}_major`)
            .get();
          if (resultsDoc.exists) {
            await db.collection("results").doc(`${currentYear}_major`).delete();
          }

          // Delete major votes
          const voteCollections = ["voteMajorKing", "voteMajorQueen"];
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
/* Smooth transitions for dark mode */
.bg-white {
  transition: background-color 0.3s ease;
}
.dark\:bg-gray-800 {
  transition: background-color 0.3s ease;
}
</style>