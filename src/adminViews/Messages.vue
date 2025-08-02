<template>
  <div>
    <SideBar />
    <div class="sm:ml-64 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-700 text-black dark:text-white">
        <div class="px-6 py-8 relative overflow-hidden">
          <div class="relative z-10 max-w-7xl mx-auto">
            <div class="flex items-center gap-4">
              <div class="bg-white dark:bg-gray-600 rounded-2xl p-4 shadow-lg">
                <svg class="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-3xl font-bold mb-2">Contact Messages</h1>
                  <p class="text-gray-700 dark:text-gray-300 text-lg">Manage and respond to user inquiries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-6 py-8">
        <div class="max-w-7xl mx-auto">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex items-center justify-center w-full py-20">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span class="text-gray-600 dark:text-gray-300 font-medium">Loading messages...</span>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Messages</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ messages.length }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div class="flex items-center gap-4">
                  <div class="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl">
                    <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Unread</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ unreadCount }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div class="flex items-center gap-4">
                  <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl">
                    <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Replied</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ repliedCount }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div class="flex items-center gap-4">
                  <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                    <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Read</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ readCount }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Messages List -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div class="grid grid-cols-12 gap-4 font-semibold text-gray-700 dark:text-gray-300">
                  <div class="col-span-1">Status</div>
                  <div class="col-span-3">Name</div>
                  <div class="col-span-4 hidden lg:block">Email</div>
                  <div class="col-span-2 hidden lg:block">Date</div>
                  <div class="col-span-2">Actions</div>
                </div>
              </div>

              <!-- Messages -->
              <div class="divide-y divide-gray-200 dark:divide-gray-700">
                <div 
                  v-for="message in paginatedMessages" 
                  :key="message.id"
                  class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                  :class="{
                    'bg-blue-50 dark:bg-blue-900/20': selectedMessage?.id === message.id,
                    'border-l-4 border-red-500': message.status === 'unread'
                  }"
                >
                  <div class="grid grid-cols-12 gap-4 items-center">
                    <!-- Status -->
                    <div class="col-span-1">
                      <div class="flex items-center gap-2">
                        <span 
                          class="w-3 h-3 rounded-full"
                          :class="{
                            'bg-red-500': message.status === 'unread',
                            'bg-green-500': message.status === 'replied',
                            'bg-gray-400': message.status === 'read'
                          }"
                        ></span>
                        <span class="text-xs font-medium hidden sm:block"
                              :class="{
                                'text-red-600 dark:text-red-400': message.status === 'unread',
                                'text-green-600 dark:text-green-400': message.status === 'replied',
                                'text-gray-500 dark:text-gray-400': message.status === 'read'
                              }">
                          {{ message.status }}
                        </span>
                      </div>
                    </div>

                    <!-- Name -->
                    <div class="col-span-3">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                          {{ message.name ? message.name.charAt(0).toUpperCase() : '?' }}
                        </div>
                        <div>
                          <h3 class="font-medium text-gray-900 dark:text-white">{{ message.name || 'Unknown' }}</h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400 lg:hidden">{{ message.email || 'No email' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Email -->
                    <div class="col-span-4 hidden lg:block">
                      <a :href="`mailto:${message.email}`" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        {{ message.email || 'No email' }}
                      </a>
                    </div>

                    <!-- Date -->
                    <div class="col-span-2 hidden lg:block">
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(message.createdAt) }}</p>
                    </div>

                    <!-- Actions -->
                    <div class="col-span-2">
                      <div class="flex items-center gap-2">
                        <button 
                          @click="viewMessage(message)"
                          class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                          title="View Message"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </button>
                        <button 
                          @click="copyContactInfo(message)"
                          class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                          title="Copy Contact Info"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                          </svg>
                        </button>
                        <button 
                          @click="toggleReplyStatus(message)"
                          class="p-2 rounded-lg transition-all duration-200"
                          :class="{
                            'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30': message.status !== 'replied',
                            'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': message.status === 'replied'
                          }"
                          :title="message.status === 'replied' ? 'Mark as Read' : 'Mark as Replied'"
                        >
                          <svg v-if="message.status === 'replied'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="messages.length === 0" class="p-12 text-center">
                <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No messages found</h3>
                <p class="text-gray-500 dark:text-gray-400">
                  No messages have been received yet. They will appear here once users start contacting you.
                </p>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="messages.length > 0" class="flex justify-between items-center mt-8">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Showing {{ startItem }} to {{ endItem }} of {{ messages.length }} messages
              </div>
              <div class="flex gap-2">
                <button 
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  :class="[
                    'px-4 py-2 rounded-lg transition-all duration-200 font-medium',
                    currentPage === 1
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                  ]"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Previous
                </button>
                <button 
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  :class="[
                    'px-4 py-2 rounded-lg transition-all duration-200 font-medium',
                    currentPage === totalPages
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                  ]"
                >
                  Next
                  <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Detail Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                  {{ selectedMessage.name ? selectedMessage.name.charAt(0).toUpperCase() : '?' }}
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Message Details</h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(selectedMessage.createdAt, true) }}</p>
                </div>
              </div>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">From</label>
                  <p class="text-gray-900 dark:text-white font-medium">{{ selectedMessage.name || 'Unknown' }}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Email</label>
                  <a :href="`mailto:${selectedMessage.email}`" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {{ selectedMessage.email || 'No email' }}
                  </a>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Subject</label>
                <p class="text-gray-900 dark:text-white">{{ selectedMessage.subject || 'No Subject' }}</p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Message</label>
                <p class="text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">{{ selectedMessage.message || 'No message content' }}</p>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  @click="closeModal"
                  class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  @click="copyContactInfo(selectedMessage)"
                  class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy Contact Info
                </button>
                <button
                  @click="toggleReplyStatus(selectedMessage)"
                  class="px-6 py-3 rounded-lg transition-all duration-200 font-medium"
                  :class="{
                    'bg-green-500 text-white hover:bg-green-600': selectedMessage.status !== 'replied',
                    'bg-gray-500 text-white hover:bg-gray-600': selectedMessage.status === 'replied'
                  }"
                >
                  <svg v-if="selectedMessage.status === 'replied'" class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <svg v-else class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                  {{ selectedMessage.status === 'replied' ? '✓ Replied' : 'Mark as Replied' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/adminComponents/SideBar.vue";
import { db } from "@/firebase/config";
import { ref, onMounted, computed, onUnmounted } from "vue";

export default {
  components: {
    SideBar
  },
  setup() {
    // State
    const isLoading = ref(true);
    const messages = ref([]);
    const selectedMessage = ref(null);
    const isModalOpen = ref(false);
    let unsubscribe = null;
    
    // Pagination
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Computed properties for message counts
    const unreadCount = computed(() => messages.value.filter(msg => msg.status === "unread").length);
    const readCount = computed(() => messages.value.filter(msg => msg.status === "read").length);
    const repliedCount = computed(() => messages.value.filter(msg => msg.status === "replied").length);

    const totalPages = computed(() => Math.ceil(messages.value.length / itemsPerPage.value));
    const paginatedMessages = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return messages.value.slice(start, end);
    });
    const startItem = computed(() => {
      if (messages.value.length === 0) return 0;
      return (currentPage.value - 1) * itemsPerPage.value + 1;
    });
    const endItem = computed(() => {
      const end = currentPage.value * itemsPerPage.value;
      return end > messages.value.length ? messages.value.length : end;
    });

    // Methods
    const fetchMessages = async () => {
      try {
        isLoading.value = true;
        const snapshot = await db.collection("contacts").orderBy("createdAt", "desc").get();
        messages.value = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            status: data.status || "unread"
          };
        });
        localStorage.setItem('messageBadgeCount', unreadCount.value);
        isLoading.value = false;
      } catch (error) {
        console.error("Error fetching messages:", error);
        isLoading.value = false;
      }
    };

    const setupRealtimeListener = () => {
      try {
        unsubscribe = db.collection("contacts").orderBy("createdAt", "desc")
          .onSnapshot((snapshot) => {
            messages.value = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                status: data.status || "unread"
              };
            });
            localStorage.setItem('messageBadgeCount', unreadCount.value);
          }, (error) => {
            console.error("Error in real-time listener:", error);
          });
      } catch (error) {
        console.error("Error setting up real-time listener:", error);
      }
    };

    const formatDate = (timestamp, full = false) => {
      if (!timestamp) return "";
      try {
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const options = {
          year: 'numeric',
          month: full ? 'long' : 'short',
          day: 'numeric'
        };
        if (full) {
          options.hour = '2-digit';
          options.minute = '2-digit';
        }
        return date.toLocaleDateString(undefined, options) + 
          (full ? ' at ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '');
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
      }
    };

    const viewMessage = (message) => {
      selectedMessage.value = message;
      isModalOpen.value = true;
      if (message.status === "unread") {
        updateMessageStatus(message.id, "read");
      }
    };

    const closeModal = () => {
      isModalOpen.value = false;
      selectedMessage.value = null;
    };

    const updateMessageStatus = async (id, status) => {
      try {
        await db.collection("contacts").doc(id).update({ status });
        const index = messages.value.findIndex(msg => msg.id === id);
        if (index !== -1) {
          messages.value[index].status = status;
        }
        localStorage.setItem('messageBadgeCount', unreadCount.value);
      } catch (error) {
        console.error("Error updating message status:", error);
      }
    };

    const toggleReplyStatus = async (message) => {
      const newStatus = message.status === "replied" ? "read" : "replied";
      await updateMessageStatus(message.id, newStatus);
    };

    const copyContactInfo = (message) => {
      if (!message) return;
      const contactInfo = `Name: ${message.name}\nEmail: ${message.email}`;
      navigator.clipboard.writeText(contactInfo)
        .then(() => {
          alert("Contact information copied to clipboard!");
        })
        .catch(err => {
          console.error("Failed to copy contact info:", err);
          alert("Failed to copy contact info. Please try again.");
        });
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    onMounted(() => {
      fetchMessages();
      setupRealtimeListener();
    });

    onUnmounted(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    });

    return {
      isLoading,
      paginatedMessages,
      messages,
      selectedMessage,
      isModalOpen,
      currentPage,
      itemsPerPage,
      totalPages,
      startItem,
      endItem,
      unreadCount,
      readCount,
      repliedCount,
      viewMessage,
      closeModal,
      toggleReplyStatus,
      copyContactInfo,
      formatDate,
      nextPage,
      prevPage
    };
  }
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