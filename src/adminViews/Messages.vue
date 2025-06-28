<template>
  <div>
    <SideBar />
    <div class="sm:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-0">
      <!-- Header -->
      <div class="flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-b-3xl shadow-lg mb-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"></div>
        <div class="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg z-10">
          <i class="fas fa-comment-dots fa-2x text-white"></i>
        </div>
        <div class="z-10">
          <h1 class="text-3xl font-bold text-white mb-1">Contact Messages</h1>
          <p class="text-base text-blue-100/90">View and manage messages from users</p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-4 md:px-8 pb-12">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center w-full py-20">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div class="flex items-center gap-4">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span class="text-gray-600 dark:text-gray-300">Loading messages...</span>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div v-else>
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
                  <i class="fas fa-inbox fa-lg text-blue-600 dark:text-blue-400"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Total Messages</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ messages.length }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="bg-red-100 dark:bg-red-900/50 p-3 rounded-xl">
                  <i class="fas fa-exclamation-circle fa-lg text-red-600 dark:text-red-400"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Unread</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ unreadCount }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="bg-green-100 dark:bg-green-900/50 p-3 rounded-xl">
                  <i class="fas fa-check-circle fa-lg text-green-600 dark:text-green-400"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Replied</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ repliedCount }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                  <i class="fas fa-eye fa-lg text-gray-600 dark:text-gray-400"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Read</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ readCount }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Messages List -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
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
                      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
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
                    <a :href="`mailto:${message.email}`" class="text-blue-600 dark:text-blue-400 hover:underline">
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
                        <i class="fas fa-eye"></i>
                      </button>
                      <button 
                        @click="quickReply(message)"
                        class="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200"
                        title="Quick Reply"
                      >
                        <i class="fas fa-reply"></i>
                      </button>
                      <button 
                        @click="copyContactInfo(message)"
                        class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                        title="Copy Contact Info"
                      >
                        <i class="fas fa-copy"></i>
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
                        <i :class="message.status === 'replied' ? 'fas fa-check' : 'fas fa-reply-all'" class="mr-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="messages.length === 0" class="p-12 text-center">
              <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <i class="fas fa-inbox text-3xl text-gray-400"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No messages found</h3>
              <p class="text-gray-500 dark:text-gray-400">
                No messages have been received yet
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
                  'px-4 py-2 rounded-lg transition-all duration-200',
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                ]"
              >
                <i class="fas fa-chevron-left mr-2"></i>
                Previous
              </button>
              <button 
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-4 py-2 rounded-lg transition-all duration-200',
                  currentPage === totalPages
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                ]"
              >
                Next
                <i class="fas fa-chevron-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Detail Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {{ selectedMessage.name ? selectedMessage.name.charAt(0).toUpperCase() : '?' }}
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Message Details</h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(selectedMessage.createdAt, true) }}</p>
                </div>
              </div>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                <i class="fas fa-times text-xl"></i>
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
                  <a :href="`mailto:${selectedMessage.email}`" class="text-blue-600 dark:text-blue-400 hover:underline">
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
                  class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                  Close
                </button>
                <button
                  @click="copyContactInfo(selectedMessage)"
                  class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  <i class="fas fa-copy mr-2"></i>
                  Copy Contact Info
                </button>
                <button
                  @click="quickReply(selectedMessage)"
                  class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  <i class="fas fa-reply mr-2"></i>
                  Quick Reply
                </button>
                <button
                  @click="toggleReplyStatus(selectedMessage)"
                  class="px-6 py-3 rounded-lg transition-all duration-200"
                  :class="{
                    'bg-green-500 text-white hover:bg-green-600': selectedMessage.status !== 'replied',
                    'bg-gray-500 text-white hover:bg-gray-600': selectedMessage.status === 'replied'
                  }"
                >
                  <i :class="selectedMessage.status === 'replied' ? 'fas fa-check' : 'fas fa-reply-all'" class="mr-2"></i>
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

    const quickReply = (message) => {
      // Implementation of quick reply logic
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
      prevPage,
      quickReply
    };
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>