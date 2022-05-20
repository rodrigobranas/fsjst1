import Card from "./Card";

export default class Column {
	cards: Card[];

	constructor (readonly idColumn: number | null, readonly name: string, readonly hasEstimative: boolean) {
		this.cards = [];
	}

	addCard (card: Card, date: Date) {
		card.addTransition(this.name, date);
		this.cards.push(card);
	}

	getCards () {
		return this.cards;
	}

	getCard (cardTitle: string) {
		const card = this.cards.find(card => card.title === cardTitle);
		if (!card) throw new Error("Card not found");
		return card;
	}

	getEstimative () {
		return this.cards.reduce((total: number, card: Card) => {
			total += card.estimative;
			return total;
		}, 0);
	}

	removeCard (card: Card) {
		this.cards.splice(this.cards.indexOf(card), 1);
	}
}
