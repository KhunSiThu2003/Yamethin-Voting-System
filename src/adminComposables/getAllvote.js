import { db } from "@/firebase/config";

function getAllVote (table, callback) {
    const collectionRef = db.collection(table);

    // Set up a real-time listener on the collection
    const unsubscribe = collectionRef.onSnapshot(async (querySnapshot) => {
        const results = [];

        // Use a for...of loop to handle async operations
        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const voterCount = data.voter && Array.isArray(data.voter) ? data.voter.length : 0;

            // Fetch candidate data from the 'candidates' collection using doc.id
            const candidateSnapshot = await db.collection("candidates").doc(doc.id).get();
            const candidateData = candidateSnapshot.data();

            // Combine candidate data with voter count and document ID
            results.push({
                id: doc.id,
                ...candidateData,
                voterCount,
            });
        }

        // Sort results by voterCount in descending order
        results.sort((a, b) => b.voterCount - a.voterCount);

        // Pass the sorted results to the callback function
        callback(results);
    });

    // Return the unsubscribe function to allow stopping the listener
    return unsubscribe;
}

export default getAllVote ;
