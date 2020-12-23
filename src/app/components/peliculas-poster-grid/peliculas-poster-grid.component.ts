import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {
  @Input() peliculas:Movie[] = [];

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.peliculas);
  }

  onMovieClick(pelicula:Movie){
    this.router.navigate(['/pelicula', pelicula.id]);
  }

}
