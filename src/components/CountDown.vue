<template>
  <section
    v-if="votingEnd"
    class="flex flex-row justify-center items-center p-8 md:p-12 bg-slate-100 dark:bg-gray-800 dark:text-gray-200"
  >
    <!-- Voting End Section -->
    <div class="voting-end-section text-center">
      <h1 class="text-xl sm:text-4xl font-bold text-red-500">
        Voting Period Has Ended
      </h1>
    </div>
  </section>

  <!-- Countdown Timer Section -->
  <section
    v-else
    id="countdown"
    class="text-center flex items-center justify-center"
  >
    <div v-if="isLoading" role="status" class="flex justify-center h-full">
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

    <div v-else class="countdown-container text-center space-y-8">
      <!-- Countdown Title -->
      <h1 class="font-bold dark:text-white opacity-50">Voting End In</h1>

      <!-- Circular Progress Bars -->
      <div
        class="flex justify-between md:justify-center sm:justify-center gap-10"
      >
        <!-- Days -->
        <div class="circle">
          <svg class="desktop" width="120" height="120">
            <circle class="background" cx="60" cy="60" r="50"></circle>
            <circle
              :stroke-dasharray="remainingDays * 3.14 + ',' + 314"
              id="progress-days"
              class="progress"
              cx="60"
              cy="60"
              r="50"
              stroke="#FFD700"
            ></circle>
          </svg>
          <svg class="mobile" width="40" height="40">
            <circle class="background" cx="20" cy="20" r="16"></circle>
            <circle
              :stroke-dasharray="remainingDays * 1.05 + ',' + 100.48"
              id="progress-days"
              class="progress"
              cx="20"
              cy="20"
              r="16"
              stroke="#FFD700"
            ></circle>
          </svg>
          <div class="label">
            <span id="days" class="text-2xl dark:text-gray-300">{{
              dayString
            }}</span
            ><br />
            <small class="text-gray-600 dark:text-gray-400">Day</small>
          </div>
        </div>

        <!-- Hours -->
        <div class="circle">
          <svg class="desktop" width="120" height="120">
            <circle class="background" cx="60" cy="60" r="50"></circle>
            <circle
              :stroke-dasharray="remainingHours * 3.14 + ',' + 314"
              id="progress-hours"
              class="progress"
              cx="60"
              cy="60"
              r="50"
              stroke="#1E90FF"
            ></circle>
          </svg>
          <svg class="mobile" width="40" height="40">
            <circle class="background" cx="20" cy="20" r="16"></circle>
            <circle
              :stroke-dasharray="remainingHours * 1.05 + ',' + 100.48"
              id="progress-hours"
              class="progress"
              cx="20"
              cy="20"
              r="16"
              stroke="#1E90FF"
            ></circle>
          </svg>
          <div class="label">
            <span id="hours" class="text-2xl dark:text-gray-300">{{
              hourString
            }}</span
            ><br />
            <small class="text-gray-600 dark:text-gray-400">Hrs</small>
          </div>
        </div>

        <!-- Minutes -->
        <div class="circle">
          <svg class="desktop" width="120" height="120">
            <circle class="background" cx="60" cy="60" r="50"></circle>
            <circle
              :stroke-dasharray="remainingMinutes * 3.14 + ',' + 314"
              id="progress-minutes"
              class="progress"
              cx="60"
              cy="60"
              r="50"
              stroke="#32CD32"
            ></circle>
          </svg>
          <svg class="mobile" width="40" height="40">
            <circle class="background" cx="20" cy="20" r="16"></circle>
            <circle
              :stroke-dasharray="remainingMinutes * 1.05 + ',' + 100.48"
              id="progress-minutes"
              class="progress"
              cx="20"
              cy="20"
              r="16"
              stroke="#32CD32"
            ></circle>
          </svg>
          <div class="label">
            <span id="minutes" class="text-2xl dark:text-gray-300">{{
              minString
            }}</span
            ><br />
            <small class="text-gray-600 dark:text-gray-400">Min</small>
          </div>
        </div>

        <!-- Seconds -->
        <div class="circle">
          <svg class="desktop" width="120" height="120">
            <circle class="background" cx="60" cy="60" r="50"></circle>
            <circle
              :stroke-dasharray="remainingSeconds * 3.14 + ',' + 314"
              id="progress-seconds"
              class="progress"
              cx="60"
              cy="60"
              r="50"
              stroke="#FF4500"
            ></circle>
          </svg>
          <svg class="mobile" width="40" height="40">
            <circle class="background" cx="20" cy="20" r="16"></circle>
            <circle
              :stroke-dasharray="remainingSeconds * 1.05 + ',' + 100.48"
              id="progress-seconds"
              class="progress"
              cx="20"
              cy="20"
              r="16"
              stroke="#FF4500"
            ></circle>
          </svg>
          <div class="label">
            <span id="seconds" class="text-2xl dark:text-gray-300">{{
              secString
            }}</span
            ><br />
            <small class="text-gray-600 dark:text-gray-400">Sec</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import deadLine from "@/composables/deadLine";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  setup() {
    let {
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

    const hasShownAlert = ref(false);

    const showVotingEndAlert = () => {
      if (votingEnd.value && !localStorage.getItem('hasShownVotingEndAlert')) {
        const isDarkMode = document.documentElement.classList.contains("dark");

        Swal.fire({
          title: "Voting Closed",
          text: "The voting period has officially ended. Thank you for participating!",
          icon: "info",
          background: isDarkMode ? "#1f2937" : "#ffffff",
          color: isDarkMode ? "#f3f4f6" : "#111827",
          backdrop: isDarkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.7)",
          confirmButtonText: "OK",
          customClass: {
            container: isDarkMode ? "bg-gray-800" : "bg-white",
            popup: isDarkMode ? "bg-gray-800" : "bg-white",
            title: isDarkMode ? "text-gray-100" : "text-gray-800",
            content: isDarkMode ? "text-gray-300" : "text-gray-600",
            confirmButton: isDarkMode
              ? "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              : "bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300",
          },
          buttonsStyling: false,
          confirmButtonColor: isDarkMode ? "#4f46e5" : "#6366f1",
        }).then(() => {
          hasShownAlert.value = true;
          // Alternatively, use localStorage to persist across page refreshes:
          localStorage.setItem('hasShownVotingEndAlert', 'true');
        });
      }
      
    };

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
      showVotingEndAlert,
    };
  },
  watch: {
    votingEnd(newVal) {
      if (newVal) {
        this.showVotingEndAlert();
      }
    },
  },
};
</script>
<style scoped>
#countdown {
  font-family: "Poppins", sans-serif;
}

