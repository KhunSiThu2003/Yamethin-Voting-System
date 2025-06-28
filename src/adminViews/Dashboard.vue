<template>
  <Loading v-if="isLoading"></Loading>
  <SideBar></SideBar>
  <div class="sm:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-0">
    <!-- Header -->
    <div class="flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-b-3xl shadow-lg mb-8 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"></div>
      <div class="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg z-10">
        <i class="fas fa-tachometer-alt fa-2x text-white"></i>
      </div>
      <div class="z-10">
        <h1 class="text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p class="text-base text-blue-100/90">Overview of the voting system</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 md:px-8 pb-12">
      <!-- Stats Section -->
      <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
          <span class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
          <span>System Statistics</span>
        </h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <router-link 
            :to="{ name: 'ManageUsers' }"
            class="stat-card group bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500/30 cursor-pointer"
          >
            <div class="icon-bg bg-blue-100/80 dark:bg-blue-900/50 mb-4">
              <i class="fas fa-users fa-lg text-blue-600 dark:text-blue-400"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ totalUsers }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Total Voters</div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>

          <router-link 
            :to="{ name: 'ManageUsers', query: { role: 'students' } }"
            class="stat-card group bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500/30 cursor-pointer"
          >
            <div class="icon-bg bg-green-100/80 dark:bg-green-900/50 mb-4">
              <i class="fas fa-user-graduate fa-lg text-green-600 dark:text-green-400"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ totalStudents }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Students</div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>

          <router-link 
            :to="{ name: 'ManageUsers', query: { role: 'teachers' } }"
            class="stat-card group bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-200 dark:hover:border-yellow-500/30 cursor-pointer"
          >
            <div class="icon-bg bg-yellow-100/80 dark:bg-yellow-900/50 mb-4">
              <i class="fas fa-chalkboard-teacher fa-lg text-yellow-600 dark:text-yellow-400"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ totalTeachers }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Teachers</div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>

          <router-link 
            :to="{ name: 'ManageUsers', query: { role: 'otherStaff' } }"
            class="stat-card group bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-500/30 cursor-pointer"
          >
            <div class="icon-bg bg-pink-100/80 dark:bg-pink-900/50 mb-4">
              <i class="fas fa-user-cog fa-lg text-pink-600 dark:text-pink-400"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ totalOtherStaff }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Other Staff</div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>

          <router-link 
            :to="{ name: 'Candidates' }"
            class="stat-card group bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500/30 cursor-pointer"
          >
            <div class="icon-bg bg-purple-100/80 dark:bg-purple-900/50 mb-4">
              <i class="fas fa-user-tie fa-lg text-purple-600 dark:text-purple-400"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ totalCandidates }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Total Candidates</div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>

          <router-link 
            :to="{ name: 'Messages' }"
            class="stat-card group bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 cursor-pointer relative"
          >
            <div v-if="unreadMessages > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {{ unreadMessages }}
            </div>
            <div class="icon-bg bg-indigo-100/80 dark:bg-indigo-900/50 mb-4">
              <i class="fas fa-comment-dots fa-lg text-indigo-600 dark:text-indigo-400"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ totalMessages }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Messages</div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>
        </div>
      </div>

      <!-- Voting Progress Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
            <span class="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></span>
            <span>Voting Progress</span>
          </h2>
          <div class="space-y-4">
            <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
              <div
                class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 h-3 rounded-full transition-all duration-700"
                :style="{ width: votingProgress + '%' }"
              ></div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-600 dark:text-gray-300">
                <span class="font-medium">{{ votedCount }}</span> of <span class="font-medium">{{ totalUsers }}</span> voters
              </div>
              <div class="text-sm font-medium" :class="votingProgress === 100 ? 'text-green-500' : 'text-blue-500'">
                {{ votingProgress }}% Complete
              </div>
            </div>
            <div class="flex items-center justify-center mt-2">
              <i class="fas fa-info-circle text-blue-400 mr-2"></i>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ votingProgress === 100 ? 'All voters have completed voting' : 'Voting is still in progress' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
            <span class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            <span>Quick Stats</span>
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <div class="text-blue-600 dark:text-blue-400 mb-1">
                <i class="fas fa-user-check mr-2"></i>
                <span class="text-sm">Active Voters</span>
              </div>
              <div class="text-2xl font-bold">{{ votedCount }}</div>
            </div>
            <div class="bg-purple-50/50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
              <div class="text-purple-600 dark:text-purple-400 mb-1">
                <i class="fas fa-user-clock mr-2"></i>
                <span class="text-sm">Pending Voters</span>
              </div>
              <div class="text-2xl font-bold">{{ totalUsers - votedCount }}</div>
            </div>
            <div class="bg-green-50/50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
              <div class="text-green-600 dark:text-green-400 mb-1">
                <i class="fas fa-check-circle mr-2"></i>
                <span class="text-sm">Completion</span>
              </div>
              <div class="text-2xl font-bold">{{ votingProgress }}%</div>
            </div>
            <div class="bg-yellow-50/50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
              <div class="text-yellow-600 dark:text-yellow-400 mb-1">
                <i class="fas fa-hourglass-half mr-2"></i>
                <span class="text-sm">Status</span>
              </div>
              <div class="text-2xl font-bold" :class="votingProgress === 100 ? 'text-green-500' : 'text-yellow-500'">
                {{ votingProgress === 100 ? 'Completed' : 'In Progress' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages Section -->
      <div class="mb-10">
        <!-- Messages Preview Card -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3">
              <span class="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              <span>Recent Messages</span>
              <div v-if="unreadMessages > 0" class="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {{ unreadMessages }} new
              </div>
            </h2>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span class="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Unread</span>
              </div>
              <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Replied</span>
              </div>
              <router-link 
                :to="{ name: 'Messages' }"
                class="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View All
                <i class="fas fa-arrow-right text-xs"></i>
              </router-link>
            </div>
          </div>
          
          <!-- Message Stats -->
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
              <div class="text-red-600 dark:text-red-400 text-xs mb-1">Unread</div>
              <div class="text-lg font-bold">{{ unreadMessages }}</div>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-900/30">
              <div class="text-green-600 dark:text-green-400 text-xs mb-1">Replied</div>
              <div class="text-lg font-bold">{{ repliedMessages }}</div>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <div class="text-blue-600 dark:text-blue-400 text-xs mb-1">Total</div>
              <div class="text-lg font-bold">{{ totalMessages }}</div>
            </div>
          </div>
          
          <div v-if="recentMessages && recentMessages.length > 0" class="space-y-3">
            <div 
              v-for="message in recentMessages" 
              :key="message.id"
              class="p-3 rounded-lg border transition-all duration-200 cursor-pointer group"
              :class="{
                'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800': message.status === 'unread',
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': message.status === 'replied',
                'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700': message.status === 'read',
                'hover:shadow-md': true
              }"
              @click="viewMessage(message)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200 truncate">{{ message.name }}</h3>
                    <span 
                      class="w-2 h-2 rounded-full flex-shrink-0"
                      :class="{
                        'bg-red-500': message.status === 'unread',
                        'bg-green-500': message.status === 'replied',
                        'bg-gray-400': message.status === 'read'
                      }"
                    ></span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ message.email }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ message.message }}</p>
                  <div class="flex items-center justify-between mt-2">
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(message.createdAt) }}</p>
                    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        @click.stop="quickReply(message)"
                        class="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                        title="Quick Reply"
                      >
                        <i class="fas fa-reply text-xs"></i>
                      </button>
                      <button 
                        @click.stop="copyContactInfo(message)"
                        class="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Copy Contact Info"
                      >
                        <i class="fas fa-copy text-xs"></i>
                      </button>
                      <button 
                        @click.stop="toggleMessageStatus(message)"
                        class="p-1 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                        :title="message.status === 'replied' ? 'Mark as Read' : 'Mark as Replied'"
                      >
                        <i :class="message.status === 'replied' ? 'fas fa-check' : 'fas fa-reply-all'" class="text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
            <i class="fas fa-inbox text-xl mb-2"></i>
            <p>No messages yet</p>
          </div>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
          <span class="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></span>
          <span>User Distribution</span>
        </h2>
        <div class="animate-fade-in">
          <UserDistributionChart
            :students="totalStudents"
            :teachers="totalTeachers"
            :otherStaff="totalOtherStaff"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/firebase/config';
