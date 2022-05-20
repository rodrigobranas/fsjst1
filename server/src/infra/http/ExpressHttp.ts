import Http from "./Http";
import express from "express";

export default class ExpressHttp implements Http {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(function (req: any, res: any, next: any) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			next();
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
