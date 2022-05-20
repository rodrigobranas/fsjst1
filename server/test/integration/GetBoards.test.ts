import GetBoard from "../../src/application/GetBoard";
import GetBoards from "../../src/application/GetBoards";
import Board from "../../src/domain/entity/Board";
import Card from "../../src/domain/entity/Card";
import Column from "../../src/domain/entity/Column";
import BoardRepository from "../../src/domain/repository/BoardRepository";
import Connection from "../../src/infra/database/Connection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "../../src/infra/repository/database/BoardRepositoryDatabase";
import BoardRepositoryMemory from "../../src/infra/repository/memory/BoardRepositoryMemory";

let connection: Connection;
let boardRepository: BoardRepository;

beforeAll(function () {
	connection = new PgPromiseConnection();
	boardRepository = new BoardRepositoryDatabase(connection);
});

test("Deve obter um quadro", async function () {
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	board.addCard("todo", new Card(null, "a", 3));
	const idBoard = await boardRepository.save(board);
	const getBoards = new GetBoards(boardRepository);
	const output = await getBoards.execute();
	expect(output).toHaveLength(1);
	if (output[0].idBoard) {
		await boardRepository.delete(output[0].idBoard);
	}
});

afterAll(async function () {
	await connection.close();
});
