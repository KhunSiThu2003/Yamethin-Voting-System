<template>
    <h1 class="text-center text-4xl font-bold mb-10 text-purple-500">{{ title }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-between w-full">
        <!-- Card for King -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
            <div v-if="king" id="overallKing"
                class="flex flex-col m-20 items-center border-blue-400 border-2 bg-white shadow-2xl rounded-3xl p-8 transform hover:scale-105 hover:shadow-blue-400 transition-all duration-500 animate-bounce-on-hover dark:bg-gray-800 dark:border-blue-500 dark:text-white">
                <h1 class="text-center text-4xl font-bold mb-5 text-blue-500">KING</h1>
                <div class="relative flex flex-col items-center">
                    <div class="relative w-full h-60 rounded overflow-hidden shadow-lg border border-blue-500">
                        <img :src="king.profileImage" alt="King Candidate" class="w-full h-full object-cover" />
                    </div>
                    <div class="absolute left-4 bottom-4 md:-bottom-8 items-center text-sm">
                        <span
                            class="md:w-16 md:h-16 w-12 h-12  md:text-3xl text-xl font-bold text-white flex items-center justify-center rounded-full mr-3 bg-blue-500">
                            {{ king.number }}
                        </span>
                    </div>
                </div>
                <h2 class="text-2xl font-bold text-blue-800 dark:text-white mt-4 mb-2">{{ king.name }}</h2>
                <p class="w-full text-left font-bold text-gray-700 dark:text-gray-300">Total Votes - {{ king.voterCount }}</p>
                <p class="w-full text-left font-bold text-gray-700 dark:text-gray-300">Major - {{ king.major }}</p>
                <button @click="openModal(king, table + 'King')"
                    class="mt-7 w-28 font-bold hover:text-white border rounded-lg py-2 px-3 transition"
                    :class="allResults?.[table + 'King'] ? 
                        'text-red-400 hover:bg-red-400 border-red-400 bg-red-50 dark:border-red-500 dark:bg-transparent dark:hover:bg-red-400' : 
                        'text-blue-400 hover:bg-blue-400 border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-transparent dark:hover:bg-blue-400'">
                    <span v-if="allResults?.[table + 'King']">Unpublish</span>
                    <span v-else>Publish</span>
                </button>
            </div>

            <div class="w-full flex justify-end">
                <img class="w-20" src="https://media2.giphy.com/media/wvP4x67EnIhWiCztAf/200.gif" alt="">
            </div>

            <!-- Table for King Candidates -->
            <div class="overflow-x-auto">
                <table class="table-auto w-full text-center border-collapse border border-gray-300 dark:border-gray-700">
                    <thead class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Number</th>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Profile Image</th>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Name</th>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Total Votes</th>
                        </tr>
                    </thead>
                    <tbody v-if="resultsKing">
                        <tr v-for="king in resultsKing" :key="king.id" class="hover:bg-gray-100 dark:hover:bg-gray-800">
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">{{ king.number }}</td>
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                <img :src="king.profileImage" alt="Candidate Name"
                                    class="w-16 h-16 mx-auto rounded-full object-cover border border-blue-500" />
                            </td>
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">{{ king.name }}</td>
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">{{ king.voterCount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Card for Queen -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
            <div v-if="queen" id="overallQueen"
                class="flex flex-col m-20 items-center border-pink-400 border-2 bg-white shadow-2xl rounded-3xl p-8 transform hover:scale-105 hover:shadow-pink-400 transition-all duration-500 animate-bounce-on-hover dark:bg-gray-800 dark:border-pink-500 dark:text-white">
                <h1 class="text-center text-4xl font-bold mb-5 text-pink-500">QUEEN</h1>
                <div class="relative flex flex-col items-center">
                    <div class="relative w-full h-60 rounded overflow-hidden shadow-lg border border-pink-400">
                        <img :src="queen.profileImage" alt="Queen Candidate" class="w-full h-full object-cover" />
                    </div>
                    <div class="absolute left-4 bottom-4 md:-bottom-8 items-center text-sm">
                        <span
                            class="md:w-16 md:h-16 w-12 h-12  md:text-3xl text-xl font-bold text-white flex items-center justify-center rounded-full mr-3 bg-pink-400">
                            {{ queen.number }}
                        </span>
                    </div>
                </div>
                <h2 class="text-2xl font-bold text-blue-800 dark:text-white mt-4 mb-2">{{ queen.name }}</h2>
                <p class="w-full text-left font-bold text-gray-700 dark:text-gray-300">Total Votes - {{ queen.voterCount }}</p>
                <p class="w-full text-left font-bold text-gray-700 dark:text-gray-300">Major - {{ queen.major }}</p>
                <button @click="openModal(queen, table + 'Queen')"
                    class="mt-7 w-28 font-bold hover:text-white border rounded-lg py-2 px-3 transition"
                    :class="allResults?.[table + 'Queen'] ? 
                        'text-red-400 hover:bg-red-400 border-red-400 bg-red-50 dark:border-red-500 dark:bg-transparent dark:hover:bg-red-400' : 
                        'text-pink-400 hover:bg-pink-400 border-pink-400 bg-pink-50 dark:border-pink-500 dark:bg-transparent dark:hover:bg-pink-400'">
                    <span v-if="allResults?.[table + 'Queen']">Unpublish</span>
                    <span v-else>Publish</span>
                </button>
            </div>

            <div class="w-full flex justify-end">
                <img class="w-20" src="https://media2.giphy.com/media/wvP4x67EnIhWiCztAf/200.gif" alt="">
            </div>

            <!-- Table for Queen Candidates -->
            <div class="overflow-x-auto">
                <table class="table-auto w-full text-center border-collapse border border-gray-300 dark:border-gray-700">
                    <thead class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Number</th>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Profile Image</th>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Name</th>
                            <th class="px-4 py-2 border border-gray-300 dark:border-gray-600">Total Votes</th>
                        </tr>
                    </thead>
                    <tbody v-if="resultsQueen">
                        <tr v-for="queen in resultsQueen" :key="queen.id" class="hover:bg-gray-100 dark:hover:bg-gray-800">
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">{{ queen.number }}</td>
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                <img :src="queen.profileImage" alt="Candidate Name"
                                    class="w-16 h-16 mx-auto rounded-full object-cover border border-pink-400" />
                            </td>
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">{{ queen.name }}</td>
                            <td class="px-4 py-2 border border-gray-300 dark:border-gray-600">{{ queen.voterCount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300">
        <div
            class="bg-white rounded-lg p-8 shadow-xl dark:bg-gray-800 dark:text-white w-96 max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <p class="text-base text-gray-700 dark:text-gray-300 text-center mb-4">
                {{ isPublished ? 
                    'Are you sure you want to unpublish this result? It will no longer be visible on the site.' : 
                    'Are you sure you want to publish this result? Once published, it will be visible on the site.' 
                }}
            </p>
            <div class="flex justify-center gap-4">
                <button @click="confirmAction(publishData)"
                    class="py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition duration-200 ease-in-out focus:outline-none text-white"
                    :class="isPublished ? 'bg-red-600' : 'bg-purple-600'">
                    <span v-if="!click">{{ isPublished ? 'Yes, Unpublish' : 'Yes, Publish' }}</span>
                    <div v-else role="status">
                        <svg aria-hidden="true"
                            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </button>
                <button @click="closeModal"
                    class="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition duration-200 ease-in-out focus:outline-none">
                    No, Cancel
                </button>
            </div>
            <div class="mt-4 text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ isPublished ? 
                        'Unpublishing will remove this result from public view.' : 
                        'Publishing will make this result visible to everyone.' 
                    }}
                </p>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300">
        <div
            class="bg-white rounded-lg p-8 shadow-xl dark:bg-gray-800 dark:text-white w-96 max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <p class="text-base text-gray-700 dark:text-gray-300 text-center mb-4">
                {{ successMessage }}
            </p>
            <div class="flex justify-center gap-4">
                <button @click="closeSuccessModal"
                    class="bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition duration-200 ease-in-out focus:outline-none">
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
            successMessage
        };
    },
};
</script>