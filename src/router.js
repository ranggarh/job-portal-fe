import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import JobDetail from './pages/JobDetail.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Apply from './pages/Apply.vue';
import Dashboard from './pages/Dashboard.vue';
import JobTable from './components/JobTable.vue';
import DashboardJob from './pages/DashboardJob.vue';
import LayoutAdministrator from './pages/LayoutAdministrator.vue';
import DashboardUser from './pages/DashboardUser.vue';
import DashboardRole from './pages/DashboardRole.vue';
import FindJob from './pages/FindJob.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/jobs', name: 'FindJob', component: FindJob },
  { path: '/job/:id', name: 'JobDetail', component: JobDetail, props: true },
  { path: '/job/:id/apply', name: 'Apply', component: Apply, props: true },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: Dashboard },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
    //   { path: '/dashboard', name: 'DashboardHome', component: Dashboard }, // default dashboard
        { path: 'jobs', name: 'DashboardJobs', component: DashboardJob }
      // Tambahkan child lain jika perlu, misal users, settings, dll
    ]
  },
  {
    path: '/administrator',
    component: LayoutAdministrator,
    children: [
      { path: 'users', name: 'DashboardUser', component: DashboardUser },
      { path: 'roles', name: 'DashboardRole', component: DashboardRole }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
