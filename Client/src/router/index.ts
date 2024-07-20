import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '../stores/userStore';
import ProfiloView from '../views/ProfiloView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/profilo',
            name: 'Profilo',
            component: ProfiloView,
            beforeEnter: (to, from, next) => {
                const userStore = useUserStore();
                if (userStore.user.token === '') {
                    next();
                } else {
                    next(false);
                }
            }
        },

        {
            path: '/create-idea',
            name: 'CreateIdea',
            component: () => import('../views/CreateIdeaView.vue'),
            //TODO aggiungere beforeRoute function per verificare se l'utente è loggato
        },

        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue'),
        },

        {
            path: '/testing',
            name: 'TestingPage',
            component: () => import('../views/TestingComponets.vue'),
        },

        {
            path: '/visualizzaIdea:id',
            name: 'VisualizzaIdea',
            component: () => import('../views/VisualizzaIdeaView.vue'),
        },

        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue'),
        },
    ],
});




export default router;
