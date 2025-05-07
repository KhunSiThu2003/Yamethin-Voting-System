import { db } from "@/firebase/config";
import { ref } from "vue";

const UniversityCandidates = () => {
  const candidates = ref([]);
  const error = ref("");

  const loadCan = async () => {
    try {
      const response = await db.collection("results").doc("2025").get();

      if (response.exists) {
        const data = response.data();

        // Extract candidate data safely
        const candidateList = [
          data?.ECKing,
          data?.MECHKing,
          data?.CKing,
          data?.EPKing,
          data?.ECQueen,
          data?.MECHQueen,
          data?.CQueen,
          data?.EPQueen
        ]
        .filter(Boolean)  // Remove any undefined/null entries
        .map(candidate => ({ ...candidate }));

        candidates.value = candidateList;
      } else {
        error.value = "No results found for 2025.";
      }
    } catch (err) {
      console.error("Failed to load candidates:", err);
      error.value = err.message || "An unexpected error occurred.";
    }
  };

  return { candidates, error, loadCan };
};

export default UniversityCandidates;
