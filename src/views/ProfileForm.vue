<template>
  <Loading v-if="clickSubmit || !userData"></Loading>
  <div
    v-if="userData"
    class="relative min-h-screen bg-gray-50 dark:bg-gray-900"
  >
    <!-- Fixed Policy Section -->
    <div
      class="w-full bg-indigo-600 text-white text-center p-4 fixed top-0 left-0 z-50 shadow-lg"
    >
      <p class="md:w-3/6 mx-auto text-xs sm:text-sm prose text-justify">
        <strong>Profile Picture Policy :</strong> To ensure the integrity and
        security of the voting system, a profile picture is required. This helps
        verify your identity and ensures a fair and transparent process for all
        participants.
      </p>
    </div>

    <!-- Main Content Below Fixed Policy -->
    <div
      class="flex justify-center items-center pt-24 sm:pt-32 min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div class="w-full max-w-lg p-8 sm:p-10">
        <!-- Title Section -->
        <div class="text-center mb-6">
          <h2 class="text-2xl text-blue-500 sm:text-4xl font-semibold">
            Update Profile Picture
          </h2>
          <p class="text-sm text-gray-500 my-2">
            Please upload a profile picture to continue.
          </p>
        </div>

        <!-- Profile Image Upload Section -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Profile Image Preview -->
          <div class="flex justify-center mb-6">
            <label for="profile-image" class="cursor-pointer">
              <div
                class="w-40 h-40 md:h-60 md:w-60 flex justify-center items-center overflow-hidden bg-gray-200"
              >
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Profile Preview"
                  class="w-full h-full object-cover border-4 border-blue-400"
                />
                <img
                  v-else
                  src="https://cdn-icons-png.flaticon.com/512/4211/4211763.png"
                  alt="Default Profile"
                  class="w-full h-full object-cover p-10 opacity-40 hover:opacity-100 border-dashed border-4 border-gray-400 overflow-hidden"
                />
              </div>
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              class="hidden"
              @change="previewImage"
            />
          </div>

          <!-- Upload Button (Disabled if no image) -->
          <div class="text-center md:flex justify-center items-center gap-4">

            <button
              type="submit"
              class="w-full px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
              :disabled="!imageFile"
            >
              Upload Profile Picture
            </button>

            <button
              type="submit"
              class="w-full px-6 py-3 mt-3 md:mt-0 dark:text-white border border-primary-500 dark:border-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
            >
              Skip
            </button>

          </div>
        </form>

        <!-- Status Message -->
        <div
          v-if="uploadStatus"
          class="mt-4 text-center text-sm text-green-500"
        >
          {{ uploadStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Loading from "../components/Loading";
import { db } from "@/firebase/config"; // Import Firestore
import { useRouter } from "vue-router";
import getUserById from "@/composables/getUserById";
import imageCompression from "browser-image-compression"; // Import the compression library

export default {
  components: {
    Loading,
  },

  setup() {
    const imageFile = ref(null);
    const imagePreview = ref(null);
    const uploadStatus = ref("");
    const clickSubmit = ref(false);

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    const collectionName = role === "teacher" ? "teachers" : "students";
    const router = useRouter();

    let { userData, error, load } = getUserById(userId);
    load();

    // Function to preview the image before upload
    const previewImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageFile.value = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };

    // Compress the image
    const compressImage = async (file) => {
      const options = {
        maxSizeMB: 1, // Maximum size in MB (1 MB)
        maxWidthOrHeight: 1024, // Maximum width or height
        useWebWorker: true, // Use web worker for better performance
      };

      try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
      } catch (error) {
        console.error("Error compressing image:", error);
        throw error;
      }
    };

    // Convert image to base64 format
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result); // Base64 string
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Read the file as a base64 URL
      });
    };

    const handleSubmit = async () => {
      clickSubmit.value = true;

      try {
        let profileImage;

        if (!imageFile.value) {
          // Default image URL if no image is selected
          profileImage =
            "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg";
        } else {
          // Compress and convert image to base64
          const compressedFile = await compressImage(imageFile.value);
          profileImage = await convertToBase64(compressedFile);
        }

        // Save image to Firestore
        await db.collection(collectionName).doc(userId).set(
          {
            profileImage,
          },
          { merge: true }
        );

        router.push("/home");
        resetForm();
      } catch (error) {
        console.error("Error uploading image:", error);
        uploadStatus.value = "Error uploading image. Please try again.";
      } finally {
        clickSubmit.value = false;
      }
    };

    // Reset form fields
    const resetForm = () => {
      imageFile.value = null;
      imagePreview.value = null;
    };

    return {
      imagePreview,
      uploadStatus,
      previewImage,
      handleSubmit,
      imageFile,
      clickSubmit,
      userData,
    };
  },
};
</script>

<style scoped>
/* Style for the fixed policy at the top */
.fixed-policy {
  background-color: #4f46e5;
  /* Indigio color */
  color: white;
  padding: 1rem;
  font-size: 0.875rem;
  text-align: center;
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

/* Main form content with padding to prevent overlap with fixed policy */
.pt-24 {
  padding-top: 6rem;
  /* Adjusted top padding for better spacing */
}

/* Enhance button style when disabled */
button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}
</style>
