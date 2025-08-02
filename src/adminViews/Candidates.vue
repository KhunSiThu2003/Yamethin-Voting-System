<template>
    <SideBar></SideBar>

    <div class="sm:ml-64 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen">
        <!-- Header -->
        <div class="bg-white dark:bg-gray-700 text-black dark:text-white">
            <div class="px-6 py-8 relative overflow-hidden">
                <div class="relative z-10 max-w-7xl mx-auto">
                    <div class="flex items-center gap-4">
                        <div class="bg-white dark:bg-gray-600 rounded-2xl p-4 shadow-lg">
                            <svg class="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-3xl font-bold mb-2">Manage Candidates</h1>
                            <p class="text-gray-700 dark:text-gray-300 text-lg">Add, edit, or remove candidates and view detailed information</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="px-6 py-8">
            <div class="max-w-7xl mx-auto">
                <!-- Loading State -->
                <div v-if="loading" class="flex items-center justify-center w-full py-20">
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                        <div class="flex items-center gap-4">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span class="text-gray-600 dark:text-gray-300 font-medium">Loading candidates...</span>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div v-else>
                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <div class="flex items-center gap-4">
                                <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                                    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Candidates</p>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ candidates?.length || 0 }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <div class="flex items-center gap-4">
                                <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                                    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Kings</p>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ kingCount }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <div class="flex items-center gap-4">
                                <div class="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-xl">
                                    <svg class="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Queens</p>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ queenCount }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <div class="flex items-center gap-4">
                                <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl">
                                    <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Majors</p>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ uniqueMajors?.length || 0 }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Filter and Search Section -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-8">
                        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
                            <!-- Add New Candidate Button -->
                            <router-link :to="{ name: 'AddCandidates' }"
                                class="bg-white dark:bg-gray-700 text-black dark:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                Add New Candidate
                            </router-link>

                            <!-- Major Filter Dropdown -->
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Major</label>
                                <select v-model="selectedMajor"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                    <option value="all">All Majors</option>
                                    <option v-for="major in uniqueMajors" :key="major" :value="major">
                                        {{ major }}
                                    </option>
                                </select>
                            </div>

                            <!-- King/Queen Filter Dropdown -->
                            <div>
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Role</label>
                                <select v-model="selectedRole"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                    <option value="all">All Roles</option>
                                    <option value="king">King</option>
                                    <option value="queen">Queen</option>
                                </select>
                            </div>

                            <!-- Search Input -->
                            <div class="lg:col-span-2">
                                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Search</label>
                                <div class="relative">
                                    <input v-model="searchValue" id="searchInput" placeholder="Search by Name, Number, or Roll No"
                                        class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                    <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                        <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p class="font-medium">{{ error }}</p>
                    </div>

                    <!-- Candidates Table -->
                    <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                                    <tr>
                                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Number</th>
                                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Profile</th>
                                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Roll No</th>
                                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Major</th>
                                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Year</th>
                                        <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    <tr v-for="candidate in filterCandidates" :key="candidate.rollno" 
                                        class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <span class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                                                    {{ candidate.number }}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex-shrink-0 h-12 w-12">
                                                <img :src="candidate.profileImage" alt="Candidate" 
                                                     class="h-12 w-12 rounded-full object-cover shadow-lg" 
                                                     :class="candidate.gender === 'male' ? 'ring-2 ring-blue-500' : 'ring-2 ring-pink-400'"
                                                     @error="handleImageError">
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ candidate.name }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900 dark:text-gray-200 font-mono">{{ candidate.rollno }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900 dark:text-gray-200">{{ candidate.major }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span :class="candidate.gender === 'male' ? 
                                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                                                'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'" 
                                                class="px-3 py-1 text-xs font-semibold rounded-full">
                                                {{ candidate.gender === 'male' ? 'King' : 'Queen' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900 dark:text-gray-200">{{ candidate.year }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div class="flex items-center justify-end gap-2">
                                                <router-link :to="{ name: 'EditCandidate', params: { id: candidate.rollno } }"
                                                    class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                                                    title="Edit Candidate">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                    </svg>
                                                </router-link>
                                                <button @click="confirmDelete(candidate)"
                                                    class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                                                    title="Delete Candidate">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="filterCandidates.length === 0">
                                        <td colspan="8" class="px-6 py-12 text-center">
                                            <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                                </svg>
                                            </div>
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No candidates found</h3>
                                            <p class="text-gray-500 dark:text-gray-400">
                                                No candidates match your current search criteria. Try adjusting your filters.
                                            </p>
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
</template>

<script>
import getAllCandidates from '@/adminComposables/getAllCandidates';
import Loading from '../adminComponents/Loading';
import SideBar from '../adminComponents/SideBar';
import deleteCandidateFromServer from '@/adminComposables/deleteCandidateFromServer';
import { computed, onMounted, ref, onUnmounted } from 'vue';
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
        const { candidates, error, load, unsubscribe, isLoading } = getAllCandidates();

        // Load candidates on component mount
        onMounted(async () => {
            try {
                await load();
            } catch (err) {
                console.error("Error loading candidates:", err);
            }
        });

        // Cleanup on unmount
        onUnmounted(() => {
            if (unsubscribe) {
                unsubscribe();
            }
        });

        // Get unique majors for the dropdown
        const uniqueMajors = computed(() => {
            if (!candidates.value || !Array.isArray(candidates.value)) return [];
            const majors = candidates.value.map((candidate) => candidate.major);
            return Array.from(new Set(majors)).sort();
        });

        // Computed properties for stats
        const kingCount = computed(() => {
            if (!candidates.value || !Array.isArray(candidates.value)) return 0;
            return candidates.value.filter(candidate => candidate.gender === 'male').length;
        });

        const queenCount = computed(() => {
            if (!candidates.value || !Array.isArray(candidates.value)) return 0;
            return candidates.value.filter(candidate => candidate.gender === 'female').length;
        });

        // Filter candidates by search, major, and role
        const filterCandidates = computed(() => {
            if (!candidates.value || !Array.isArray(candidates.value)) return [];
            const search = searchValue.value.toLowerCase().trim();
            return candidates.value.filter((candidate) => {
                const matchesSearch =
                    candidate.name?.toLowerCase().includes(search) ||
                    candidate.number?.toString().includes(search) ||
                    candidate.rollno?.toString().includes(search);
                const matchesMajor =
                    selectedMajor.value === "all" ||
                    candidate.major?.toLowerCase() === selectedMajor.value.toLowerCase();
                const matchesRole =
                    selectedRole.value === "all" ||
                    (selectedRole.value === "king" && candidate.gender === "male") ||
                    (selectedRole.value === "queen" && candidate.gender === "female");
                return matchesSearch && matchesMajor && matchesRole;
            });
        });

        // Handle image loading errors
        const handleImageError = (event) => {
            event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTEwQzExMC41NTcgMTEwIDEyMCAxMDAuNTU3IDEyMCA5MEMxMjAgNzkuNDQzIDExMC41NTcgNzAgMTAwIDcwQzg5LjQ0MyA3MCA4MCA3OS40NDMgODAgOTBDODAgMTAwLjU1NyA4OS40NDMgMTEwIDEwMCAxMTAuNTU3WiIgZmlsbD0iIzk5Q0JBMCIvPgo8cGF0aCBkPSJNMTYwIDg2QzE2MCAxMTAuMzQ3IDEzMy4xMzQgMTMwIDEwMCAxMzBaIiBmaWxsPSIjOTlDQkEwIi8+Cjwvc3ZnPgo=';
        };

        // Confirm and delete candidate using SweetAlert2
        const confirmDelete = async (candidate) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                html: `You are about to delete <strong>${candidate.name}</strong> (${candidate.rollno}).<br><br>This action cannot be undone!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                customClass: {
                    popup: 'dark:bg-gray-800 dark:text-gray-200',
                    title: 'dark:text-gray-200',
                    htmlContainer: 'dark:text-gray-300',
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
                        },
                        customClass: {
                            popup: 'dark:bg-gray-800 dark:text-gray-200',
                            title: 'dark:text-gray-200',
                            htmlContainer: 'dark:text-gray-300'
                        }
                    });

                    await deleteCandidateFromServer(candidate.rollno);

                    // Show success message
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The candidate has been successfully deleted.',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'dark:bg-gray-800 dark:text-gray-200',
                            title: 'dark:text-gray-200',
                            htmlContainer: 'dark:text-gray-300'
                        }
                    });
                } catch (err) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete candidate. Please try again.',
                        icon: 'error',
                        customClass: {
                            popup: 'dark:bg-gray-800 dark:text-gray-200',
                            title: 'dark:text-gray-200',
                            htmlContainer: 'dark:text-gray-300'
                        }
                    });
                    console.error("Failed to delete candidate:", err);
                }
            }
        };

        return {
            searchValue,
            selectedMajor,
            selectedRole,
            loading: isLoading,
            error,
            uniqueMajors,
            kingCount,
            queenCount,
            filterCandidates,
            confirmDelete,
            handleImageError
        };
    },
};
</script>

<style scoped>
/* Custom styles for enhanced animations */
.hover\:shadow-xl:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth transitions for all interactive elements */
* {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}
</style>

<style>
/* SweetAlert2 custom styles */
.swal-confirm-btn {
    @apply bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg mr-2 transition-all duration-200;
}

.swal-cancel-btn {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200;
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