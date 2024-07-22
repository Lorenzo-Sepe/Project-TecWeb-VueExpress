import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '../stores/userStore';
import { useIdeaStore } from '../stores/ideaStore';
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
            beforeEnter: (to, from, next) => {
                const userStore = useUserStore();
                // TODO date il token indietro
                if (userStore.user.token === '') {
                    alert('Devi essere Autenticato per accedere a questa pagina');
                    next({ name: 'register' });
                } else {
                    next();
                }
            },
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
            path: '/modificaIdea/:id',
            name: 'ModificaIdea',
            component: () => import('../views/ModificaIdeaView.vue'),
            /* beforeEnter: (to, from, next) => {
                //TODO aggiungere controllo modifca propria idea
                const userStore = useUserStore();
                AuthService.canUserModifyIdea(
                    userStore.user.userMail,
                    userStore.user.token,
                ).then((response) => {
                    console.log(response);
                    const res = JSON.parse(response);
                });
            } */
           //verificare
           beforeEnter: (to, from, next) => {
                const userStore = useUserStore();
                const ideaStore = useIdeaStore();
                if (userStore.user.userMail === ideaStore.idea.userMail) {
                    next();
                }else{
                    alert('Non puoi modificare un idea che non ti appartiene');
                    next({ name: 'profile' });
                };
            }
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
