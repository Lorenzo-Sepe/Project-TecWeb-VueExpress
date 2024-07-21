import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '../stores/userStore';
import AuthService from '@/services/AuthService';

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
            component: () => import('../views/ProfiloView.vue'),
            /* beforeEnter: (to, from, next) => {
                //TODO aggiungere un controllo sul jwt per vedere se l'utente è loggato
                const userStore = useUserStore();
                //console.log(userStore.user.token);
                if (userStore.user.token === '') {
                    alert('Devi essere Autenticato per accedere a questa pagina');
                    next({ name: 'register' });
                } else {
                    next();
                }
            }, */
        },

        {
            path: '/create-idea',
            name: 'CreateIdea',
            component: () => import('../views/CreateIdeaView.vue'),
            beforeEnter: (to, from, next) => {
                //TODO aggiungere un controllo sul jwt per vedere se l'utente è loggato
                const userStore = useUserStore();
                //console.log(userStore.user.token);
                if (userStore.user.token === '') {
                    alert('Devi essere Autenticato per accedere a questa pagina');
                    next({ name: 'register' });
                } else {
                    next();
                }
            },
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
            path: '/visualizzaIdea/:id',
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
