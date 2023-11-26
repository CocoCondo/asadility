import express, { Request, Response } from 'express';
import { modeloAdmins } from '../src/models/admins/index';
import "dotenv/config";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/authmiddleware', authenticateToken, function (req: Request, res: Response) {
    // Si se llega a este punto, la autenticación fue exitosa
    res.status(200).json({ Autenticado: true, status: 200 });
});

router.post("/login", async (req: Request, res: Response) => {

	const username = req.body.username;

	try {
		/*Compara en la BD*/
		const result = await modeloAdmins.findOne(
			{ username: username }
		);
		if (result && result?.password) {
			const authenticateUser = await bcrypt.compare(req.body.password, result.password);
			if (authenticateUser) {
				const user = { name: username };
				const accessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET!);
				res.json({ accessToken: accessToken });
			} else {
				res.status(400).send({error: 'Credenciales incorrectas'});
			}
		}
		else {
			return res.status(400).send({error: 'Credenciales incorrectas'});
		}
	} catch (error){
		res.sendStatus(500).send(error);
	}
});

router.post("/register", async (req: Request, res: Response) => {
	try {
		if(req.body.password && req.body.username){
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			const adminInfo = new modeloAdmins({ username: req.body.username, password: hashedPassword });
			adminInfo.save();
			res.status(201).send();
		} else {
			res.status(401).send({error: "Las credenciales no fueron ingresadas"});
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send({error: 'No se pudo registrar al usuario'});
	 }	 
});

export function authenticateToken(req: any, res: Response, next: () => void) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, process.env.ACESS_TOKEN_SECRET!, (err: any, user: any) => {
		if (err) return res.sendStatus(401);
		req.user = user;
		next();
	})
};

export default router;