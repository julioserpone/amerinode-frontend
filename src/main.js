import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from './routes.js'
import Notifications from 'notiwind'

createApp(App)
    .use(router)
    .use(Notifications)
    .mount('#app')

