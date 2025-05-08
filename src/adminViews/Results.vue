<template>
<SideBar></SideBar>

<div v-if="voteResultsWholeKing.length > 0 && voteResultsMajorQueen.length > 0" class="sm:ml-64 bg-gray-100 text-gray-900 rounded-lg dark:bg-gray-900 dark:text-gray-200 min-h-screen">
    <!-- Hero Section -->
    <section class="py-8 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center rounded-lg">
        <h1 class="text-3xl sm:text-5xl font-bold mb-2">Voting Results</h1>
        <p class="text-lg">Explore the results of the voting for King & Queen by category and department.</p>
    </section>

    <!-- Filter Buttons -->
    <section class="py-6 px-4">
        <ul class="flex flex-wrap justify-center gap-4">
            <li>
                <button @click="filterResult('whole')" class="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:ring focus:ring-blue-300 transition">
                    Overall King & Queen
                </button>
            </li>
            <li>
                <button @click="filterResult('EC')" class="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:ring focus:ring-blue-300 transition">
                    Electronic Engineering
                </button>
            </li>
            <li>
                <button @click="filterResult('EP')" class="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:ring focus:ring-blue-300 transition">
                    Electrical Power Engineering
                </button>
            </li>
            <li>
                <button @click="filterResult('C')" class="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:ring focus:ring-blue-300 transition">
                    Civil Engineering
                </button>
            </li>
            <li>
                <button @click="filterResult('MECH')" class="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:ring focus:ring-blue-300 transition">
                    Mechanical Engineering
                </button>
            </li>
        </ul>
    </section>

    <!-- Results Display Section -->
    <section class="py-8 px-4">

        <ShowResult v-if="wholeShow" title="Over All Results" table="university" :allResults="allResults" :king="king.whole" :queen="queen.whole" :resultsKing="voteResultsWholeKing" :resultsQueen="voteResultsWholeQueen"></ShowResult>

        <ShowResult v-if="ECShow" title="Electronic Engineering Major Results" :allResults="allResults" table="EC" :king="king.EC" :queen="queen.EC" :resultsKing="ECKing" :resultsQueen="ECQueen"></ShowResult>

        <ShowResult v-if="EPShow" title="Electrical Power Engineering Major Results" :allResults="allResults" table="EP" :king="king.EP" :queen="queen.EP" :resultsKing="EPKing" :resultsQueen="EPQueen"></ShowResult>

        <ShowResult v-if="CShow" title="Civil Engineering Major Results" :allResults="allResults" table="C" :king="king.C" :queen="queen.C" :resultsKing="CKing" :resultsQueen="CQueen"></ShowResult>

        <ShowResult v-if="MECHShow" title="Mechanical Engineering
            Major Results" table="MECH" :allResults="allResults" :king="king.MECH" :queen="queen.MECH" :resultsKing="MECHKing" :resultsQueen="MECHQueen"></ShowResult>

    </section>



</div>

<Loading v-else></Loading>
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
            
            // Set up listeners for real-time updates
           getAllVote ("voteUniversityKing", (results) => {
                voteResultsWholeKing.value = results;
                updateTopCandidates();
            });

           getAllVote ("voteUniversityQueen", (results) => {
                voteResultsWholeQueen.value = results;
                updateTopCandidates();
            });

           getAllVote ("voteMajorKing", (results) => {
                voteResultsMajorKing.value = results;
                updateTopCandidates();
            });

           getAllVote ("voteMajorQueen", (results) => {
                voteResultsMajorQueen.value = results;
                updateTopCandidates();
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
        };
    },
};
</script>

<style></style>
