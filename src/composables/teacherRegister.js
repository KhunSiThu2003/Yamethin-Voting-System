import { db } from "@/firebase/config";
import { ref } from "vue";

const teacherRegister = () => {
    const error = ref(null);
    const isPending = ref(false);

    const registerTeacher = async (teacherData) => {
        error.value = null;
        isPending.value = true;
        
        try {
            // Check if registerId already exists
            const existingTeacher = await db.collection("teachers")
                .where("registerId", "==", teacherData.registerId)
                .get();

            if (!existingTeacher.empty) {
                throw new Error("Register ID already exists");
            }

            // Check if registration ID is valid
            const regIdDoc = await db.collection("registrationIds")
                .doc(teacherData.registerId)
                .get();

            if (!regIdDoc.exists) {
                throw new Error("Invalid registration ID");
            }

            if (regIdDoc.data().used) {
                throw new Error("Registration ID already used");
            }

            // Create new teacher with major included
            const newTeacher = {
                name: teacherData.name,
                registerId: teacherData.registerId,
                major: teacherData.major,
                password: teacherData.password,
                createdAt: new Date(),
                status: "active",
                role: "teacher",
                lastLogin: null,
                profileImage: null
            };

            // Add teacher to database
            const docRef = await db.collection("teachers").add(newTeacher);
            
            // Mark registration ID as used
            await db.collection("registrationIds").doc(teacherData.registerId).update({
                used: true,
                usedAt: new Date(),
                usedBy: docRef.id
            });

            return docRef.id;
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            isPending.value = false;
        }
    };

    return { registerTeacher, error, isPending };
};

export default teacherRegister;