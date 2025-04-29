<template>
  <nav
    class="p-4 shadow-lg absolute w-full top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <h1
        class="text-2xl font-extrabold tracking-wide text-primary-600 dark:text-primary-400"
      >
        TU
      </h1>

      <!-- Mobile menu button -->
      <button @click="toggleMobileMenu" class="md:hidden focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Navigation Links - Desktop -->
      <ul class="hidden md:flex space-x-8 text-lg">
        <li>
          <router-link
            to="/"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Home
          </router-link>
        </li>
        <li v-if="currentUser">
          <router-link
            to="/vote"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Vote
          </router-link>
        </li>
        <li v-if="currentUser">
          <router-link
            to="/results"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Results
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            About
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Contact
          </router-link>
        </li>
      </ul>

      <!-- User Profile or Auth Buttons -->
      <div v-if="currentUser" class="flex items-center space-x-2">
        <button @click="showUserDetails" class="flex items-center space-x-2">
          <img
            v-if="currentUser.profileImage"
            :src="currentUser.profileImage"
            alt="Profile Image"
            class="w-10 h-10 rounded-full border border-blue-400"
          />
        </button>
      </div>
      <div v-else class="hidden md:flex items-center space-x-4">
        <router-link
          to="/login"
          class="px-4 py-2 border border-primary-500 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
        >
          Login
        </router-link>
        <router-link
          to="/selectyear"
          class="px-4 py-2 bg-primary-500 text-white dark:bg-primary-600 dark:text-gray-100 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 text-sm font-semibold shadow-sm"
        >
          Register
        </router-link>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden fixed inset-0 z-50 w-screen h-screen p-4 bg-gray-50 dark:bg-gray-900 space-y-4 pt-20"
    >
      <button
        @click="mobileMenuOpen = false"
        class="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <ul class="flex flex-col space-y-4 text-lg">
        <li>
          <router-link
            to="/"
            class="block hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
            @click="mobileMenuOpen = false"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="block hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
            @click="mobileMenuOpen = false"
          >
            Vote
          </router-link>
        </li>
        <li>
          <router-link
            to="/results"
            class="block hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
            @click="mobileMenuOpen = false"
          >
            Results
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="block hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
            @click="mobileMenuOpen = false"
          >
            About
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="block hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
            @click="mobileMenuOpen = false"
          >
            Contact
          </router-link>
        </li>
      </ul>

      <div v-if="!currentUser" class="flex flex-col space-y-4">
        <router-link
          to="/login"
          class="px-4 py-2 border border-primary-500 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm font-medium text-center"
          @click="mobileMenuOpen = false"
        >
          Login
        </router-link>
        <router-link
          to="/selectyear"
          class="px-4 py-2 bg-primary-500 text-white dark:bg-primary-600 dark:text-gray-100 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 text-sm font-semibold text-center shadow-sm"
          @click="mobileMenuOpen = false"
        >
          Register
        </router-link>
      </div>

      <button
        @click="handleToggleTheme"
        class="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-500 dark:text-primary-400"
      >
        <svg
          v-if="theme === 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12h1m15.364 4.95l.707.707M4.222 5.636l.707.707m0 11.314l.707-.707m15.364-15.364l.707-.707M12 5a7 7 0 000 14 7 7 0 000-14z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
        <span>Toggle Theme</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import getStudentById from "@/composables/getStudentById";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";

export default {
  props:['currentUser'],
  setup(props) {
    const router = useRouter();
    const userId = localStorage.getItem("userId");

    console.log(props.currentUser)
    
    // Reactive state
    const theme = ref("light");
    const mobileMenuOpen = ref(false);
    const currentUser = ref(null);

    // Methods
    const showUserDetails = () => {
      if (!currentUser.value) return;

      Swal.fire({
        title: `<span class="text-2xl font-bold text-gray-800 dark:text-white">User Profile</span>`,
        html: `
          <div class="text-center max-w-md mx-auto">
            <div class="relative mx-auto mb-6">
              ${
                currentUser.value.profileImage
                  ? `<img src="${currentUser.value.profileImage}" alt="Profile" 
                       class="w-32 h-32 rounded-full border-4 border-blue-100 dark:border-blue-900 object-cover shadow-md mx-auto">`
                  : `<div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 
                       border-4 border-blue-100 dark:border-blue-900 flex items-center justify-center text-4xl text-blue-400 dark:text-blue-300 font-bold shadow-md mx-auto">
                       ${currentUser.value.name ? currentUser.value.name.charAt(0).toUpperCase() : '?'}
                     </div>`
              }
            </div>
            
            <div class="space-y-3 text-left bg-gray-50 dark:bg-gray-800 rounded-xl p-5 shadow-inner">
              <div class="flex items-start">
                <svg class="w-5 h-5 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="ml-3"><strong class="text-gray-700 dark:text-gray-300">Name:</strong> 
                <span class="text-gray-900 dark:text-white">${currentUser.value.name || "Not provided"}</span></span>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span class="ml-3"><strong class="text-gray-700 dark:text-gray-300">Roll No:</strong> 
                <span class="text-gray-900 dark:text-white">${currentUser.value.rollno || "Not provided"}</span></span>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="ml-3"><strong class="text-gray-700 dark:text-gray-300">Year:</strong> 
                <span class="text-gray-900 dark:text-white">${currentUser.value.year || "Not provided"}</span></span>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span class="ml-3"><strong class="text-gray-700 dark:text-gray-300">Major:</strong> 
                <span class="text-gray-900 dark:text-white">${currentUser.value.major || "Not provided"}</span></span>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="ml-3"><strong class="text-gray-700 dark:text-gray-300">Status:</strong> 
                <span class="px-2 py-1 text-xs rounded-full ${
                  currentUser.value.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }">${currentUser.value.status || "unknown"}</span></span>
              </div>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: `<span class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Edit Profile
        </span>`,
        cancelButtonText: `<span class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Close
        </span>`,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#6b7280",
        showDenyButton: true,
        denyButtonText: `<span class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </span>`,
        denyButtonColor: "#ef4444",
        width: "32rem",
        padding: "2rem",
        background: "#ffffff",
        backdrop: `
          rgba(0, 0, 0, 0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        customClass: {
          container: 'dark:bg-gray-900/80',
          popup: 'rounded-xl shadow-2xl dark:bg-gray-800',
          title: 'dark:text-white',
          htmlContainer: 'dark:text-gray-300',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/ProfileForm");
        } else if (result.isDenied) {
          handleLogout();
        }
      });
    };

    const handleLogout = async () => {
      Swal.fire({
        title: "Logout",
        text: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#ef4444",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await db.collection("students").doc(userId).set({
            status: "logout"
          }, {
            merge: true
          });

          localStorage.removeItem("userId");
          currentUser.value = null;
          window.location.href = "/";
        }
      });
    };

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const handleToggleTheme = () => {
      theme.value = theme.value === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", theme.value === "dark");
    };

    // Lifecycle hooks
    onMounted(async () => {
      if (userId) {
        try {
          const { userData, load } = getStudentById(userId);
          await load();
          if (userData.value && userData.value.status === "active") {
            currentUser.value = userData.value;
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    });

    // Return all reactive properties and methods
    return {
      theme,
      mobileMenuOpen,
      currentUser,
      showUserDetails,
      handleLogout,
      toggleMobileMenu,
      handleToggleTheme
    };
  }
};
</script>