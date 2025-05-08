<template>
  <NavBar />
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white my-4">Policies</h1>
        <p class="md:text-xl text-base text-justify text-gray-600 dark:text-gray-300">
          Rules and guidelines for participating in the TU Yamethin Major and University King & Queen Elections
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Election Guidelines</h2>
        <div class="space-y-4 text-justify text-gray-700 dark:text-gray-300">
          <p>All participants in the TU Yamethin elections for both major-level and university-wide King & Queen titles must follow these guidelines:</p>
          
          <ul class="space-y-3 list-disc pl-5">
            <li>Only currently enrolled and active-status students are eligible to vote or participate as candidates.</li>
            <li>Students may vote once per category: once for their **major** election and once for the **university-wide** election.</li>
            <li>All campaigning must remain respectful and in accordance with university policies.</li>
            <li>Vote manipulation, fraudulent activity, or multiple submissions will result in immediate disqualification.</li>
            <li>The election committee reserves the right to make final decisions in all disputes or irregularities.</li>
          </ul>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Code of Conduct</h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 text-justify">
          <p>All candidates and voters are expected to demonstrate integrity and respect throughout the process:</p>
          
          <ul class="space-y-3 list-disc pl-5">
            <li>Treat all students and election staff with respect, regardless of major, background, or position.</li>
            <li>Maintain academic and personal integrity while engaging in the election process.</li>
            <li>Do not engage in defamatory, discriminatory, or offensive speech or conduct.</li>
            <li>All campaign materials must be pre-approved by the election committee.</li>
            <li>Violations may result in disciplinary actions according to university regulations.</li>
          </ul>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
        <h2 class="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-4">Privacy Policy</h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300 text-justify">
          <p>Your privacy and data security are important to us. Here's how we handle election-related information:</p>
          
          <ul class="space-y-3 list-disc pl-5">
            <li>Voting is completely confidential—individual votes are never shared publicly.</li>
            <li>Basic student information (name, major, year) is used solely for identity verification and fraud prevention.</li>
            <li>No personal data is shared with third parties outside of official university processes.</li>
            <li>Aggregate results may be published, but individual voter identities will never be disclosed.</li>
            <li>All data is securely stored and deleted once the election cycle concludes.</li>
          </ul>

          <p class="pt-4">For more information or inquiries, please reach out to the election committee via the Contact Us page.</p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
    Footer
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
