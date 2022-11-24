import { JugadaCartas } from "./jugada-cartas";
import { Usuario } from "./usuario";

export class Partida {
    idPlay: number;
    fecha: Date;
    puntosJugador: number;
    puntosCroupier: number;
    finalizada: boolean;
    usuarioId?: number;
    ganador: string;
    jugadaCartas: JugadaCartas[];
}