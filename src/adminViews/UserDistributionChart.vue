<template>
  <div class="rounded-lg shadow p-6 mt-8 w-full max-w-xl mx-auto">
    <h2 class="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">User Distribution</h2>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, watch, toRefs } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

Chart.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  students: { type: Number, required: true },
  teachers: { type: Number, required: true },
  otherStaff: { type: Number, required: true }
});

const { students, teachers, otherStaff } = toRefs(props);

const chartData = computed(() => ({
  labels: ['Students', 'Teachers', 'Other Staff'],
  datasets: [
    {
      label: 'User Distribution',
      data: [students.value, teachers.value, otherStaff.value],
      backgroundColor: [
        'rgba(34,197,94,0.7)',    // green
        'rgba(253,224,71,0.7)',  // yellow
        'rgba(236,72,153,0.7)'   // pink
      ],
      borderColor: [
        'rgba(34,197,94,1)',
        'rgba(253,224,71,1)',
        'rgba(236,72,153,1)'
      ],
      borderWidth: 2
    }
  ]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#374151', // Tailwind gray-700
        font: { size: 14 }
      }
    },
    title: {
      display: false
    }
  }
};
</script> 