import { db } from "@/firebase/config";
import { ref } from "vue";

const otherRegister = () => {
    const error = ref(null);
    const isPending = ref(false);

    const registerOtherStaff = async (staffData) => {
        error.value = null;
        isPending.value = true;
        
        try {
            // Validate required fields
            if (!staffData.name || !staffData.registerId || !staffData.password) {
                throw new Error("All fields are required");
            }

            // Check if registerId already exists in staff collection
            const existingStaff = await db.collection("otherStaff")
                .where("registerId", "==", staffData.registerId)
                .get();

            if (!existingStaff.empty) {
                throw new Error("Registration ID already exists");
            }

            // Check if registration ID is valid (optional for other staff)
            const regIdDoc = await db.collection("registrationIds")
                .doc(staffData.registerId)
                .get();

            if (regIdDoc.exists) {
                if (regIdDoc.data().used) {
                    throw new Error("Registration ID already used");
                }
                
                // For other staff, we might want different validation rules
                if (regIdDoc.data()) {
                    throw new Error("This ID is not valid for staff registration");
                }

                // Create new staff member
                const newStaff = {
                    ...staffData,
                    createdAt: new Date(),
                    status: "active",
                    role: "other",
                    lastLogin: null,
                    profileImage: ""
                };

                // Add staff to database
                const docRef = await db.collection("otherStaff").add(newStaff);
                
                // Mark registration ID as used if it was from registrationIds
                await db.collection("registrationIds")
                    .doc(staffData.registerId)
                    .update({
                        used: true,
                        usedAt: new Date(),
                        usedBy: docRef.id,
                        role: "other" // Ensure role is set
                    });

                return docRef.id;
            } else {
                throw new Error("Invalid registration ID");
            }
        } catch (err) {
            error.value = err.message;
            console.error("Error registering staff:", err);
            throw err;
        } finally {
            isPending.value = false;
        }
    };

    return { registerOtherStaff, error, isPending };
};

export default otherRegister;