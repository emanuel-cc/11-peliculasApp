import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public movies:Movie[] = [];
  public texto:string = '';

  constructor(
    private activatedRoute:ActivatedRoute,
    private peliculasService:PeliculasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params=>{
        //Llamar el servicio
        this.texto = params.texto;
        this.peliculasService.buscarPeliculas(params.texto)
          .subscribe(movies=>{
            console.log("Resultado búsqueda: ");
            console.log(movies);
            this.movies = movies;
          });
      });
  }

}
