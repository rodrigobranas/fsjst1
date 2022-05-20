import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";

test("Deve conectar no banco de dados", async function () {
	const connection = new PgPromiseConnection();
	await connection.query("delete from kanban.card", []);
	await connection.query("delete from kanban.column", []);
	await connection.query("delete from kanban.board", []);
	const boardsData = await connection.query("insert into kanban.board (name) values ($1) returning *", ["A"]);
	expect(boardsData).toHaveLength(1);
	await connection.query("delete from kanban.card", []);
	await connection.query("delete from kanban.column", []);
	await connection.query("delete from kanban.board", []);
	await connection.close();
});
