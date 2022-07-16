import {createWebHistory, createRouter} from 'vue-router';
import HomePage from "@/components/HomePage";
import DetailPage from "@/components/DetailPage";

// const DetailPage = import('@/components/DetailPage.vue');
// const HomePage = import('@/components/HomePage.vue');

const history = createWebHistory();
const router = createRouter({
    history,
    routes: [
        {
            path: '/',
            name: "Home",
            components: {
                'body': HomePage,
            }
        },
        {
            path: '/DetailPage/:filmId',
            name: 'DetailPage',
            components: {
                'body': DetailPage
            },
            props: true
        }
    ]
});
export default router;