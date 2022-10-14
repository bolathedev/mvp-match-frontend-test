import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DashboardLayout from '../layouts/dashboardLayout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/dashboard',
    name: 'Dashboard Layout',
    component: DashboardLayout,
    redirect: "reports",
    children: [
      {
        path: "reports",
        name: "reports",
        component: () => import("../views/reports.vue")
      }
    ]
  },
  {
    path: "*",
    redirect: "/dashboard/reports"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
