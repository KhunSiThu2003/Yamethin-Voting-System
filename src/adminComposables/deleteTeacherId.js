import { db } from "@/firebase/config"; // Adjust the import path to your Firebase config
import { ref } from "vue";

const useDeleteTeacherId = (teacherId) => {
    const isDeleting = ref(false); // Track the deletion state
    const error = ref(null); // Track any errors

    try {
        // Delete the document with the given ID
        db.collection("teacherID").doc(teacherId).delete();
        console.log("Teacher ID deleted successfully:", teacherId);
    } catch (err) {
        console.error("Error deleting teacher ID:", err);
        error.value = err; // Store the error
    } finally {
        isDeleting.value = false; // Reset deleting state
    }
};

export default useDeleteTeacherId;