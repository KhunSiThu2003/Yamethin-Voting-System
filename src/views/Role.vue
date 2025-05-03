<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <main class="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div class="space-y-6">
          <!-- Admin Role Card -->
          <button
            @click="selectRole('admin')"
            :class="{
              'border-red-500 dark:border-red-400 shadow-md': selectedRole === 'admin',
              'border-gray-200 dark:border-gray-700': selectedRole !== 'admin'
            }"
            class="group relative block w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-red-500 dark:hover:border-red-400"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                  Administrator
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Register as an administrator to manage elections and system settings
                </p>
              </div>
              <div class="text-red-500 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <span class="absolute top-2 right-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Full Access
            </span>
          </button>

          <!-- Student Role Card -->
          <button
            @click="selectRole('student')"
            :class="{
              'border-primary-500 dark:border-primary-400 shadow-md': selectedRole === 'student',
              'border-gray-200 dark:border-gray-700': selectedRole !== 'student'
            }"
            class="group relative block w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-500 dark:hover:border-primary-400"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  Student
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Register as a student to participate in elections and vote for candidates
                </p>
              </div>
              <div class="text-primary-500 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <span class="absolute top-2 right-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Can Vote
            </span>
          </button>

          <!-- Teacher Role Card -->
          <button
            @click="selectRole('teacher')"
            :class="{
              'border-blue-500 dark:border-blue-400 shadow-md': selectedRole === 'teacher',
              'border-gray-200 dark:border-gray-700': selectedRole !== 'teacher'
            }"
            class="group relative block w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Teacher
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Register as a teacher to oversee elections and participate in voting
                </p>
              </div>
              <div class="text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <span class="absolute top-2 right-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Can Vote
            </span>
          </button>

          <!-- Other Role Card -->
          <button
            @click="selectRole('other')"
            :class="{
              'border-purple-500 dark:border-purple-400 shadow-md': selectedRole === 'other',
              'border-gray-200 dark:border-gray-700': selectedRole !== 'other'
            }"
            class="group relative block w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-500 dark:hover:border-purple-400"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0 h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Other Staff
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Register as university staff (non-teaching) to participate in elections
                </p>
              </div>
              <div class="text-purple-500 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <span class="absolute top-2 right-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Can Vote
            </span>
          </button>

          <!-- Confirmation Button (shown only when a role is selected) -->
          <div v-if="selectedRole" class="pt-4">
            <button
              @click="confirmRole"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
              Confirm as {{ roleDisplayName }}
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 -mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SelectRole",
  setup() {
    const router = useRouter();
    const selectedRole = ref(null);

    const roleDisplayName = computed(() => {
      const names = {
        admin: "Administrator",
        student: "Student",
        teacher: "Teacher",
        other: "Other Staff"
      };
      return names[selectedRole.value] || "";
    });

    const selectRole = (role) => {
      selectedRole.value = role;
    };

    const confirmRole = () => {
      if (selectedRole.value) {
        // Store the selected role in localStorage
        localStorage.setItem("userRole", selectedRole.value);
        
        // Navigate to the home page
        router.push("/home");
      }
    };

    onMounted(() => {
      document.title = "Select Role - TU Yamethin Elections";
      
      // Check if user already has a role
      const userId = localStorage.getItem("userId");
      if (userId) {
        router.push("/home");
      }
    });

    return {
      selectedRole,
      roleDisplayName,
      selectRole,
      confirmRole
    };
  },
};
</script>

<style scoped>
button {
  @apply text-left w-full; /* Make buttons behave like the original links */
}
</style>