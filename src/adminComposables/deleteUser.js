import { db } from "@/firebase/config";
import firebase from "firebase/app"; // Import Firebase v8
import "firebase/firestore"; // Import Firestore

const deleteUser = async (table,studentId) => {
    try {
        // Reference to the student document in Firestore
        const studentRef = db.collection(table).doc(studentId);

        // References to the collections
        const voteMajorKingRef = db.collection("voteMajorKing");
        const voteMajorQueenRef = db.collection("voteMajorQueen");
        const voteUniversityKingRef = db.collection("voteUniversityKing");
        const voteUniversityQueenRef = db.collection("voteUniversityQueen");

        // Start a batch write to ensure atomicity
        const batch = db.batch();

        // Delete the student document
        batch.delete(studentRef);

        // Function to remove student ID from voter array in a collection
        const removeVoterFromCollection = async (collectionRef) => {
            const docs = await collectionRef.get();
            docs.forEach(doc => {
                const data = doc.data();
                if (data.voter && data.voter.includes(studentId)) {
                    batch.update(doc.ref, {
                        voter: firebase.firestore.FieldValue.arrayRemove(studentId) // Correct usage for Firebase v8
                    });
                }
            });
        };

        // Remove student ID from all collections
        await removeVoterFromCollection(voteMajorKingRef);
        await removeVoterFromCollection(voteMajorQueenRef);
        await removeVoterFromCollection(voteUniversityKingRef);
        await removeVoterFromCollection(voteUniversityQueenRef);

        // Commit the batch
        await batch.commit();

        console.log("Student deleted and voter ID removed successfully!");
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error; // Re-throw the error to be caught by confirmDelete
    }
};

export default deleteUser;