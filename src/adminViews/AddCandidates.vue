<template>
  <Loading v-if="clickSubmit" />
  <SideBar />

  <div class="sm:ml-64 min-h-screen  text-gray-900 dark:text-gray-200">
    <!-- Enhanced Header with Back Button -->
    <div class="relative overflow-hidden bg-white dark:bg-gray-700 backdrop-blur-sm rounded-b-[3rem] shadow-2xl mb-8">
      
      <div class="relative z-10 px-8 py-12">
        <div class="flex items-center gap-6">
          <!-- Back Button -->
          <button @click="goBack" class="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/30 dark:border-gray-600/30 hover:shadow-xl transition-all duration-300 group">
            <i class="fa-solid fa-arrow-left text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300"></i>
          </button>
          
          <div class="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30 dark:border-gray-600/30">
            <i class="fas fa-user-plus fa-3x text-green-600 dark:text-green-400"></i>
          </div>
          
          <div>
            <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight">Add New Candidate</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 font-medium">Create a new candidate profile for the voting system</p>
            <div class="flex items-center gap-4 mt-3">
              <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full px-4 py-2">
                <i class="fas fa-user text-green-600 dark:text-green-400"></i>
                <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Candidate Profile</span>
              </div>
              <div class="flex items-center gap-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full px-4 py-2">
                <i class="fas fa-shield-alt text-blue-600 dark:text-blue-400"></i>
                <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Admin Control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <!-- Enhanced Main Form Card -->
      <div class="bg-white dark:bg-gray-700 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50">
        <div class="flex flex-col lg:flex-row">
          <!-- Enhanced Form Section -->
          <div class="w-full lg:w-1/2 p-8 lg:p-12">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Candidate Information</h2>
              <p class="text-gray-600 dark:text-gray-400">Fill in all the required details below</p>
            </div>
            
            <form class="space-y-6">
              <!-- Enhanced Candidate Name -->
              <div class="group">
                <label for="candidateName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <i class="fas fa-user text-green-500"></i>
                  Candidate Name <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    v-model="form.name" 
                    type="text" 
                    id="candidateName" 
                    placeholder="Enter candidate's full name"
                    class="w-full px-4 py-4 pl-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white transition-all duration-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
                    :class="{ 'border-red-500 ring-red-500': errors.name }" 
                  />
                  <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <p v-if="errors.name" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.name }}
                </p>
              </div>

              <!-- Enhanced Candidate Number -->
              <div class="group">
                <label for="candidateNumber" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <i class="fas fa-hashtag text-blue-500"></i>
                  Candidate Number <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    v-model="form.number" 
                    type="number" 
                    id="candidateNumber" 
                    placeholder="Enter candidate number"
                    class="w-full px-4 py-4 pl-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white transition-all duration-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
                    :class="{ 'border-red-500 ring-red-500': errors.number }" 
                  />
                  <i class="fas fa-hashtag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <p v-if="errors.number" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.number }}
                </p>
              </div>

              <!-- Enhanced Roll No -->
              <div class="group">
                <label for="rollNo" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <i class="fas fa-id-card text-purple-500"></i>
                  Roll Number <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    v-model="form.rollno" 
                    type="text" 
                    id="rollNo" 
                    placeholder="Enter student roll number"
                    class="w-full px-4 py-4 pl-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white transition-all duration-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
                    :class="{ 'border-red-500 ring-red-500': errors.rollno }" 
                  />
                  <i class="fas fa-id-card absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <p v-if="errors.rollno" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.rollno }}
                </p>
              </div>

              <!-- Enhanced Gender Selection -->
              <div class="group">
                <label for="gender" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <i class="fas fa-venus-mars text-pink-500"></i>
                  Gender <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="form.gender" 
                    id="gender"
                    class="w-full px-4 py-4 pl-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white transition-all duration-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md appearance-none"
                    :class="{ 'border-red-500 ring-red-500': errors.gender }"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <i class="fas fa-venus-mars absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
                <p v-if="errors.gender" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.gender }}
                </p>
              </div>

              <!-- Enhanced Major Selection -->
              <div class="group">
                <label for="major" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <i class="fas fa-graduation-cap text-indigo-500"></i>
                  Major <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="form.major" 
                    id="major"
                    class="w-full px-4 py-4 pl-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md appearance-none"
                    :class="{ 'border-red-500 ring-red-500': errors.major }"
                  >
                    <option value="">Select Major</option>
                    <option value="Electronic Engineering">Electronic Engineering</option>
                    <option value="Electrical Power Engineering">Electrical Power Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                  <i class="fas fa-graduation-cap absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
                <p v-if="errors.major" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.major }}
                </p>
              </div>

              <!-- Enhanced Year Selection -->
              <div class="group">
                <label for="year" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <i class="fas fa-calendar-alt text-orange-500"></i>
                  Year <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="form.year" 
                    id="year"
                    class="w-full px-4 py-4 pl-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition-all duration-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md appearance-none"
                    :class="{ 'border-red-500 ring-red-500': errors.year }"
                  >
                    <option value="">Select Year</option>
                    <option value="First">First Year</option>
                    <option value="Second">Second Year</option>
                    <option value="Third">Third Year</option>
                    <option value="Fourth">Fourth Year</option>
                    <option value="Fifth">Fifth Year</option>
                    <option value="Sixth">Sixth Year</option>
                  </select>
                  <i class="fas fa-calendar-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
                <p v-if="errors.year" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.year }}
                </p>
              </div>

              <!-- Enhanced Profile Image Upload -->
              <div class="group">
                <label for="profileImage" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <i class="fas fa-camera text-teal-500"></i>
                  Profile Image <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="flex items-center">
                    <label for="profileImage" class="cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-4 rounded-l-xl border-2 border-teal-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                      <i class="fas fa-upload"></i>
                      Choose File
                    </label>
                    <input type="file" id="profileImage" @change="handleFileUpload" class="hidden" accept="image/*" />
                    <span class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-l-0 border-gray-200 dark:border-gray-600 rounded-r-xl text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                      {{ form.profileImage ? '✓ Image selected' : 'No file chosen' }}
                    </span>
                  </div>
                </div>
                <p v-if="errors.profileImage" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.profileImage }}
                </p>
              </div>
            </form>
          </div>

          <!-- Enhanced Preview Section -->
          <div class="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-600">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Live Preview</h2>
              <p class="text-gray-600 dark:text-gray-400">See how the candidate profile will appear</p>
            </div>
            
            <!-- Enhanced Profile Image Preview -->
            <div class="relative mb-8 group">
              <div class="w-48 h-48 rounded-full overflow-hidden border-4 shadow-2xl transition-all duration-300 group-hover:scale-105" 
                   :class="form.gender === 'male' ? 'border-blue-500 shadow-blue-500/25' : 'border-pink-500 shadow-pink-500/25'">
                <img :src="form.profileImage ? profileImageUrl : 'https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png'" 
                     alt="Profile Preview" 
                     class="w-full h-full object-cover" />
              </div>
              <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <span class="px-4 py-2 rounded-full text-sm font-bold shadow-lg" 
                      :class="form.gender === 'male' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'">
                  {{ form.gender === 'male' ? 'King' : 'Queen' }}
                </span>
              </div>
            </div>

            <!-- Enhanced Candidate Info -->
            <div class="w-full max-w-md space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 dark:border-gray-700/30">
              <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                <span class="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <i class="fas fa-user text-green-500"></i>
                  Name:
                </span>
                <span class="text-gray-600 dark:text-gray-400 font-medium">{{ form.name || 'Not provided' }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                <span class="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <i class="fas fa-hashtag text-blue-500"></i>
                  Number:
                </span>
                <span class="text-gray-600 dark:text-gray-400 font-medium">{{ form.number || 'Not provided' }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                <span class="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <i class="fas fa-id-card text-purple-500"></i>
                  Roll No:
                </span>
                <span class="text-gray-600 dark:text-gray-400 font-medium">{{ form.rollno || 'Not provided' }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                <span class="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <i class="fas fa-graduation-cap text-indigo-500"></i>
                  Major:
                </span>
                <span class="text-gray-600 dark:text-gray-400 font-medium">{{ form.major || 'Not provided' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <i class="fas fa-calendar-alt text-orange-500"></i>
                  Year:
                </span>
                <span class="text-gray-600 dark:text-gray-400 font-medium">{{ form.year || 'Not provided' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Action Buttons -->
        <div class="px-8 lg:px-12 py-8 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row justify-center gap-4">
          <button @click="resetForm" type="button" 
            class="px-8 py-4 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center gap-2 font-semibold">
            <i class="fas fa-undo"></i>
            Reset Form
          </button>
          <button @click="submitForm" type="button" 
            class="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
            :disabled="clickSubmit">
            <span v-if="!clickSubmit" class="flex items-center gap-2">
              <i class="fas fa-plus"></i>
              Add Candidate
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          </button>
        </div>
      </div>

      <!-- Enhanced Error Message -->
      <div v-if="errors.adderror" class="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
        <div class="bg-red-500 rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-red-800 dark:text-red-200">Error</h3>
          <p class="text-sm text-red-700 dark:text-red-300">{{ errors.adderror }}</p>
        </div>
      </div>
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