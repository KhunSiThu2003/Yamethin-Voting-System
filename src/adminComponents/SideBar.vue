<template>
  <!-- Mobile Navigation Bar -->
  <nav class="sm:hidden w-full bg-white dark:bg-gray-800 sticky top-0 z-30 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between px-4 py-3">
      <button 
        @click="toggleSidebar"
        type="button" 
        class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600 transition-all duration-200"
        aria-label="Toggle Sidebar"
      >
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      
      <div class="text-lg font-semibold text-gray-800 dark:text-white">
        Admin Dashboard
      </div>
      
      <div class="w-6"></div>
    </div>
  </nav>

  <!-- Sidebar -->
  <aside 
    id="sidebar" 
    ref="sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
    :class="{ 'translate-x-0': isSidebarOpen }"
    aria-label="Sidebar"
  >
    <div class="h-full flex flex-col overflow-y-auto">
      <!-- Sidebar Header -->
      <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div class="flex-1">
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Welcome back, {{ adminData?.name || 'Admin' }}</p>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 px-3 py-4">
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.name">
            <router-link 
              :to="{ name: item.route }" 
              class="flex items-center p-3 rounded-lg transition-colors duration-200"
              :class="{
                'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400': isActiveRoute(item.route),
                'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700': !isActiveRoute(item.route)
              }"
              @click="closeSidebarOnMobile"
            >
              <i :class="['text-lg w-6 flex-shrink-0', item.icon]"></i>
              <span class="ml-3">{{ item.name }}</span>
              <span v-if="item.badge !== undefined" class="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                {{ item.badge }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Bottom Section -->
      <div class="px-3 pb-4 mt-auto">
        <button 
          @click="changePassword"
          class="w-full mb-3 flex items-center p-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <i class="fas fa-key text-lg w-6 flex-shrink-0"></i>
          <span class="ml-3">Change Password</span>
        </button>
        
        <!-- Theme Toggle -->
        <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
          <div class="flex items-center">
            <i :class="['fas', isDarkMode ? 'fa-sun text-yellow-300' : 'fa-moon text-gray-500', 'mr-2']"></i>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </span>
          </div>
          <button 
            @click="toggleDarkMode"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
            :class="isDarkMode ? 'bg-blue-600' : 'bg-gray-200'"
          >
            <span class="sr-only">Toggle dark mode</span>
            <span 
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
              :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>

        <!-- Logout Button -->
        <button 
          @click="logout"
          class="w-full mt-3 flex items-center p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
        >
          <i class="fas fa-right-from-bracket text-lg w-6 flex-shrink-0"></i>
          <span class="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { db } from '@/firebase/config';


export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const sidebar = ref(null);
    
    const isSidebarOpen = ref(false);
    const isDarkMode = ref(localStorage.getItem('darkMode') === 'true' || 
                      (!localStorage.getItem('darkMode') && 
                      window.matchMedia('(prefers-color-scheme: dark)').matches));

    const adminData = ref(JSON.parse(localStorage.getItem("adminData")) || {
      name: "admin",
      password: "asdfasdf"
    });

    const navItems = ref([
      { name: 'Manage Deadline', route: 'Deadline', icon: 'fa-solid fa-calendar-days' },
      { name: 'Manage Users', route: 'ManageUsers', icon: 'fa-solid fa-user-gear' },
      { name: 'Manage Candidates', route: 'Candidates', icon: 'fa-solid fa-users-gear' },
      { name: 'View Results', route: 'Res', icon: 'fa-solid fa-crown' },
      { name: 'Contact Messages', route: 'Messages', icon: 'fa-solid fa-comment-dots' },
    ]);

    onMounted(() => {
      updateDarkModeClass();
      setupClickOutsideListener();
    });

    const setupClickOutsideListener = () => {
      document.addEventListener('click', (event) => {
        if (isSidebarOpen.value && sidebar.value && !sidebar.value.contains(event.target) && 
            !event.target.closest('[aria-label="Toggle Sidebar"]')) {
          isSidebarOpen.value = false;
        }
      });
    };

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebarOnMobile = () => {
      if (window.innerWidth < 640) {
        isSidebarOpen.value = false;
      }
    };

    const isActiveRoute = (routeName) => {
      return route.name === routeName;
    };

    const updateDarkModeClass = () => {
      document.documentElement.classList.toggle('dark', isDarkMode.value);
    };

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value);
      updateDarkModeClass();
    };

    watch(isDarkMode, updateDarkModeClass);

    const logout = async () => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out of the admin panel.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'dark:bg-gray-800 dark:text-white',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
          cancelButton: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white'
        }
      });

      if (result.isConfirmed) {
        localStorage.setItem("status", "Slogout");
        localStorage.removeItem("adminData");
        router.push('/');
      }
    };

    const changePassword = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Change Admin Password',
        html:
          '<input id="current-password" class="swal2-input" placeholder="Current Password" type="password">' +
          '<input id="new-password" class="swal2-input" placeholder="New Password (min 8 chars)" type="password">' +
          '<input id="confirm-password" class="swal2-input" placeholder="Confirm New Password" type="password">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Update Password',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'dark:bg-gray-800 dark:text-white',
          input: 'dark:bg-gray-700 dark:border-gray-600 dark:text-white',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
          cancelButton: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white'
        },
        preConfirm: () => {
          const current = document.getElementById('current-password').value;
          const newPass = document.getElementById('new-password').value;
          const confirm = document.getElementById('confirm-password').value;
          
          // Validate current password
          if (current !== adminData.value.password) {
            Swal.showValidationMessage('Current password is incorrect');
            return false;
          }
          
          // Check if new password meets requirements
          if (newPass.length < 8) {
            Swal.showValidationMessage('Password must be at least 8 characters');
            return false;
          }
          
          // Check if new passwords match
          if (newPass !== confirm) {
            Swal.showValidationMessage('New passwords do not match');
            return false;
          }
          
          // Check if new password is different from current
          if (newPass === current) {
            Swal.showValidationMessage('New password must be different from current password');
            return false;
          }
          
          return {
            current: current,
            new: newPass,
            confirm: confirm
          };
        }
      });

      if (formValues) {
        try {
          Swal.fire({
            title: 'Updating Password...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
            customClass: {
              popup: 'dark:bg-gray-800 dark:text-white'
            }
          });

          // Update password in Firebase
          await db.collection('admin').doc('admin').update({
            password: formValues.new,
          });

          // Update local storage
          adminData.value.password = formValues.new;
          localStorage.setItem("adminData", JSON.stringify(adminData.value));

          await Swal.fire({
            icon: 'success',
            title: 'Password Updated!',
            text: 'Admin password has been changed successfully',
            customClass: {
              popup: 'dark:bg-gray-800 dark:text-white',
              confirmButton: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }
          });
        } catch (error) {
          console.error('Password change error:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to update password',
            customClass: {
              popup: 'dark:bg-gray-800 dark:text-white',
              confirmButton: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }
          });
        }
      }
    };

    return {
      isSidebarOpen,
      isDarkMode,
      adminData,
      navItems,
      sidebar,
      toggleSidebar,
      closeSidebarOnMobile,
      isActiveRoute,
      toggleDarkMode,
      logout,
      changePassword
    };
  }
};
</script>

<style scoped>
#sidebar {
  transition: transform 0.3s ease-in-out;
}

button:focus-visible, [role="button"]:focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}

.dark .fa-moon, .dark .fa-sun {
  transition: color 0.3s ease;
}
</style>