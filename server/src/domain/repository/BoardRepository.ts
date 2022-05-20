import Board from "../entity/Board";
import Column from "../entity/Column";

export default interface BoardRepository {
	save (board: Board): Promise<number>;
	get (idBoard: number): Promise<Board>;
	update (board: Board): Promise<void>;
	delete (idBoard: number): Promise<void>;
	list (): Promise<Board[]>;
	getColumn (idColumn: number): Promise<Column>;
}
