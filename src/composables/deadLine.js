import { ref } from "vue";
import getEndDate from "@/composables/getEndDate";

let deadLine = (type) => {
    let dayString = ref("");
    let hourString = ref("");
    let minString = ref("");
    let secString = ref("");
    let remainingDays = ref("");
    let remainingHours = ref("");
    let remainingMinutes = ref("");
    let remainingSeconds = ref("");
    let votingEnd = ref(false);

    // Countdown function to update the timer
    const updateCountdown = () => {
        let endDate;
        if (type === "major") {
            endDate = localStorage.getItem("majorEndDate");
        } else if (type === "university") {
            endDate = localStorage.getItem("universityEndDate");
        }

        if (!endDate) {
            dayString.value = "00";
            hourString.value = "00";
            minString.value = "00";
            secString.value = "00";
            votingEnd.value = true; // If no end date, consider voting ended
            return;
        }

        const now = new Date().getTime();
        const endTime = new Date(endDate).getTime();
        const distance = endTime - now;

        // If countdown reaches zero, stop the timer
        if (distance <= 0) {
            dayString.value = "00";
            hourString.value = "00";
            minString.value = "00";
            secString.value = "00";
            votingEnd.value = true;

            if(type === "major") {
                if (!localStorage.getItem("majorEnded")) {
                    window.location.reload();
                }
                localStorage.setItem("majorEnded", true);
            }

            return;
        } else {
            votingEnd.value = false; // Voting is still active
            if (type === "major") {
                localStorage.removeItem("majorEnded");
            } 
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Fixed progress calculation
        const totalDuration = endTime - new Date().setHours(0, 0, 0, 0); // Duration from start of day to end
        const remainingDuration = distance;
        
        remainingDays.value = Math.min((days / 30) * 100, 100); // Assuming max 30 days
        remainingHours.value = (hours / 24) * 100;
        remainingMinutes.value = (minutes / 60) * 100;
        remainingSeconds.value = (seconds / 60) * 100;

        // Format the countdown values as strings with leading zeros if necessary
        dayString.value = days.toString().padStart(2, "0");
        hourString.value = hours.toString().padStart(2, "0");
        minString.value = minutes.toString().padStart(2, "0");
        secString.value = seconds.toString().padStart(2, "0");
    };

    // Initialize the countdown with the current deadline
    getEndDate(type, () => {
        updateCountdown();
    });

    // Start the countdown timer
    const interval = setInterval(updateCountdown, 1000);

    return {
        dayString,
        hourString,
        minString,
        secString,
        updateCountdown,
        remainingDays,
        remainingHours,
        remainingMinutes,
        remainingSeconds,
        votingEnd,
    };
}

export default deadLine;