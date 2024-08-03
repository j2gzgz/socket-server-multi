import {Router, Request, Response} from 'express'
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockect';
import { GraficaData } from '../classes/grafica';
import { GraficaEncuestaData } from '../classes/grafica-encuesta';

const router = Router();

const grafica         = new GraficaData;
const graficaEncuesta = new GraficaEncuestaData;

// Gráfica de línea
router.get('/grafica', (req: Request, res: Response) =>{
  res.json( grafica.getDataGrafica() );
});

router.post('/grafica', (req: Request, res: Response) =>{
    
  const mes      = req.body.mes;
  const unidades = Number(req.body.unidades);

  grafica.incrementarValor(mes, unidades);
  const server = Server.instance.io.emit('cambio-grafica', grafica.getDataGrafica());


  res.json( grafica.getDataGrafica());

});

//Gráfica de barras
router.get('/grafica-encuesta', (req: Request, res: Response) =>{
  res.json( graficaEncuesta.getDataGrafica() );
});

router.post('/grafica-encuesta', (req: Request, res: Response) =>{
    
  const opcion   = Number(req.body.opcion);
  const unidades = Number(req.body.unidades);

  graficaEncuesta.incrementarValor(opcion, unidades);
  const server = Server.instance.io.emit('cambio-grafica-encuesta', graficaEncuesta.getDataGrafica());


  res.json( graficaEncuesta.getDataGrafica());

});


router.get('/mensajes', (req: Request, res: Response) =>{
    res.json({
        ok: true,
        mensaje: '¡GET-Listo!' 
    });
});

router.post('/mensajes', (req: Request, res: Response) =>{
    
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload ={
        de,
        cuerpo
    }

    const server = Server.instance.io.emit('mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
    });
});


router.post('/mensajes/:id', (req: Request, res: Response) =>{
    
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload ={
        de,
        cuerpo
    }

    const server = Server.instance.io.in(id).emit('mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// servicio para obtener todos los IDs de los usurios
// router.get("/usuarios", (req: Request, res: Response) => {
//     try {
//         const server = Server.instance;
//         const clientes: string[] = [];
//         const { sockets } = server.io.sockets;


//         sockets.forEach( socket =>{
//             clientes.push(socket.id);
//         })
   
//         return res.json({
//             ok: true,
//             clientes
//         })
        
//     } catch (error) {
//         return res.json({
//             ok: false,
//             error
//         })        
//     }
// });

// servicio para obtener todos los IDs de los usurios
router.get('/usuarios', async (req: Request, res: Response) => {
    const server = Server.instance;
   
    try {
      const sockets = await server.io.fetchSockets();
      const socketsIds: string[] = [];
      for (const socket of sockets) {
        socketsIds.push(socket.id);
      }
      res.json({
        ok: true,
        clientes: socketsIds,
      });
    } catch (error) {
      console.log('ERROR' + error);
      res.status(400).json({
        ok: false,
        error: 'Error fetching sockets',
      });
    }
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', async (req: Request, res: Response) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista(),
      })

});

export default router;
