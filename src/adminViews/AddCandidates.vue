<template>
    
    <SideBar />
  
    <div class="sm:ml-64 min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
      <!-- Back Button -->
      <button @click="goBack" class="absolute top-6 left-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm mb-4 flex items-center transition-all duration-300">
        <i class="fa-solid fa-arrow-left mr-2"></i>
        Back
      </button>
  
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-500 mb-3">Add New Candidate</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">Fill in the candidate details below</p>
        </div>
  
        <!-- Main Content -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div class="flex flex-col lg:flex-row">
            <!-- Form Section -->
            <div class="w-full lg:w-1/2 p-8">
              <form class="space-y-6">
                <!-- Candidate Name -->
                <div>
                  <label for="candidateName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Candidate Name</label>
                  <input v-model="form.name" type="text" id="candidateName" placeholder="Enter candidate name"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    :class="{ 'border-red-500': errors.name }" />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.name }}</p>
                </div>
  
                <!-- Candidate Number -->
                <div>
                  <label for="candidateNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Candidate Number</label>
                  <input v-model="form.number" type="number" id="candidateNumber" placeholder="Enter candidate number"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    :class="{ 'border-red-500': errors.number }" />
                  <p v-if="errors.number" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.number }}</p>
                </div>
  
                <!-- Roll No -->
                <div>
                  <label for="rollNo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Roll Number</label>
                  <input v-model="form.rollno" type="text" id="rollNo" placeholder="Enter roll number"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    :class="{ 'border-red-500': errors.rollno }" />
                  <p v-if="errors.rollno" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.rollno }}</p>
                </div>
  
                <!-- Gender -->
                <div>
                  <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                  <select v-model="form.gender" id="gender"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    :class="{ 'border-red-500': errors.gender }">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <p v-if="errors.gender" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.gender }}</p>
                </div>
  
                <!-- Major -->
                <div>
                  <label for="major" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Major</label>
                  <select v-model="form.major" id="major"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    :class="{ 'border-red-500': errors.major }">
                    <option value="">Select Major</option>
                    <option value="Electronic Engineering">Electronic Engineering</option>
                    <option value="Electrical Power Engineering">Electrical Power Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                  <p v-if="errors.major" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.major }}</p>
                </div>
  
                <!-- Year -->
                <div>
                  <label for="year" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                  <select v-model="form.year" id="year"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    :class="{ 'border-red-500': errors.year }">
                    <option value="">Select Year</option>
                    <option value="First">First Year</option>
                    <option value="Second">Second Year</option>
                    <option value="Third">Third Year</option>
                    <option value="Fourth">Fourth Year</option>
                    <option value="Fifth">Fifth Year</option>
                    <option value="Sixth">Sixth Year</option>
                  </select>
                  <p v-if="errors.year" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.year }}</p>
                </div>
  
                <!-- Profile Image Upload -->
                <div>
                  <label for="profileImage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image</label>
                  <div class="flex items-center">
                    <label for="profileImage" class="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600">
                      Choose File
                    </label>
                    <input type="file" id="profileImage" @change="handleFileUpload" class="hidden" />
                    <span class="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-sm text-gray-500 dark:text-gray-400 truncate">
                      {{ form.profileImage ? 'Image selected' : 'No file chosen' }}
                    </span>
                  </div>
                  <p v-if="errors.profileImage" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.profileImage }}</p>
                </div>
              </form>
            </div>
  
            <!-- Preview Section -->
            <div class="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-700 p-8 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-600">
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Candidate Preview</h2>
              
              <!-- Profile Image Preview -->
              <div class="relative mb-8">
                <div class="w-40 h-40 rounded-full overflow-hidden border-4 shadow-lg" :class="form.gender === 'male' ? 'border-blue-500' : 'border-pink-500'">
                  <img :src="form.profileImage ? profileImageUrl : 'https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png'" 
                    alt="Profile Preview" 
                    class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" 
                    :class="form.gender === 'male' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'">
                    {{ form.gender === 'male' ? 'King' : 'Queen' }}
                  </span>
                </div>
              </div>
  
              <!-- Candidate Info -->
              <div class="w-full max-w-md space-y-4">
                <div class="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ form.name || 'Not provided' }}</span>
                </div>
                <div class="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Number:</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ form.number || 'Not provided' }}</span>
                </div>
                <div class="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Roll No:</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ form.rollno || 'Not provided' }}</span>
                </div>
                <div class="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Major:</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ form.major || 'Not provided' }}</span>
                </div>
                <div class="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Year:</span>
                  <span class="text-gray-600 dark:text-gray-400">{{ form.year || 'Not provided' }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-center space-x-4">
            <button @click="resetForm" type="button" 
              class="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Reset Form
            </button>
            <button @click="submitForm" type="button" 
              class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
              :disabled="clickSubmit">
              <span v-if="!clickSubmit">Add Candidate</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            </button>
          </div>
        </div>
  
        <p v-if="errors.adderror" class="mt-4 text-center text-sm text-red-600 dark:text-red-500">{{ errors.adderror }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import Loading from '../adminComponents/Loading'
  import { reactive, ref } from "vue";
  import SideBar from "../adminComponents/SideBar";
  import { db } from '@/firebase/config';
  import { useRouter } from 'vue-router';
  
  export default {
    components: {
      Loading,
      SideBar,
    },
    name: "AddNewCandidate",
    setup() {
      const router = useRouter()
      const form = reactive({
        name: "",
        number: "",
        rollno: "",
        major: "",
        year: "",
        gender: "",
        profileImage: null,
      });
  
      const errors = reactive({
        name: null,
        number: null,
        rollno: null,
        major: null,
        year: null,
        gender: null,
        profileImage: null,
        adderror: null,
      });
  
      const goBack = () => {
        router.back();
      };
  
      const profileImageUrl = ref("")
      const clickSubmit = ref(false);
  
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            form.profileImage = reader.result;
            profileImageUrl.value = reader.result;
            errors.profileImage = null;
          };
          reader.readAsDataURL(file);
        } else {
          errors.profileImage = "Profile image is required.";
        }
      };
  
      const resetForm = () => {
        Object.keys(form).forEach((key) => (form[key] = ""));
        Object.keys(errors).forEach((key) => (errors[key] = null));
        form.profileImage = null;
      };
  
      const validateForm = () => {
        let isValid = true;
        if (!form.name) {
          errors.name = "Candidate Name is required.";
          isValid = false;
        } else {
          errors.name = null;
        }
  
        if (!form.number) {
          errors.number = "Candidate Number is required.";
          isValid = false;
        } else {
          errors.number = null;
        }
  
        if (!form.rollno) {
          errors.rollno = "Roll Number is required.";
          isValid = false;
        } else {
          errors.rollno = null;
        }
  
        if (!form.gender) {
          errors.gender = "Gender is required.";
          isValid = false;
        } else {
          errors.gender = null;
        }
  
        if (!form.major) {
          errors.major = "Major is required.";
          isValid = false;
        } else {
          errors.major = null;
        }
  
        if (!form.year) {
          errors.year = "Year is required.";
          isValid = false;
        } else {
          errors.year = null;
        }
  
        if (!form.profileImage) {
          errors.profileImage = "Profile image is required.";
          isValid = false;
        } else {
          errors.profileImage = null;
        }
  
        return isValid;
      };
  
      const submitForm = async () => {
        if (validateForm()) {
          clickSubmit.value = true;
          errors.adderror = null;
  
          try {
            await db.collection("candidates").doc(form.rollno).set({
              name: form.name,
              number: form.number,
              rollno: form.rollno,
              major: form.major,
              gender: form.gender,
              year: form.year,
              profileImage: form.profileImage,
            });
  
            // Show success message before redirecting
            // You can replace this with a toast notification if you prefer
            alert('Candidate added successfully!');
            router.push("/Candidates");
          } catch (err) {
            errors.adderror = err.message;
            clickSubmit.value = false;
          }
        }
      };
  
      return {
        goBack,
        clickSubmit,
        form,
        errors,
        submitForm,
        handleFileUpload,
        resetForm,
        profileImageUrl,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Custom transition effects */
  .router-enter-active,
  .router-leave-active {
    transition: opacity 0.3s ease;
  }
  .router-enter-from,
  .router-leave-to {
    opacity: 0;
  }
  
  /* Custom scrollbar for dark mode */
  .dark ::-webkit-scrollbar {
    width: 8px;
  }
  .dark ::-webkit-scrollbar-track {
    background: #374151;
  }
  .dark ::-webkit-scrollbar-thumb {
    background: #4B5563;
    border-radius: 4px;
  }
  .dark ::-webkit-scrollbar-thumb:hover {
    background: #6B7280;
  }
  </style>