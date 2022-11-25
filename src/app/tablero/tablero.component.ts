import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { Carta } from '../models/carta';
import { JugadaCartas } from '../models/jugada-cartas';
import { Partida } from '../models/partida';
import { Usuario } from '../models/usuario';
import { PartidaService } from '../servicios/partida.service';
import { ReporteService } from '../servicios/reporte.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  nombreUsuario: string;
  password: string;
  usuario: Usuario=  {} as Usuario;
  mostrar: boolean;

 // modalRef: MdbModalRef<EstadisticasComponent> | null = null;

  cartas: Carta[]=[];

  finalizada: boolean;
  sinpartida: boolean=false;



  private subscription = new Subscription();

  partida: Partida= {} as Partida;
  mensaje: string;
  jugadaCartas: JugadaCartas[];

  stand: boolean;
  finalizar: boolean;
 
  iniciar: boolean;
  blackjack: boolean;




constructor(private reporteService: ReporteService, private partidaservice: PartidaService, private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.stand=false;
    this.mostrar=false;
    this.finalizada=false;
    this.mensaje="";

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  estadisticas(){
   // this.modalRef = this.modalService.open(EstadisticasComponent);
  }

  cerrar(){
    this.stand=false;
    this.mostrar=false;
    this.finalizada=false;
    this.mensaje="";
    this.usuario= {} as Usuario;
    this.partida= {} as Partida;

  }

  login() {
    this.usuario.userName=this.nombreUsuario
    this.usuario.password=this.password;
    this.subscription.add(
			this.usuarioService.postLogin(this.usuario).subscribe({
			  next: (response : Usuario) => {
          this.usuario = response;
            if(response.userName== this.usuario.userName){
              this.mostrar=true;
              this.subscription.add(
                this.usuarioService.obtenerPartidaUser(this.usuario.idUser).subscribe({
                  next: (resp : Partida) => {
                    if(resp!=null) {
                      this.partida = resp;
                      if(this.partida.finalizada){
                        this.finalizada=true;
                        if(this.partida.ganador=="empate"){
                          this.mensaje="¡Empate!";
                        }else{
                          this.mensaje= `Ganador: ${this.partida.ganador}`;
                        }
                       
                      }
                      
                    }else{
                      this.sinpartida=true;
                      this.finalizada=true;
                    }
                   
        

                  },
                  error: () => {
                      alert('Error al cargar la partida')
                  },
                })
                );


              ///
            }else{
              alert('usuario y contraseña incorrecta')
            }
          
				},
			  error: (HttpErrorResponse) => {
            alert('Error en el usuario y contraseña')
			  },
			})
      );
    }

    pedir(){
      let x =this.partida.puntosJugador;
      console.log(this.partida);
      this.subscription.add(
        this.partidaservice.pedirCartaJugador(this.partida.idPlay).subscribe({
          next: (respuesta: Partida)=>{
            this.partida=respuesta;
            if(this.partida.finalizada==true){
          
              this.stand=true;
              if(this.partida.ganador=="empate"){
                this.mensaje="¡Empate!";
              }else{
                this.mensaje= `Ganador: ${this.partida.ganador}`;
              }
              this.finalizada=true;
            }else{
              this.mensaje="";
            }
          
            
          },
          error:()=>{
            alert("error al obtener la carta")
          }
        })
      )



    }

    reporte1(){
      this.subscription.add(
        this.reporteService.promedio().subscribe({
          next: (respuesta: any)=>{
              console.log(respuesta)
           
          },
          error:()=>{
            alert("error al obtener el reporte1")
          }
        })
      )
    }



    victoriasCroupier(){
      this.subscription.add(
        this.reporteService.victoriasCroupier().subscribe({
          next: (respuesta: any)=>{
              console.log(respuesta)
           
          },
          error:()=>{
            alert("error al obtener el reporte1")
          }
        })
      )
    }


  


    reporteJugFecha(){
      this.subscription.add(
        this.reporteService.reporteJugFecha().subscribe({
          next: (respuesta: any)=>{
              console.log(respuesta)
           
          },
          error:()=>{
            alert("error al obtener el reporte1")
          }
        })
      )
    }

    pasar(){
        this.mensaje="";
        this.pedirCartaCroupier();
        this.stand=true;
        
    }

    pedirCartaCroupier(){
      this.subscription.add(
        this.partidaservice.pedirCartaCroupier(this.partida.idPlay).subscribe({
          next: (respuesta: Partida)=>{
            this.partida = respuesta;    
            if(respuesta.finalizada==true){
              
              if(respuesta.ganador=="jugador"){
                this.mensaje= `Ganador: ${this.usuario.userName}`;
              }
              if(respuesta.ganador=="croupier"){
                this.mensaje= `Ganador: ${respuesta.ganador}`;
              }
              if(respuesta.ganador=="empate"){
                this.mensaje= `Empate`;
              }
              this.finalizada=true;
            }
 
          },
          error:()=>{
            alert("error al crear la partida")
          }
        })
      )

      
    }


  crearPartida(){
    this.finalizada=false;
    this.subscription.add(
      this.partidaservice.crearPartida(this.usuario.idUser).subscribe({
        next: (respuesta: Partida)=>{
          this.partida = respuesta;
          if(respuesta.puntosJugador==21){
            this.mensaje="BlackJack!!! Ganaste";
            this.finalizada=true;
          }    
          this.stand=false;
          this.sinpartida=false; 
        },
        error:()=>{
          alert("error al crear la partida")
        }
      })
    )
  }

  

}