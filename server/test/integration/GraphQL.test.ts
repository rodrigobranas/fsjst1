import axios from "axios";
import Board from "../../src/domain/entity/Board";
import Card from "../../src/domain/entity/Card";
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
	board.addCard("todo", new Card(null, "a", 3));
	board.addCard("todo", new Card(null, "b", 6));
	board.addCard("todo", new Card(null, "c", 9));
	idBoard = await boardRepository.save(board);
});

test.skip("Deve chamar o service /boards", async function () {
	const response = await axios({
		url: "http://localhost:3000",
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			query: `
				{
					boards {
						idBoard
						name
						columns {
							idColumn
							name
							cards {
								idCard
								title
								estimative
							}
						}
					}
				}
			`
		}
	});
	const query = response.data;
	const boards = query.data.boards;
	console.log(JSON.stringify(boards));
	expect(boards).toHaveLength(1);
	const [board] = boards;
	expect(board.name).toBe("A");
});

afterAll(async function () {
	await boardRepository.delete(idBoard);
	await connection.close();
});
