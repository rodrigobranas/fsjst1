import { createApp } from 'vue';
import App from './App.vue';
import ServiceFactory from './factory/ServiceFactory';
import AxiosAdapter from './infra/AxiosAdapter';

const httpClient = new AxiosAdapter();
const serviceFactory = new ServiceFactory(httpClient, "http://localhost:8000");

const app = createApp(App);
app.provide("serviceFactory", serviceFactory);
app.mount('#app');
