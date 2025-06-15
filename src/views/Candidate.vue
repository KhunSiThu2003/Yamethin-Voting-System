<template>
  <div v-if="userData" class="relative text-gray-900 rounded-lg">
    <!-- Hero Section -->
    <section class="text-center relative bg-cover bg-center pb-10 mx-auto">
      <div
        class="flex w-full sticky top-0 left-0 z-40 flex-row justify-between items-center mb-5 bg-white dark:bg-gray-800 p-5 border-b border-gray-100 dark:border-gray-900"
      >
        <!-- Back Button -->
        <button
          @click="goBack"
          class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm flex items-center transition-all duration-300"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Back
        </button>

        <div
          class="w-3/4 md:w-1/4 flex items-center dark:text-gray-100 space-x-3 text-sm opacity-30 md:text-xl"
        >
          <label for="searchInput">Search</label
          ><input
            v-model="searchValue"
            id="searchInput"
            placeholder="Enter Name or Candidate Number"
            class="px-4 py-2 border w-full border-gray-300 rounded-lg max-w-md mx-auto text-xs md:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div class="max-w-8xl mx-auto md:px-10">
        <div
          class="h3 flex justify-center items-center my-10"
          :class="king_queen === 'KING' ? 'text-blue-400' : 'text-pink-400'"
        >
          <h3 class="text-xl md:text-4xl sm:text-4xl font-bold mr-5">
            Candidates For {{ king_queen }}
          </h3>
          <i class="fas fa-crown cursor-pointer text-3xl" id="kingIcon"></i>
        </div>

        <!-- Loading -->

        <div
          v-if="loading"
          class="flex items-center justify-center w-full py-20"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <!-- No results found message -->
        <div
          v-else-if="!loading && filterCandidates.length === 0"
          class="w-full flex justify-center"
        >
          <div
            class="text-center p-6 bg-red-100 border border-red-300 rounded-lg mt-6"
          >
            <p class="text-lg font-semibold text-red-600">
              Sorry, no candidates match your search criteria.
            </p>
            <p class="text-sm text-red-500 mb-4">
              Please try adjusting your search terms or filters to find the
              candidates you're looking for. If you need assistance, feel free
              to reach out to the student council.
            </p>
            <button
              @click="resetFilters"
              class="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Contestants Grid for King -->
        <div
          v-else
          id="filter_king"
          class="grid grid-cols-1 gap-3 md:gap-16 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 p-2 md:p-5 md:border dark:border-gray-700 rounded-lg"
        >
          <div v-if="error">
            <p class="text-red-500">{{ error }}</p>
          </div>

          <!-- Candidate Card -->
          <div
            v-for="candidate in filterCandidates"
            :key="candidate.rollno"
            class="p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border dark:border-gray-700 transform hover:-translate-y-1"
            :class="
              candidate.rollno === userData.voteMajorKing
                ? 'bg-blue'
                : candidate.rollno === userData.voteMajorQueen
                ? 'bg-pink'
                : 'bg-white dark:bg-gray-800'
            "
          >
            <div class="relative flex flex-col items-center">
              <div
                class="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-lg border-2"
                :class="
                  candidate.gender === 'male'
                    ? 'border-blue-500'
                    : 'border-pink-400'
                "
              >
                <img
                  :src="candidate.profileImage"
                  alt="Candidate Name"
                  class="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div
                class="absolute left-4 -bottom-4 md:-bottom-6 items-center text-sm"
              >
                <span
                  class="md:w-16 md:h-16 w-10 h-10 md:text-3xl text-lg font-bold text-white flex items-center justify-center rounded-full shadow-lg"
                  :class="
                    candidate.gender === 'male' ? 'bg-blue-500' : 'bg-pink-400'
                  "
                >
                  {{ candidate.number }}
                </span>
              </div>
            </div>
            <h2
              class="text-lg md:text-2xl font-bold text-blue-800 dark:text-white mt-8 mb-3 text-center"
            >
              {{ candidate.name }}
            </h2>

            <button
              @click="openModal(candidate)"
              class="mt-4 md:mt-6 w-full text-sm md:text-base font-bold hover:text-white border-2 rounded-lg md:py-2.5 py-2 transition-all duration-300"
              :class="[
                candidate.gender === 'male'
                  ? 'text-blue-400 hover:bg-blue-400 border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-transparent dark:hover:bg-blue-400'
                  : 'text-pink-400 hover:bg-pink-400 border-pink-400 bg-pink-50 dark:border-pink-500 dark:bg-transparent dark:hover:bg-pink-400',
              ]"
            >
              <span v-if="clickId != candidate.rollno">Vote Now</span>
              <div v-else role="status" class="flex justify-center">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>

  <Loading v-else></Loading>
