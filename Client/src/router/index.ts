import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        
        {
            path: '/create-idea',
            name: 'CreateIdea',
            component: () => import('../views/CreateIdeaView.vue')
            //TODO aggiungere beforeRoute function per verificare se l'utente è loggato
        },

        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },

        {
            path: '/testing',
            name: 'TestingPage',
            component: () => import('../views/TestingComponets.vue')
        },

        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue')
        }
    ]
});

export default router;
