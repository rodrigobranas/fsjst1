export default class Card {

	constructor (public title: string, public estimative: number) {
	}

	decreaseEstimative () {
		this.estimative--;
	}

	increaseEstimative () {
		this.estimative++;
	}
}
