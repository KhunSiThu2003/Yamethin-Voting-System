import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTMsIgBz3vMG27-EG-1dTG0JNKi6D9VIU",
  authDomain: "voting-system-d82a6.firebaseapp.com",
  projectId: "voting-system-d82a6",
  storageBucket: "voting-system-d82a6.firebasestorage.app",
  messagingSenderId: "46741966823",
  appId: "1:46741966823:web:577fb2466f42e30b4ff742",
  measurementId: "G-4B4ZWH4R33"
};

  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  const storage = firebase.storage();
  let timestamp = firebase.firestore.FieldValue.serverTimestamp;

  // Function to ensure collections exist by creating a dummy doc if missing
  async function ensureVoteUniversityCollections() {
    const collections = ["voteUniversityKing", "voteUniversityQueen"];
    for (const col of collections) {
      const snapshot = await db.collection(col).limit(1).get();
      if (snapshot.empty) {
        // Create a dummy doc to ensure the collection exists
        await db.collection(col).doc("init").set({ initialized: true });
      }
    }
  }

  // Call the function on startup
  ensureVoteUniversityCollections();

  export {db,timestamp,storage};