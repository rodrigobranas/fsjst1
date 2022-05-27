import User from "../../../domain/entity/User";
import UserRepository from "../../../domain/repository/UserRepository";

export default class UserRepositoryMemory implements UserRepository {

	async getByUsername(username: string): Promise<User> {
		return new User(username, "123456");
	}
}
