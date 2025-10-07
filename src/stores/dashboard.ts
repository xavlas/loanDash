import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardStats, ChartData } from '@/types'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<DashboardStats>({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    conversionRate: 0
  })
  
  const chartData = ref<ChartData>({
    labels: [],
    datasets: []
  })
  
  const loading = ref(false)

  const fetchDashboardData = async () => {
    loading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      stats.value = {
        totalUsers: 12543,
        totalRevenue: 450780,
        totalOrders: 3421,
        conversionRate: 3.24
      }
      
      chartData.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [65000, 59000, 80000, 81000, 56000, 75000],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2
        }]
      }
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    chartData,
    loading,
    fetchDashboardData
  }
})