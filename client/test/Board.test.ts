import Board from "../src/domain/entity/Board";

test("Deve criar um board", function () {
	const board = new Board(1, "Project A");
	board.addColumn(1, "Todo", true);
	board.addColumn(2, "Doing", true);
	board.addColumn(3, "Done", false);
	board.addCard("Todo", "A", 3);
	board.addCard("Todo", "B", 6);
	board.addCard("Todo", "C", 9);
	expect(board.getEstimative()).toBe(18);
});

test("Deve criar um board e fazer o handle dos eventos", function () {
	const board = new Board(1, "Project A");
	board.on("addCard", function () {
	});
	board.addColumn(1, "Todo", true);
	board.addColumn(2, "Doing", true);
	board.addColumn(3, "Done", false);
	board.addCard("Todo", "A", 3);
	board.addCard("Todo", "B", 6);
	board.addCard("Todo", "C", 9);
	expect(board.getEstimative()).toBe(18);
});

test("Deve criar um board e mover um card", function () {
	const board = new Board(1, "Project A");
	board.addColumn(1, "Todo", true);
	board.addColumn(2, "Doing", true);
	board.addColumn(3, "Done", false);
	board.addCard("Todo", "A", 3);
	board.addCard("Todo", "B", 6);
	board.addCard("Todo", "C", 9);
	board.selectCard(board.columns[0], board.columns[0].cards[0]);
	board.moveTo(board.columns[1]);
	expect(board.columns[0].getEstimative()).toBe(15);
	expect(board.columns[1].getEstimative()).toBe(3);
	board.resetCard();
});

test("Deve criar um board e trocar a ordem de um card", function () {
	const board = new Board(1, "Project A");
	board.addColumn(1, "Todo", true);
	board.addColumn(2, "Doing", true);
	board.addColumn(3, "Done", false);
	board.addCard("Todo", "A", 3);
	board.addCard("Todo", "B", 6);
	board.addCard("Todo", "C", 9);
	board.selectCard(board.columns[0], board.columns[0].cards[0]);
	board.swap(board.columns[0].cards[1]);
	board.resetCard();
	expect(board.columns[0].cards[0].title).toBe("B");
	expect(board.columns[0].cards[1].title).toBe("A");
});
