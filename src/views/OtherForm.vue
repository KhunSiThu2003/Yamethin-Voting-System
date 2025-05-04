<template>
    <Loading v-if="isPending"></Loading>
    
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="w-full md:w-[360px] p-8 md:p-0">
    
            <!-- Back Button -->
            <button @click="goBack" class="fixed top-6 left-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm mb-4 flex items-center">
                <i class="fa-solid fa-arrow-left mr-2"></i>
                Back
            </button>
    
            <!-- Register Form -->
            <div v-if="isRegister && !registeredUser" class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-10">Register New Staff Account</h2>
                <form @submit.prevent="handleRegister">
                    <!-- Full Name Input -->
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" v-model="fullname" id="register_fullname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                        <label for="register_fullname" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Full Name
                        </label>
                    </div>
    
                    <!-- Registration ID Input -->
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" v-model="registerId" id="register_id" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                        <label for="register_id" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Registration ID
                        </label>
                    </div>
    
                    <!-- Password Input -->
                    <div class="relative z-0 w-full mb-5 group">
                        <i :class="passwordVisible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="absolute dark:text-white right-0 p-2.5 cursor-pointer" @click="togglePasswordVisibility('password')"></i>
                        <input :type="passwordVisible ? 'text' : 'password'" v-model="password" id="register_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                        <label for="register_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Password
                        </label>
                    </div>
    
                    <p v-if="passwordErrors" class="text-red-600 text-sm prose text-justify mb-6">{{ passwordErrors }}</p>
    
                    <!-- Confirm Password Input -->
                    <div class="relative z-0 w-full mb-5 group">
                        <i :class="confirmPasswordVisible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="absolute dark:text-white right-0 p-2.5 cursor-pointer" @click="togglePasswordVisibility('confirmPassword')"></i>
                        <input :type="confirmPasswordVisible ? 'text' : 'password'" v-model="confirmPassword" id="register_confirmPassword" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                        <label for="register_confirmPassword" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Confirm Password
                        </label>
                    </div>
    
                    <p v-if="matchError" class="text-red-600 text-sm prose text-justify mb-6">{{ matchError }}</p>
    
                    <p v-if="error" class="text-red-600 text-sm prose text-justify">{{ error }}</p>
    
                    <div class="mt-10 text-center">
                        <button type="submit" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Register New Account
                        </button>
                    </div>
                </form>
    
                <div class="mt-4 text-center">
                    <span class="text-sm text-gray-600">Already have an account? </span>
                    <button @click="toggleForm" class="text-purple-600 hover:text-purple-800">Login</button>
                </div>
            </div>
    
            <!-- Login Form -->
            <div v-else class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-10">Login to Your Staff Account</h2>
                <form @submit.prevent="handleLogin">
                    <!-- Registration ID Input -->
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" v-model="registerId" id="login_id" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                        <label for="login_id" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Registration ID
                        </label>
                    </div>
    
                    <!-- Password Input -->
                    <div class="relative z-0 w-full mb-5 group">
                        <i :class="passwordVisible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="absolute dark:text-white right-0 p-2.5 cursor-pointer" @click="togglePasswordVisibility('password')"></i>
                        <input :type="passwordVisible ? 'text' : 'password'" v-model="password" id="login_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                        <label for="login_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Password
                        </label>
                    </div>
    
                    <p v-if="passwordErrors" class="text-red-600 text-sm prose text-justify mb-6">{{ passwordErrors }}</p>
    
                    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    
                    <div class="mt-10 text-center">
                        <button type="submit" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Login
                        </button>
                    </div>
                </form>
    
                <div class="mt-4 text-center">
                    <span class="text-sm text-gray-600">Don't have an account? </span>
                    <button @click="toggleForm" class="text-purple-600 hover:text-purple-800">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "../components/Loading";
import { ref } from "vue";
import { useRouter } from "vue-router";
import otherRegister from "@/composables/otherRegister";
import { db } from "@/firebase/config";

