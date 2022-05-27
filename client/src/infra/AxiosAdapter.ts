import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {
	router: any;

	constructor () {
		axios.interceptors.request.use((config: any) => {
			const token = localStorage.getItem("token");
			config.headers["Authorization"] = `Bearer ${token}`;
			return config;
		});

		axios.interceptors.response.use((response) => {
			return response;
		}, (error) => {
			if (error.response.status === 401) {
				localStorage.removeItem("token");
				this.router.push("/login");
			}
			return Promise.reject(error);
		})
	}

	setRouter (router: any) {
		this.router = router;
	}

	async get(url: string): Promise<any> {
		const response = await axios({ url, method: "get" });
		return response.data;
	}

	async post(url: string, data: any): Promise<any> {
		const response = await axios({ url, method: "post", data });
		return response.data;
	}
}