</template>
    
    <script>
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import { ref, computed, onMounted } from "vue";
import getUserData from "@/composables/getUserData";
import getAllCandidates from "@/composables/getAllCandidates";
import checkVote from "@/composables/checkVote";
import addVoter from "@/composables/addVoter";
import deadLine from "@/composables/deadLine";
import { db } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  components: {
    Loading,
    NavBar,
  },
  props: ["id"],
  setup(props) {
    // State and references
    const userId = localStorage.getItem("userId");
    const searchValue = ref("");
    const select = ref(props.id);
    const king_queen = ref("KING");
    const loading = ref(true);
    const clickId = ref(null);

    let router = useRouter();

    const goBack = () => {
      router.back();
    };

    // User Data
    const { userData, load: loadUserData } = getUserData();
    const isLoading = ref(true);

    // Candidates
    const { candidates, error, loadCan } = getAllCandidates();

    // Deadline
    const {
      dayString,
      hourString,
      minString,
      secString,
      updateCountdown,
      votingEnd,
    } = deadLine("major");
    updateCountdown();

    king_queen.value = select.value === "male" ? "KING" : "QUEEN";

    const filterCandidates = computed(() => {
      const search = searchValue.value.toLowerCase();
      return candidates.value.filter((candidate) => {
        const matchesSearch =
          candidate.name.toLowerCase().includes(search) ||
          candidate.number.toString().includes(search);
        return (
          candidate.gender === select.value &&
          candidate.major === userData.value.major &&
          matchesSearch
        );
      });
    });

    const openModal = async (candidate) => {
      const voterId = userData.value.id;
      const collectionName =
        candidate.gender === "male" ? "voteMajorKing" : "voteMajorQueen";

      try {
        if (votingEnd.value) {
          showVotingEndAlert();
        } else {
          const { hasVoted } = await checkVote(collectionName, voterId);

          if (hasVoted) {
            showCannotVoteAlert();
          } else {
            showConfirmationAlert(candidate);
          }
        }
      } catch (err) {
        console.error("Error checking vote:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while checking your vote status.",
          confirmButtonColor: "#3085d6",
        });
      } finally {
        clickId.value = null;
      }
    };

    const showConfirmationAlert = (candidate) => {
      Swal.fire({
        html: `
                        <div class="text-center">
                            <img src="${candidate.profileImage}" 
                                 class="w-32 h-32 mx-auto rounded-full object-cover border-4 ${
                                   candidate.gender === "male"
                                     ? "border-blue-400"
                                     : "border-pink-400"
                                 }" 
                                 alt="${candidate.name}">
                            <h3 class="text-xl font-bold mt-4">${
                              candidate.name
                            }</h3>
                            <p class="text-gray-600 mt-2 text-sm md:text-base">Every vote matters. Make sure your choice is final!</p>
                        </div>
                    `,
        showCancelButton: true,
        confirmButtonText: "Confirm Vote",
        cancelButtonText: "Cancel",
        confirmButtonColor: candidate.gender === "male" ? "#3b82f6" : "#ec4899",
        cancelButtonColor: "#6b7280",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#111827",
        backdrop: `
                        rgba(0,0,0,0.5)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                    `,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            clickId.value = candidate.rollno;
            await confirmVote(candidate);
            return true;
          } catch (error) {
            Swal.showValidationMessage(`Vote failed: ${error}`);
            return false;
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          showSuccessAlert(candidate);
        }
      });
    };

    const showSuccessAlert = (candidate) => {
      Swal.fire({
        html: `
                        <div class="text-center">
                            <div class="flex justify-center">
                                <svg class="w-24 h-24 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold mt-4">Thank you for voting!</h3>
                            <p class="text-gray-600 mt-2">Your vote for <span class="font-semibold">${candidate.name}</span> has been recorded.</p>
                        </div>
                    `,
        confirmButtonText: "Close",
        confirmButtonColor: "#10b981",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#111827",
        timer: 8000,
        timerProgressBar: true,
      });
    };

    const showCannotVoteAlert = () => {
      Swal.fire({
        icon: "error",
        title: "Cannot Vote",
        html: `
                        <div class="text-center">
                            <p>You have already voted for a ${king_queen.value.toLowerCase()}.</p>
                        </div>
                    `,
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#111827",
        timer: 8000,
        timerProgressBar: true,
      });
    };

    const showVotingEndAlert = () => {
      Swal.fire({
        title: "🚫 Voting is Closed",
        html: `
                        <div class="text-center">
                            <p class="text-gray-600 mb-4">Sorry, the voting period has ended. Thank you for your interest!</p>
                            <p class="text-gray-600">Stay tuned for the final results.</p>
                        </div>
                    `,
        confirmButtonText: "View Results",
        confirmButtonColor: "#3b82f6",
        showCancelButton: true,
        cancelButtonText: "Close",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#111827",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({ name: "results" });
        }
      });
    };

    const confirmVote = async (selectedCandidate) => {
      const voterId = userData.value.id;
      const collectionName =
        selectedCandidate.gender === "male"
          ? "voteMajorKing"
          : "voteMajorQueen";

      try {
        const result = await addVoter(
          collectionName,
          selectedCandidate.rollno,
          voterId
        );

        if (result.success) {
          // Determine the collection based on role
          const role = localStorage.getItem("userRole");
          const table =
            role === "teacher"
              ? "teachers"
              : role === "student"
              ? "students"
              : "otherStaff";
          await db
            .collection(table)
            .doc(userData.value.id)
            .set(
              {
                [collectionName]: selectedCandidate.rollno,
              },
              {
                merge: true,
              }
            );
        } else {
          throw new Error(result.error || "Failed to confirm vote");
        }
      } catch (err) {
        console.error("Error confirming vote:", err);
        throw err;
      } finally {
        clickId.value = null;
      }
    };

    const resetFilters = () => {
      searchValue.value = "";
    };

    // Lifecycle Hooks
    onMounted(async () => {
      if (!userId) {
        console.warn("User ID not found in localStorage");
        isLoading.value = false;
        return;
      }

      try {
        await loadCan();
        await loadUserData();
        updateCountdown();
      } catch (err) {
        console.error("Initialization error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load data. Please try again later.",
          confirmButtonColor: "#3085d6",
        });
      } finally {
        isLoading.value = false;
        loading.value = false;
      }
    });

    return {
      searchValue,
      select,
      king_queen,
      loading,
      filterCandidates,
      resetFilters,
      openModal,
      userData,
      isLoading,
      goBack,
    };
  },
};
</script>
    
    <style>
.bg-blue {
  background-color: rgba(0, 0, 255, 0.084);
}

.bg-pink {
  background-color: rgba(255, 192, 203, 0.265);
}
</style>