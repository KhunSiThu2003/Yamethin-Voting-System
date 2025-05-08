import { db } from "@/firebase/config";
import { ref } from "vue";

let getAllUser = (table) => {
    let users = ref([]);
    let count = ref(0);
    let error = ref("");

    let load = async () => {
      try {
        let response = await db.collection(table).get();
        users.value = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        count.value = users.value.length;
      } catch (err) {
        error.value = err.message;
      }
    };

    // Add real-time listener
    let setupRealtimeListener = () => {
      return db.collection(table).onSnapshot((snapshot) => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        count.value = users.value.length;
      }, (err) => {
        error.value = err.message;
      });
    };

    return { users, count, error, load, setupRealtimeListener };
};

export default getAllUser;