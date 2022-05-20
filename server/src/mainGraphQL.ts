import { ApolloServer } from "apollo-server";
import GetBoards from "./application/GetBoards";
import GetCards from "./application/GetCards";
import GetColumns from "./application/GetColumns";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import BoardRepositoryDatabase from "./infra/repository/database/BoardRepositoryDatabase";

const connection = new PgPromiseConnection();
const boardRepository = new BoardRepositoryDatabase(connection);
const getBoards = new GetBoards(boardRepository);
const getColumns = new GetColumns(boardRepository);
const getCards = new GetCards(boardRepository);

const typeDefs = `
	type Board {
		idBoard: Int
		name: String
		columns: [Column]
	}

	type Column {
		idColumn: Int
		name: String
		cards: [Card]
	}

	type Card {
		idCard: Int
		title: String
		estimative: Int
	}

	type Query {
		boards: [Board]
	}
`;

const resolvers = {
	Query: {
		async boards () {
			const output = await getBoards.execute();
			return output;
		}
	},
	Board: {
		async columns (parent: any) {
			const output = await getColumns.execute(parent.idBoard);
			return output;
		}
	},
	Column: {
		async cards (parent: any) {
			const output = await getCards.execute(parent.idColumn);
			return output;
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3000);
