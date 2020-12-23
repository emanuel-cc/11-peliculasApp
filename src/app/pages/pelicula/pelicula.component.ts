import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs/operators';
import { MovieWatch, Result } from '../../interfaces/watch-video-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public pelicula:MovieDetails;
  public cast:Cast[] = [];
  public videosPelicula:Result[] = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private peliculasService:PeliculasService,
    private location:Location,
    private router:Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    // combineLatest([
    //   this.peliculasService.getPeliculaDetalle(id),
    //   this.peliculasService.getCast(id)
    // ]);

    // console.log(id);
    this.peliculasService.getPeliculaDetalle(id)
      .subscribe(movie=>{
        if(!movie){
          this.router.navigateByUrl('/home');
          return;
        }
        // console.log(movie);
        this.pelicula = movie;
      });

    this.peliculasService.getCast(id)
      .subscribe(cast=>{
        console.log(cast);
        this.cast = cast.filter(actor=>actor.profile_path != null);
      });

    this.peliculasService.getVideo(id)
      .subscribe(videos=>{
        console.log("Videos: ");
        console.log(videos);
        this.videosPelicula = videos;
      });
  }

  onRegresar(){
    this.location.back();
  }



}
