<template>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <!-- Header -->
        <div class="bg-white dark:bg-gray-700 px-6 py-4">
            <h1 class="text-2xl sm:text-3xl font-bold text-white text-center">{{ title }}</h1>
        </div>

        <!-- Content -->
        <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- King Section -->
                <div class="space-y-6">
                    <div class="text-center">
                        <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">King</h2>
                        
                        <!-- King Winner Card -->
                        <div v-if="king" class="relative">
                            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-700 shadow-lg">
                                <!-- Crown Icon -->
                                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <div class="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        WINNER
                                    </div>
                                </div>
                                
                                <!-- Profile Image -->
                                <div class="relative mx-auto w-48 h-48 mb-6">
                                    <div class="w-full h-full rounded-full overflow-hidden border-4 border-blue-300 dark:border-blue-600 shadow-xl">
                                        <img 
                                            :src="king.profileImage" 
                                            :alt="king.name" 
                                            class="w-full h-full object-cover"
                                            @error="handleImageError"
                                        />
                                    </div>
                                    <!-- Number Badge -->
                                    <div class="absolute -bottom-2 -right-2">
                                        <div class="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                                            {{ king.number }}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Candidate Info -->
                                <div class="text-center space-y-2">
                                    <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ king.name }}</h3>
                                    <p class="text-gray-600 dark:text-gray-300">{{ king.major }}</p>
                                    <div class="flex items-center justify-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        {{ king.voterCount }} votes
                                    </div>
                                </div>
                                
                                <!-- Publish Button -->
                                <div class="mt-6 text-center">
                                    <button 
                                        @click="openModal(king, table + 'King')"
                                        class="px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        :class="allResults?.[table + 'King'] ? 
                                            'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300' : 
                                            'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300'"
                                    >
                                        <span v-if="allResults?.[table + 'King']">Unpublish</span>
                                        <span v-else>Publish</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- No King Winner -->
                        <div v-else class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center">
                            <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-600 dark:text-gray-400">No King Winner Yet</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-500">Voting results will appear here</p>
                        </div>
                    </div>

                    <!-- King Results Table -->
                    <div v-if="resultsKing && resultsKing.length > 0" class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                        <div class="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-200 dark:border-blue-700">
                            <h3 class="font-semibold text-blue-800 dark:text-blue-300">All King Candidates</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 dark:bg-gray-600">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Candidate</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Votes</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                                    <tr v-for="(candidate, index) in resultsKing" :key="candidate.id" 
                                        class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <span class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                                                      :class="index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                                                             index === 1 ? 'bg-gray-100 text-gray-800' : 
                                                             index === 2 ? 'bg-orange-100 text-orange-800' : 
                                                             'bg-blue-100 text-blue-800'">
                                                    {{ index + 1 }}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <img :src="candidate.profileImage" :alt="candidate.name"
                                                     class="w-10 h-10 rounded-full object-cover border-2 border-blue-200 dark:border-blue-600" />
                                                <div class="ml-3">
                                                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ candidate.name }}</div>
                                                    <div class="text-sm text-gray-500 dark:text-gray-400">#{{ candidate.number }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                                            {{ candidate.voterCount }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Queen Section -->
                <div class="space-y-6">
                    <div class="text-center">
                        <h2 class="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">Queen</h2>
                        
                        <!-- Queen Winner Card -->
                        <div v-if="queen" class="relative">
                            <div class="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-6 border-2 border-pink-200 dark:border-pink-700 shadow-lg">
                                <!-- Crown Icon -->
                                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <div class="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        WINNER
                                    </div>
                                </div>
                                
                                <!-- Profile Image -->
                                <div class="relative mx-auto w-48 h-48 mb-6">
                                    <div class="w-full h-full rounded-full overflow-hidden border-4 border-pink-300 dark:border-pink-600 shadow-xl">
                                        <img 
                                            :src="queen.profileImage" 
                                            :alt="queen.name" 
                                            class="w-full h-full object-cover"
                                            @error="handleImageError"
                                        />
                                    </div>
                                    <!-- Number Badge -->
                                    <div class="absolute -bottom-2 -right-2">
                                        <div class="bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                                            {{ queen.number }}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Candidate Info -->
                                <div class="text-center space-y-2">
                                    <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ queen.name }}</h3>
                                    <p class="text-gray-600 dark:text-gray-300">{{ queen.major }}</p>
                                    <div class="flex items-center justify-center gap-2 text-lg font-semibold text-pink-600 dark:text-pink-400">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        {{ queen.voterCount }} votes
                                    </div>
                                </div>
                                
                                <!-- Publish Button -->
                                <div class="mt-6 text-center">
                                    <button 
                                        @click="openModal(queen, table + 'Queen')"
                                        class="px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        :class="allResults?.[table + 'Queen'] ? 
                                            'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300' : 
                                            'bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-300'"
                                    >
                                        <span v-if="allResults?.[table + 'Queen']">Unpublish</span>
                                        <span v-else>Publish</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- No Queen Winner -->
                        <div v-else class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center">
                            <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-600 dark:text-gray-400">No Queen Winner Yet</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-500">Voting results will appear here</p>
                        </div>
                    </div>

                    <!-- Queen Results Table -->
                    <div v-if="resultsQueen && resultsQueen.length > 0" class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                        <div class="bg-pink-50 dark:bg-pink-900/20 px-4 py-3 border-b border-pink-200 dark:border-pink-700">
                            <h3 class="font-semibold text-pink-800 dark:text-pink-300">All Queen Candidates</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 dark:bg-gray-600">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Candidate</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Votes</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                                    <tr v-for="(candidate, index) in resultsQueen" :key="candidate.id" 
                                        class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <span class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                                                      :class="index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                                                             index === 1 ? 'bg-gray-100 text-gray-800' : 
                                                             index === 2 ? 'bg-orange-100 text-orange-800' : 
                                                             'bg-pink-100 text-pink-800'">
                                                    {{ index + 1 }}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <img :src="candidate.profileImage" :alt="candidate.name"
                                                     class="w-10 h-10 rounded-full object-cover border-2 border-pink-200 dark:border-pink-600" />
                                                <div class="ml-3">
                                                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ candidate.name }}</div>
                                                    <div class="text-sm text-gray-500 dark:text-gray-400">#{{ candidate.number }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                                            {{ candidate.voterCount }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300">
        <div
            class="bg-white rounded-xl p-8 shadow-2xl dark:bg-gray-800 dark:text-white w-96 max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <div class="text-center mb-6">
                <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {{ isPublished ? 'Unpublish Result' : 'Publish Result' }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ isPublished ? 
                        'Are you sure you want to unpublish this result? It will no longer be visible on the site.' : 
                        'Are you sure you want to publish this result? Once published, it will be visible on the site.' 
                    }}
                </p>
            </div>
            <div class="flex justify-center gap-4">
                <button @click="confirmAction(publishData)"
                    class="py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition duration-200 ease-in-out focus:outline-none text-white font-medium"
                    :class="isPublished ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'">
                    <span v-if="!click">{{ isPublished ? 'Yes, Unpublish' : 'Yes, Publish' }}</span>
                    <div v-else class="flex items-center gap-2">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </div>
                </button>
                <button @click="closeModal"
                    class="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition duration-200 ease-in-out focus:outline-none font-medium hover:bg-gray-400">
                    Cancel
                </button>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300">
        <div
            class="bg-white rounded-xl p-8 shadow-2xl dark:bg-gray-800 dark:text-white w-96 max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Success!</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">{{ successMessage }}</p>
                <button @click="closeSuccessModal"
                    class="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition duration-200 ease-in-out focus:outline-none font-medium hover:bg-green-700">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "@/firebase/config";
