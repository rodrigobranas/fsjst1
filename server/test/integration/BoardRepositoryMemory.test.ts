import Board from "../../src/domain/entity/Board";
import Column from "../../src/domain/entity/Column";
import BoardRepositoryMemory from "../../src/infra/repository/memory/BoardRepositoryMemory";

test("Deve salvar um quadro", async function () {
	const boardRepository = new BoardRepositoryMemory();
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	expect(idBoard).toBe(1);
});

test("Deve consultar um quadro", async function () {
	const boardRepository = new BoardRepositoryMemory();
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	const existingBoard = await boardRepository.get(idBoard);
	expect(existingBoard?.idBoard).toBe(1);
	expect(existingBoard?.columns).toHaveLength(3);
});

test("Deve atualizar um quadro", async function () {
	const boardRepository = new BoardRepositoryMemory();
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	const existingBoard = await boardRepository.get(idBoard);
	existingBoard.addColumn(new Column(null, "test", true));
	await boardRepository.update(existingBoard);
	const existingBoardAfterUpdate = await boardRepository.get(idBoard);
	expect(existingBoardAfterUpdate.columns).toHaveLength(4);
});
