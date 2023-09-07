import { createApp } from 'vue';
import './style/index.css'
import 'boxicons';
import App from './App.vue';
import router from './routers';
import store from './store';
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

createApp(App).use(VueTippy, {
    directive: "tippy", // => v-tippy
    flipDuration: 0,
    popperOptions: {
        modifiers: {
            preventOverflow: {
                enabled: false
            }
        }
    }
}).use(router).use(store).use(moshaToast, {
    position: 'top-right', // Adjust as needed
    timeout: 3000, // Adjust as needed
    transition: 'bounce' // Adjust as needed
}).mount('#app')