import { ref } from "vue";

export default {
    props: ["title", "table", "king", "queen", "resultsQueen", "resultsKing", "allResults"],
    setup(props) {
        const click = ref(false);
        const showModal = ref(false);
        const publishData = ref(null);
        const isPublished = ref(false);
        const showSuccessModal = ref(false);
        const successMessage = ref("");

        const handleImageError = (event) => {
            // Set a default image when the profile image fails to load
            event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTEwQzExMC41NTcgMTEwIDEyMCAxMDAuNTU3IDEyMCA5MEMxMjAgNzkuNDQzIDExMC41NTcgNzAgMTAwIDcwQzg5LjQ0MyA3MCA4MCA3OS40NDMgODAgOTBDODAgMTAwLjU1NyA4OS40NDMgMTEwIDEwMCAxMTAuNTU3WiIgZmlsbD0iIzk5Q0JBMCIvPgo8cGF0aCBkPSJNMTYwIDg2QzE2MCAxMTAuMzQ3IDEzMy4xMzQgMTMwIDEwMCAxMzBaIiBmaWxsPSIjOTlDQkEwIi8+Cjwvc3ZnPgo=';
        };

        const openModal = (candidate, objName) => {
            isPublished.value = !!props.allResults?.[objName];
            publishData.value = {
                objName,
                ...candidate
            };
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const closeSuccessModal = () => {
            showSuccessModal.value = false;
        };

        const confirmAction = async (candidate) => {
            click.value = true;
            try {
                const eventYear = new Date().getFullYear().toString();
                const updateData = {
                    [candidate.objName]: isPublished.value ? null : {
                        ...candidate,
                    },
                };

                await db
                    .collection("results")
                    .doc(eventYear)
                    .set(updateData, {
                        merge: true
                    });

                successMessage.value = isPublished.value ? 
                    "Success! The result has been unpublished." : 
                    "Success! The result has been published.";
                showSuccessModal.value = true;
                click.value = false;
                closeModal();
            } catch (error) {
                click.value = false;
                console.error("Error updating result: ", error);
                alert(`Failed to ${isPublished.value ? 'unpublish' : 'publish'} the result. Please try again.`);
            }
        };

        return {
            showModal,
            openModal,
            closeModal,
            confirmAction,
            publishData,
            closeSuccessModal,
            showSuccessModal,
            click,
            isPublished,
            successMessage,
            handleImageError
        };
    },
};
</script>

<style scoped>
/* Custom animations */
@keyframes bounce-on-hover {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

.animate-bounce-on-hover:hover {
    animation: bounce-on-hover 1s ease-in-out infinite;
}
</style>