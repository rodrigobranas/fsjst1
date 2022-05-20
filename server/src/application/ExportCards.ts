import BoardRepository from "../domain/repository/BoardRepository";

export default class ExportCards {

	constructor (readonly boardRepository: BoardRepository) {
	}

	async execute (idBoard: number): Promise<Buffer> {
		const board = await this.boardRepository.get(idBoard);
		if (!board) throw new Error("Board not found");
		const lines: string[] = [];
		lines.push("card_title;card_estimative");
		for (const column of board?.columns) {
			for (const card of column.cards) {
				lines.push(`${card.title};${card.estimative}`);
			}
		}
		return Buffer.from(lines.join("\n"));
	}
}
