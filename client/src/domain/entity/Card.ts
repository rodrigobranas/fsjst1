export default class Card {
	color: string;

	constructor (public title: string, public estimative: number) {
		this.color = "#FFF";
	}

	decreaseEstimative () {
		this.estimative--;
	}

	increaseEstimative () {
		this.estimative++;
	}
}
