import UserRepository from "../domain/repository/UserRepository"

export default class Login {

	constructor (readonly userRepository: UserRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const user = await this.userRepository.getByUsername(input.username);
		// regra de validação da senha do usuário
		return {
			username: user.username,
			token: "123456"
		}
	}
}

type Input = {
	username: string,
	password: string
}

type Output = {
	username: string,
	token: string
}
