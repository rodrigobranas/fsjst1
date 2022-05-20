import BoardRepository from "../domain/repository/BoardRepository"

export default class GetColumns {

	constructor (readonly boardRepository: BoardRepository) {
	}

	async execute (idBoard: number): Promise<Output[]> {
		const board = await this.boardRepository.get(idBoard);
		if (!board) throw new Error("Board not found");
		const output: Output[] = [];
		for (const column of board.columns) {
			output.push({
				idColumn: column.idColumn,
				name: column.name
			});
		}
		return output;
	}
}

type Output = {
	idColumn: number | null,
	name: string
}
