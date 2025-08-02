<template>
<SideBar></SideBar>

<div class="sm:ml-64 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen">
    <!-- Hero Section -->
    <section class="py-8 px-4 bg-white dark:bg-gray-700 text-black dark:text-white text-center">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl sm:text-5xl font-bold mb-4">Voting Results Dashboard</h1>
            <p class="text-lg opacity-90">Real-time results for King & Queen elections by category and department</p>
        </div>
    </section>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-lg text-gray-600 dark:text-gray-400">Loading voting results...</p>
        </div>
    </div>

    <!-- Main Content -->
    <div v-else>
        <!-- Filter Buttons -->
        <section class="py-6 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Filter Results</h2>
                <div class="flex flex-wrap justify-center gap-3">
                    <button 
                        @click="filterResult('whole')" 
                        class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="wholeShow ? 
                            'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 
                            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'"
                    >
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Overall Results
                        </span>
                    </button>
                    <button 
                        @click="filterResult('EC')" 
                        class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="ECShow ? 
                            'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 
                            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'"
                    >
                        Electronic Engineering
                    </button>
                    <button 
                        @click="filterResult('EP')" 
                        class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="EPShow ? 
                            'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 
                            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'"
                    >
                        Electrical Power Engineering
                    </button>
                    <button 
                        @click="filterResult('C')" 
                        class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="CShow ? 
                            'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 
                            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'"
                    >
                        Civil Engineering
                    </button>
                    <button 
                        @click="filterResult('MECH')" 
                        class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        :class="MECHShow ? 
                            'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 
                            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'"
                    >
                        Mechanical Engineering
                    </button>
                </div>
            </div>
        </section>

        <!-- Empty State -->
        <div v-if="!hasData" class="flex items-center justify-center min-h-[50vh] px-4">
            <div class="text-center max-w-md">
                <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Results Available</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">There are currently no voting results to display. Results will appear here once voting begins.</p>
                <div class="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Waiting for voting data...</span>
                </div>
            </div>
        </div>

        <!-- Results Display Section -->
        <section v-else class="py-8 px-4">
            <div class="max-w-7xl mx-auto">
                <!-- Overall Results -->
                <ShowResult 
                    v-if="wholeShow && hasWholeData" 
                    title="Overall King & Queen Results" 
                    table="university" 
                    :allResults="allResults" 
                    :king="king.whole" 
                    :queen="queen.whole" 
                    :resultsKing="voteResultsWholeKing" 
                    :resultsQueen="voteResultsWholeQueen"
                />

                <!-- EC Results -->
                <ShowResult 
                    v-if="ECShow && hasECData" 
                    title="Electronic Engineering Major Results" 
                    :allResults="allResults" 
                    table="EC" 
                    :king="king.EC" 
                    :queen="queen.EC" 
                    :resultsKing="ECKing" 
                    :resultsQueen="ECQueen"
                />

                <!-- EP Results -->
                <ShowResult 
                    v-if="EPShow && hasEPData" 
                    title="Electrical Power Engineering Major Results" 
                    :allResults="allResults" 
                    table="EP" 
                    :king="king.EP" 
                    :queen="queen.EP" 
                    :resultsKing="EPKing" 
                    :resultsQueen="EPQueen"
                />

                <!-- Civil Results -->
                <ShowResult 
                    v-if="CShow && hasCData" 
                    title="Civil Engineering Major Results" 
                    :allResults="allResults" 
                    table="C" 
                    :king="king.C" 
                    :queen="queen.C" 
                    :resultsKing="CKing" 
                    :resultsQueen="CQueen"
                />

                <!-- Mechanical Results -->
                <ShowResult 
                    v-if="MECHShow && hasMECHData" 
                    title="Mechanical Engineering Major Results" 
                    table="MECH" 
                    :allResults="allResults" 
                    :king="king.MECH" 
                    :queen="queen.MECH" 
                    :resultsKing="MECHKing" 
                    :resultsQueen="MECHQueen"
                />

                <!-- No Data for Selected Filter -->
                <div v-if="!hasDataForCurrentFilter" class="text-center py-12">
                    <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No Results for Selected Category</h3>
                    <p class="text-gray-600 dark:text-gray-400">There are no voting results available for this category yet.</p>
                </div>
            </div>
        </section>
    </div>
</div>
</template>

<script>
import ShowResult from '../adminComponents/ShowResult'
import Loading from "../adminComponents/Loading";
import {
    ref,
    onMounted,
    computed
} from "vue";
import SideBar from "@/adminComponents/SideBar.vue";
import {
    db
} from "@/firebase/config";
import getAllVote from '@/adminComposables/getAllvote';
import getResults from '@/adminComposables/getResults';

