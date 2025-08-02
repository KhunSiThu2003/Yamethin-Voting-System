<template>
  <Loading v-if="isLoading"></Loading>
  <SideBar></SideBar>
  <div class="sm:ml-64 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-0">
    <!-- Enhanced Header -->
    <div class="relative overflow-hidden bg-white dark:bg-gray-700 rounded-b-[3rem] shadow-2xl mb-8">
      
      <div class="relative z-10 px-8 py-12">
        <div class="flex items-center gap-6">
          <div class="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-xl border border-white/30">
            <i class="fas fa-tachometer-alt fa-3x text-black dark:text-white"></i>
          </div>
          <div>
            <h1 class="text-4xl font-bold text-black dark:text-white mb-2 tracking-tight">Admin Dashboard</h1>
            <p class="text-lg text-gray-700 dark:text-gray-300 font-medium">Real-time overview of the voting system</p>
            <div class="flex items-center gap-4 mt-3">
              <div class="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-full px-4 py-2">
                <div class="w-2 h-2 bg-green-400 dark:bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-sm text-black dark:text-white font-medium">System Active</span>
              </div>
              <div class="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-full px-4 py-2">
                <i class="fas fa-users text-black dark:text-white"></i>
                <span class="text-sm text-black dark:text-white font-medium">{{ totalUsers }} Total Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 md:px-8 pb-12">
      <!-- Enhanced Stats Section -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
            <div class="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <span>System Statistics</span>
          </h2>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {{ new Date().toLocaleTimeString() }}
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <router-link 
            :to="{ name: 'ManageUsers' }"
            class="group relative bg-white dark:bg-gray-700 backdrop-blur-sm shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500/50 cursor-pointer transform hover:-translate-y-2"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 mb-4 w-fit shadow-lg">
                <i class="fas fa-users fa-lg text-white"></i>
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalUsers }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Voters</div>
              <div class="flex items-center gap-2 mt-3 text-xs text-blue-600 dark:text-blue-400">
                <i class="fas fa-arrow-right"></i>
                <span>View Details</span>
              </div>
            </div>
          </router-link>

          <router-link 
            :to="{ name: 'ManageUsers', query: { role: 'students' } }"
            class="group relative bg-white dark:bg-gray-700 backdrop-blur-sm shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 hover:border-green-300 dark:hover:border-green-500/50 cursor-pointer transform hover:-translate-y-2"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 mb-4 w-fit shadow-lg">
                <i class="fas fa-user-graduate fa-lg text-white"></i>
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalStudents }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Students</div>
              <div class="flex items-center gap-2 mt-3 text-xs text-green-600 dark:text-green-400">
                <i class="fas fa-arrow-right"></i>
                <span>View Details</span>
              </div>
            </div>
          </router-link>

          <router-link 
            :to="{ name: 'ManageUsers', query: { role: 'teachers' } }"
            class="group relative bg-white dark:bg-gray-700 backdrop-blur-sm shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 hover:border-yellow-300 dark:hover:border-yellow-500/50 cursor-pointer transform hover:-translate-y-2"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-3 mb-4 w-fit shadow-lg">
                <i class="fas fa-chalkboard-teacher fa-lg text-white"></i>
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalTeachers }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Teachers</div>
              <div class="flex items-center gap-2 mt-3 text-xs text-yellow-600 dark:text-yellow-400">
                <i class="fas fa-arrow-right"></i>
                <span>View Details</span>
              </div>
            </div>
          </router-link>

          <router-link 
            :to="{ name: 'ManageUsers', query: { role: 'otherStaff' } }"
            class="group relative bg-white dark:bg-gray-700 backdrop-blur-sm shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 hover:border-pink-300 dark:hover:border-pink-500/50 cursor-pointer transform hover:-translate-y-2"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-3 mb-4 w-fit shadow-lg">
                <i class="fas fa-user-cog fa-lg text-white"></i>
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalOtherStaff }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Other Staff</div>
              <div class="flex items-center gap-2 mt-3 text-xs text-pink-600 dark:text-pink-400">
                <i class="fas fa-arrow-right"></i>
                <span>View Details</span>
              </div>
            </div>
          </router-link>

          <router-link 
            :to="{ name: 'Candidates' }"
            class="group relative bg-white dark:bg-gray-700 backdrop-blur-sm shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-500/50 cursor-pointer transform hover:-translate-y-2"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-3 mb-4 w-fit shadow-lg">
                <i class="fas fa-user-tie fa-lg text-white"></i>
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalCandidates }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Candidates</div>
              <div class="flex items-center gap-2 mt-3 text-xs text-purple-600 dark:text-purple-400">
                <i class="fas fa-arrow-right"></i>
                <span>View Details</span>
              </div>
            </div>
          </router-link>

          <router-link 
            :to="{ name: 'Messages' }"
            class="group relative bg-white dark:bg-gray-700 backdrop-blur-sm shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/50 cursor-pointer transform hover:-translate-y-2"
          >
            <div v-if="unreadMessages > 0" class="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
              {{ unreadMessages }}
            </div>
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-3 mb-4 w-fit shadow-lg">
                <i class="fas fa-comment-dots fa-lg text-white"></i>
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ totalMessages }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Messages</div>
              <div class="flex items-center gap-2 mt-3 text-xs text-indigo-600 dark:text-indigo-400">
                <i class="fas fa-arrow-right"></i>
                <span>View Details</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Enhanced Voting Progress Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div class="bg-white dark:bg-gray-700 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-2 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">Voting Progress</h2>
          </div>
          
          <div class="space-y-6">
            <div class="relative">
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner overflow-hidden">
                <div
                  class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  :style="{ width: votingProgress + '%' }"
                ></div>
              </div>
              <div class="absolute -top-8 right-0 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <span class="text-sm font-bold" :class="votingProgress === 100 ? 'text-green-500' : 'text-blue-500'">
                  {{ votingProgress }}%
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800/30">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-check-circle text-green-500"></i>
                  <span class="text-sm font-medium text-green-700 dark:text-green-300">Voted</span>
                </div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ votedCount }}</div>
              </div>
              
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/30">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fas fa-clock text-blue-500"></i>
                  <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Pending</span>
                </div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ totalUsers - votedCount }}</div>
              </div>
            </div>
            
            <div class="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
              <i class="fas fa-info-circle text-blue-500 mr-3"></i>
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ votingProgress === 100 ? '🎉 All voters have completed voting!' : '⏳ Voting is still in progress' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Enhanced Quick Stats -->
        <div class="bg-white dark:bg-gray-700 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">Quick Stats</h2>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/30 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-user-check text-blue-500"></i>
                <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Active Voters</span>
              </div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ votedCount }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800/30 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-user-clock text-purple-500"></i>
                <span class="text-sm font-medium text-purple-700 dark:text-purple-300">Pending Voters</span>
              </div>
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ totalUsers - votedCount }}</div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800/30 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-check-circle text-green-500"></i>
                <span class="text-sm font-medium text-green-700 dark:text-green-300">Completion</span>
              </div>
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ votingProgress }}%</div>
            </div>
            
            <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800/30 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-hourglass-half text-yellow-500"></i>
                <span class="text-sm font-medium text-yellow-700 dark:text-yellow-300">Status</span>
              </div>
              <div class="text-lg font-bold" :class="votingProgress === 100 ? 'text-green-500' : 'text-yellow-500'">
                {{ votingProgress === 100 ? '✅ Completed' : '⏳ In Progress' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Messages Section -->
      <div class="mb-12">
        <div class="bg-white dark:bg-gray-700 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Messages</h2>
              <div v-if="unreadMessages > 0" class="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full px-3 py-1 animate-pulse">
                {{ unreadMessages }} new
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Unread</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Replied</span>
                </div>
              </div>
              <router-link 
                :to="{ name: 'Messages' }"
                class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                View All
                <i class="fas fa-arrow-right text-xs"></i>
              </router-link>
            </div>
          </div>
          
          <!-- Enhanced Message Stats -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800/30">
              <div class="text-red-600 dark:text-red-400 text-sm font-medium mb-1">Unread</div>
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ unreadMessages }}</div>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800/30">
              <div class="text-green-600 dark:text-green-400 text-sm font-medium mb-1">Replied</div>
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ repliedMessages }}</div>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/30">
              <div class="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">Total</div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ totalMessages }}</div>
            </div>
          </div>
          
          <div v-if="recentMessages && recentMessages.length > 0" class="space-y-4">
            <div 
              v-for="message in recentMessages" 
              :key="message.id"
              class="p-4 rounded-xl border transition-all duration-300 cursor-pointer group hover:shadow-lg"
              :class="{
                'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800': message.status === 'unread',
                'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800': message.status === 'replied',
                'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700/30 dark:to-slate-700/30 border-gray-200 dark:border-gray-700': message.status === 'read',
                'hover:scale-[1.02]': true
              }"
              @click="viewMessage(message)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 truncate">{{ message.name }}</h3>
                    <span 
                      class="w-3 h-3 rounded-full flex-shrink-0"
                      :class="{
                        'bg-red-500 animate-pulse': message.status === 'unread',
                        'bg-green-500': message.status === 'replied',
                        'bg-gray-400': message.status === 'read'
                      }"
                    ></span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ message.email }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{{ message.message }}</p>
                  <div class="flex items-center justify-between">
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(message.createdAt) }}</p>
                    <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        @click.stop="quickReply(message)"
                        class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Quick Reply"
                      >
                        <i class="fas fa-reply text-sm"></i>
                      </button>
                      <button 
                        @click.stop="copyContactInfo(message)"
                        class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Copy Contact Info"
                      >
                        <i class="fas fa-copy text-sm"></i>
                      </button>
                      <button 
                        @click.stop="toggleMessageStatus(message)"
                        class="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        :title="message.status === 'replied' ? 'Mark as Read' : 'Mark as Replied'"
                      >
                        <i :class="message.status === 'replied' ? 'fas fa-check' : 'fas fa-reply-all'" class="text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
            <i class="fas fa-inbox text-4xl mb-4 opacity-50"></i>
            <p class="text-lg">No messages yet</p>
            <p class="text-sm mt-2">Messages from users will appear here</p>
          </div>
        </div>
      </div>

      <!-- Enhanced Chart Section -->
      <div class="bg-white dark:bg-gray-700 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-2 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></div>
          <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">User Distribution</h2>
        </div>
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

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1);
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
  animation-delay: 1s;
}

.delay-2000 {
  animation-delay: 2s;
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

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Enhanced shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions for all elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Hover effects for interactive elements */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

.hover\:-translate-y-2:hover {
  transform: translateY(-0.5rem);
}

/* Gradient text support */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Enhanced focus states */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Responsive design improvements */
@media (max-width: 640px) {
  .sm\:ml-64 {
    margin-left: 0;
  }
  
  .text-4xl {
    font-size: 2rem;
    line-height: 2.5rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
}

/* Dark mode enhancements */
.dark .bg-white\/80 {
  background-color: rgba(31, 41, 55, 0.8);
}

.dark .border-white\/20 {
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .border-gray-700\/50 {
  border-color: rgba(55, 65, 81, 0.5);
}

/* Animation utilities */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

/* Enhanced button styles */
.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
}

.btn-gradient:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Card hover effects */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>