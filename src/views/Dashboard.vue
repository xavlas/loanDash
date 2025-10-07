<template>
  <div class="space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in statsDisplay"
        :key="stat.name"
        class="bg-white overflow-hidden shadow rounded-lg"
      >
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <component :is="stat.icon" class="h-6 w-6 text-gray-400" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  {{ stat.name }}
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stat.value }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div class="h-64">
            <Line v-if="chartData.labels.length" :data="chartData" :options="chartOptions" />
            <div v-else class="flex items-center justify-center h-full text-gray-500">
              Loading chart...
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <component :is="activity.icon" class="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-sm text-gray-500">{{ activity.description }}</p>
                <p class="text-xs text-gray-400">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  UserPlusIcon,
  CogIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import { useDashboardStore } from '@/stores/dashboard'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const dashboardStore = useDashboardStore()

const statsDisplay = computed(() => [
  {
    name: 'Total Users',
    value: dashboardStore.stats.totalUsers.toLocaleString(),
    icon: UsersIcon
  },
  {
    name: 'Total Revenue',
    value: `$${dashboardStore.stats.totalRevenue.toLocaleString()}`,
    icon: CurrencyDollarIcon
  },
  {
    name: 'Total Orders',
    value: dashboardStore.stats.totalOrders.toLocaleString(),
    icon: ShoppingBagIcon
  },
  {
    name: 'Conversion Rate',
    value: `${dashboardStore.stats.conversionRate}%`,
    icon: ChartBarIcon
  }
])

const chartData = computed(() => dashboardStore.chartData)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value: any) {
          return '$' + value.toLocaleString()
        }
      }
    }
  }
}

const recentActivity = [
  {
    id: 1,
    title: 'New user registered',
    description: 'John Smith created an account',
    time: '2 minutes ago',
    icon: UserPlusIcon
  },
  {
    id: 2,
    title: 'Settings updated',
    description: 'Dashboard configuration changed',
    time: '1 hour ago',
    icon: CogIcon
  },
  {
    id: 3,
    title: 'Report generated',
    description: 'Monthly sales report created',
    time: '3 hours ago',
    icon: DocumentTextIcon
  }
]

onMounted(() => {
  dashboardStore.fetchDashboardData()
})
</script>