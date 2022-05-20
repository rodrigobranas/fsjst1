import BoardRepository from "../domain/repository/BoardRepository"

export default class GetBoard {

	constructor (readonly boardRepository: BoardRepository) {
	}

	async execute (idBoard: number): Promise<Output> {
		const board = await this.boardRepository.get(idBoard);
		if (!board) throw new Error("Board not found");
		const output: Output = {
			idBoard: board.idBoard,
			name: board.name,
			columns: []
		};
		for (const column of board.columns) {
			const outputColumn: { idColumn: number | null, name: string, hasEstimative: boolean, cards: { title: string, estimative: number }[]} = { idColumn: column.idColumn, name: column.name, hasEstimative: column.hasEstimative, cards: []};
			for (const card of column.cards) {
				outputColumn.cards.push({ title: card.title, estimative: card.estimative });
			}
			output.columns.push(outputColumn);
		}
		return output;
	}
}

type Output = {
	idBoard: number | null,
	name: string,
	columns: { idColumn: number | null, name: string, hasEstimative: boolean, cards: { title: string, estimative: number }[]}[]
}
