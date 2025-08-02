<template>
  <Loading v-if="clickSubmit || !userData"></Loading>
  <div
    v-if="userData"
    class="relative min-h-screen bg-gray-50 dark:bg-gray-900"
  >
    <!-- Header -->
    <div class="w-full bg-indigo-600 text-white text-center p-4">
      <h1 class="text-xl font-semibold">Change Password</h1>
      <p class="text-sm opacity-90">Update your account password</p>
    </div>

    <!-- Main Content -->
    <div class="flex justify-center items-center pt-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="w-full max-w-md p-8">
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Current Password -->
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <div class="relative">
              <input
                id="currentPassword"
                v-model="currentPassword"
                :type="currentPasswordVisible ? 'text' : 'password'"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your current password"
                required
              />
              <button
                type="button"
                @click="toggleCurrentPasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg v-if="currentPasswordVisible" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <p v-if="currentPasswordError" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ currentPasswordError }}
            </p>
          </div>

          <!-- New Password -->
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <div class="relative">
              <input
                id="newPassword"
                v-model="newPassword"
                :type="newPasswordVisible ? 'text' : 'password'"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                @click="toggleNewPasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg v-if="newPasswordVisible" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <p v-if="newPasswordError" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ newPasswordError }}
            </p>
          </div>

          <!-- Confirm New Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="confirmPasswordVisible ? 'text' : 'password'"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg v-if="confirmPasswordVisible" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
            <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ confirmPasswordError }}
            </p>
          </div>

          <!-- Password Requirements -->
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Password Requirements:</h3>
            <ul class="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li class="flex items-center">
                <svg class="w-3 h-3 mr-2" :class="passwordRequirements.length ? 'text-green-500' : 'text-red-500'" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="passwordRequirements.length" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  <path v-else fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                At least 6 characters long
              </li>
              <li class="flex items-center">
                <svg class="w-3 h-3 mr-2" :class="passwordRequirements.uppercase ? 'text-green-500' : 'text-red-500'" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="passwordRequirements.uppercase" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  <path v-else fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                Contains uppercase letter
              </li>
              <li class="flex items-center">
                <svg class="w-3 h-3 mr-2" :class="passwordRequirements.lowercase ? 'text-green-500' : 'text-red-500'" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="passwordRequirements.lowercase" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  <path v-else fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                Contains lowercase letter
              </li>
              <li class="flex items-center">
                <svg class="w-3 h-3 mr-2" :class="passwordRequirements.number ? 'text-green-500' : 'text-red-500'" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="passwordRequirements.number" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  <path v-else fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                Contains number
              </li>
            </ul>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!isFormValid || clickSubmit"
            class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
          >
            <span v-if="clickSubmit" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating Password...
            </span>
            <span v-else>Update Password</span>
          </button>

          <!-- Back Button -->
          <button
            type="button"
            @click="goBack"
            class="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
          >
            Back to Home
          </button>
        </form>

        <!-- Success/Error Messages -->
        <div v-if="message" class="mt-4 p-4 rounded-lg" :class="messageType === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import Loading from "../components/Loading";
import { db } from "@/firebase/config";
import getUserById from "@/composables/getUserById";

export default {
  components: {
    Loading,
  },

  setup() {
    const router = useRouter();
    const clickSubmit = ref(false);
    const message = ref("");
    const messageType = ref("");

    // Form data
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");

    // Password visibility toggles
    const currentPasswordVisible = ref(false);
    const newPasswordVisible = ref(false);
    const confirmPasswordVisible = ref(false);

    // Error messages
    const currentPasswordError = ref("");
    const newPasswordError = ref("");
    const confirmPasswordError = ref("");

    // Get user data
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    const collectionName = role === "teacher"
      ? "teachers"
      : role === "student"
      ? "students"
      : "otherStaff";

    let { userData, error, load } = getUserById(userId);
    load();

    // Password validation
    const passwordRequirements = computed(() => {
      const password = newPassword.value;
      return {
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
      };
    });

    const isPasswordValid = computed(() => {
      const reqs = passwordRequirements.value;
      return reqs.length && reqs.uppercase && reqs.lowercase && reqs.number;
    });

    const isFormValid = computed(() => {
      return currentPassword.value && 
             newPassword.value && 
             confirmPassword.value && 
             isPasswordValid.value &&
             newPassword.value === confirmPassword.value;
    });

    // Toggle password visibility
    const toggleCurrentPasswordVisibility = () => {
      currentPasswordVisible.value = !currentPasswordVisible.value;
    };

    const toggleNewPasswordVisibility = () => {
      newPasswordVisible.value = !newPasswordVisible.value;
    };

    const toggleConfirmPasswordVisibility = () => {
      confirmPasswordVisible.value = !confirmPasswordVisible.value;
    };

    // Clear errors
    const clearErrors = () => {
      currentPasswordError.value = "";
      newPasswordError.value = "";
      confirmPasswordError.value = "";
      message.value = "";
    };

    // Validate form
    const validateForm = () => {
      clearErrors();
      let isValid = true;

      if (!currentPassword.value) {
        currentPasswordError.value = "Current password is required";
        isValid = false;
      }

      if (!newPassword.value) {
        newPasswordError.value = "New password is required";
        isValid = false;
      } else if (!isPasswordValid.value) {
        newPasswordError.value = "Password does not meet requirements";
        isValid = false;
      }

      if (!confirmPassword.value) {
        confirmPasswordError.value = "Please confirm your new password";
        isValid = false;
      } else if (newPassword.value !== confirmPassword.value) {
        confirmPasswordError.value = "Passwords do not match";
        isValid = false;
      }

      return isValid;
    };

    // Handle form submission
    const handleSubmit = async () => {
      if (!validateForm()) return;

      clickSubmit.value = true;
      clearErrors();

      try {
        // Verify current password
        const userSnapshot = await db.collection(collectionName).doc(userId).get();
        const userData = userSnapshot.data();

        if (!userData || userData.password !== currentPassword.value) {
          currentPasswordError.value = "Current password is incorrect";
          return;
        }

        // Update password
        await db.collection(collectionName).doc(userId).update({
          password: newPassword.value,
          passwordUpdatedAt: new Date(),
        });

        // Update localStorage
        localStorage.setItem("userPassword", newPassword.value);

        message.value = "Password updated successfully!";
        messageType.value = "success";

        // Reset form
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/home");
        }, 2000);

      } catch (error) {
        console.error("Error updating password:", error);
        message.value = "Failed to update password. Please try again.";
        messageType.value = "error";
      } finally {
        clickSubmit.value = false;
      }
    };

    // Go back to home
    const goBack = () => {
      router.push("/home");
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      currentPasswordVisible,
      newPasswordVisible,
      confirmPasswordVisible,
      currentPasswordError,
      newPasswordError,
      confirmPasswordError,
      passwordRequirements,
      isFormValid,
      clickSubmit,
      message,
      messageType,
      userData,
      toggleCurrentPasswordVisibility,
      toggleNewPasswordVisibility,
      toggleConfirmPasswordVisibility,
      handleSubmit,
      goBack,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style> 