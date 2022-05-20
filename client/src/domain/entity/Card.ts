import DomainEvent from "../../event/DomainEvent";

export default class Card {
	color: string;

	constructor (public title: string, public estimative: number) {
		this.color = '#' + Math.random().toString(16).substr(-6);
	}

	decreaseEstimative () {
		this.estimative--;
	}

	increaseEstimative () {
		this.estimative++;
	}
}
