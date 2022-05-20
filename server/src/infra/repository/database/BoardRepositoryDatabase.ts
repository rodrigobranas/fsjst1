import Board from "../../../domain/entity/Board";
import Card from "../../../domain/entity/Card";
import Column from "../../../domain/entity/Column";
import BoardRepository from "../../../domain/repository/BoardRepository";
import Connection from "../../database/Connection";

export default class BoardRepositoryDatabase implements BoardRepository {

	constructor (readonly connection: Connection) {
	}

	async save(board: Board): Promise<number> {
		const [boardData] = await this.connection.query("insert into kanban.board (name) values ($1) returning *", [board.name]);
		for (const column of board.columns) {
			const [columnData] = await this.connection.query("insert into kanban.column (id_board, name, has_estimative) values ($1, $2, $3) returning *", [boardData.id_board, column.name, column.hasEstimative]);
			for (const card of column.cards) {
				await this.connection.query("insert into kanban.card (id_board, id_column, title, estimative) values ($1, $2, $3, $4)", [boardData.id_board, columnData.id_column, card.title, card.estimative]);
			}
		}
		return boardData.id_board;
	}

	async get(idBoard: number): Promise<Board> {
		const [boardData] = await this.connection.query("select * from kanban.board where id_board = $1", [idBoard]);
		if (!boardData) throw new Error("Board not found");
		const board = new Board(boardData.id_board, boardData.name);
		const columnsData = await this.connection.query("select * from kanban.column where id_board = $1", [idBoard]);
		for (const columnData of columnsData) {
			const column = new Column(columnData.id_column, columnData.name, columnData.has_estimative);
			board.addColumn(column);
			const cardsData = await this.connection.query("select * from kanban.card where id_column = $1", [column.idColumn]);
			for (const cardData of cardsData) {
				const card = new Card(cardData.id_card, cardData.title, cardData.estimative);
				column.addCard(card, new Date());
			}
		}
		return board;
	}

	async update(board: Board): Promise<void> {
		await this.connection.query("update kanban.board set name = $1 where id_board = $2", [board.name, board.idBoard]);
		for (const column of board.columns) {
			if (column.idColumn) {
				await this.connection.query("update kanban.column set name = $1, has_estimative = $2 where id_column = $3", [column.name, column.hasEstimative, column.idColumn]);
			} else {
				await this.connection.query("insert into kanban.column (id_board, name, has_estimative) values ($1, $2, $3)", [board.idBoard, column.name, column.hasEstimative]);
			}
		}
	}

	async delete(idBoard: number): Promise<void> {
		await this.connection.query("delete from kanban.card where id_board = $1", [idBoard]);
		await this.connection.query("delete from kanban.column where id_board = $1", [idBoard]);
		await this.connection.query("delete from kanban.board where id_board = $1", [idBoard]);
	}

	async list(): Promise<Board[]> {
		const boardsData = await this.connection.query("select id_board from kanban.board", []);
		const boards: Board[] = [];
		for (const boardData of boardsData) {
			const board = await this.get(boardData.id_board);
			boards.push(board);
		}
		return boards;
	}

	async getColumn(idColumn: number): Promise<Column> {
		const [columnData] = await this.connection.query("select * from kanban.column where id_column = $1", [idColumn]);
		const column = new Column(columnData.id_column, columnData.name, columnData.has_estimative);
		const cardsData = await this.connection.query("select * from kanban.card where id_column = $1", [column.idColumn]);
		for (const cardData of cardsData) {
			const card = new Card(cardData.id_card, cardData.title, cardData.estimative);
			column.addCard(card, new Date());
		}
		return column;
	}
}
