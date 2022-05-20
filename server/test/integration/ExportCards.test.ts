import ExportCards from "../../src/application/ExportCards";
import BoardRepositoryMemory from "../../src/infra/repository/memory/BoardRepositoryMemory";
import Board from "../../src/domain/entity/Board";
import Column from "../../src/domain/entity/Column";
import Connection from "../../src/infra/database/Connection";
import BoardRepository from "../../src/domain/repository/BoardRepository";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "../../src/infra/repository/database/BoardRepositoryDatabase";
import Card from "../../src/domain/entity/Card";

let connection: Connection;
let boardRepository: BoardRepository;

beforeAll(function () {
	connection = new PgPromiseConnection();
	boardRepository = new BoardRepositoryDatabase(connection);
});

test("Deve exportar os cards", async function () {
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	board.addCard("todo", new Card(null, "a", 3));
	board.addCard("todo", new Card(null, "b", 6));
	board.addCard("todo", new Card(null, "c", 9));
	board.addCard("todo", new Card(null, "d", 12));
	const idBoard = await boardRepository.save(board);
	const exportCards = new ExportCards(boardRepository);
	const file = await exportCards.execute(idBoard);
	expect(file.toString()).toBe("card_title;card_estimative\na;3\nb;6\nc;9\nd;12");
	await boardRepository.delete(idBoard);
});

afterAll(async function () {
	await connection.close();
});
