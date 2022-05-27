import Board from "../src/domain/entity/Board";
import { mount } from "@vue/test-utils";
import ColumnComponent from "../src/components/ColumnComponent.vue";

test("Deve criar um componente de column", async function () {
	const board = new Board(1, "Project A");
	board.addColumn(1, "Todo", true);
	board.addColumn(2, "Doing", true);
	board.addColumn(3, "Done", false);
	board.addCard("Todo", "A", 3);
	board.addCard("Todo", "B", 6);
	const column = board.columns[0];
	const wrapper = mount(ColumnComponent, {
		props: {
			board,
			column
		}
	});
	expect(wrapper.get(".estimative").text()).toBe("9");
	await wrapper.get(".new-card-input").setValue("C");
	await wrapper.get(".new-card-input").trigger("keyup.enter");
	expect(column.cards[2].title).toBe("C");
	expect(column.cards).toHaveLength(3);
	await wrapper.get(".delete-column").trigger("click");
	expect(board.columns).toHaveLength(2);
});
