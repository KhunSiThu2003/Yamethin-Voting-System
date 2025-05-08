import { db } from "@/firebase/config";
import { ref } from "vue";

const listenToAllTeacherIds = () => {
    const teacherIds = ref([]); // Create a ref to store the teacher IDs

    // Create a reference to the "teacherID" collection
    const collectionRef = db.collection("teacherID");

    // Set up a real-time listener
    const unsubscribe = collectionRef.onSnapshot(
        (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                // Include the document ID in the data object
                data.push({
                    id: doc.id, // Firestore document ID
                    ...doc.data(), // Spread the rest of the document data
                });
            });
            teacherIds.value = data; // Update the ref with the new data
        },
        (error) => {
            console.error("Error listening to teacher IDs:", error);
        }
    );

    // Return the unsubscribe function and the teacherIds ref
    return { teacherIds, unsubscribe };
};

export default listenToAllTeacherIds;