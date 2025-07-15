<template>
  <div>
    <SideBar />
    <div
      class="sm:ml-64 bg-gray-100 text-gray-900 rounded-lg dark:bg-gray-900 dark:text-gray-200"
    >
      <!-- Page Header -->
      <section class="bg-white dark:bg-gray-800 text-center py-10">
        <h1 class="text-3xl sm:text-4xl font-bold mb-4">Manage Users</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          View and manage all user information.
        </p>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Total Users: {{ totalUsers }} ({{ students.length }} students,
          {{ teachers.length }} teachers, {{ otherUsers.length }} others)
        </p>
      </section>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex items-center justify-center w-full py-20"
      >
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <!-- Main Content -->
      <section v-else class="py-8 px-4 sm:px-8 bg-gray-100 dark:bg-gray-900">
        <!-- Menu Buttons -->
        <div class="flex flex-wrap gap-4 mb-8">
          <button
            @click="setActiveSection('controlUser')"
            :class="[
              'px-6 py-2 rounded-md font-semibold transition-all',
              activeSection === 'controlUser'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800',
            ]"
          >
            Student Limits
          </button>
          <button
            @click="setActiveSection('allStudents')"
            :class="[
              'px-6 py-2 rounded-md font-semibold transition-all',
              activeSection === 'allStudents'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800',
            ]"
          >
            All Students
          </button>
          <button
            @click="setActiveSection('generateId')"
            :class="[
              'px-6 py-2 rounded-md font-semibold transition-all',
              activeSection === 'generateId'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800',
            ]"
          >
            Generate Registration ID
          </button>
          <button
            @click="setActiveSection('allTeachers')"
            :class="[
              'px-6 py-2 rounded-md font-semibold transition-all',
              activeSection === 'allTeachers'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800',
            ]"
          >
            All Teachers
          </button>
          <button
            @click="setActiveSection('otherUser')"
            :class="[
              'px-6 py-2 rounded-md font-semibold transition-all',
              activeSection === 'otherUser'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800',
            ]"
          >
            Other Users
          </button>
        </div>

        <!-- Generate Registration ID Section -->
        <section
          v-if="activeSection === 'generateId'"
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h1 class="text-2xl font-bold mb-4">Generate Registration ID</h1>

          <div class="mb-6">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2"
                >Registration ID</label
              >
              <div class="flex items-center">
                <input
                  v-model="generatedId"
                  type="text"
                  readonly
                  class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 mr-2"
                />
                <button
                  @click="generateId"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                >
                  Generate
                </button>
              </div>
            </div>
            <button
              @click="saveGeneratedId"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
              :disabled="!generatedId"
            >
              Save ID
            </button>
          </div>

          <div class="overflow-x-auto">
            <table
              class="table-auto w-full text-center border-collapse border border-gray-300 dark:border-gray-700"
            >
              <thead class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Registration ID
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Status
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Created At
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="regId in paginatedRegIds"
                  :key="regId.id"
                  class="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ regId.id }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <span
                      :class="{
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                          regId.used,
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                          !regId.used,
                      }"
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ regId.used ? "Used" : "Available" }}
                    </span>
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ formatDate(regId.createdAt) }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <button
                      @click="copyToClipboard(regId.id)"
                      class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all mr-2"
                    >
                      Copy
                    </button>
                    <button
                      @click="deleteRegistrationId(regId.id)"
                      class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="registrationIds.length === 0">
                  <td
                    colspan="4"
                    class="px-4 py-2 text-gray-500 dark:text-gray-400"
                  >
                    No registration IDs found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Showing {{ startItemRegIds }} to {{ endItemRegIds }} of
              {{ registrationIds.length }} IDs
            </div>
            <div class="flex space-x-2">
              <button
                @click="prevPageRegIds"
                :disabled="currentPageRegIds === 1"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPageRegIds === 1
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600',
                ]"
              >
                Previous
              </button>
              <button
                @click="nextPageRegIds"
                :disabled="currentPageRegIds === totalPagesRegIds"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPageRegIds === totalPagesRegIds
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600',
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <!-- Student Limits Section -->
        <section
          v-if="activeSection === 'controlUser'"
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h1 class="text-2xl font-bold mb-4">Students Limit</h1>
          <div class="overflow-x-auto">
            <table
              class="table-auto w-full text-center border-collapse border border-gray-300 dark:border-gray-700"
            >
              <thead class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Major
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Students Limit
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(limit, index) in studentLimits"
                  :key="index"
                  class="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ limit.major }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ limit.limit }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <button
                      @click="openEditLimitModal(limit, index)"
                      class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- All Students Section -->
        <section
          v-if="activeSection === 'allStudents'"
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">All Students</h1>
            <div class="flex items-center space-x-4">
              <input
                v-model="searchQueryStudents"
                type="text"
                placeholder="Search by name or roll no..."
                class="border rounded-md px-2 py-1 text-sm dark:bg-gray-700 mr-2"
              />
              <div class="flex items-center">
                <label for="itemsPerPage" class="mr-2 text-sm"
                  >Items per page:</label
                >
                <select
                  v-model="itemsPerPage"
                  @change="resetPagination"
                  class="border rounded-md px-2 py-1 text-sm dark:bg-gray-700"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table
              class="table-auto w-full text-center border-collapse border border-gray-300 dark:border-gray-700"
            >
              <thead class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Profile Image
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Name
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Roll No
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Major
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Year
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="student in paginatedStudents"
                  :key="student.id"
                  class="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <img
                      :src="student.profileImage"
                      :alt="student.name"
                      class="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ student.name }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ student.rollno }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ student.major }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ student.year }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <button
                      class="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                      @click="openDeleteModal(student, 'students')"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="paginatedStudents.length === 0">
                  <td
                    colspan="6"
                    class="px-4 py-2 text-gray-500 dark:text-gray-400"
                  >
                    No students found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Showing {{ startItem }} to {{ endItem }} of
              {{ students.length }} students
            </div>
            <div class="flex space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPage === 1
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600',
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
                    : 'bg-blue-500 text-white hover:bg-blue-600',
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <!-- All Teachers Section -->
        <section
          v-if="activeSection === 'allTeachers'"
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">All Teachers</h1>
            <div class="flex items-center space-x-4">
              <input
                v-model="searchQueryTeachers"
                type="text"
                placeholder="Search by name or registration ID..."
                class="border rounded-md px-2 py-1 text-sm dark:bg-gray-700 mr-2"
              />
              <div class="flex items-center">
                <label for="itemsPerPageTeachers" class="mr-2 text-sm"
                  >Items per page:</label
                >
                <select
                  v-model="itemsPerPageTeachers"
                  @change="resetPaginationTeachers"
                  class="border rounded-md px-2 py-1 text-sm dark:bg-gray-700"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table
              class="table-auto w-full text-center border-collapse border border-gray-300 dark:border-gray-700"
            >
              <thead class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Profile Image
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Name
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Registration ID
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Department
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="teacher in paginatedTeachers"
                  :key="teacher.id"
                  class="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <img
                      :src="teacher.profileImage"
                      :alt="teacher.name"
                      class="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ teacher.name }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ teacher.registerId || "N/A" }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ teacher.major || "N/A" }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <button
                      class="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                      @click="openDeleteModal(teacher, 'teachers')"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="paginatedTeachers.length === 0">
                  <td
                    colspan="5"
                    class="px-4 py-2 text-gray-500 dark:text-gray-400"
                  >
                    No teachers found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Showing {{ startItemTeachers }} to {{ endItemTeachers }} of
              {{ teachers.length }} teachers
            </div>
            <div class="flex space-x-2">
              <button
                @click="prevPageTeachers"
                :disabled="currentPageTeachers === 1"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPageTeachers === 1
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600',
                ]"
              >
                Previous
              </button>
              <button
                @click="nextPageTeachers"
                :disabled="currentPageTeachers === totalPagesTeachers"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPageTeachers === totalPagesTeachers
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600',
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <!-- Other Users Section -->
        <section
          v-if="activeSection === 'otherUser'"
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Other Users</h1>
            <div class="flex items-center space-x-4">
              <input
                v-model="searchQueryOtherUsers"
                type="text"
                placeholder="Search by name or registration ID..."
                class="border rounded-md px-2 py-1 text-sm dark:bg-gray-700 mr-2"
              />
              <div class="flex items-center">
                <label for="itemsPerPageOtherUsers" class="mr-2 text-sm"
                  >Items per page:</label
                >
                <select
                  v-model="itemsPerPageOtherUsers"
                  @change="resetPaginationOtherUsers"
                  class="border rounded-md px-2 py-1 text-sm dark:bg-gray-700"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table
              class="table-auto w-full text-center border-collapse border border-gray-300 dark:border-gray-700"
            >
              <thead class="bg-gray-200 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Profile Image
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Name
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Registration ID
                  </th>
                  <th
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in paginatedOtherUsers"
                  :key="user.id"
                  class="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <img
                      :src="user.profileImage"
                      :alt="user.name"
                      class="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ user.name }}
                  </td>
                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    {{ user.registerId || "N/A" }}
                  </td>

                  <td
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600"
                  >
                    <button
                      class="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                      @click="openDeleteModal(user, 'otherUser')"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="paginatedOtherUsers.length === 0">
                  <td
                    colspan="5"
                    class="px-4 py-2 text-gray-500 dark:text-gray-400"
                  >
                    No other users found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Showing {{ startItemOtherUsers }} to {{ endItemOtherUsers }} of
              {{ otherUsers.length }} users
            </div>
            <div class="flex space-x-2">
              <button
                @click="prevPageOtherUsers"
                :disabled="currentPageOtherUsers === 1"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPageOtherUsers === 1
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600',
                ]"
              >
                Previous
              </button>
              <button
                @click="nextPageOtherUsers"
                :disabled="currentPageOtherUsers === totalPagesOtherUsers"
                :class="[
                  'px-4 py-2 rounded-md',
                  currentPageOtherUsers === totalPagesOtherUsers
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600',
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/3">
        <h2 class="text-xl font-bold mb-4">Delete User</h2>
        <p class="mb-4">
          Are you sure you want to delete {{ selectedUser.name }}?
        </p>
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeDeleteModal"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Student Limit Modal -->
    <div
      v-if="isEditLimitModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/3">
        <h2 class="text-xl font-bold mb-4">Edit Student Limit</h2>
        <form @submit.prevent="saveStudentLimit">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Major</label>
            <input
              v-model="selectedLimit.major"
              type="text"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              disabled
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Students Limit</label>
            <input
              v-model="selectedLimit.limit"
              type="number"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeEditLimitModal"
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            >
              <div v-if="click" role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <span v-else>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/adminComponents/SideBar.vue";
