<template>
    <SideBar></SideBar>

    <div class="sm:ml-64 bg-gray-100 text-gray-900 rounded-lg dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <!-- Candidates Page Header -->
        <section class="bg-white dark:bg-gray-800 text-center py-10">
            <h1 class="text-3xl sm:text-4xl font-bold mb-4">Manage Candidates</h1>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Add, edit, or remove candidates and view detailed information.
            </p>
        </section>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center w-full py-20">
            <div role="status">
                <svg aria-hidden="true"
                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        </div>

        <!-- Candidate Sections -->
        <section v-else class="py-8 px-4 sm:px-8 bg-gray-100 dark:bg-gray-900">
            <!-- Filter and Search Section -->
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                <div class="flex flex-col md:flex-row gap-4 items-center">
                    <!-- Add New Candidate Button -->
                    <router-link :to="{ name: 'AddCandidates' }"
                        class="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors">
                        <i class="fas fa-plus mr-2"></i>
                        Add New Candidate
                    </router-link>

                    <!-- Major Filter Dropdown -->
                    <div class="w-full md:w-48">
                        <label class="block text-sm font-medium mb-1 dark:text-gray-300">Major</label>
                        <select v-model="selectedMajor"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="all">All Majors</option>
                            <option v-for="major in uniqueMajors" :key="major" :value="major">
                                {{ major }}
                            </option>
                        </select>
                    </div>

                    <!-- King/Queen Filter Dropdown -->
                    <div class="w-full md:w-48">
                        <label class="block text-sm font-medium mb-1 dark:text-gray-300">Role</label>
                        <select v-model="selectedRole"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="all">All Roles</option>
                            <option value="king">King</option>
                            <option value="queen">Queen</option>
                        </select>
                    </div>

                    <!-- Search Input -->
                    <div class="w-full md:flex-1">
                        <label class="block text-sm font-medium mb-1 dark:text-gray-300">Search</label>
                        <div class="relative">
                            <input v-model="searchValue" id="searchInput" placeholder="Search by Name or Number"
                                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 dark:bg-red-900 dark:border-red-700 dark:text-red-100">
                <p>{{ error }}</p>
            </div>

            <!-- Candidates Table -->
            <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Number</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profile</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Roll No</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Major</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Year</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <tr v-for="candidate in filterCandidates" :key="candidate.rollno" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{{ candidate.number }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img :src="candidate.profileImage" alt="Candidate" class="h-10 w-10 rounded-full object-cover" :class="candidate.gender === 'male' ? 'border-2 border-blue-500' : 'border-2 border-pink-400'">
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{{ candidate.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{{ candidate.rollno }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{{ candidate.major }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="candidate.gender === 'male' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'" class="px-2 py-1 text-xs font-semibold rounded-full">
                                        {{ candidate.gender === 'male' ? 'King' : 'Queen' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{{ candidate.year }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <router-link :to="{ name: 'EditCandidate', params: { id: candidate.rollno } }"
                                        class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                                        <i class="fas fa-edit mr-1"></i> Edit
                                    </router-link>
                                    <button @click="confirmDelete(candidate)"
                                        class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                        <i class="fas fa-trash-alt mr-1"></i> Delete
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="filterCandidates.length === 0">
                                <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    No candidates found matching your criteria
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import getAllCandidates from '@/adminComposables/getAllCandidates';
import Loading from '../adminComponents/Loading';
import SideBar from '../adminComponents/SideBar';
import deleteCandidateFromServer from '@/adminComposables/deleteCandidateFromServer';
import { computed, onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

export default {
    name: 'ManageCandidates',
    components: {
        Loading,
        SideBar,
    },
    setup() {
        const searchValue = ref("");
        const selectedMajor = ref("all");
        const selectedRole = ref("all");
        const loading = ref(true);
        const { candidates, error, load } = getAllCandidates();

        // Load candidates on component mount
        onMounted(async () => {
            await load();
            loading.value = false;
        });

        // Get unique majors for the dropdown
        const uniqueMajors = computed(() => {
            const majors = candidates.value.map((candidate) => candidate.major);
            return Array.from(new Set(majors));
        });

        // Filter candidates by search, major, and role
        const filterCandidates = computed(() => {
            const search = searchValue.value.toLowerCase();
            return candidates.value.filter((candidate) => {
                const matchesSearch =
                    candidate.name.toLowerCase().includes(search) ||
                    candidate.number.toString().includes(search) ||
                    candidate.rollno.toString().includes(search);
                const matchesMajor =
                    selectedMajor.value === "all" ||
                    candidate.major.toLowerCase() === selectedMajor.value.toLowerCase();
                const matchesRole =
                    selectedRole.value === "all" ||
                    (selectedRole.value === "king" && candidate.gender === "male") ||
                    (selectedRole.value === "queen" && candidate.gender === "female");
                return matchesSearch && matchesMajor && matchesRole;
            });
        });

        // Confirm and delete candidate using SweetAlert2
        const confirmDelete = async (candidate) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                html: `You are about to delete <strong>${candidate.name}</strong> (${candidate.rollno}). This action cannot be undone!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                customClass: {
                    confirmButton: 'swal-confirm-btn',
                    cancelButton: 'swal-cancel-btn'
                },
            });

            if (result.isConfirmed) {
                try {
                    // Show loading indicator
                    Swal.fire({
                        title: 'Deleting...',
                        html: 'Please wait while we delete the candidate.',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    await deleteCandidateFromServer(candidate.rollno);

                    // Remove from local list
                    const index = candidates.value.findIndex(c => c.rollno === candidate.rollno);
                    if (index !== -1) {
                        candidates.value.splice(index, 1);
                    }

                    // Show success message
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The candidate has been deleted.',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } catch (err) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete candidate. Please try again.',
                        icon: 'error'
                    });
                    console.error("Failed to delete candidate:", err);
                }
            }
        };

        return {
            searchValue,
            selectedMajor,
            selectedRole,
            loading,
            error,
            uniqueMajors,
            filterCandidates,
            confirmDelete
        };
    },
};
</script>

<style scoped>
/* Custom styles for the component */
</style>

<style>
/* SweetAlert2 custom styles */
.swal-confirm-btn {
    @apply bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md mr-2 transition-colors;
}

.swal-cancel-btn {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors;
}

.swal2-popup {
    @apply dark:bg-gray-800 dark:text-gray-200;
}

.swal2-title, .swal2-content {
    @apply dark:text-gray-200;
}

.swal2-styled.swal2-confirm {
    @apply dark:bg-red-600 dark:hover:bg-red-700;
}

.swal2-styled.swal2-cancel {
    @apply dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200;
}
</style>