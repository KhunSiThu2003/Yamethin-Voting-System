import { db } from "@/firebase/config";
import { data } from "autoprefixer";
import { ref } from "vue";

let adminLogin = () => {

    let adminData = ref(null);
    let error = ref("");

    let load = async () => {
        try {
            // Fetch all documents from the "admin" collection
            let doc = await db.collection("admin").doc("admin").get();
            adminData.value = {id:doc.id,...doc.data()}

        } catch (err) {
            // Handle error if any
            error.value = err.message;
            console.log(error.value);
        }
    };


    return { adminData, error, load }

}

export default adminLogin;