import getAllUser from '@/adminComposables/getAllUser';
import getAllCandidates from '@/adminComposables/getAllCandidates';
import Loading from '@/adminComponents/Loading';
import SideBar from '@/adminComponents/SideBar';
import UserDistributionChart from './UserDistributionChart.vue';

export default {
  components: {
    Loading,
    SideBar,
    UserDistributionChart
  },
  setup() {
    const router = useRouter();
    const isLoading = ref(true);
    
    // User data
    const { users: students, load: loadStudents } = getAllUser('students');
    const { users: teachers, load: loadTeachers } = getAllUser('teachers');
    const { users: otherStaff, load: loadOtherStaff } = getAllUser('otherStaff');
    const { candidates, load: loadCandidates } = getAllCandidates();
    
    // Stats
    const totalUsers = ref(0);
    const totalCandidates = ref(0);
    const totalStudents = ref(0);
    const totalTeachers = ref(0);
    const totalOtherStaff = ref(0);
    const totalMessages = ref(0);
    const unreadMessages = ref(0);
    const repliedMessages = ref(0);
    const votingProgress = ref(0);
    const votedCount = ref(0);
    
    // Recent data
    const recentMessages = ref([]);

    // Format date for display
    const formatDate = (timestamp) => {
      if (!timestamp) return '';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };

    async function fetchVotedCount() {
      const collections = [
        'voteMajorKing',
        'voteMajorQueen',
        'voteUniversityKing',
        'voteUniversityQueen'
      ];
      const uniqueVoters = new Set();
      
      for (const col of collections) {
        try {
          const snapshot = await db.collection(col).get();
          snapshot.forEach(doc => {
            const data = doc.data();
            if (Array.isArray(data.voter)) {
              data.voter.forEach(voterId => uniqueVoters.add(voterId));
            }
          });
        } catch (error) {
          console.error(`Error fetching votes from ${col}:`, error);
        }
      }
      
      votedCount.value = uniqueVoters.size;
      votingProgress.value = totalUsers.value > 0 ? Math.round((votedCount.value / totalUsers.value) * 100) : 0;
    }

    async function fetchMessages() {
      try {
        const messagesSnapshot = await db.collection('contacts').get();
        const messages = [];
        let unreadCount = 0;
        let repliedCount = 0;
        
        messagesSnapshot.forEach(doc => {
          const data = doc.data();
          const status = data.status || 'unread';
          if (status === 'unread') unreadCount++;
          if (status === 'replied') repliedCount++;
          
          messages.push({
            id: doc.id,
            name: data.name || 'Anonymous',
            email: data.email || 'No email',
            message: data.message || 'No message content',
            createdAt: data.createdAt || new Date(),
            status: status
          });
        });
        
        // Update counts
        totalMessages.value = messages.length;
        unreadMessages.value = unreadCount;
        repliedMessages.value = repliedCount;
        
        // Store unread count for badge
        localStorage.setItem('messageBadgeCount', unreadCount);
        
        // Sort by date (newest first) and take first 3
        recentMessages.value = messages
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 3);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    function viewMessage(message) {
      router.push({ name: 'Messages', query: { messageId: message.id } });
    }

    function quickReply(message) {
      // Open default email client with pre-filled information
      const subject = encodeURIComponent('Re: Your Message');
      const body = encodeURIComponent(`Dear ${message.name},\n\nThank you for your message. We have received your inquiry and will get back to you soon.\n\nBest regards,\nAdmin Team`);
      const mailtoLink = `mailto:${message.email}?subject=${subject}&body=${body}`;
      window.open(mailtoLink);
    }

    function copyContactInfo(message) {
      const contactInfo = `Name: ${message.name}\nEmail: ${message.email}`;
      navigator.clipboard.writeText(contactInfo)
        .then(() => {
          // You could add a toast notification here
          console.log('Contact information copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy contact info:', err);
        });
    }

    async function toggleMessageStatus(message) {
      try {
        const newStatus = message.status === 'replied' ? 'read' : 'replied';
        await updateMessageStatus(message.id, newStatus);
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }

    async function updateMessageStatus(messageId, status) {
      try {
        const messageRef = db.collection('contacts').doc(messageId);
        await messageRef.update({ status });
        
        // Update local state
        const messageIndex = recentMessages.value.findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          recentMessages.value[messageIndex].status = status;
        }
        
        // Recalculate counts
        await fetchMessages();
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }

    // Setup realtime listeners
    function setupRealtimeListeners() {
      // Messages listener
      const messagesUnsubscribe = db.collection('contacts').onSnapshot((snapshot) => {
        const messages = [];
        let unreadCount = 0;
        let repliedCount = 0;
        
        snapshot.forEach(doc => {
          const data = doc.data();
          const status = data.status || 'unread';
          if (status === 'unread') unreadCount++;
          if (status === 'replied') repliedCount++;
          
          messages.push({
            id: doc.id,
            name: data.name || 'Anonymous',
            email: data.email || 'No email',
            message: data.message || 'No message content',
            createdAt: data.createdAt || new Date(),
            status: status
          });
        });
        
        totalMessages.value = messages.length;
        unreadMessages.value = unreadCount;
        repliedMessages.value = repliedCount;
        localStorage.setItem('messageBadgeCount', unreadCount);
        
        recentMessages.value = messages
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 3);
      });

      return () => {
        messagesUnsubscribe();
      };
    }

    onMounted(async () => {
      try {
        await Promise.all([
          loadStudents(),
          loadTeachers(),
          loadOtherStaff(),
          loadCandidates()
        ]);
        
        // Calculate totals
        totalStudents.value = students.value?.length || 0;
        totalTeachers.value = teachers.value?.length || 0;
        totalOtherStaff.value = otherStaff.value?.length || 0;
        totalUsers.value = totalStudents.value + totalTeachers.value + totalOtherStaff.value;
        totalCandidates.value = candidates.value?.length || 0;
        
        // Fetch additional data
        await Promise.all([
          fetchVotedCount(),
          fetchMessages()
        ]);
        
        // Setup realtime listeners
        const unsubscribe = setupRealtimeListeners();
        
        isLoading.value = false;
        
        // Cleanup on unmount
        return () => unsubscribe();
      } catch (error) {
        console.error("Error initializing dashboard:", error);
        isLoading.value = false;
      }
    });

    return {
      isLoading,
      totalUsers,
      totalCandidates,
      totalStudents,
      totalTeachers,
      totalOtherStaff,
      totalMessages,
      unreadMessages,
      repliedMessages,
      recentMessages,
      votingProgress,
      votedCount,
      formatDate,
      viewMessage,
      quickReply,
      copyContactInfo,
      toggleMessageStatus
    };
  }
}
</script>


<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1);
}

.stat-card {
  position: relative;
  transition: all 0.3s ease;
  display: block;
  text-decoration: none;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.icon-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.stat-card:hover .icon-bg {
  transform: scale(1.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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