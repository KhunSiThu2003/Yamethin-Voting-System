<template>
    <NavBar />
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white my-4">Policies</h1>
          <p class="md:text-xl text-base text-justify text-gray-600 dark:text-gray-300">Rules and guidelines for the TU Yamethin Major King & Queen Elections</p>
        </div>
  
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Election Guidelines</h2>
          <div class="space-y-4 text-justify text-gray-700 dark:text-gray-300">
            <p>All participants in the TU Yamethin Major King & Queen Elections must adhere to the following policies:</p>
            
            <ul class="space-y-3 list-disc pl-5">
              <li>Only currently enrolled students with active status are eligible to vote.</li>
              <li>Each student may vote only once in their respective major category.</li>
              <li>Campaigning must remain respectful and follow university conduct policies.</li>
              <li>Any form of vote manipulation or fraudulent activity will result in disqualification.</li>
              <li>The election committee's decisions are final in all matters.</li>
            </ul>
          </div>
        </div>
  
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Code of Conduct</h2>
          <div class="space-y-4 text-gray-700 dark:text-gray-300 text-justify">
            <p>All candidates and voters are expected to maintain the highest standards of behavior:</p>
            
            <ul class="space-y-3 list-disc pl-5">
              <li>Respect all members of the university community regardless of major or position.</li>
              <li>Maintain academic integrity throughout the election process.</li>
              <li>No defamatory or discriminatory language will be tolerated.</li>
              <li>Campaign materials must be approved by the election committee before distribution.</li>
              <li>Violations may result in disciplinary action through university channels.</li>
            </ul>
          </div>
        </div>
  
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Privacy Policy</h2>
          <div class="space-y-4 text-gray-700 dark:text-gray-300 text-justify">
            <p>Your privacy is important to us. This policy explains how we handle your information:</p>
            
            <ul class="space-y-3 list-disc pl-5">
              <li>Voting is confidential - your individual selections will not be disclosed.</li>
              <li>Basic student information (name, major, year) is collected for verification purposes only.</li>
              <li>We do not share personal information with third parties except as required by university policy.</li>
              <li>Aggregate voting results may be published without identifying individual voters.</li>
              <li>All data is stored securely and retained only as long as necessary.</li>
            </ul>
            
            <p class="pt-4">For questions about these policies, please contact the election committee using the information on our Contact Us page.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue";
  
  export default {

    components: {
      NavBar
    }
  };
  </script>
  
  <style scoped>
  h2 {
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .dark h2 {
    border-bottom-color: #374151;
  }
  </style>