export default {
    components: {
        ShowResult,
        Loading,
        SideBar,
    },

    setup() {
        // Define reactive variables
        const voteResultsWholeKing = ref([]);
        const voteResultsWholeQueen = ref([]);
        const voteResultsMajorKing = ref([]);
        const voteResultsMajorQueen = ref([]);
        const isLoading = ref(true);

        const wholeShow = ref(true);
        const ECShow = ref(false);
        const EPShow = ref(false);
        const CShow = ref(false);
        const MECHShow = ref(false);

        const king = ref({
            whole: null,
            EC: null,
            EP: null,
            C: null,
            MECH: null,
        });

        const queen = ref({
            whole: null,
            EC: null,
            EP: null,
            C: null,
            MECH: null,
        });

        const year = new Date().getFullYear().toString(); // Current year
        const allResults = getResults(year, (updatedResults) => {
            console.log("Updated Results via Callback:", updatedResults);
        });

        // Computed properties for data availability
        const hasData = computed(() => {
            return voteResultsWholeKing.value.length > 0 || 
                   voteResultsWholeQueen.value.length > 0 || 
                   voteResultsMajorKing.value.length > 0 || 
                   voteResultsMajorQueen.value.length > 0;
        });

        const hasWholeData = computed(() => {
            return voteResultsWholeKing.value.length > 0 || voteResultsWholeQueen.value.length > 0;
        });

        const hasECData = computed(() => {
            return ECKing.value.length > 0 || ECQueen.value.length > 0;
        });

        const hasEPData = computed(() => {
            return EPKing.value.length > 0 || EPQueen.value.length > 0;
        });

        const hasCData = computed(() => {
            return CKing.value.length > 0 || CQueen.value.length > 0;
        });

        const hasMECHData = computed(() => {
            return MECHKing.value.length > 0 || MECHQueen.value.length > 0;
        });

        const hasDataForCurrentFilter = computed(() => {
            if (wholeShow.value) return hasWholeData.value;
            if (ECShow.value) return hasECData.value;
            if (EPShow.value) return hasEPData.value;
            if (CShow.value) return hasCData.value;
            if (MECHShow.value) return hasMECHData.value;
            return false;
        });

        // Computed properties for filtered results by major
        const ECKing = computed(() =>
            voteResultsMajorKing.value.filter(
                (king) => king.major === "Electronic Engineering"
            )
        );
        const ECQueen = computed(() =>
            voteResultsMajorQueen.value.filter(
                (queen) => queen.major === "Electronic Engineering"
            )
        );

        const EPKing = computed(() =>
            voteResultsMajorKing.value.filter(
                (king) => king.major === "Electrical Power Engineering"
            )
        );
        const EPQueen = computed(() =>
            voteResultsMajorQueen.value.filter(
                (queen) => queen.major === "Electrical Power Engineering"
            )
        );

        const CKing = computed(() =>
            voteResultsMajorKing.value.filter(
                (king) => king.major === "Civil Engineering"
            )
        );
        const CQueen = computed(() =>
            voteResultsMajorQueen.value.filter(
                (queen) => queen.major === "Civil Engineering"
            )
        );

        const MECHKing = computed(() =>
            voteResultsMajorKing.value.filter(
                (king) => king.major === "Mechanical Engineering"
            )
        );
        const MECHQueen = computed(() =>
            voteResultsMajorQueen.value.filter(
                (queen) => queen.major === "Mechanical Engineering"
            )
        );

        // Real-time fetching using onSnapshot
        const fetchResults = async () => {
            let dataLoaded = 0;
            const totalCollections = 4;
            
            const checkLoadingComplete = () => {
                dataLoaded++;
                if (dataLoaded >= totalCollections) {
                    isLoading.value = false;
                }
            };
            
            // Set up listeners for real-time updates
           getAllVote ("voteUniversityKing", (results) => {
                voteResultsWholeKing.value = results;
                updateTopCandidates();
                checkLoadingComplete();
            });

           getAllVote ("voteUniversityQueen", (results) => {
                voteResultsWholeQueen.value = results;
                updateTopCandidates();
                checkLoadingComplete();
            });

           getAllVote ("voteMajorKing", (results) => {
                voteResultsMajorKing.value = results;
                updateTopCandidates();
                checkLoadingComplete();
            });

           getAllVote ("voteMajorQueen", (results) => {
                voteResultsMajorQueen.value = results;
                updateTopCandidates();
                checkLoadingComplete();
            });
        };

        const updateTopCandidates = () => {
            // Update top candidates based on sorted voter count
            king.value.whole =
                voteResultsWholeKing.value.length > 0 ?
                voteResultsWholeKing.value[0] :
                null;
            queen.value.whole =
                voteResultsWholeQueen.value.length > 0 ?
                voteResultsWholeQueen.value[0] :
                null;

            king.value.EC = ECKing.value.length > 0 ? ECKing.value[0] : null;
            queen.value.EC = ECQueen.value.length > 0 ? ECQueen.value[0] : null;

            king.value.EP = EPKing.value.length > 0 ? EPKing.value[0] : null;
            queen.value.EP = EPQueen.value.length > 0 ? EPQueen.value[0] : null;

            king.value.C = CKing.value.length > 0 ? CKing.value[0] : null;
            queen.value.C = CQueen.value.length > 0 ? CQueen.value[0] : null;

            king.value.MECH = MECHKing.value.length > 0 ? MECHKing.value[0] : null;
            queen.value.MECH = MECHQueen.value.length > 0 ? MECHQueen.value[0] : null;
        };

        const filterResult = (filter) => {
            // Reset all filter states
            wholeShow.value = filter === "whole";
            ECShow.value = filter === "EC";
            EPShow.value = filter === "EP";
            CShow.value = filter === "C";
            MECHShow.value = filter === "MECH";
        };

        // Start fetching results on mounted
        onMounted(async () => {
            await fetchResults();
        });

        return {
            allResults,
            voteResultsWholeKing,
            voteResultsWholeQueen,
            voteResultsMajorKing,
            voteResultsMajorQueen,
            isLoading,

            ECKing,
            ECQueen,
            EPKing,
            EPQueen,
            CKing,
            CQueen,
            MECHKing,
            MECHQueen,

            filterResult,
            wholeShow,
            ECShow,
            EPShow,
            CShow,
            MECHShow,

            king,
            queen,
            
            // Computed properties
            hasData,
            hasWholeData,
            hasECData,
            hasEPData,
            hasCData,
            hasMECHData,
            hasDataForCurrentFilter,
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
