import { db } from "@/firebase/config";
import { ref } from "vue";

const getUserById = (id) => {
  const userData = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  // If no userId is provided, return default values
  if (!id) {
    error.value = "User ID not provided";
    return {
      userData,
      error,
      isLoading,
      load: async () => {
        console.warn("Load function called without a valid ID.");
      },
    };
  }

  const load = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Determine the collection based on role
      const role = localStorage.getItem("userRole");
      const collectionName = role === "teacher" ? "teachers" : "students";
      
      // Fetch the user data from Firestore
      const doc = await db.collection(collectionName).doc(id).get();
      
      if (doc.exists) {
        userData.value = { id: doc.id, ...doc.data() };
        console.log("User data fetched successfully:", userData.value);
      } else {
        error.value = "User not found";
      }
    } catch (err) {
      console.error("Error fetching user:", err.message);
      error.value = err.message || "Failed to fetch user data";
    } finally {
      isLoading.value = false;
    }
  };

  return { userData, error, isLoading, load };
};

export default getUserById;