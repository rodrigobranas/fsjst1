import BoardRepository from "../domain/repository/BoardRepository"

export default class GetCards {

	constructor (readonly boardRepository: BoardRepository) {
	}

	async execute (idColumn: number): Promise<Output[]> {
		const column = await this.boardRepository.getColumn(idColumn);
		const output: Output[] = [];
		for (const card of column.cards) {
			output.push({
				idCard: card.idCard,
				title: card.title,
				estimative: card.estimative
			})
		}
		return output;
	}
}

type Output = {
	idCard: number | null,
	title: string,
	estimative: number
}
