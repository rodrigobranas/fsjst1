import Http from "./Http";
import express from "express";

export default class ExpressHttp implements Http {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(function (req: any, res: any, next: any) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
			res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			next();
		});
		this.app.use(function (req: any, res: any, next: any) {
			if (req.method !== "OPTIONS" && req.url !== "/login") {
				const token = req.headers.authorization.replace("Bearer ", "");
				if (token !== "123456") {
					// localizado o usuário
					//req.user = user
					res.status(401).end();
					return;
				}
			}
			next();
		});
	}

	setMiddleware(fn: any): void {
		this.app.use(function (req: any, res: any, next: any) {
			try {
				fn(req.params, req.body, req.headers);
				next();
			} catch (e) {
				// dependendo do tipo de erro
				res.status(401).end();
			}
		});	
	}

	addRoute(method: string, url: string, callback: Function): void {
		this.app[method](url, async (req: any, res: any) => {
			try {
				const output = await callback(req.params, req.body);
				res.json(output);
			} catch (e: any) {
				res.status(422).json({ message: e.message });
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port);
	}
}
