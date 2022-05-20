import Board from "../../src/domain/entity/Board";
import Card from "../../src/domain/entity/Card";
import Column from "../../src/domain/entity/Column";

test("Deve criar um quadro", function () {
	const board = new Board(1, "A");
	expect(board.name).toBe("A");
});

test("Deve incluir as colunas no quadro", function () {
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "Todo", true));
	board.addColumn(new Column(null, "Doing", true));
	board.addColumn(new Column(null, "Done", false));
	expect(board.columns).toHaveLength(3);
});

test("Deve inserir cartões nas colunas do quadro", function () {
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "Todo", true));
	board.addColumn(new Column(null, "Doing", true));
	board.addColumn(new Column(null, "Done", false));
	board.addCard("Todo", new Card(null, "Task 1", 4));
	board.addCard("Todo", new Card(null, "Task 2", 2));
	board.addCard("Todo", new Card(null, "Task 3", 1));
	expect(board.getColumn("Todo").getCards()).toHaveLength(3);
});

test("Deve calcular a estimativa de uma coluna", function () {
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "Todo", true));
	board.addColumn(new Column(null, "Doing", true));
	board.addColumn(new Column(null, "Done", false));
	board.addCard("Todo", new Card(null, "Task 1", 4));
	board.addCard("Todo", new Card(null, "Task 2", 2));
	board.addCard("Todo", new Card(null, "Task 3", 1));
	expect(board.getColumn("Todo").getEstimative()).toBe(7);
});

test("Deve trocar um cartão de coluna", function () {
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "Todo", true));
	board.addColumn(new Column(null, "Doing", true));
	board.addColumn(new Column(null, "Done", false));
	board.addCard("Todo", new Card(null, "Task 1", 4));
	board.addCard("Todo", new Card(null, "Task 2", 2));
	board.addCard("Todo", new Card(null, "Task 3", 1));
	board.changeColumn("Task 1", "Todo", "Doing");
	expect(board.getColumn("Todo").getEstimative()).toBe(3);
	expect(board.getColumn("Doing").getEstimative()).toBe(4);
});

test("Deve armazenar o tempo em cada coluna", function () {
	const board = new Board(1, "A");
	board.addColumn(new Column(null, "Todo", true));
	board.addColumn(new Column(null, "Doing", true));
	board.addColumn(new Column(null, "Done", false));
	board.addCard("Todo", new Card(null, "Task 1", 4), new Date("2021-03-01T10:00:00"));
	board.changeColumn("Task 1", "Todo", "Doing", new Date("2021-03-10T10:00:00"));
	const card = board.getColumn("Doing").getCard("Task 1");
	expect(card.transitions[0].date).toEqual(new Date("2021-03-01T10:00:00"));
	expect(card.transitions[1].date).toEqual(new Date("2021-03-10T10:00:00"));
});
