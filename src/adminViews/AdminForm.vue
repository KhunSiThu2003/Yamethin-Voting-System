<template>
    <div :class="isDarkMode ? 'dark' : 'light'" class="w-screen h-screen flex justify-center items-center">

  
      <div class="w-full md:w-[360px] p-8 md:p-0">
        <!-- Login Form -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-10">Login to Admin Account</h2>
          <form @submit.prevent="handleLogin">
            <!-- Admin Name Input -->
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" v-model="adminName" id="login_adminName"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required />
              <label for="login_adminName"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Admin Name
              </label>
            </div>
  
            <!-- Password Input -->
            <div class="relative z-0 w-full mb-5 group">
              <i :class="passwordVisible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
                class="absolute right-0 p-2.5 cursor-pointer" @click="togglePasswordVisibility"></i>
              <input :type="passwordVisible ? 'text' : 'password'" v-model="password" id="login_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required />
              <label for="login_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
  
            <p v-if="errorMessage" class="text-red-600 text-sm prose text-justify mb-6">{{ errorMessage }}</p>
  
            <div class="mt-10 text-center">
              <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

<script>
import adminLogin from "@/adminComposables/adminLogin";
import Loading from "../adminComponents/Loading";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    components: { Loading },
    setup() {
        // **State Variables**
        const adminName = ref("");
        const password = ref("");
        const passwordVisible = ref(false);
        const clickSubmit = ref(false);

        // **Error Messages**
        const errorMessage = ref("");

        const router = useRouter();

        // **Helper Functions**
        const togglePasswordVisibility = () => {
            passwordVisible.value = !passwordVisible.value;
        };

        // **Login Admin**
        const handleLogin = async () => {
            clearErrors();

            clickSubmit.value = true;

            // Check if the fields are empty
            if (!adminName.value || !password.value) {
                errorMessage.value = "Please fill out all fields.";
                clickSubmit.value = false; // Reset loading state
                return;
            }

            // **Admin Login Composable**
            const { adminData, load, error } = adminLogin();

            await load();

            console.log(adminData.value.name)

            // Handle errors
            if (error.value) {
                errorMessage.value = error.value;
                clickSubmit.value = false; // Reset loading state
                return;
            }

            // Check if admin name and password match
            if (adminName.value === adminData.value.name && password.value === adminData.value.password) {
                localStorage.setItem("adminData", JSON.stringify(adminData.value)); // Store admin name in local storage
                router.push('/Deadline');  // Redirect to admin dashboard
            } else {
                errorMessage.value = "Invalid Admin Name or Password!";
                clickSubmit.value = false; // Reset loading state
            }
        };

        // **Clear Errors**
        const clearErrors = () => {
            errorMessage.value = "";
        };

        return {
            adminName,
            password,
            passwordVisible,
            clickSubmit,
            errorMessage,
            togglePasswordVisibility,
            handleLogin,
        };
    },
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
