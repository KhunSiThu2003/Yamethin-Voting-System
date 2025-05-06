<template>
  <footer
    class="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 pt-12 pb-8"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <!-- Navigation -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Navigation
          </h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/home" class="footer-link">Home</router-link>
            </li>
            <li>
              <router-link to="/vote" class="footer-link">Vote</router-link>
            </li>
            <li>
              <router-link to="/results" class="footer-link"
                >Results</router-link
              >
            </li>
            <li>
              <router-link to="/policies" class="footer-link"
                >Policies</router-link
              >
            </li>
            <li>
              <router-link to="/contact" class="footer-link"
                >Contact Us</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Address -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Address
          </h4>
          <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>TU Yamethin, IT Department</p>
            <p>Yamethin Township</p>
            <p>Mandalay Region, Myanmar</p>
          </div>
          
        </div>

        <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Contact Info
          </h4>
          <div class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>Phone: +95 9 123456789</p>
            <p>
              Email :
              <a
                href="mailto:khunsithuaung65@gmail.com"
                class="text-blue-500 hover:underline"
              >
                khunsithuaung65@gmail.com
              </a>
            </p>
          </div>

          <h4 class="text-lg font-semibold text-gray-800 dark:text-white my-4">
            Follow Us
          </h4>
          <div class="flex space-x-6">
            <a href="#" class="footer-icon" aria-label="Facebook">
              <i class="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" class="footer-icon" aria-label="Twitter">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="footer-icon" aria-label="Instagram">
              <i class="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div
        class="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm"
      >
      <div class="text-gray-500 dark:text-gray-400 mb-2 md:mb-0">
          <p>Developed by <em>Khun Si Thu</em></p>
          <a
            href="mailto:khunsithuaung65@gmail.com"
            class="text-blue-500 hover:underline"
          >
            khunsithuaung65@gmail.com
          </a>
        </div>
        <p class="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
          &copy; 2024 TU Yamethin. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
  
  <script>
export default {};
</script>
  
  <style scoped>
.footer-link {
  @apply text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300;
}

.footer-icon {
  @apply text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-300;
}
</style>
  