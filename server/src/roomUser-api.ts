import express from 'express';
import { modeloRooms } from './models/rooms';

const router = express.Router();

// //Agregar users a un room
// router.patch('/rooms/:code/addPlayers', async (req, res) => {
//     const roomCode = req.params.code;
//     const newPlayers = req.body.players; // Supongamos que el cuerpo de la solicitud contiene los nuevos jugadores

//     try {
//         // Utilizar findOne para encontrar la sala por su atributo 'code'
//         const room = await modeloRooms.findOne({ code: roomCode });

//         // Verificar si se encontró la sala
//         if (!room) {
//             return res.status(404).json({ mensaje: `Sala con código ${roomCode} no encontrada` });
//         }

//         // Agregar jugadores al arreglo 'players'
//         room.players.push(...newPlayers);

//         // Guardar los cambios en la base de datos
//         await room.save();

//         res.json({ mensaje: `Jugadores agregados con éxito a la sala con código ${roomCode}` });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
//     /*
//     {
//     "players": ["jugador1", "jugador2", "jugador3"] //Así se ve el cuerpo de la solicitud
//     }
//     */
// });

// router.patch('/rooms/:code/addPlayer', async (req, res) => {
//   const roomCode = req.params.code;
//   const newPlayer = req.body.name; // Supongamos que el cuerpo de la solicitud contiene los nuevos jugadores

//   try {
//       // Utilizar findOne para encontrar la sala por su atributo 'code'
//       const room = await modeloRooms.findOne({ code: roomCode });

//       // Verificar si se encontró la sala
//       if (!room) {
//           return res.status(404).json({ mensaje: `Sala con código ${roomCode} no encontrada` });
//       }

//       // Agregar jugadores al arreglo 'players'
//       room.players.push(newPlayer);

//       // Guardar los cambios en la base de datos
//       await room.save();

//       res.json({ mensaje: `Jugador agregado con éxito a la sala con código ${roomCode}` });
//   } catch (error: any) {
//       res.status(500).json({ error: error.message });
//   }
// });

// // Ruta para eliminar elementos del arreglo 'players'
// router.delete('/rooms/:code/removePlayers', async (req, res) => {
//     const roomCode = req.params.code;
//     const playersToRemove = req.body.players; // Supongamos que el cuerpo de la solicitud contiene los jugadores a eliminar
  
//     try {
//       // Utilizar updateOne con el operador $pull para eliminar elementos del arreglo 'players'
//       const result = await modeloRooms.updateOne(
//         { code: roomCode },
//         { $pull: { players: { $in: playersToRemove } } }
//       );
  
//       // Verificar si se realizó la actualización con éxito
//       if (result.modifiedCount > 0) {
//         res.json({ mensaje: `Jugadores eliminados con éxito de la sala con código ${roomCode}` });
//       } else {
//         res.status(404).json({ mensaje: `Sala con código ${roomCode} no encontrada o jugadores no presentes` });
//       }
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   router.delete('/rooms/:code/removePlayer', async (req, res) => {
//     const roomCode = req.params.code;
//     const playerToRemove = req.body.name; // Supongamos que el cuerpo de la solicitud contiene los jugadores a eliminar
  
//     try {
//       // Utilizar updateOne con el operador $pull para eliminar elementos del arreglo 'players'
//       const result = await modeloRooms.updateOne(
//         { code: roomCode },
//         { $pull: { players: { $in: playerToRemove } } }
//       );
  
//       // Verificar si se realizó la actualización con éxito
//       if (result.modifiedCount > 0) {
//         res.json({ mensaje: `Jugador eliminado con éxito de la sala con código ${roomCode}` });
//       } else {
//         res.status(404).json({ mensaje: `Sala con código ${roomCode} no encontrada o jugador no presente` });
//       }
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   });

router.get('/rooms/:code/players', async function(req, res) {
  const roomCode = req.params.code;
  try{
    const room = await modeloRooms.findOne({ code:roomCode });

    if (!room) {
      return res.status(404).json({mensaje: `Sala con código ${roomCode} no encontrada`})
    }

    const players = room.players;

    res.json({players});
  }catch (error: any){
    res.status(500).json({error: error.message})
  }
})

export default router;