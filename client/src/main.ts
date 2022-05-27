import { createApp, markRaw } from 'vue';
import App from './App.vue';
import ServiceFactory from './factory/ServiceFactory';
import AxiosAdapter from './infra/AxiosAdapter';
import BoardView from "./view/BoardView.vue";
import LoginView from "./view/LoginView.vue";
import BoardsView from "./view/BoardsView.vue";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { createPinia } from 'pinia';
import { useAuthStore } from './store/AuthStore';
import i18n from './plugin/i18n';

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
httpClient.setRouter(router);
const app = createApp(App);
app.use(router);
const pinia = createPinia();
app.use(pinia);
pinia.use(({ store }) => {
	store.$router = markRaw(router)
});
const authStore = useAuthStore();
authStore.init(serviceFactory.createAuthService());
app.use(i18n, {
	"en": {
		"Boards": "Boards"
	},
	"pt": {
		"Boards": "Quadros"
	}
});
app.provide("serviceFactory", serviceFactory);
app.mount('#app');
