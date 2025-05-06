import { db } from "@/firebase/config";
import { ref } from "vue";

let getUniversityCandidates = () => {
    let candidates = ref([]);
    let error = ref("");

    let loadCan = async () => {
      try {
        // Assuming university candidates are stored in a "university-candidates" collection
        // or you might want to query from the "results" collection
        let response = await db.collection("results")
                              .doc(new Date().getFullYear().toString())
                              .get();
        
        if (response.exists) {
          const data = response.data();
          candidates.value = [
            { id: 'university-king', ...data.universityKing },
            { id: 'university-queen', ...data.universityQueen }
          ];
        }
      } catch (err) {
        error.value = err.message;
      }
    }

    return { candidates, error, loadCan };
}

export default getUniversityCandidates;