<template>
    <!-- Countdown Timer Section -->
    <section id="countdown"
        class="bg-gray-50 dark:bg-gray-900 p-5 md:p-20 sm:p-20 text-center flex items-center justify-center ">
        <div v-if="isLoading" role="status" class="flex justify-center h-full">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>

        <div v-else-if="votingEnd" class="voting-ended-container text-center space-y-4">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Voting Period Has Ended</h2>
            <p class="text-gray-600 dark:text-gray-300">Thank you for your participation!</p>
            <div class="flex flex-col space-y-3 mt-6 max-w-md mx-auto">
                <router-link to="/results" 
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-blue-700 transition">
                    View Overall Results
                </router-link>
                <router-link to="/results" 
                    class="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-purple-700 transition">
                    View Results by Major
                </router-link>
                <router-link to="/contact" 
                    class="text-blue-500 underline mt-2 text-center hover:text-blue-600 transition">
                    Contact Us
                </router-link>
            </div>
        </div>

        <div v-else class="countdown-container text-center space-y-8">
            <!-- Circular Progress Bars -->
            <div class="block md:flex sm:flex justify-between md:justify-center sm:justify-center gap-6">
                <div class="flex gap-4 justify-between mb-5">
                    <!-- Days -->
                    <div class="circle">
                        <svg width="80" height="80">
                            <circle class="background" cx="40" cy="40" r="35"></circle>
                            <circle :stroke-dasharray="remainingDays * 2.2 + ',' + 220" id="progress-days" class="progress"
                                cx="40" cy="40" r="35" stroke="#FFD700">
                            </circle>
                        </svg>
                        <div class="label">
                            <span id="days" class="text-xl">{{ dayString }}</span><br />
                            <small class="text-gray-600 dark:text-gray-300 text-xs">Days</small>
                        </div>
                    </div>

                    <!-- Hours -->
                    <div class="circle">
                        <svg width="80" height="80">
                            <circle class="background" cx="40" cy="40" r="35"></circle>
                            <circle :stroke-dasharray="remainingHours * 2.2 + ',' + 220" id="progress-hours" class="progress"
                                cx="40" cy="40" r="35" stroke="#1E90FF">
                            </circle>
                        </svg>
                        <div class="label">
                            <span id="hours" class="text-xl">{{ hourString }}</span><br />
                            <small class="text-gray-600 dark:text-gray-300 text-xs">Hours</small>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4 justify-between">
                    <!-- Minutes -->
                    <div class="circle">
                        <svg width="80" height="80">
                            <circle class="background" cx="40" cy="40" r="35"></circle>
                            <circle :stroke-dasharray="remainingMinutes * 2.2 + ',' + 220" id="progress-minutes"
                                class="progress" cx="40" cy="40" r="35" stroke="#32CD32">
                            </circle>
                        </svg>
                        <div class="label">
                            <span id="minutes" class="text-xl">{{ minString }}</span><br />
                            <small class="text-gray-600 dark:text-gray-300 text-xs">Minutes</small>
                        </div>
                    </div>

                    <!-- Seconds -->
                    <div class="circle">
                        <svg width="80" height="80">
                            <circle class="background" cx="40" cy="40" r="35"></circle>
                            <circle :stroke-dasharray="remainingSeconds * 2.2 + ',' + 220" id="progress-seconds"
                                class="progress" cx="40" cy="40" r="35" stroke="#FF4500">
                            </circle>
                        </svg>
                        <div class="label">
                            <span id="seconds" class="text-xl">{{ secString }}</span><br />
                            <small class="text-gray-600 dark:text-gray-300 text-xs">Seconds</small>
                        </div>
                    </div>
                </div>
            </div>
            <p class="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-xl md:text-2xl">
                Don't miss the opportunity! Vote before it's too late!
            </p>
        </div>
    </section>
</template>

<script>
import { watch } from 'vue';
import deadLine from '@/composables/deadLine';

export default {
    setup() {
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
            votingEnd
        } = deadLine();

        updateCountdown();

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
        };
    }
};
</script>

<style scoped>
#countdown {
    font-family: 'Poppins', sans-serif;
}

.circle {
    position: relative;
    width: 80px;
    height: 80px;
}

.circle svg {
    transform: rotate(-90deg);
}

.circle .progress {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transform-origin: center;
    transition: stroke 0.3s ease;
}

.circle .background {
    fill: none;
    stroke: rgba(0, 0, 0, 0.14);
    stroke-width: 8;
}

.circle .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: bold;
}

#progress-days {
    stroke: #FFD700;
}

#progress-hours {
    stroke: #1E90FF;
}

#progress-minutes {
    stroke: #32CD32;
}

#progress-seconds {
    stroke: #FF4500;
}

.circle .label span:hover {
    color: #FF4500;
    transition: color 0.3s ease;
}

.voting-ended-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
}

.dark .voting-ended-container {
    background-color: rgba(31, 41, 55, 0.5);
}
</style>