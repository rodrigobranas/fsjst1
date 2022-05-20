import DomainEvent from "../../event/DomainEvent";
import BaseEntity from "./BaseEntity";
import Card from "./Card";
import Column from "./Column";

export default class Board extends BaseEntity {
	columns: Column[];
	selectedColumn: Column | undefined;
	selectedCard: Card | undefined;

	constructor (public idBoard: number, public name: string) {
		super();
		this.columns = [];
	}

	addColumn (idColumn: number | undefined, columnName: string, hasEstimative: boolean = false) {
		this.columns.push(new Column(idColumn, columnName, hasEstimative));
		this.publish(new DomainEvent("addColumn", { name: columnName, hasEstimative: false }));
	}

	addCard (columnName: string, cardTitle: string, cardEstimative: number) {
		const column = this.columns.find(column => column.name === columnName);
		if (!column) return;
		column.addCard(new Card(cardTitle, cardEstimative));
		this.publish(new DomainEvent("addCard", { idColumn: column.idColumn, title: cardTitle, estimative: cardEstimative }));
	}

	deleteColumn (column: Column) {
		this.columns.splice(this.columns.indexOf(column), 1);
		this.publish(new DomainEvent("deleteColumn", { name: column.name }));
	}

	getEstimative () {
		return this.columns.reduce((total, column) => {
			total += column.getEstimative();
			return total;
		}, 0);
	}

	selectCard (column: Column, card: Card) {
		this.selectedColumn = column;
		this.selectedCard = card;
	}

	moveTo (column: Column) {
		if (!this.selectedColumn || !this.selectedCard) return;
		if (this.selectedColumn === column) return;
		this.selectedColumn.deleteCard(this.selectedCard);
		column.addCard(this.selectedCard);
		this.selectedColumn = column;
	}

	swap (card: Card) {
		if (!this.selectedCard) return;
		if (!this.selectedColumn || !this.selectedCard) return;
		const a = this.selectedColumn.cards.indexOf(card);
		const b = this.selectedColumn.cards.indexOf(this.selectedCard);
		const temp = this.selectedColumn.cards[a];
		this.selectedColumn.cards[a] = this.selectedColumn.cards[b];
		this.selectedColumn.cards[b] = temp;
	}

	resetCard () {
		if (this.selectedColumn && this.selectedCard) {
			this.publish(new DomainEvent("moveCard", { column: this.selectedColumn.name, card: this.selectedCard.title }));
		}
		delete this.selectedColumn;
		delete this.selectedCard;
	}
}
