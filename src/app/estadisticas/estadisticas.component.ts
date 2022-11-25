import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
//import { ConsoleReporter } from 'jasmine';
import { observable, Subscription } from 'rxjs';
import { ReporteService } from '../servicios/reporte.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  victoriasJuga: number;
  victoriasCroupier: number;
  empates: number;
  numeros: number[];
 // datos: number[];


  private subscription = new Subscription();

  constructor(private reporteService: ReporteService){
    this.doughnutChartData.datasets[0].data= [];
  }


  ngOnInit(): void {
    
    this.victoriaJugador();
    this.victoriaCroupier();
    this.reporteEmpates();
    //this.setData();
    alert("cargando datos...")

  }

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Victorias Croupier', 'Victorias Jugadores', 'Empates' ];
 // public doughnutChartData:number[] = [ 100, 150, 70 ];
   public doughnutChartData: ChartData<'doughnut'> = {


    labels: this.doughnutChartLabels,
    datasets: [
     // { data: [ 350, 450, 100 ] },
     // { data: [ 50, 150, 120 ] },
      { data: [ 100, 30, 70 ] },
      
    ]
    
  }; 
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }





  victoriaCroupier(){
    this.subscription.add(
      this.reporteService.victoriasCroupier().subscribe({
        next: (respuesta: any)=>{
          this.victoriasCroupier=respuesta;
           console.log(this.victoriasCroupier)
           this.doughnutChartData.datasets[0].data.push(this.victoriasCroupier);
           return this.victoriasCroupier;
        },
        error:()=>{
          alert("error al obtener la cantidad de victorias del croupier")
        }
      })
    )
  }

  
  victoriaJugador(){
    this.subscription.add(
      this.reporteService.victoriaJugador().subscribe({
        next: (respuesta: number)=>{
            this.victoriasJuga=respuesta;
            console.log(this.victoriasJuga);
            this.doughnutChartData.datasets[0].data.push(this.victoriasJuga);
        },
        error:()=>{
          alert("error al obtener la cantidad de victorias del jugador")
        }
      })
    )
  }


  reporteEmpates(){
    this.subscription.add(
      this.reporteService.empates().subscribe({
        next: (respuesta: number)=>{
            this.empates=respuesta;
          console.log(this.empates)
          this.doughnutChartData.datasets[0].data.push(this.empates);
        },
        error:()=>{
          alert("error al obtener la cantidad de empates")
        }
      })
    )
  }


}
