import Credentials from "../domain/entity/Credentials";
import Session from "../domain/entity/Session";
import HttpClient from "../infra/HttpClient";

export default class AuthService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async login (credentials: Credentials): Promise<Session> {
		const sessionData = await this.httpClient.post(`${this.baseUrl}/login`, credentials);
		const session = new Session(sessionData.username, sessionData.token);
		return session;
	}
}
