import Card from "./Card";
import Column from "./Column";

export default class Board {
	columns: Column[];

	constructor (public idBoard: number | null, readonly name: string) {
		this.columns = [];
	}

	addColumn (column: Column) {
		this.columns.push(column);
	}

	getColumn (name: string) {
		const column = this.columns.find(column => column.name === name);
		if (!column) throw new Error("Column does not exist");
		return column;
	}

	addCard (columnName: string, card: Card, date: Date = new Date()) {
		const column = this.getColumn(columnName);
		column.addCard(card, date);
	}

	changeColumn (cardTitle: string, columnNameFrom: string, columnNameTo: string, date: Date = new Date()) {
		const card = this.getColumn(columnNameFrom).getCard(cardTitle);
		this.getColumn(columnNameTo).addCard(card, date);
		this.getColumn(columnNameFrom).removeCard(card);
	}
}
