import axios from "axios";
import Board from "../../src/domain/entity/Board";
import Column from "../../src/domain/entity/Column";
import BoardRepository from "../../src/domain/repository/BoardRepository";
import Connection from "../../src/infra/database/Connection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "../../src/infra/repository/database/BoardRepositoryDatabase";

let connection: Connection;
let boardRepository: BoardRepository;
let idBoard: number;

beforeAll(async function () {
	connection = new PgPromiseConnection();
	boardRepository = new BoardRepositoryDatabase(connection);
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	idBoard = await boardRepository.save(board);
});

test.skip("Deve chamar o service /boards", async function () {
	const response = await axios({
		url: "http://localhost:3000/boards",
		method: "get"
	});
	const boards = response.data;
	expect(boards).toHaveLength(1);
});

test.skip("Deve chamar o service /boards/:idBoard", async function () {
	const response = await axios({
		url: `http://localhost:3000/boards/${idBoard}`,
		method: "get"
	});
	const board = response.data;
	expect(board.name).toBe("A");
});

afterAll(async function () {
	await boardRepository.delete(idBoard);
	await connection.close();
});
