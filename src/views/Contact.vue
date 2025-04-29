<template>
    <NavBar />
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white my-4">Contact Us</h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">Get in touch with the election committee</p>
        </div>
  
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Contact Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-6">Committee Information</h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 dark:text-primary-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                  <p class="text-gray-600 dark:text-gray-300">+95 9 123 456 789</p>
                  <p class="text-gray-600 dark:text-gray-300">+95 9 987 654 321</p>
                </div>
              </div>
  
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 dark:text-primary-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                  <p class="text-gray-600 dark:text-gray-300">election@tuym.edu.mm</p>
                  <p class="text-gray-600 dark:text-gray-300">support@tuym.edu.mm</p>
                </div>
              </div>
  
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 dark:text-primary-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Address</h3>
                  <p class="text-gray-600 dark:text-gray-300">Technological University (Yamethin)</p>
                  <p class="text-gray-600 dark:text-gray-300">Yamethin Township, Mandalay Region</p>
                  <p class="text-gray-600 dark:text-gray-300">Myanmar</p>
                </div>
              </div>
  
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 dark:text-primary-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Office Hours</h3>
                  <p class="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 4:00 PM</p>
                  <p class="text-gray-600 dark:text-gray-300">Saturday: 9:00 AM - 12:00 PM</p>
                  <p class="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-6">Send Us a Message</h2>
            
            <form @submit.prevent="submitForm" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
              </div>
  
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
              </div>
  
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
              </div>
  
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  v-model="form.message"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"></textarea>
              </div>
  
              <div>
                <button 
                  type="submit" 
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300"
                  :disabled="loading">
                  <span v-if="loading">Sending...</span>
                  <span v-else>Send Message</span>
                </button>
              </div>
  
              <div v-if="successMessage" class="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
                {{ successMessage }}
              </div>
              <div v-if="errorMessage" class="p-3 bg-red-100 dark:red-900/30 text-red-700 dark:text-red-300 rounded-md">
                {{ errorMessage }}
              </div>
            </form>
          </div>
        </div>
  
        <!-- Map -->
        <div class="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.308070971456!2d96.14337231535365!3d16.85483798839862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c193f0b8b1f4a5%3A0x3e1e3e1e3e1e3e1e!2sTechnological%20University%20(Yamethin)!5e0!3m2!1sen!2smm!4v1620000000000!5m2!1sen!2smm" 
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            class="dark:filter dark:brightness-75 dark:contrast-110"></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue";
  import { ref } from "vue";
  
  export default {
    name: "ContactUs",
    components: {
      NavBar
    },
    setup() {
      const form = ref({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      const loading = ref(false);
      const successMessage = ref('');
      const errorMessage = ref('');
  
      const submitForm = () => {
        loading.value = true;
        errorMessage.value = '';
        successMessage.value = '';
        
        // Simulate form submission
        setTimeout(() => {
          loading.value = false;
          successMessage.value = 'Your message has been sent successfully! We will get back to you soon.';
          form.value = { name: '', email: '', subject: '', message: '' };
        }, 1500);
      };
  
      return {
        form,
        loading,
        successMessage,
        errorMessage,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  </style>