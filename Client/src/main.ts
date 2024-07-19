import './assets/style.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createApp,watch } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'; //permanenza stati pinia
import App from './App.vue';
import router from './router';


const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

// import state dagli store, testing nuovi modi per fare il persist
//if (localStorage.getItem('state')) {
//    pinia.state.value = JSON.parse(localStorage.getItem('state'));
//}

watch(pinia.state, (state) => {
    localStorage.setItem('state', JSON.stringify(state));
});

app.use(pinia);

app.use(vuetify);
app.use(router);

app.mount('#app');
