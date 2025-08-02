
import { db } from "@/firebase/config";
import { ref } from "vue";

let getAllCandidates = () => {
    let candidates = ref([]);
    let error = ref("");
    let unsubscribe = null;
    let isLoading = ref(false);

    let load = async () => {
        try {
            error.value = "";
            isLoading.value = true;
            
            // Set up real-time listener
            unsubscribe = db.collection("candidates")
                .orderBy("number")
                .onSnapshot((snapshot) => {
                    candidates.value = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        };
                    });
                    isLoading.value = false;
                }, (err) => {
                    console.error("Error in real-time listener:", err);
                    error.value = "Failed to load candidates in real-time. Please refresh the page.";
                    isLoading.value = false;
                });

        } catch (err) {
            console.error("Error loading candidates:", err);
            error.value = err.message || "Failed to load candidates. Please try again.";
            isLoading.value = false;
        }
    };

    // Cleanup function
    const cleanup = () => {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    };

    return { candidates, error, load, cleanup, unsubscribe, isLoading };
};

export default getAllCandidates;