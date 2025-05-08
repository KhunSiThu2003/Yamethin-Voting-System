<template>
  <nav
    class="p-4 shadow-lg w-full fixed top-0 z-50 bg-white dark:bg-gray-900/95 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <h1
        class="text-2xl font-extrabold tracking-wide text-primary-600 dark:text-primary-400"
      >
        TU <span class="text-xs">Yamethin</span>
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
            to="/home"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Home
          </router-link>
        </li>
        <li v-if="currentUser">
          <router-link
            to="/voteuniversity"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Vote
          </router-link>
        </li>
        <li>
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
            to="/policies"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Policies
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-300"
            active-class="text-primary-600 dark:text-primary-400 font-semibold"
          >
            Contact Us
          </router-link>
        </li>
      </ul>

      <!-- User Profile or Auth Buttons -->
      <div v-if="currentUser" class="md:flex hidden items-center space-x-2">
        <button @click="showUserDetails" class="flex items-center space-x-2">
          <img
            v-if="currentUser.profileImage"
            :src="currentUser.profileImage"
            alt="Profile Image"
            class="w-10 h-10 rounded-full border border-purple-400"
          />
          <span
            v-else
            class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 font-semibold"
          >
            {{
              currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "O"
            }}
          </span>
        </button>
        <button
          @click="handleToggleTheme"
          class="flex items-center justify-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-500 dark:text-primary-400"
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
        </button>
      </div>
      <div v-else class="hidden md:flex items-center space-x-4">
        <router-link
          to="/"
          @click.prevent="showLoginForm"
          class="px-4 py-2 border border-primary-500 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
        >
          Login
        </router-link>
        <router-link
          to="/otherform"
          class="px-4 py-2 bg-primary-500 text-white dark:bg-primary-600 dark:text-gray-100 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 text-sm font-semibold shadow-sm"
        >
          Register
        </router-link>
        <button
          @click="handleToggleTheme"
          class="flex items-center justify-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-500 dark:text-primary-400"
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
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden fixed inset-0 z-50 w-screen h-screen bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
    >
      <div class="container mx-auto px-4 py-6 h-full flex flex-col">
        <!-- Close Button -->
        <button
          @click="mobileMenuOpen = false"
          class="self-end p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-600 dark:text-gray-300"
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

        <!-- User Profile -->
        <div
          v-if="currentUser"
          @click="showUserDetails"
          class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 mb-6 cursor-pointer hover:shadow-sm transition-all duration-200"
        >
          <div class="flex items-center space-x-3">
            <div class="relative">
              <img
                v-if="currentUser.profileImage"
                :src="currentUser.profileImage"
                alt="Profile Image"
                class="w-12 h-12 rounded-full border-2 border-white dark:border-gray-600 shadow-sm"
              />
              <div
                v-else
                class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 font-semibold text-xl border-2 border-white dark:border-gray-600"
              >
                {{
                  currentUser.name
                    ? currentUser.name.charAt(0).toUpperCase()
                    : "O"
                }}
              </div>
              <div
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-600"
              ></div>
            </div>
            <div class="flex flex-col">
              <h2 class="font-medium text-gray-800 dark:text-gray-100">
                {{ currentUser.name }}
              </h2>
              <span
                v-if="currentUser.registerId"
                class="text-xs text-gray-500 dark:text-gray-400"
                >{{ currentUser.registerId }}</span
              >
            </div>
          </div>
          <button
            class="text-purple-500 dark:text-purple-400 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
          >
            View
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1">
          <ul class="space-y-3">
            <li>
              <router-link
                to="/home"
                class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                active-class="bg-purple-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-medium"
                @click="mobileMenuOpen = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </router-link>
            </li>
            <li>
              <router-link
                to="/vote"
                class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                active-class="bg-purple-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-medium"
                @click="mobileMenuOpen = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Vote
              </router-link>
            </li>
            <li>
              <router-link
                to="/results"
                class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                active-class="bg-purple-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-medium"
                @click="mobileMenuOpen = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Results
              </router-link>
            </li>
            <li>
              <router-link
                to="/policies"
                class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                active-class="bg-purple-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-medium"
                @click="mobileMenuOpen = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Policies
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                active-class="bg-purple-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-medium"
                @click="mobileMenuOpen = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- Action Buttons -->
        <div
          class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3"
        >
          <!-- Theme Toggle -->
          <button
            @click="handleToggleTheme"
            class="flex w-full items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-200"
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
            <span class="font-medium">
              {{ theme === "dark" ? "Light Mode" : "Dark Mode" }}
            </span>
          </button>

          <!-- Auth Buttons -->
          <div v-if="!currentUser" class="grid grid-cols-2 gap-3">
            <router-link
              to="/"
              @click.prevent="showLoginForm"
              class="px-4 py-3 text-center rounded-lg border border-purple-500 text-purple-500 dark:text-purple-400 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
            >
              Login
            </router-link>
            <router-link
              to="/otherform"
              class="px-4 py-3 text-center rounded-lg bg-purple-500 text-white dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-500 transition-all duration-200 text-sm font-semibold shadow-sm"
              @click="mobileMenuOpen = false"
            >
              Register
            </router-link>
          </div>

          <!-- Logout Button -->
          <button
            v-if="currentUser"
            @click="handleLogout"
            class="flex w-full items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200 text-red-500 dark:text-red-400"
          >
            <svg
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase/config";
import Swal from "sweetalert2";

