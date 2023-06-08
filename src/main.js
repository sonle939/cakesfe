import { createApp } from 'vue';
import './style/index.css'
import 'boxicons';
import App from './App.vue';
import router from './routers';
import store from './store';



createApp(App).use(router).use(store).mount('#app')
