export default interface Http {
	addRoute (method: string, url: string, callback: Function): void;
	listen (port: number): void;
	setMiddleware(fn: any): void;
}
