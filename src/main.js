import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import 'flowbite';
import MovieComponent from "@/components/MovieComponent";
import HomePage from "@/components/HomePage";
import store from "@/Store/store";
import Vuex from "vuex";
import router from "@/Router/router";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';



createApp(App).use(router).use(store).use(Vuex).mount('#app')
new Vue({
    render: h => h(App),
    store,
    router
}).use(Vuex).$mount('#app');
App.component('DatePicker', Datepicker);
App.component('MovieComponent', MovieComponent);
App.component('HomePage', HomePage);
App.component('MovieComponent', MovieComponent);
