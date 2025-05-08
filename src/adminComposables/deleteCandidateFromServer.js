import { db } from '@/firebase/config';
import 'firebase/firestore';

const deleteCandidateFromServer = async (candidateRollno) => {
    try {
        // Reference to the candidate document in Firestore
        const candidateRef = db.collection('candidates').doc(candidateRollno);

        // Define collection references
        const voteMajorKingRef = db.collection("voteMajorKing").doc(candidateRollno);
        const voteMajorQueenRef = db.collection("voteMajorQueen").doc(candidateRollno);
        const voteUniversityKingRef = db.collection("voteUniversityKing").doc(candidateRollno);
        const voteUniversityQueenRef = db.collection("voteUniversityQueen").doc(candidateRollno);

        // Start a batch write to ensure atomicity
        const batch = db.batch();

        // Directly delete documents
        batch.delete(candidateRef);
        batch.delete(voteMajorKingRef);
        batch.delete(voteMajorQueenRef);
        batch.delete(voteUniversityKingRef);
        batch.delete(voteUniversityQueenRef);

        // Commit the batch
        await batch.commit();

        console.log("Candidate and related documents deleted successfully!");
    } catch (error) {
        console.error("Error deleting candidate and related documents:", error);
        throw error; 
    }
};

export default deleteCandidateFromServer;
