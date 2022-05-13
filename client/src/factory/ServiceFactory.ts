import HttpClient from "../infra/HttpClient";
import BoardService from "../service/BoardService";

export default class ServiceFactory {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	createBoardService () {
		return new BoardService(this.httpClient, this.baseUrl);
	}
}