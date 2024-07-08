import './assets/main.css';
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
    components,
    directives
});

const app = createApp(App);

app.use(RichTextEditorPlugin);
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