import deleteUser from "@/adminComposables/deleteUser";
import getAllUser from "@/adminComposables/getAllUser";
import getStudentLimit from "@/adminComposables/getStudentLimit";
import { db } from "@/firebase/config";
import { ref, onMounted, computed, watch } from "vue";

export default {
  components: {
    SideBar,
  },
  setup() {
    const isLoading = ref(true);
    const activeSection = ref("controlUser");
    const students = ref([]);
    const teachers = ref([]);
    const otherUsers = ref([]);
    const registrationIds = ref([]);
    const isDeleteModalOpen = ref(false);
    const isEditLimitModalOpen = ref(false);
    const selectedUser = ref({});
    const selectedLimit = ref({});
    const selectedCollection = ref("");
    const click = ref(false);
    const generatedId = ref("");

    // Pagination variables for students
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Pagination variables for teachers
    const currentPageTeachers = ref(1);
    const itemsPerPageTeachers = ref(10);

    // Pagination variables for other users
    const currentPageOtherUsers = ref(1);
    const itemsPerPageOtherUsers = ref(10);

    // Pagination variables for registration IDs
    const currentPageRegIds = ref(1);
    const itemsPerPageRegIds = ref(10);

    // Student limits
    const studentLimits = ref([
      { major: "Electronic Engineering", limit: 0 },
      { major: "Electrical Power Engineering", limit: 0 },
      { major: "Civil Engineering", limit: 0 },
      { major: "Mechanical Engineering", limit: 0 },
    ]);

    const majorMapping = {
      "Electronic Engineering": "EC",
      "Electrical Power Engineering": "EP",
      "Civil Engineering": "CE",
      "Mechanical Engineering": "MECH",
    };

    // Add search query refs
    const searchQueryStudents = ref("");
    const searchQueryTeachers = ref("");
    const searchQueryOtherUsers = ref("");

    // Computed properties for students (filtered)
    const filteredStudents = computed(() => {
      if (!searchQueryStudents.value) return students.value;
      return students.value.filter((student) => {
        const query = searchQueryStudents.value.toLowerCase();
        return (
          (student.name && student.name.toLowerCase().includes(query)) ||
          (student.rollno && student.rollno.toLowerCase().includes(query))
        );
      });
    });
    const totalPages = computed(() =>
      Math.ceil(filteredStudents.value.length / itemsPerPage.value)
    );
    const paginatedStudents = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredStudents.value.slice(start, end);
    });
    const startItem = computed(
      () => (currentPage.value - 1) * itemsPerPage.value + 1
    );
    const endItem = computed(() => {
      const end = currentPage.value * itemsPerPage.value;
      return end > filteredStudents.value.length ? filteredStudents.value.length : end;
    });
    // Computed properties for teachers (filtered)
    const filteredTeachers = computed(() => {
      if (!searchQueryTeachers.value) return teachers.value;
      return teachers.value.filter((teacher) => {
        const query = searchQueryTeachers.value.toLowerCase();
        return (
          (teacher.name && teacher.name.toLowerCase().includes(query)) ||
          (teacher.registerId && teacher.registerId.toLowerCase().includes(query))
        );
      });
    });
    const totalPagesTeachers = computed(() =>
      Math.ceil(filteredTeachers.value.length / itemsPerPageTeachers.value)
    );
    const paginatedTeachers = computed(() => {
      const start = (currentPageTeachers.value - 1) * itemsPerPageTeachers.value;
      const end = start + itemsPerPageTeachers.value;
      return filteredTeachers.value.slice(start, end);
    });
    const startItemTeachers = computed(
      () => (currentPageTeachers.value - 1) * itemsPerPageTeachers.value + 1
    );
    const endItemTeachers = computed(() => {
      const end = currentPageTeachers.value * itemsPerPageTeachers.value;
      return end > filteredTeachers.value.length ? filteredTeachers.value.length : end;
    });
    // Computed properties for other users (filtered)
    const filteredOtherUsers = computed(() => {
      if (!searchQueryOtherUsers.value) return otherUsers.value;
      return otherUsers.value.filter((user) => {
        const query = searchQueryOtherUsers.value.toLowerCase();
        return (
          (user.name && user.name.toLowerCase().includes(query)) ||
          (user.registerId && user.registerId.toLowerCase().includes(query))
        );
      });
    });
    const totalPagesOtherUsers = computed(() =>
      Math.ceil(filteredOtherUsers.value.length / itemsPerPageOtherUsers.value)
    );
    const paginatedOtherUsers = computed(() => {
      const start = (currentPageOtherUsers.value - 1) * itemsPerPageOtherUsers.value;
      const end = start + itemsPerPageOtherUsers.value;
      return filteredOtherUsers.value.slice(start, end);
    });
    const startItemOtherUsers = computed(
      () => (currentPageOtherUsers.value - 1) * itemsPerPageOtherUsers.value + 1
    );
    const endItemOtherUsers = computed(() => {
      const end = currentPageOtherUsers.value * itemsPerPageOtherUsers.value;
      return end > filteredOtherUsers.value.length ? filteredOtherUsers.value.length : end;
    });

    // Computed properties for registration IDs
    const totalPagesRegIds = computed(() =>
      Math.ceil(registrationIds.value.length / itemsPerPageRegIds.value)
    );
    const paginatedRegIds = computed(() => {
      const start = (currentPageRegIds.value - 1) * itemsPerPageRegIds.value;
      const end = start + itemsPerPageRegIds.value;
      return registrationIds.value.slice(start, end);
    });
    const startItemRegIds = computed(
      () => (currentPageRegIds.value - 1) * itemsPerPageRegIds.value + 1
    );
    const endItemRegIds = computed(() => {
      const end = currentPageRegIds.value * itemsPerPageRegIds.value;
      return end > registrationIds.value.length
        ? registrationIds.value.length
        : end;
    });

    const totalUsers = computed(() => {
      return (
        students.value.length + teachers.value.length + otherUsers.value.length
      );
    });

    // Methods
    const nextPage = () =>
      currentPage.value < totalPages.value && currentPage.value++;
    const prevPage = () => currentPage.value > 1 && currentPage.value--;
    const resetPagination = () => (currentPage.value = 1);

    const nextPageTeachers = () =>
      currentPageTeachers.value < totalPagesTeachers.value &&
      currentPageTeachers.value++;
    const prevPageTeachers = () =>
      currentPageTeachers.value > 1 && currentPageTeachers.value--;
    const resetPaginationTeachers = () => (currentPageTeachers.value = 1);

    const nextPageOtherUsers = () =>
      currentPageOtherUsers.value < totalPagesOtherUsers.value &&
      currentPageOtherUsers.value++;
    const prevPageOtherUsers = () =>
      currentPageOtherUsers.value > 1 && currentPageOtherUsers.value--;
    const resetPaginationOtherUsers = () => (currentPageOtherUsers.value = 1);

    const nextPageRegIds = () =>
      currentPageRegIds.value < totalPagesRegIds.value &&
      currentPageRegIds.value++;
    const prevPageRegIds = () =>
      currentPageRegIds.value > 1 && currentPageRegIds.value--;
    const resetPaginationRegIds = () => (currentPageRegIds.value = 1);

    const setActiveSection = (section) => (activeSection.value = section);

    const generateId = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      generatedId.value = result;
    };

    const saveGeneratedId = async () => {
      if (!generatedId.value) return;

      try {
        await db.collection("registrationIds").doc(generatedId.value).set({
          id: generatedId.value,
          used: false,
          createdAt: new Date(), // Changed this line
        });

        // Refresh the list
        await fetchRegistrationIds();
        generatedId.value = "";
      } catch (error) {
        console.error("Error saving registration ID:", error);
      }
    };

    const fetchRegistrationIds = async () => {
      try {
        const snapshot = await db
          .collection("registrationIds")
          .orderBy("createdAt", "desc")
          .get();
        registrationIds.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        }));
      } catch (error) {
        console.error("Error fetching registration IDs:", error);
      }
    };

    const deleteRegistrationId = async (id) => {
      try {
        await db.collection("registrationIds").doc(id).delete();
        await fetchRegistrationIds();
      } catch (error) {
        console.error("Error deleting registration ID:", error);
      }
    };

    const copyToClipboard = (text) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };

    const saveStudentLimit = async () => {
      click.value = true;
      if (selectedLimit.value.index !== undefined) {
        try {
          const docRef = db.collection("admin").doc("student-limit");
          const shortCode = majorMapping[selectedLimit.value.major];
          await docRef.set(
            { [shortCode]: selectedLimit.value.limit },
            { merge: true }
          );
          studentLimits.value[selectedLimit.value.index].limit =
            selectedLimit.value.limit;
          click.value = false;
          closeEditLimitModal();
        } catch (error) {
          console.error("Error updating student limit:", error);
        }
      }
    };

    const fetchStudentLimits = async () => {
      try {
        const limits = await getStudentLimit();
        if (limits.value) {
          studentLimits.value = studentLimits.value.map((student) => ({
            ...student,
            limit: limits.value[majorMapping[student.major]] ?? student.limit,
          }));
        }
      } catch (error) {
        console.error("Error fetching student limits:", error);
      }
    };

    const openEditLimitModal = (limit, index) => {
      selectedLimit.value = { ...limit, index };
      isEditLimitModalOpen.value = true;
    };

    const closeEditLimitModal = () => {
      isEditLimitModalOpen.value = false;
      selectedLimit.value = {};
    };

    const openDeleteModal = (user, collection) => {
      selectedUser.value = { ...user };
      selectedCollection.value = collection;
      isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => (isDeleteModalOpen.value = false);

    const confirmDelete = async () => {
      try {
        if (!selectedUser.value?.id || !selectedCollection.value) return;
        await deleteUser(selectedCollection.value, selectedUser.value.id);

        // Update the appropriate user list based on the collection
        if (selectedCollection.value === "students") {
          students.value = students.value.filter(
            (s) => s.id !== selectedUser.value.id
          );
          localStorage.setItem("userBadgeCount", students.value.length);
        } else if (selectedCollection.value === "teachers") {
          teachers.value = teachers.value.filter(
            (t) => t.id !== selectedUser.value.id
          );
        } else if (selectedCollection.value === "otherUser") {
          otherUsers.value = otherUsers.value.filter(
            (u) => u.id !== selectedUser.value.id
          );
        }

        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    onMounted(async () => {
      try {
        await fetchStudentLimits();

        // Load students
        const {
          users: studentsData,
          error: studentsError,
          load: loadStudents,
        } = getAllUser("students");
        await loadStudents();
        if (studentsError.value) throw new Error(studentsError.value);
        students.value = studentsData.value;

        // Load teachers
        const {
          users: teachersData,
          error: teachersError,
          load: loadTeachers,
        } = getAllUser("teachers");
        await loadTeachers();
        if (teachersError.value) throw new Error(teachersError.value);
        teachers.value = teachersData.value;

        // Load other users
        const {
          users: otherUsersData,
          error: otherUsersError,
          load: loadOtherUsers,
        } = getAllUser("otherStaff");
        await loadOtherUsers();
        if (otherUsersError.value) throw new Error(otherUsersError.value);
        otherUsers.value = otherUsersData.value;

        // Load registration IDs
        await fetchRegistrationIds();

        isLoading.value = false;
      } catch (error) {
        console.error("Error during component mount:", error);
        isLoading.value = false;
      }
    });

    // Watch for changes in students array
    watch(students, (newStudents) => {
      localStorage.setItem("userBadgeCount", newStudents.length);
    });

    return {
      click,
      isLoading,
      activeSection,
      students,
      teachers,
      otherUsers,
      registrationIds,
      studentLimits,
      isDeleteModalOpen,
      isEditLimitModalOpen,
      selectedUser,
      selectedLimit,
      generatedId,
      setActiveSection,
      generateId,
      saveGeneratedId,
      deleteRegistrationId,
      copyToClipboard,
      formatDate,
      openEditLimitModal,
      closeEditLimitModal,
      saveStudentLimit,
      openDeleteModal,
      closeDeleteModal,
      confirmDelete,

      // Students pagination
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedStudents,
      startItem,
      endItem,
      nextPage,
      prevPage,
      resetPagination,

      // Teachers pagination
      currentPageTeachers,
      itemsPerPageTeachers,
      totalPagesTeachers,
      paginatedTeachers,
      startItemTeachers,
      endItemTeachers,
      nextPageTeachers,
      prevPageTeachers,
      resetPaginationTeachers,

      // Other users pagination
      currentPageOtherUsers,
      itemsPerPageOtherUsers,
      totalPagesOtherUsers,
      paginatedOtherUsers,
      startItemOtherUsers,
      endItemOtherUsers,
      nextPageOtherUsers,
      prevPageOtherUsers,
      resetPaginationOtherUsers,

      // Registration IDs pagination
      currentPageRegIds,
      itemsPerPageRegIds,
      totalPagesRegIds,
      paginatedRegIds,
      startItemRegIds,
      endItemRegIds,
      nextPageRegIds,
      prevPageRegIds,
      resetPaginationRegIds,

      totalUsers,
      searchQueryStudents,
      searchQueryTeachers,
      searchQueryOtherUsers,
    };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>