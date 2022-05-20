import { createApp } from 'vue';
import App from './App.vue';
import ServiceFactory from './factory/ServiceFactory';
import AxiosAdapter from './infra/AxiosAdapter';
import BoardView from "./view/BoardView.vue";
import LoginView from "./view/LoginView.vue";
import BoardsView from "./view/BoardsView.vue";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

const httpClient = new AxiosAdapter();
const serviceFactory = new ServiceFactory(httpClient, "http://localhost:8000");

const routes = [
	{ path: "/", redirect: "/boards"},
	{ path: "/boards", component: BoardsView, props: { "username": "rodrigobranas"} },
	{ path: "/boards/:idBoard", component: BoardView },
	{ path: "/login", component: LoginView }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

const app = createApp(App);
app.use(router);
app.provide("serviceFactory", serviceFactory);
app.mount('#app');
