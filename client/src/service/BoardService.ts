import Board from "../domain/entity/Board";
import HttpClient from "../infra/HttpClient";

export default class BoardService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async getBoard (idBoard: number): Promise<Board> {
		const boardData = await this.httpClient.get(`${this.baseUrl}/boards/${idBoard}`);
		const board = new Board(boardData.name);
		for (const column of boardData.columns) {
			board.addColumn(column.name, column.hasEstimative);
			for (const card of column.cards) {
				board.addCard(column.name, card.title, card.estimative);
			}
		}
		return board;
	}
}
