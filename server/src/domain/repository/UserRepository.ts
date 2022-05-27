import User from "../entity/User";

export default interface UserRepository {
	getByUsername(username: string): Promise<User>;
}
