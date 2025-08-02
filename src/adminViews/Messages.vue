<template>
  <div>
    <SideBar />
    <div class="sm:ml-64 min-h-screen  text-gray-900 dark:text-gray-200">
      <!-- Enhanced Header with Background Pattern -->
      <div class="relative overflow-hidden bg-white dark:bg-gray-800 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.05) 1px, transparent 0); background-size: 20px 20px;"></div>
        </div>
        
        <div class="relative z-10 px-6 py-10">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center gap-6">
              <div class="relative">
                <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-5 shadow-xl shadow-blue-500/25">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold text-white">{{ unreadCount }}</span>
                </div>
              </div>
              <div>
                <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Contact Messages
                </h1>
                <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
                  Manage and respond to user inquiries efficiently
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-6 py-8">
        <div class="max-w-7xl mx-auto">
          <!-- Enhanced Loading State -->
          <div v-if="isLoading" class="flex items-center justify-center w-full py-32">
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-gray-200/50 dark:border-gray-700/50">
              <div class="flex flex-col items-center gap-6">
                <div class="relative">
                  <div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div class="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <div class="text-center">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Messages</h3>
                  <p class="text-gray-500 dark:text-gray-400">Please wait while we fetch your messages...</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div v-else>
            <!-- Enhanced Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-2">
                <div class="flex items-center gap-6">
                  <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Messages</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ messages.length }}</p>
                  </div>
                </div>
              </div>

              <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-2">
                <div class="flex items-center gap-6">
                  <div class="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Unread</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ unreadCount }}</p>
                  </div>
                </div>
              </div>

              <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-2">
                <div class="flex items-center gap-6">
                  <div class="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Replied</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ repliedCount }}</p>
                  </div>
                </div>
              </div>

              <div class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-2">
                <div class="flex items-center gap-6">
                  <div class="bg-gradient-to-br from-gray-500 to-gray-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Read</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ readCount }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Messages List -->
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <!-- Enhanced Header -->
              <div class="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div class="grid grid-cols-12 gap-6 font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  <div class="col-span-1">Status</div>
                  <div class="col-span-3">Contact</div>
                  <div class="col-span-4 hidden lg:block">Email</div>
                  <div class="col-span-2 hidden lg:block">Date</div>
                  <div class="col-span-2">Actions</div>
                </div>
              </div>

              <!-- Enhanced Messages -->
              <div class="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                <div 
                  v-for="message in paginatedMessages" 
                  :key="message.id"
                  class="px-8 py-6 hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-all duration-300 group"
                  :class="{
                    'bg-blue-50/80 dark:bg-blue-900/20 border-l-4 border-blue-500': selectedMessage?.id === message.id,
                    'border-l-4 border-red-500 bg-red-50/50 dark:bg-red-900/10': message.status === 'unread'
                  }"
                >
                  <div class="grid grid-cols-12 gap-6 items-center">
                    <!-- Enhanced Status -->
                    <div class="col-span-1">
                      <div class="flex items-center gap-3">
                        <div class="relative">
                          <span 
                            class="w-4 h-4 rounded-full shadow-lg"
                            :class="{
                              'bg-red-500 animate-pulse': message.status === 'unread',
                              'bg-green-500': message.status === 'replied',
                              'bg-gray-400': message.status === 'read'
                            }"
                          ></span>
                          <span v-if="message.status === 'unread'" class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        </div>
                        <span class="text-xs font-bold hidden sm:block px-3 py-1 rounded-full"
                              :class="{
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': message.status === 'unread',
                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': message.status === 'replied',
                                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400': message.status === 'read'
                              }">
                          {{ message.status }}
                        </span>
                      </div>
                    </div>

                    <!-- Enhanced Contact Info -->
                    <div class="col-span-3">
                      <div class="flex items-center gap-4">
                        <div class="relative">
                          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {{ message.name ? message.name.charAt(0).toUpperCase() : '?' }}
                          </div>
                          <div v-if="message.status === 'unread'" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                        <div>
                          <h3 class="font-bold text-gray-900 dark:text-white text-lg">{{ message.name || 'Unknown' }}</h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400 lg:hidden">{{ message.email || 'No email' }}</p>
                          <p v-if="message.subject" class="text-xs text-gray-400 dark:text-gray-500 truncate max-w-32 lg:hidden">{{ message.subject }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Enhanced Email -->
                    <div class="col-span-4 hidden lg:block">
                      <a :href="`mailto:${message.email}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold hover:underline transition-colors duration-200">
                        {{ message.email || 'No email' }}
                      </a>
                      <p v-if="message.subject" class="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{{ message.subject }}</p>
                    </div>

                    <!-- Enhanced Date -->
                    <div class="col-span-2 hidden lg:block">
                      <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ formatDate(message.createdAt) }}</p>
                    </div>

                    <!-- Enhanced Actions -->
                    <div class="col-span-2">
                      <div class="flex items-center gap-3">
                        <button 
                          @click="viewMessage(message)"
                          class="p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                          title="View Message"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </button>
                        <button 
                          @click="copyContactInfo(message)"
                          class="p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                          title="Copy Contact Info"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                          </svg>
                        </button>
                        <button 
                          @click="toggleReplyStatus(message)"
                          class="p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                          :class="{
                            'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30': message.status !== 'replied',
                            'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': message.status === 'replied'
                          }"
                          :title="message.status === 'replied' ? 'Mark as Read' : 'Mark as Replied'"
                        >
                          <svg v-if="message.status === 'replied'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Enhanced Empty State -->
              <div v-if="messages.length === 0" class="p-16 text-center">
                <div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center shadow-xl">
                  <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">No messages found</h3>
                <p class="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                  No messages have been received yet. They will appear here once users start contacting you.
                </p>
              </div>
            </div>

            <!-- Enhanced Pagination -->
            <div v-if="messages.length > 0" class="flex justify-between items-center mt-10">
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Showing {{ startItem }} to {{ endItem }} of {{ messages.length }} messages
              </div>
              <div class="flex gap-3">
                <button 
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  :class="[
                    'px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg',
                    currentPage === 1
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:-translate-y-1'
                  ]"
                >
                  <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Previous
                </button>
                <button 
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  :class="[
                    'px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg',
                    currentPage === totalPages
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:-translate-y-1'
                  ]"
                >
                  Next
                  <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Message Detail Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-gray-700/50">
          <div class="p-8">
            <div class="flex justify-between items-start mb-8">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                    {{ selectedMessage.name ? selectedMessage.name.charAt(0).toUpperCase() : '?' }}
                  </div>
                  <div v-if="selectedMessage.status === 'unread'" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-3 border-white dark:border-gray-800 animate-pulse"></div>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Message Details</h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">{{ formatDate(selectedMessage.createdAt, true) }}</p>
                </div>
              </div>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                  <label class="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">From</label>
                  <p class="text-gray-900 dark:text-white font-bold text-lg">{{ selectedMessage.name || 'Unknown' }}</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                  <label class="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Email</label>
                  <a :href="`mailto:${selectedMessage.email}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold text-lg hover:underline transition-colors duration-200">
                    {{ selectedMessage.email || 'No email' }}
                  </a>
                </div>
              </div>

              <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                <label class="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Subject</label>
                <p class="text-gray-900 dark:text-white font-semibold text-lg">{{ selectedMessage.subject || 'No Subject' }}</p>
              </div>

              <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                <label class="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Message</label>
                <p class="text-gray-900 dark:text-white whitespace-pre-line leading-relaxed text-lg">{{ selectedMessage.message || 'No message content' }}</p>
              </div>

              <div class="flex justify-end gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                  @click="closeModal"
                  class="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Close
                </button>
                <button
                  @click="copyContactInfo(selectedMessage)"
                  class="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy Contact Info
                </button>
                <button
                  @click="toggleReplyStatus(selectedMessage)"
                  class="px-8 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
                  :class="{
                    'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700': selectedMessage.status !== 'replied',
                    'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700': selectedMessage.status === 'replied'
                  }"
                >
                  <svg v-if="selectedMessage.status === 'replied'" class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <svg v-else class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          // Create a temporary success notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full';
          notification.innerHTML = `
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-semibold">Contact info copied!</span>
            </div>
          `;
          document.body.appendChild(notification);
          
          // Animate in
          setTimeout(() => {
            notification.classList.remove('translate-x-full');
          }, 100);
          
          // Remove after 3 seconds
          setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 300);
          }, 3000);
        })
        .catch(err => {
          console.error("Failed to copy contact info:", err);
          // Create a temporary error notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 translate-x-full';
          notification.innerHTML = `
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-semibold">Failed to copy contact info</span>
            </div>
          `;
          document.body.appendChild(notification);
          
          // Animate in
          setTimeout(() => {
            notification.classList.remove('translate-x-full');
          }, 100);
          
          // Remove after 3 seconds
          setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 300);
          }, 3000);
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

/* Enhanced scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Enhanced focus states */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Improved text selection */
::selection {
  background: rgba(59, 130, 246, 0.2);
  color: inherit;
}

/* Enhanced backdrop blur for better performance */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Smooth animations for status indicators */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px currentColor;
  }
  50% {
    box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
  }
}

.animate-pulse {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced hover effects for cards */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Improved button press effects */
button:active {
  transform: scale(0.95);
}

/* Enhanced modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>