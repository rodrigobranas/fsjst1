import GetBoard from "../../application/GetBoard";
import GetBoards from "../../application/GetBoards";
import BoardRepository from "../../domain/repository/BoardRepository";
import Http from "../http/Http";

export default class BoardController {

	constructor (readonly http: Http, readonly boardRepository: BoardRepository) {
	}

	init () {
		this.http.addRoute("get", "/boards", async (params: any, body: any) => {
			const getBoards = new GetBoards(this.boardRepository);
			const output = await getBoards.execute();
			return output;
		});
		
		this.http.addRoute("get", "/boards/:idBoard", async (params: any, body: any) => {
			const getBoard = new GetBoard(this.boardRepository);
			const output = await getBoard.execute(params.idBoard);
			return output;
		});

		this.http.addRoute("post", "/boards/:idBoard/columns/:idColumn/cards", async (params: any, body: any) => {
			console.log(params, body);
		});
	}
}
