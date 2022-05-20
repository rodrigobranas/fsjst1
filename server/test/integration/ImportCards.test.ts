import fs from "fs/promises";
import GetBoard from "../../src/application/GetBoard";
import ImportCards from "../../src/application/ImportCards";
import Board from "../../src/domain/entity/Board";
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

test("Deve importar cards a partir do arquivo no formato .csv", async function () {
	const file = await fs.readFile("./data/cards.csv");
	const board = new Board(null, "A");
	board.addColumn(new Column(null, "todo", true));
	board.addColumn(new Column(null, "doing", true));
	board.addColumn(new Column(null, "done", false));
	const idBoard = await boardRepository.save(board);
	const importCards = new ImportCards(boardRepository);
	const input = {
		idBoard,
		file
	};
	await importCards.execute(input);
	const getBoard = new GetBoard(boardRepository);
	const getBoardOutput = await getBoard.execute(idBoard);
	// const cards = getBoardOutput.cards;
	// expect(cards[0].title).toBe("a");
	// expect(cards[0].estimative).toBe(3);
	// expect(cards[1].title).toBe("b");
	// expect(cards[1].estimative).toBe(6);
	// expect(cards[2].title).toBe("c");
	// expect(cards[2].estimative).toBe(9);
	// expect(cards[3].title).toBe("d");
	// expect(cards[3].estimative).toBe(12);
	await boardRepository.delete(idBoard);
});

afterAll(async function () {
	await connection.close();
});
