import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import( '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/device-list',
                    component: () => import( '../components/page/DeviceList.vue'),
                    meta: { title: '设备列表' }
                },
                {
                    path: '/device-detail',
                    component: () => import( '../components/page/DeviceDetail.vue'),
                    meta: { title: '设备详情' }
                },
                {
                    path: '/order-list',
                    component: () => import( '../components/page/OrderList.vue'),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/tabs',
                    component: () => import('../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