export default {
  props: ['userData'],
  
  setup(props) {
    const router = useRouter();
    const userId = localStorage.getItem("userId");
    const currentUser = ref(
      props.userData || JSON.parse(localStorage.getItem("userData")) || null
    );

    // Reactive state
    const theme = ref("light");
    const mobileMenuOpen = ref(false);

    const showUserDetails = () => {
      if (!currentUser.value) return;

      Swal.fire({
        html: `
            <div class="w-full max-w-md mx-auto">
              <!-- Profile Image -->
              <div class="relative mx-auto mb-4 sm:mb-6 w-24 h-24 sm:w-32 sm:h-32">
                ${
                  currentUser.value.profileImage
                    ? `<img src="${currentUser.value.profileImage}" alt="Profile" 
                         class="w-full h-full rounded-full border-4 border-purple-100 dark:border-purple-900 object-cover shadow-md">`
                    : `<div class="w-full h-full rounded-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 
                         border-4 border-purple-100 dark:border-purple-900 flex items-center justify-center text-2xl sm:text-4xl text-purple-400 dark:text-purple-300 font-bold shadow-md">
                         ${
                           currentUser.value.name
                             ? currentUser.value.name.charAt(0).toUpperCase()
                             : "O"
                         }
                       </div>`
                }
              </div>
              
              <!-- Details Container -->
              <div class="space-y-2 sm:space-y-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-inner">
                <!-- Name -->
                <div class="flex items-start">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-purple-500 dark:text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span class="ml-2 text-sm sm:text-base">
                    <strong class="text-gray-700 dark:text-gray-300">Name: </strong> 
                    <span class="text-gray-900 dark:text-white">${
                      currentUser.value.name || "Not provided"
                    }</span>
                  </span>
                </div>
                
                <!-- Register ID -->
                <div class="flex items-start">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-purple-500 dark:text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 00-2-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  <span class="ml-2 text-sm sm:text-base">
                    <strong class="text-gray-700 dark:text-gray-300">Register ID: </strong> 
                    <span class="text-gray-900 dark:text-white">${
                      currentUser.value.registerId || "Not provided"
                    }</span>
                  </span>
                </div>
                
                <!-- Status -->
                <div class="flex items-start">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-purple-500 dark:text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <span class="ml-2 text-sm sm:text-base">
                    <strong class="text-gray-700 dark:text-gray-300">Status: </strong> 
                    <span class="px-2 py-0.5 sm:py-1 text-xs rounded-full ${
                      currentUser.value.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }">${currentUser.value.status || "unknown"}</span>
                  </span>
                </div>
              </div>
            </div>
          `,
        showCancelButton: true,
        confirmButtonText: `<span class="flex items-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 00-2-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit
            </span>`,
        cancelButtonText: `<span class="flex items-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Close
            </span>`,
        confirmButtonColor: "#8b5cf6",
        cancelButtonColor: "#6b7280",
        showDenyButton: true,
        denyButtonText: `<span class="flex items-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </span>`,
        denyButtonColor: "#ef4444",
        width: "auto",
        padding: "1rem",
        background: "#ffffff dark:bg-gray-800",
        backdrop: `
              rgba(0, 0, 0, 0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
        customClass: {
          container: "dark:bg-gray-900/80",
          popup:
            "rounded-lg sm:rounded-xl shadow-2xl dark:bg-gray-800 max-w-[95vw]",
          title: "dark:text-white",
          htmlContainer: "dark:text-gray-300",
          confirmButton:
            "dark:bg-purple-600 dark:hover:bg-purple-700 text-xs sm:text-sm",
          cancelButton:
            "dark:bg-gray-600 dark:hover:bg-gray-700 text-xs sm:text-sm",
          denyButton:
            "dark:bg-red-600 dark:hover:bg-red-700 text-xs sm:text-sm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Show edit form with file upload for profile picture
          Swal.fire({
            title: "Edit Profile",
            html: `
                <div class="space-y-3 sm:space-y-4 text-left">
                  <div class="mt-2 sm:mt-4 flex justify-center">
                    <img id="profile-image-preview" src="${
                      currentUser.value.profileImage || ""
                    }" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200 dark:border-gray-600 ${
              !currentUser.value.profileImage ? "hidden" : ""
            }" alt="Preview">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input 
                      id="swal-input-name" 
                      class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" 
                      value="${currentUser.value.name || ""}"
                      placeholder="Enter your name">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Image</label>
                    <div class="mt-1 flex items-center">
                      <label for="file-upload" class="cursor-pointer">
                        <span class="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs sm:text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <svg class="-ml-0.5 mr-1 sm:-ml-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          ${
                            currentUser.value.profileImage
                              ? "Change Photo"
                              : "Upload Photo"
                          }
                        </span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*">
                      </label>
                      <span id="file-name" class="ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px] sm:max-w-xs">
                        ${
                          currentUser.value.profileImage
                            ? "Current image set"
                            : "No file selected"
                        }
                      </span>
                    </div>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Recommended size: 500x500 pixels (2MB max)
                    </p>
                  </div>
                </div>
              `,
            focusConfirm: false,
            preConfirm: async () => {
              const name = document.getElementById("swal-input-name").value;
              const fileInput = document.getElementById("file-upload");
              let profileImage = currentUser.value.profileImage || "";

              // If a new file was uploaded
              if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];

                // Validate file size (2MB max)
                if (file.size > 2 * 1024 * 1024) {
                  Swal.showValidationMessage(
                    "File size should be less than 2MB"
                  );
                  return false;
                }

                // Convert image to Base64
                try {
                  profileImage = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => resolve(event.target.result);
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file);
                  });
                } catch (error) {
                  console.error("Error converting image:", error);
                  Swal.showValidationMessage("Failed to process image");
                  return false;
                }
              }

              return { name, profileImage };
            },
            showCancelButton: true,
            confirmButtonText: "Save Changes",
            cancelButtonText: "Cancel",
            width: "auto",
            padding: "1rem",
            didOpen: () => {
              const fileInput = document.getElementById("file-upload");
              const fileNameDisplay = document.getElementById("file-name");
              const preview = document.getElementById("profile-image-preview");

              fileInput.addEventListener("change", (e) => {
                if (e.target.files.length > 0) {
                  const file = e.target.files[0];

                  // Validate file type
                  if (!file.type.match("image.*")) {
                    fileNameDisplay.textContent = "Invalid file type";
                    return;
                  }

                  // Validate file size
                  if (file.size > 2 * 1024 * 1024) {
                    fileNameDisplay.textContent = "File too large (max 2MB)";
                    return;
                  }

                  fileNameDisplay.textContent = file.name;

                  // Create a preview of the selected image
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    preview.src = event.target.result;
                    preview.classList.remove("hidden");
                  };
                  reader.readAsDataURL(file);
                } else {
                  fileNameDisplay.textContent = currentUser.value.profileImage
                    ? "Current image set"
                    : "No file selected";
                  if (!currentUser.value.profileImage) {
                    preview.classList.add("hidden");
                  }
                }
              });
            },
            background: "#ffffff dark:bg-gray-800",
            customClass: {
              popup: "dark:bg-gray-800 rounded-lg sm:rounded-xl max-w-[95vw]",
              title: "dark:text-white text-lg sm:text-xl",
              htmlContainer: "dark:text-gray-300",
              confirmButton: "text-xs sm:text-sm",
              cancelButton: "text-xs sm:text-sm",
            },
          }).then(async (result) => {
            if (result.isConfirmed) {
              const { name, profileImage } = result.value;
              try {
                // Show loading state
                Swal.fire({
                  title: "Updating profile...",
                  allowOutsideClick: false,
                  didOpen: () => {
                    Swal.showLoading();
                  },
                  background: "#ffffff dark:bg-gray-800",
                  customClass: {
                    popup: "dark:bg-gray-800 rounded-lg",
                    title: "dark:text-white",
                  },
                });

                await db.collection("otherStaff").doc(userId).update({
                  name: name,
                  profileImage: profileImage,
                });

                // Update local state
                currentUser.value.name = name;
                currentUser.value.profileImage = profileImage;

                Swal.fire({
                  title: "Success!",
                  text: "Profile updated successfully",
                  icon: "success",
                  confirmButtonColor: "#8b5cf6",
                  background: "#ffffff dark:bg-gray-800",
                  customClass: {
                    popup: "dark:bg-gray-800 rounded-lg",
                    title: "dark:text-white",
                    content: "dark:text-gray-300",
                  },
                });
              } catch (error) {
                console.error("Error updating profile:", error);
                Swal.fire({
                  title: "Error!",
                  text: "Failed to update profile",
                  icon: "error",
                  confirmButtonColor: "#ef4444",
                  background: "#ffffff dark:bg-gray-800",
                  customClass: {
                    popup: "dark:bg-gray-800 rounded-lg",
                    title: "dark:text-white",
                    content: "dark:text-gray-300",
                  },
                });
              }
            }
          });
        } else if (result.isDenied) {
          handleLogout();
        }
      });
    };

    const handleLogout = async () => {
      const currentTheme = localStorage.getItem("theme") || "light";

      const swalOptions = {
        title: "Logout",
        text: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#ef4444",
        reverseButtons: true,
        focusCancel: true,
        background: currentTheme === "dark" ? "#1e293b" : "#ffffff",
        color: currentTheme === "dark" ? "#f8fafc" : "#0f172a",
        width: "90%", // Responsive width
        padding: "1rem",
        customClass: {
          popup: "swal-responsive",
        },
      };

      const result = await Swal.fire(swalOptions);

      if (result.isConfirmed) {
        Swal.fire({
          title: "Logging out...",
          html: "Please wait while we secure your session",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          background: currentTheme === "dark" ? "#1e293b" : "#ffffff",
          color: currentTheme === "dark" ? "#f8fafc" : "#0f172a",
          width: "90%",
          padding: "1rem",
          customClass: {
            popup: "swal-responsive",
          },
          willOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await db
            .collection("otherStaff")
            .doc(userId)
            .set({ status: "logout" }, { merge: true });
          localStorage.clear();
          currentUser.value = null;
          Swal.close();
          window.location.href = "/";
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            icon: "error",
            title: "Logout Failed",
            text: "Could not complete logout. Please try again.",
            confirmButtonColor: "#ef4444",
            background: currentTheme === "dark" ? "#1e293b" : "#ffffff",
            color: currentTheme === "dark" ? "#f8fafc" : "#0f172a",
            width: "90%",
            padding: "1rem",
            customClass: {
              popup: "swal-responsive",
            },
          });
        }
      }
    };

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const handleToggleTheme = () => {
      theme.value = theme.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme.value);
      document.documentElement.classList.toggle("dark", theme.value === "dark");
    };

    const showLoginForm = () => {
      const currentTheme = theme.value;

      Swal.fire({
        title: "Welcome Back",
        html: `
        <div class="space-y-4">
          <div>
            <label class="block text-start text-sm font-medium mb-1 ${
              currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
            }">Register ID</label>
            <input 
              id="swal-input-registerId" 
              class="w-full px-4 py-2 text-sm border ${
                currentTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" 
              placeholder="Enter your register ID"
              autocomplete="username">
          </div>
          <div>
            <label class="block text-start text-sm font-medium mb-1 ${
              currentTheme === "dark" ? "text-gray-300" : "text-gray-700"
            }">Password</label>
            <input 
              id="swal-input-password" 
              type="password"
              class="w-full px-4 py-2 text-sm border ${
                currentTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" 
              placeholder="Enter your password"
              autocomplete="current-password">
          </div>
          <div class="mt-4 text-center">
            <span class="text-sm ${
              currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
            }">Don't have an account? </span>
            <a href="/otherform" class="text-sm ${
              currentTheme === "dark"
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-800"
            } font-medium">Register</a>
          </div>
        </div>
      `,
        showCancelButton: true,
        confirmButtonText: "Sign In",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        preConfirm: () => {
          const registerId = document.getElementById(
            "swal-input-registerId"
          ).value;
          const password = document.getElementById("swal-input-password").value;

          if (!registerId || !password) {
            Swal.showValidationMessage("Please fill in all fields");
            return false;
          }

          return { registerId, password };
        },
        width: "26rem",
        padding: "1.5rem",
        background: currentTheme === "dark" ? "#1f2937" : "#ffffff",
        customClass: {
          popup: "rounded-xl shadow-2xl",
          title: `${
            currentTheme === "dark" ? "text-white" : "text-gray-800"
          } text-xl font-semibold`,
          htmlContainer: `${
            currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
          }`,
          confirmButton: `px-5 py-2 rounded-lg ${
            currentTheme === "dark"
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-purple-500 hover:bg-purple-600"
          } text-white font-medium transition-colors duration-200`,
          cancelButton: `px-5 py-2 rounded-lg ${
            currentTheme === "dark"
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-100 hover:bg-gray-200"
          } ${
            currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
          } font-medium transition-colors duration-200`,
          validationMessage: "text-red-500 dark:text-red-400 mt-2 text-sm",
        },
        didOpen: () => {
          document.getElementById("swal-input-registerId").focus();

          // Handle register link click to prevent SweetAlert from closing
          const registerLink = document.querySelector('a[href="/otherform"]');
          if (registerLink) {
            registerLink.addEventListener("click", (e) => {
              e.preventDefault();
              Swal.close();
              router.push("/otherform");
            });
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { registerId, password } = result.value;

          // Show loading state
          Swal.fire({
            title: "Authenticating...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            background: currentTheme === "dark" ? "#1f2937" : "#ffffff",
            customClass: {
              popup: "rounded-xl",
              title: currentTheme === "dark" ? "text-white" : "text-gray-800",
            },
          });

          try {
            // Check credentials
            const otherStaffRef = db
              .collection("otherStaff")
              .where("registerId", "==", registerId);
            const snapshot = await otherStaffRef.get();

            if (snapshot.empty) {
              throw new Error("Invalid credentials");
            }

            const otherStaffData = snapshot.docs[0].data();

            // In a real app, use proper password hashing
            if (otherStaffData.password !== password) {
              throw new Error("Invalid credentials");
            }

            // Store user ID
            localStorage.setItem("userId", snapshot.docs[0].id);
            localStorage.setItem("userPassword", password);

            // Update user status
            await db.collection("otherStaff").doc(snapshot.docs[0].id).update({
              status: "active",
              lastLogin: new Date(),
            });

            // Close loading state and show success
            Swal.close();
            router.push("/");
          } catch (error) {
            console.error("Login error:", error);
            Swal.fire({
              title: "Login Failed",
              text: "Invalid register ID or password",
              icon: "error",
              confirmButtonColor: "#ef4444",
              background: currentTheme === "dark" ? "#1f2937" : "#ffffff",
              customClass: {
                popup: "rounded-xl",
                title: currentTheme === "dark" ? "text-white" : "text-gray-800",
              },
            });
          }
        }
      });
    };

    // Load theme on mounted
    onMounted(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        theme.value = savedTheme;
        document.documentElement.classList.toggle(
          "dark",
          theme.value === "dark"
        );
      } else {
        theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
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
      handleToggleTheme,
      showLoginForm,
    };
  },
};
</script>
  
  <style>
.swal-responsive {
  max-width: 400px;
  width: 90vw;
  font-size: 0.95rem;
}
</style>