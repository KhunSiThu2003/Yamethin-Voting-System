<template>
  <NavBar></NavBar>
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center pt-20"
  >
    <div class="mx-auto w-full">
      <h2
        class="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white"
      >
        Vote for Your King & Queen
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-6">
        Select a category to start voting.
      </p>
    </div>
    <div class="grid gap-6 md:grid-cols-2 p-10">
      <!-- University Vote Card -->
      <router-link to="/voteuniversity" custom v-slot="{ navigate, isExactActive }">
        <div
          @click="navigate"
          @keyup.enter="navigate"
          :class="{
            'ring-2 ring-red-500 shadow-lg': isExactActive,
            'hover:ring-1 hover:ring-red-300': !isExactActive,
          }"
          class="group relative overflow-hidden bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 focus:outline-none"
          tabindex="0"
          role="button"
        >
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <div
                class="p-4 rounded-full bg-red-100 dark:bg-red-900/20 group-hover:bg-red-200 dark:group-hover:bg-red-900/30 transition-colors duration-200 mb-4"
              >
                <TrophyIcon class="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <h3
                class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200"
              >
                University
              </h3>
              <p
                class="mt-2 text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200"
              >
                Vote for the university King & Queen
              </p>
            </div>
            <div class="mt-6">
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <StarIcon
                    class="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0"
                  />
                  <span>Open to all user</span>
                </li>
                <li class="flex items-start">
                  <StarIcon
                    class="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0"
                  />
                  <span>University competition</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </router-link>

      <!-- Major Vote Card -->
      <router-link to="/votemajor" custom v-slot="{ navigate, isExactActive }">
        <div
          @click="navigate"
          @keyup.enter="navigate"
          :class="{
            'ring-2 ring-blue-500 shadow-lg': isExactActive,
            'hover:ring-1 hover:ring-blue-300': !isExactActive,
          }"
          class="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 focus:outline-none"
          tabindex="0"
          role="button"
        >
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <div
                class="p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors duration-200 mb-4"
              >
                <UsersIcon class="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3
                class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200"
              >
                Department
              </h3>
              <p
                class="mt-2 text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200"
              >
                Vote for your major's King & Queen
              </p>
            </div>
            <div class="mt-6">
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <StarIcon
                    class="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0"
                  />
                  <span>Only for students and teachers in your major</span>
                </li>
                <li class="flex items-start">
                  <StarIcon
                    class="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0"
                  />
                  <span>Department-specific competition</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import getUserById from "@/composables/getUserById";
import { StarIcon, TrophyIcon, UsersIcon } from "@heroicons/vue/24/solid";
import { onMounted } from "vue";
import router from "@/router";
import { ref } from "vue";

export default {
  components: {
    StarIcon,
    TrophyIcon,
    UsersIcon,
    NavBar,
    Footer,
  },

  setup() {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    const isOther = ref(false);

    if (role === "other") {
      router.push("/voteuniversity");
    } 

    const userForm =
      role === "teacher"
        ? "TeacherForm"
        : role === "student"
        ? "SelectYear"
        : "OtherForm";

    onMounted(async () => {
      if (userId) {
        try {
          const { userData, load } = getUserById(userId);
          await load();
          if (userData.value && userData.value.status === "active") {
           return;
          } else {
            router.push("/" + userForm);
  
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        router.push("/" + userForm);
      }
    });
  },


};
</script>

<style scoped>
[role="button"] {
  transition: all 0.2s ease;
}

[role="button"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

@media (prefers-reduced-motion: reduce) {
  [role="button"] {
    transition: none;
  }
}
</style>