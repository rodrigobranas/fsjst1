import Board from "../src/domain/entity/Board";
import { mount } from "@vue/test-utils";
import CardEstimativeComponent from "../src/components/CardEstimativeComponent.vue";

test("Deve criar um componente de card estimative", async function () {
	const board = new Board(1, "Project A");
	board.addColumn(1, "Todo", true);
	board.addColumn(2, "Doing", true);
	board.addColumn(3, "Done", false);
	board.addCard("Todo", "A", 3);
	board.addCard("Todo", "B", 6);
	const column = board.columns[0];
	const card = board.columns[0].cards[0];
	const wrapper = mount(CardEstimativeComponent, {
		props: {
			column,
			card
		}
	});
	console.log(wrapper.html());
	await wrapper.get(".increase-estimative").trigger("click");
	expect(card.estimative).toBe(4);
	await wrapper.get(".decrease-estimative").trigger("click");
	expect(card.estimative).toBe(3);
});
