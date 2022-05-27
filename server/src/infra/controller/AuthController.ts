import GetBoard from "../../application/GetBoard";
import GetBoards from "../../application/GetBoards";
import Login from "../../application/Login";
import BoardRepository from "../../domain/repository/BoardRepository";
import UserRepository from "../../domain/repository/UserRepository";
import Http from "../http/Http";

export default class AuthController {

	constructor (readonly http: Http, readonly userRepository: UserRepository) {
	}

	init () {
		this.http.addRoute("post", "/login", async (params: any, body: any) => {
			const login = new Login(this.userRepository);
			const session = await login.execute(body);
			return session;
		});
	}
}
