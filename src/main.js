import {createApp, ref} from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from './routes.js'
import Notifications from 'notiwind'
import PrimeVue from 'primevue/config';

const app = createApp(App)
app
    .use(router)
    .use(Notifications)
    .use(PrimeVue, { ripple: true })
    .mount('#app')