export default {
    components: {
        Loading
    },
    setup() {
        // State Variables
        const isRegister = ref(true);
        const fullname = ref("");
        const registerId = ref("");
        const password = ref("");
        const confirmPassword = ref("");
        const passwordVisible = ref(false);
        const confirmPasswordVisible = ref(false);
        const registeredUser = ref(false);

        // Error Messages
        const passwordErrors = ref("");
        const matchError = ref("");
        const error = ref("");

        const { registerOtherStaff, error: registerError, isPending } = otherRegister();
        const router = useRouter();

        // Helper Functions
        const togglePasswordVisibility = (type) => {
            if (type === "password") passwordVisible.value = !passwordVisible.value;
            if (type === "confirmPassword") confirmPasswordVisible.value = !confirmPasswordVisible.value;
        };

        const toggleForm = () => {
            clearErrors();
            isRegister.value = !isRegister.value;
        };

        const clearErrors = () => {
            passwordErrors.value = "";
            matchError.value = "";
            error.value = "";
        };

        // Password Validation
        const validatePassword = (password) => {
            if (password.length < 8) return "Password must be at least 8 characters.";
            if (!/[A-Z]/.test(password)) return "Must include at least one uppercase letter.";
            if (!/[a-z]/.test(password)) return "Must include at least one lowercase letter.";
            if (!/\d/.test(password)) return "Must include at least one number.";
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Must include one special character.";
            return "";
        };

        // Register Staff
        const handleRegister = async () => {
            clearErrors();

            // Validate required fields
            if (!fullname.value || !registerId.value || !password.value || !confirmPassword.value) {
                error.value = "Please fill out all fields.";
                return;
            }

            // Validate password strength
            const passwordError = validatePassword(password.value);
            if (passwordError) {
                passwordErrors.value = passwordError;
                return;
            }

            // Check if passwords match
            if (password.value !== confirmPassword.value) {
                matchError.value = "Passwords do not match.";
                return;
            }

            try {
                const staffData = {
                    name: fullname.value,
                    registerId: registerId.value,
                    password: password.value
                };

                const staffId = await registerOtherStaff(staffData);
                if (staffId) {
                    registeredUser.value = true;
                    isRegister.value = false;
                }
            } catch (err) {
                error.value = registerError.value || err.message;
            }
        };

        // Login Staff
        const handleLogin = async () => {
            clearErrors();

            // Validate input fields
            if (!registerId.value || !password.value) {
                error.value = "Please fill out all fields.";
                return;
            }

            try {
                const staffSnapshot = await db.collection("otherStaff")
                    .where("registerId", "==", registerId.value)
                    .limit(1)
                    .get();

                if (staffSnapshot.empty) {
                    error.value = "Account not found.";
                    return;
                }

                const staff = staffSnapshot.docs[0].data();

                if (staff.password !== password.value) {
                    passwordErrors.value = "Password is incorrect!";
                    return;
                }

                // Successful login: store user data in localStorage
                localStorage.setItem("userId", staffSnapshot.docs[0].id);
                localStorage.setItem("userRole", staff.role || "other");

                // Update status
                await db.collection("otherStaff").doc(staffSnapshot.docs[0].id).set({
                    status: "active",
                    lastLogin: new Date()
                }, { merge: true });

                // Redirect based on profile completion
                if (staff.profileImage) {
                    router.push("/");
                } else {
                    router.push("/ProfileForm");
                }
            } catch (err) {
                error.value = "Login failed. Please try again.";
                console.error(err);
            }
        };

        const goBack = () => {
            router.back();
        };

        return {
            isRegister,
            fullname,
            registerId,
            password,
            confirmPassword,
            passwordVisible,
            confirmPasswordVisible,
            isPending,
            passwordErrors,
            matchError,
            error,
            togglePasswordVisibility,
            toggleForm,
            handleRegister,
            handleLogin,
            goBack,
        };
    },
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>