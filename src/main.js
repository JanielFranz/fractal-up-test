import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Card from "primevue/card";
import Toolbar from "primevue/toolbar";
import Splitter from "primevue/splitter";
import Dialog from "primevue/dialog";
import DialogService from "primevue/dialogservice";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";

import {DefaultApolloClient} from "@vue/apollo-composable";
import apolloClient from "./shared/services/apollo-client.js";
import SplitterPanel from "primevue/splitterpanel";
import Button from "primevue/button";

const app = createApp(App);

app.use(router);

app.provide(DefaultApolloClient, apolloClient);

app.use(PrimeVue, { theme: { preset:Aura }, ripple: true})
    .use(DialogService)

app.component('pv-card', Card)
    .component('pv-toolbar', Toolbar)
    .component('pv-splitter', Splitter)
    .component('pv-splitter-panel', SplitterPanel)
    .component('pv-dialog', Dialog)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-button', Button)
app.mount('#app')
