import Column from "./Column";

export default class Board {
	columns: Column[];

	constructor (public name: string) {
		this.columns = [];
	}

	addColumn (columnName: string, hasEstimative: boolean = false) {
		this.columns.push(new Column(columnName, hasEstimative));
	}

	addCard (columnName: string, cardTitle: string, cardEstimative: number) {
		const column = this.columns.find(column => column.name === columnName);
		if (!column) return;
		column.addCard(cardTitle, cardEstimative);
	}

	deleteColumn (column: Column) {
		this.columns.splice(this.columns.indexOf(column), 1);
	}

	getEstimative () {
		return this.columns.reduce((total, column) => {
			total += column.getEstimative();
			return total;
		}, 0);
	}
}
