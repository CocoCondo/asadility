import express, { Request, Response } from 'express';
import { modeloAdmins} from '../src/models/admins/index';
import "dotenv/config";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/authmiddleware', authenticateToken, function(req: Request, res: Response) {
  res.send('Get Autenticado');
})

interface User {
  name: string,
  password: string
}

let users: User[] = [
  {
      name: "Coti",
      password: "$2b$10$DEYjN1oFGpYue8smhQqdLOsoqeijjnDUK1NVrJp.JOBQon4zFxAYy"
  }
];

router.post("/login", async (req: Request, res: Response)=>{
  let user: User = users.find((u: User) => u.name == req.body.username) as User;
	if (user == null) return res.status(400).send('Usuario no existe');
	try {
		const authenticateUser = await bcrypt.compare(req.body.password, user.password);
		if (authenticateUser) {
			const username = req.body.username;
			const user = { name: username };
			const accessToken = jwt.sign(user, process.env.ACESS_TOKEN_SECRET!);
			res.json({accessToken: accessToken});
    } else {
			res.send('Contraseña incorrecta para este usuario');
		}	
	} catch {
		res.send(500).send();
	}
});

router.post("/register", async(req: Request, res: Response)=>{
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword)
		const user: User = {name: req.body.name, password: hashedPassword };
		// users.push(user);
		
		//Add to DB
		const adminInfo = new modeloAdmins(user);
    adminInfo.save().then(admin => {
        console.log(admin)
    })

		res.status(201).send();
	} catch {
		res.status(500).send();
	}	
});

function authenticateToken(req: any, res: Response, next: ()=> void){
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, process.env.ACESS_TOKEN_SECRET!, (err: any, user: any) => {
		if(err) return res.sendStatus(403);
		req.user = user;
		next();
	})
};

export default router;