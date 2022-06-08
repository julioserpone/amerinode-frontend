import {createApp} from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from './routes.js'
import Notifications from 'notiwind'
import PrimeVue from 'primevue/config';

import '../src/theme/amerinode.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app
    .use(router)
    .use(Notifications)
    .use(PrimeVue, { ripple: true })
    .mount('#app')