<template>
      <nav
      class="p-4 shadow-lg sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
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
          <li>
            <router-link
              to="/about"
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

        <!-- Right section: Auth Buttons + Theme Toggle -->
        <div class="hidden md:flex items-center space-x-4">
          <button
            @click.prevent="openLoginModal"
            class="px-4 py-2 border border-primary-500 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
          >
            Login
          </button>
          <router-link
            to="/selectyear"
            class="px-4 py-2 bg-primary-500 text-white dark:bg-primary-600 dark:text-gray-100 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 text-sm font-semibold shadow-sm"
          >
            Register
          </router-link>


        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 space-y-4">
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

        <div class="flex flex-col space-y-4">
          <router-link
            to="/login"
            class="px-4 py-2 border border-primary-500 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm font-medium text-center"
            @click="mobileMenuOpen = false"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="px-4 py-2 bg-primary-500 text-white dark:bg-primary-600 dark:text-gray-100 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-300 text-sm font-semibold text-center shadow-sm"
            @click="mobileMenuOpen = false"
          >
            Register
          </router-link>

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
      </div>
    </nav>
        <!-- Login Modal Backdrop -->
        <div
      v-if="showLoginModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <!-- Login Modal Content -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
              Welcome back
            </h2>
            <button
              @click="closeLoginModal"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-500 dark:text-gray-400"
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
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label
                for="login-email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >Email</label
              >
              <input
                id="login-email"
                v-model="loginForm.email"
                type="email"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="login-password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >Password</label
              >
              <div class="relative">
                <input
                  id="login-password"
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <svg
                    v-if="showPassword"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="loginForm.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 dark:text-primary-400 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >Remember me</label
                >
              </div>

              <a
                href="#"
                class="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >Forgot password?</a
              >
            </div>

            <button
              type="submit"
              class="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75"
              :disabled="isLoggingIn"
            >
              <span v-if="!isLoggingIn">Sign In</span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            </button>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div
                    class="w-full border-t border-gray-300 dark:border-gray-600"
                  ></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span
                    class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >Or continue with</span
                  >
                </div>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="loginWithGoogle"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  @click="loginWithGithub"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?
                <button
                  type="button"
                  @click="openRegisterModal"
                  class="text-primary-600 dark:text-primary-400 font-medium hover:underline focus:outline-none"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";



// Login modal state
const showLoginModal = ref(false);
const showPassword = ref(false);
const isLoggingIn = ref(false);

// Login form data
const loginForm = ref({
  email: "",
  password: "",
  rememberMe: false,
});

// Open login modal
const openLoginModal = () => {
  showLoginModal.value = true;
};

// Close login modal
const closeLoginModal = () => {
  showLoginModal.value = false;
};

// Login handler
const handleLogin = async () => {
  isLoggingIn.value = true;
  try {
    console.log("Logging in with:", loginForm.value);
    // Add your actual login logic here
    // await authStore.login(loginForm.value)
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    closeLoginModal();
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    isLoggingIn.value = false;
  }
};

// Social login methods
const loginWithGoogle = () => {
  console.log("Login with Google");
  // Implement Google OAuth
};

const loginWithGithub = () => {
  console.log("Login with GitHub");
  // Implement GitHub OAuth
};

// If you want to keep the register option
const openRegisterModal = () => {
  closeLoginModal();
  // You could open a register modal here if needed
  console.log("Open register modal");
};
</script>

<style>

</style>