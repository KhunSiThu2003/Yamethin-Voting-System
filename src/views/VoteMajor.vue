<template>
    <Loading v-if="loading"></Loading>
    <NavBar></NavBar>
  
    <div
      v-if="currentUser"
      class="bg-gray-100 pt-16 pb-3 text-center  flex flex-col justify-center items-center text-gray-900 rounded-lg dark:bg-gray-900 dark:text-gray-200"
    >
      <div>
        <div class="md:w-40 w-20 mx-auto overflow-hidden object-cover">
          <img
            v-if="currentUser.major === 'Electronic Engineering'"
            src="@/Images/EC.png"
            alt="Electronic Engineering"
          />
          <img
            v-if="currentUser.major === 'Electrical Power Engineering'"
            src="@/Images/EP.png"
            alt="Electrical Power Engineering"
          />
          <img
            v-if="currentUser.major === 'Mechanical Engineering'"
            src="@/Images/CE.png"
            alt="Mechanical Engineering"
          />
          <img
            v-if="currentUser.major === 'Civil Engineering'"
            src="@/Images/ME.png"
            alt="Civil Engineering"
          />
        </div>
        <h1 class="text-blue-500 text-2xl font-bold mb-4 dark:text-blue-400">
          {{ currentUser.major }}
        </h1>
      </div>
      <div v-if="!votingEnd" class="p-2 border rounded border-gray-300 dark:border-gray-700">
        <h1
          class="text-sm mb-2 opacity-50 dark:text-gray-300 text-center"
        >
          Voting Ends In
        </h1>
        <div
          class="flex justify-center gap-4 text-sm sm:text-sm md:text-base items-center"
        >
          <div class="flex flex-col items-center text-yellow-300">
            <span id="days" class="text-sm font-bold">{{
              dayString
            }}</span>
            <span class="text-xs">Days</span>
          </div>
          <div class="flex flex-col items-center text-blue-500">
            <span id="hours" class="text-sm font-bold">{{
              hourString
            }}</span>
            <span class="text-xs">Hours</span>
          </div>
          <div class="flex flex-col items-center text-green-400">
            <span
              id="minutes"
              class="text-sm font-bold"
              >{{ minString }}</span
            >
            <span class="text-xs">Minutes</span>
          </div>
          <div class="flex flex-col items-center text-red-600">
            <span
              id="seconds"
              class="text-sm font-bold"
              >{{ secString }}</span
            >
            <span class="text-xs">Seconds</span>
          </div>
        </div>
      </div>
      <div
        class="flex w-full md:w-1/2 mx-auto justify-evenly items-center md:space-x-8 pt-14"
      >
        <!-- King Card -->
        <div
          class="p-5 w-36 md:w-1/3 rounded-lg shadow-xl bg-white dark:bg-gray-800 dark:text-gray-200"
        >
          <img
            src="https://cdn-icons-png.freepik.com/512/9321/9321521.png"
            alt="University King"
            class="w-32  border border-blue-400 mx-auto rounded-full mb-6 shadow-md transition-all duration-300 hover:scale-110 bg-gray-50 dark:bg-gray-700"
          />
          <router-link :to="{ name: 'candidate', params: { id: 'male' } }">
            <button 
              class="md:w-32 w-20 text-xs sm:text-sm md:text-base font-bold hover:text-white border rounded-lg py-2 transition text-blue-400 hover:bg-blue-400 border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-transparent dark:hover:bg-blue-400"
              @click.prevent="checkVotingStatus('male')"
            >
              Vote King
            </button>
          </router-link>
        </div>
  
        <!-- Queen Card -->
        <div
          class="p-5 w-36 md:w-1/3 rounded-lg shadow-xl bg-white dark:bg-gray-800 dark:text-gray-200"
        >
  
          <img
            src="https://cdn-icons-png.freepik.com/512/9321/9321521.png"
            alt="University Queen"
            class="w-32 mx-auto border border-pink-400 rounded-full mb-6 shadow-md transition-all duration-300 hover:scale-110 bg-gray-50 dark:bg-gray-700"
          />
          <router-link :to="{ name: 'candidate', params: { id: 'female' } }">
            <button 
              class="md:w-32 w-20 text-xs sm:text-sm md:text-base font-bold hover:text-white border rounded-lg py-2 transition text-pink-400 hover:bg-pink-400 border-pink-400 bg-pink-50 dark:border-pink-500 dark:bg-transparent dark:hover:bg-pink-400"
              @click.prevent="checkVotingStatus('female')"
            >
              Vote Queen
            </button>
          </router-link>
        </div>
      </div>
  
    </div>
  
    <!-- Policy Modal -->
    <div
      v-if="showPolicyModal && !accept"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 bg-blur"
    >
      <div
        class="relative bg-white dark:bg-gray-800 backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-12 w-full sm:w-3/4 lg:w-1/3 text-center border border-gray-300 dark:border-gray-700"
      >
        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl font-extrabold dark:text-white">
          Voting Policy
        </h1>
  
        <p class="text-gray-500 dark:text-gray-300 text-sm sm:text-lg mt-4">
          Please review and accept the rules before voting.
        </p>
  
        <div
          class="mt-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg max-h-60 overflow-y-auto"
        >
          <p>• One vote per person. Multiple votes are not allowed.</p>
          <p>• Votes are final. Once submitted, they cannot be changed.</p>
          <p>• Any attempt to cheat will result in disqualification.</p>
          <p>• Voting is open to registered users only.</p>
          <p>• The system records your vote anonymously for fairness.</p>
          <p>• If any fraudulent activity is detected, your vote will be void.</p>
          <p>
            • The voting results will be verified before the final announcement.
          </p>
        </div>
  
        <!-- Policy Page Link -->
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Read the full policy
          <router-link
            to="/policies"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            here </router-link
          >.
        </p>
  
        <!-- Action Buttons -->
        <div class="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            @click="acceptPolicy"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </template>
      
  <script>
  import NavBar from "@/components/NavBar.vue";
  import Loading from "@/components/Loading.vue";
  import { ref, onMounted } from "vue";
  import deadLine from "@/composables/deadLine";
  import getUserById from "@/composables/getUserById";
  import router from "@/router";
  import Swal from "sweetalert2";
  
  export default {
    components: {
      NavBar,
      Loading,
    },
    setup() {
      const userId = localStorage.getItem("userId");
      const loading = ref(true);
      const showPolicyModal = ref(true);
      const accept = ref(localStorage.getItem("accept"));
      const currentUser = ref(null);
      const votingEnded = ref(false);
  
      // Deadline
      const { dayString, hourString, minString, secString, updateCountdown, votingEnd } =
        deadLine("major");
  
      const acceptPolicy = () => {
        localStorage.setItem("accept", true);
        accept.value = true;
        showPolicyModal.value = false;
      };
  
      const checkVotingStatus = (gender) => {
        if (votingEnd.value) {
          showVotingEndedAlert();
        } else {
          router.push({ name: 'candidate', params: { id: gender } });
        }
      };
  
      const showVotingEndedAlert = () => {
        Swal.fire({
          title: 'Voting Has Ended!',
          html: `
            <div class="text-center">
  
              </div>
              <p class="text-gray-600 dark:text-gray-300">The voting period has officially ended.</p>
              <p class="text-gray-600 dark:text-gray-300 mt-2">You can now view the results.</p>
            </div>
          `,
          icon: 'info',
          confirmButtonText: 'View Results',
          confirmButtonColor: '#3b82f6',
          showCancelButton: true,
          cancelButtonText: 'Close',
          background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
          color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#111827',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push({ name: 'results' });
          }
        });
      };
  
      // Load user data
      onMounted(async () => {
        updateCountdown();
  
        if (userId) {
          try {
            const { userData, load } = getUserById(userId);
            await load();
            if (userData.value && userData.value.status === "active") {
              currentUser.value = userData.value;
              loading.value = false;
            } else {
              router.push("/role");
              loading.value = false;
            }
          } catch (error) {
            console.error("Error loading user data:", error);
          }
        } else {
          router.push("/role");
          loading.value = false;
        }
  
        // Check if voting has ended on mount
        if (votingEnd.value) {
          showVotingEndedAlert();
        }
      });
  
      return {
        loading,
        currentUser,
        dayString,
        hourString,
        minString,
        secString,
        showPolicyModal,
        acceptPolicy,
        accept,
        checkVotingStatus,
        votingEnd
      };
    },
  };
  </script>
      
  <style></style>