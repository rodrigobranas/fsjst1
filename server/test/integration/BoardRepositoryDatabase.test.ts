import Board from "../../src/domain/entity/Board";
import Column from "../../src/domain/entity/Column";
import BoardRepository from "../../src/domain/repository/BoardRepository";
import Connection from "../../src/infra/database/Connection";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "../../src/infra/repository/database/BoardRepositoryDatabase";

let connection: Connection;
let boardRepository: BoardRepository;

beforeAll(function () {
	connection = new PgPromiseConnection();
	boardRepository = new BoardRepositoryDatabase(connection);
});

test("Deve salvar um quadro", async function () {
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	expect(idBoard).toBeGreaterThan(1);
	await boardRepository.delete(idBoard);
});

test("Deve consultar um quadro", async function () {
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	const existingBoard = await boardRepository.get(idBoard);
	expect(existingBoard.name).toBe("A");
	expect(existingBoard.columns).toHaveLength(3);
	await boardRepository.delete(idBoard);
});

test("Deve atualizar um quadro", async function () {
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	const existingBoard = await boardRepository.get(idBoard);
	existingBoard.addColumn(new Column(null, "test", true));
	await boardRepository.update(existingBoard);
	const existingBoardAfterUpdate = await boardRepository.get(idBoard);
	expect(existingBoardAfterUpdate.columns).toHaveLength(4);
	await boardRepository.delete(idBoard);
});

test("Deve apagar um quadro", async function () {
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	await boardRepository.delete(idBoard);
	expect(() => boardRepository.get(idBoard)).rejects.toThrow(new Error("Board not found"));
});

test("Deve listar os quadros", async function () {
	const boardA = new Board(null, "A");
	boardA.addColumn(new Column(null, "todo", true));
	boardA.addColumn(new Column(null, "doing", true));
	boardA.addColumn(new Column(null, "done", false));
	const boardB = new Board(null, "B");
	boardB.addColumn(new Column(null, "todo", true));
	boardB.addColumn(new Column(null, "doing", true));
	boardB.addColumn(new Column(null, "done", false));
	const idBoard1 = await boardRepository.save(boardA);
	const idBoard2 = await boardRepository.save(boardB);
	const boards = await boardRepository.list();
	expect(boards).toHaveLength(2);
	await boardRepository.delete(idBoard1);
	await boardRepository.delete(idBoard2);
});

afterAll(async function () {
	await connection.close();
});
