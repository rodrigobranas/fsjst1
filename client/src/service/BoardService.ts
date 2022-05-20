import Board from "../domain/entity/Board";
import Card from "../domain/entity/Card";
import HttpClient from "../infra/HttpClient";

export default class BoardService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async getBoard (idBoard: any): Promise<Board> {
		const boardData = await this.httpClient.get(`${this.baseUrl}/boards/${idBoard}`);
		const board = new Board(boardData.idBoard, boardData.name);
		for (const column of boardData.columns) {
			board.addColumn(column.idColumn, column.name, column.hasEstimative);
			for (const card of column.cards) {
				board.addCard(column.name, card.title, card.estimative);
			}
		}
		return board;
	}

	async getBoards (): Promise<Board[]> {
		const boardsData = await this.httpClient.get(`${this.baseUrl}/boards`);
		const boards: Board[] = [];
		for (const boardData of boardsData) {
			boards.push(new Board(boardData.idBoard, boardData.name));
		}
		return boards;
	}

	async addCard (idBoard: number, idColumn: number, card: Card): Promise<void> {
		await this.httpClient.post(`${this.baseUrl}/boards/${idBoard}/columns/${idColumn}/cards`, card);
	}
}
