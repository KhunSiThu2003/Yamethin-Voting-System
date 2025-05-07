<template>
  <Loading v-if="clickSubmit"></Loading>

  <div class="w-screen h-screen flex justify-center items-center">
    <div class="w-full md:w-[360px] p-8 md:p-0">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="fixed top-6 left-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm mb-4 flex items-center"
      >
        <i class="fa-solid fa-arrow-left mr-2"></i>
        Back
      </button>

      <!-- Login Form -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-10">
          Login to Your Student Account
        </h2>
        <form @submit.prevent="handleLogin">
          <!-- Roll No Input -->
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              v-model="rollNo"
              id="login_rollNo"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="login_rollNo"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Roll No
            </label>
          </div>

          <p
            v-if="rollError"
            class="text-red-600 text-sm prose text-justify mb-6"
          >
            {{ rollError }}
          </p>

          <!-- Password Input -->
          <div class="relative z-0 w-full mb-5 group">
            <i
              :class="
                passwordVisible
                  ? 'fa-regular fa-eye-slash'
                  : 'fa-regular fa-eye'
              "
              class="absolute dark:text-white right-0 p-2.5 cursor-pointer"
              @click="togglePasswordVisibility('password')"
            ></i>
            <input
              :type="passwordVisible ? 'text' : 'password'"
              v-model="password"
              id="login_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="login_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <p
            v-if="passwordErrors"
            class="text-red-600 text-sm prose text-justify mb-6"
          >
            {{ passwordErrors }}
          </p>

          <p v-if="errorMessage" class="text-red-600 text-sm">
            {{ errorMessage }}
          </p>

          <div class="mt-10 text-center">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </div>
        </form>
        <div class="mt-4 text-center">
          <span class="text-sm text-gray-600">Don't have an account? </span>
          <router-link to="/selectyear" class="text-blue-600 hover:underline"
            >Register</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import Loading from "../components/Loading";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase/config";

export default {
  components: {
    Loading,
  },
  setup() {
    // State Variables
    const rollNo = ref("");
    const password = ref("");
    const clickSubmit = ref(false);
    const passwordVisible = ref(false);

    // Error Messages
    const rollError = ref("");
    const passwordErrors = ref("");
    const errorMessage = ref("");

    const router = useRouter();

    // Helper Functions
    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const clearErrors = () => {
      rollError.value = "";
      passwordErrors.value = "";
      errorMessage.value = "";
    };

    // Login Student
    const handleLogin = async () => {
      clearErrors();

      // Validate input fields
      if (!rollNo.value || !password.value) {
        errorMessage.value = "Please fill out all fields.";
        return;
      }

      clickSubmit.value = true;

      const studentSnapshot = await db
        .collection("students")
        .where("rollno", "==", rollNo.value)
        .limit(1)
        .get();

      if (studentSnapshot.empty) {
        clickSubmit.value = false;
        rollError.value = "Your account was not found!";
        return;
      }

      const student = studentSnapshot.docs[0].data();

      if (student.password !== password.value) {
        clickSubmit.value = false;
        passwordErrors.value = "Password is incorrect!";
        return;
      }

      // Successful login: store user data in localStorage
      localStorage.setItem("userId", studentSnapshot.docs[0].id);
      localStorage.setItem("userPassword", password.value);

      await db.collection("students").doc(studentSnapshot.docs[0].id).set(
        {
          status: "active",
        },
        {
          merge: true,
        }
      );

      if (student.profileImage) {
        router.push("/");
      } else {
        router.push("/ProfileForm");
      }
    };

    const goBack = () => {
      localStorage.removeItem("userMajor");
      router.back();
    };

    return {
      rollNo,
      password,
      passwordVisible,
      clickSubmit,
      rollError,
      passwordErrors,
      errorMessage,
      togglePasswordVisibility,
      handleLogin,
      goBack,
    };
  },
};
</script>
    
    <style scoped>
/* Add scoped styles if needed */
</style>