.circle {
  position: relative;
  width: 120px;
  height: 120px;
}

.circle svg {
  transform: rotate(-90deg);
}

.circle .progress {
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
  transform-origin: center;
  transition: stroke 0.3s ease;
  /* Smooth transition for color change */
}

.circle .background {
  fill: none;
  stroke: rgba(0, 0, 0, 0.14);
  stroke-width: 12;
}

.circle .label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
}

/* Specific Colors for Progress Bars */
#progress-days {
  stroke: #ffd700;
  /* Gold */
}

#progress-hours {
  stroke: #1e90ff;
  /* DodgerBlue */
}

#progress-minutes {
  stroke: #32cd32;
  /* LimeGreen */
}

#progress-seconds {
  stroke: #ff4500;
  /* OrangeRed */
}

/* Optional: Hover Effect for Labels */
.circle .label span:hover {
  color: #ff4500;
  transition: color 0.3s ease;
}

.mobile {
  display: none;
}

.desktop {
  display: block;
}

@media (max-width: 640px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }

  .circle {
    width: 40px;
    height: 40px;
  }

  .circle .label small {
    position: absolute;
    bottom: -20px;
    left: -3px;
  }

  .circle .background {
    stroke-width: 2;
  }

  .circle .progress {
    stroke-width: 2;
  }

  .label span {
    font-size: 10px;
  }

  .label small {
    font-size: 10px;
  }
}
</style>
