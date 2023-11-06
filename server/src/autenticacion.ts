import express, { Request, Response } from 'express';
import { modeloAdmins } from '../src/models/admins/index';
import "dotenv/config";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/authmiddleware', authenticateToken, function (req: Request, res: Response) {
	res.send('Get Autenticado');
})

router.post("/login", async (req: Request, res: Response) => {

	const username = req.body.name;

	try {
		/*Compara en la BD*/
		const result = await modeloAdmins.findOne(
			{ name: username }
		);

		if (result?.password) {
			const authenticateUser = await bcrypt.compare(req.body.password, result.password);
			if (authenticateUser) {
				const username = req.body.username;
				const user = { name: username };
				const accessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET!);
				res.json({ accessToken: accessToken });
			} else {
				res.send('Contraseña incorrecta para este usuario');
			}
		}
		else {
			return res.status(404).send('Usuario no encontrado');
		}
	} catch (error){
		res.sendStatus(500).send(error);
	}
});

router.post("/register", async (req: Request, res: Response) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const adminInfo = new modeloAdmins({ name: req.body.name, password: hashedPassword });
		adminInfo.save().then(admin => {
			console.log(admin)
		})
		res.status(201).send();
	} catch (error) {
		console.error('Error en el bloque catch:', error);
		res.status(500).send('Error interno del servidor');
	 }	 
});

function authenticateToken(req: any, res: Response, next: () => void) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, process.env.ACESS_TOKEN_SECRET!, (err: any, user: any) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	})
};

export default router;