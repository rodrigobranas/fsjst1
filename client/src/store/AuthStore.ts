import { defineStore } from "pinia";
import Credentials from "../domain/entity/Credentials";
import Session from "../domain/entity/Session";
import AuthService from "../service/AuthService";

export const useAuthStore = defineStore("authStore", {
	state() {
		return {
			session: {} as Session,
			authService: undefined as AuthService | undefined
		}
	},
	actions: {
		async login (credentials: Credentials) {
			const session = await this.authService?.login(credentials);
			if (session) {
				this.session.username = session.username;
				this.session.token = session.token;
				localStorage.setItem("token", session.token || "");
				this.$router.push("/boards");
			}
		},
		logout () {
			localStorage.removeItem("token");
			this.session = new Session();	
			this.$router.push("/login");
		},
		init (authService: AuthService) {
			this.authService = authService;
			const token = localStorage.getItem("token");
			if (token) {
				this.session.token = token;
			}
		}
	}
});
