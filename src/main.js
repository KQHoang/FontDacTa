import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import SanPham from './view/SanPham.vue'
import PhieuNhap from './view/PhieuNhap.vue'
import ChiTietPhieuNhap from './view/ChiTiet.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/sanpham', component: SanPham},
  {path: '/phieunhap', component: PhieuNhap},
  {path: '/chitietphieunhap/:id', name: "ChiTiet", component: ChiTietPhieuNhap},
]

// const router = new VueRouter({
//   history: createWebHistory(),
//   routes,
// })

Vue.config.productionTip = false
const app = new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes
}),

})
app.$mount('#app')
