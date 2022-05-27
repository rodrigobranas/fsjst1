import Board from "../src/domain/entity/Board";
import { mount } from "@vue/test-utils";
import BoardComponent from "../src/components/BoardComponent.vue";

test("Deve criar um componente de board", async function () {
	const board = new Board(1, "Project A");
	board.addColumn(1, "Todo", true);
	board.addColumn(2, "Doing", true);
	board.addColumn(3, "Done", false);
	board.addCard("Todo", "A", 3);
	board.addCard("Todo", "B", 6);
	board.addCard("Todo", "C", 9);
	const wrapper = mount(BoardComponent, {
		props: {
			board
		}
	});
	expect(wrapper.get("#estimative").text()).toBe("18");
	await wrapper.get("#new-column-input").setValue("Test");
	await wrapper.get("#new-column-button").trigger("click");
	expect(board.columns).toHaveLength(4);
});
