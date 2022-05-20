import Board from "../../../domain/entity/Board";
import Column from "../../../domain/entity/Column";
import BoardRepository from "../../../domain/repository/BoardRepository";

export default class BoardRepositoryMemory implements BoardRepository {
	boards: Board[];
	counter = 0;

	constructor () {
		this.boards = [];
	}
	
	getColumn(idColumn: number): Promise<Column> {
		throw new Error("Method not implemented.");
	}

	async save(board: Board): Promise<number> {
		if (!board.idBoard) {
			board.idBoard = this.counter++;
		}
		this.boards.push(board);
		return board.idBoard;
	}

	async get(idBoard: number): Promise<Board> {
		const board = this.boards.find(board => board.idBoard === idBoard);
		if (!board) throw new Error("Board not found");
		return board;
	}

	async update(board: Board): Promise<void> {
		if (!board.idBoard) return;
		await this.delete(board.idBoard);
		this.save(board);
	}
	
	async delete(idBoard: number): Promise<void> {
		const existingBoard = await this.get(idBoard);
		if (!existingBoard) throw new Error("Board not found");
		this.boards.splice(this.boards.indexOf(existingBoard), 1);
	}

	async list(): Promise<Board[]> {
		return this.boards;
	}
}
