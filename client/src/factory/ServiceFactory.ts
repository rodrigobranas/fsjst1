import HttpClient from "../infra/HttpClient";
import AuthService from "../service/AuthService";
import BoardService from "../service/BoardService";

export default class ServiceFactory {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	createBoardService () {
		return new BoardService(this.httpClient, this.baseUrl);
	}

	createAuthService () {
		return new AuthService(this.httpClient, this.baseUrl);
	}
}
