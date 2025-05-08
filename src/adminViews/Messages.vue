<template>
    <div>
      <SideBar />
      <div class="sm:ml-64 bg-gray-100 text-gray-900 rounded-lg dark:bg-gray-900 dark:text-gray-200">
        <!-- Page Header -->
        <section class="bg-white dark:bg-gray-800 text-center py-10">
          <h1 class="text-3xl sm:text-4xl font-bold mb-4">Contact Messages</h1>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            View and manage messages from users
          </p>
        </section>
  
        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center w-full py-20">
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
  
        <!-- Main Content -->
        <section v-else class="py-8 px-4 sm:px-8 bg-gray-100 dark:bg-gray-900">
          <!-- Search and Filter -->
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div class="relative w-full sm:w-64">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search messages..."
                class="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <div class="absolute left-3 top-2.5 text-gray-400">
                <i class="fas fa-search"></i>
              </div>
            </div>
            
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <label class="text-sm text-gray-600 dark:text-gray-300">Filter by:</label>
              <select 
                v-model="statusFilter"
                class="border rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>
  
          <!-- Messages List -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="grid grid-cols-12 bg-gray-100 dark:bg-gray-700 p-4 font-semibold text-gray-700 dark:text-gray-300">
              <div class="col-span-2 sm:col-span-1">Status</div>
              <div class="col-span-10 sm:col-span-3">Name</div>
              <div class="col-span-12 sm:col-span-4 hidden sm:block">Email</div>
              <div class="col-span-12 sm:col-span-2 hidden sm:block">Date</div>
              <div class="col-span-12 sm:col-span-2">Actions</div>
            </div>
  
            <div 
              v-for="message in filteredMessages" 
              :key="message.id"
              class="grid grid-cols-12 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20': selectedMessage?.id === message.id,
                'font-semibold': message.status === 'unread'
              }"
            >
              <div class="col-span-2 sm:col-span-1 flex items-center">
                <span 
                  class="w-3 h-3 rounded-full"
                  :class="{
                    'bg-red-500': message.status === 'unread',
                    'bg-green-500': message.status === 'replied',
                    'bg-gray-400': message.status === 'read'
                  }"
                ></span>
              </div>
              <div class="col-span-10 sm:col-span-3 font-medium">
                {{ message.name }}
                <div class="text-sm text-gray-500 dark:text-gray-400 sm:hidden">
                  {{ message.email }}
                </div>
              </div>
              <div class="col-span-12 sm:col-span-4 hidden sm:block">
                {{ message.email }}
              </div>
              <div class="col-span-12 sm:col-span-2 hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(message.createdAt) }}
              </div>
              <div class="col-span-12 sm:col-span-2 flex justify-end gap-2">
                <button 
                  @click="viewMessage(message)"
                  class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all text-sm"
                >
                  View
                </button>
                <button 
                  @click="toggleReplyStatus(message)"
                  class="px-3 py-1 text-white rounded-md transition-all text-sm"
                  :class="{
                    'bg-green-500 hover:bg-green-600': message.status !== 'replied',
                    'bg-gray-500 hover:bg-gray-600': message.status === 'replied'
                  }"
                >
                  {{ message.status === 'replied' ? 'Replied' : 'Mark as Replied' }}
                </button>
              </div>
            </div>
  
            <div v-if="filteredMessages.length === 0" class="p-8 text-center text-gray-500 dark:text-gray-400">
              No messages found
            </div>
          </div>
  
          <!-- Pagination -->
          <div class="flex justify-between items-center mt-6">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Showing {{ startItem }} to {{ endItem }} of {{ filteredMessages.length }} messages
            </div>
            <div class="flex gap-2">
              <button 
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPage === 1
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                ]"
              >
                Previous
              </button>
              <button 
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPage === totalPages
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </section>
  
        <!-- Message Detail Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-xl font-bold">Message Details</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <i class="fas fa-times"></i>
                </button>
              </div>
  
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">From</label>
                  <p class="mt-1">{{ selectedMessage.name }}</p>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <a :href="`mailto:${selectedMessage.email}`" class="mt-1 text-blue-500 hover:underline">
                    {{ selectedMessage.email }}
                  </a>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Subject</label>
                  <p class="mt-1">{{ selectedMessage.subject }}</p>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Date</label>
                  <p class="mt-1">{{ formatDate(selectedMessage.createdAt, true) }}</p>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Message</label>
                  <p class="mt-1 whitespace-pre-line">{{ selectedMessage.message }}</p>
                </div>
  
                <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div class="flex justify-end gap-2 mt-4">
                    <button
                      @click="closeModal"
                      class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
                    >
                      Close
                    </button>
                    <button
                      @click="copyContactInfo"
                      class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                    >
                      Copy Contact Info
                    </button>
                    <button
                      @click="toggleReplyStatus(selectedMessage)"
                      class="px-4 py-2 text-white rounded-md transition-all"
                      :class="{
                        'bg-green-500 hover:bg-green-600': selectedMessage.status !== 'replied',
                        'bg-gray-500 hover:bg-gray-600': selectedMessage.status === 'replied'
                      }"
                    >
                      {{ selectedMessage.status === 'replied' ? '✓ Replied' : 'Mark as Replied' }}
                    </button>
                  </div>
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
  import { ref, onMounted, computed } from "vue";
  
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
      const searchQuery = ref("");
      const statusFilter = ref("all");
      
      // Pagination
      const currentPage = ref(1);
      const itemsPerPage = ref(10);
  
      // Computed properties
      const filteredMessages = computed(() => {
        let result = messages.value;
  
        // Apply search filter
        if (searchQuery.value) {
          const query = searchQuery.value.toLowerCase();
          result = result.filter(msg => 
            msg.name.toLowerCase().includes(query) || 
            msg.email.toLowerCase().includes(query) ||
            msg.message.toLowerCase().includes(query) ||
            msg.subject.toLowerCase().includes(query)
          );
        }
  
        // Apply status filter
        if (statusFilter.value !== "all") {
          result = result.filter(msg => msg.status === statusFilter.value);
        }
  
        return result;
      });
  
      const totalPages = computed(() => Math.ceil(filteredMessages.value.length / itemsPerPage.value));
      const paginatedMessages = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filteredMessages.value.slice(start, end);
      });
      const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
      const endItem = computed(() => {
        const end = currentPage.value * itemsPerPage.value;
        return end > filteredMessages.value.length ? filteredMessages.value.length : end;
      });
  
      // Methods
      const fetchMessages = async () => {
        try {
          const snapshot = await db.collection("contacts").orderBy("createdAt", "desc").get();
          messages.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            status: doc.data().status || "unread"
          }));
          
          // Update badge count in localStorage
          const unreadCount = messages.value.filter(msg => msg.status === "unread").length;
          localStorage.setItem('messageBadgeCount', unreadCount);
          
          isLoading.value = false;
        } catch (error) {
          console.error("Error fetching messages:", error);
          isLoading.value = false;
        }
      };
  
      const setupRealtimeListener = () => {
        return db.collection("contacts").orderBy("createdAt", "desc")
          .onSnapshot((snapshot) => {
            messages.value = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              status: doc.data().status || "unread"
            }));
            
            // Update badge count in localStorage
            const unreadCount = messages.value.filter(msg => msg.status === "unread").length;
            localStorage.setItem('messageBadgeCount', unreadCount);
          });
      };
  
      const formatDate = (timestamp, full = false) => {
        if (!timestamp) return "";
        const date = timestamp.toDate();
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
      };
  
      const viewMessage = (message) => {
        selectedMessage.value = message;
        isModalOpen.value = true;
        
        // Mark as read if unread
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
          
          // Update local state
          const index = messages.value.findIndex(msg => msg.id === id);
          if (index !== -1) {
            messages.value[index].status = status;
          }
          
          // Update badge count in localStorage
          const unreadCount = messages.value.filter(msg => msg.status === "unread").length;
          localStorage.setItem('messageBadgeCount', unreadCount);
        } catch (error) {
          console.error("Error updating message status:", error);
        }
      };
  
      const toggleReplyStatus = async (message) => {
        const newStatus = message.status === "replied" ? "read" : "replied";
        await updateMessageStatus(message.id, newStatus);
      };
  
      const copyContactInfo = () => {
        if (!selectedMessage.value) return;
        
        const contactInfo = `Name: ${selectedMessage.value.name}\nEmail: ${selectedMessage.value.email}`;
        navigator.clipboard.writeText(contactInfo)
          .then(() => {
            alert("Contact information copied to clipboard!");
          })
          .catch(err => {
            console.error("Failed to copy contact info:", err);
            alert("Failed to copy contact info. Please try again.");
          });
      };
  
      const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;
      const prevPage = () => currentPage.value > 1 && currentPage.value--;
  
      // Lifecycle hooks
      onMounted(() => {
        fetchMessages();
        const unsubscribe = setupRealtimeListener();
        
        // Cleanup listener when component unmounts
        return () => unsubscribe();
      });
  
      return {
        isLoading,
        messages: paginatedMessages,
        filteredMessages,
        selectedMessage,
        isModalOpen,
        searchQuery,
        statusFilter,
        currentPage,
        itemsPerPage,
        totalPages,
        startItem,
        endItem,
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
  /* Custom styles if needed */
  </style>