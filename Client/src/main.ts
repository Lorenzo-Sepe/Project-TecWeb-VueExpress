import './assets/main.css';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor';

import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            fa,
            mdi
        }
    },
    components,
    directives
});

const app = createApp(App);

app.use(RichTextEditorPlugin);
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
