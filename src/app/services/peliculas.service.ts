import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { tap, map, catchError } from "rxjs/operators";
import { MovieDetails } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { MovieWatch } from '../interfaces/watch-video-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando:boolean = false;

  constructor(private http:HttpClient) { }

  get params(){
    return {
      api_key: '25d31599243ac9c6e9dd94435ea96737',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]>{
    if(this.cargando){
      //cargando películas
      return of([]);
    }
    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`,{
      params: this.params
    }).pipe(
      map((resp)=>resp.results),
      tap(()=>{
        this.carteleraPage+=1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto:string):Observable<Movie[]>{
    const params = {... this.params, page: '1', query: texto};
    //https://api.themoviedb.org/3/search/movie?
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params: params
    }).pipe(
      map(resp=>resp.results)
    );
  }

  getPeliculaDetalle(id:string){
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`,{
      params: this.params
    }).pipe(
      catchError(err=>of(null))
    );
  }

  getCast(id:string):Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`,{
      params: this.params
    }).pipe(
      map(resp=>resp.cast),
      catchError(err=>of([]))
    );
  }

  getVideo(id:string){
    //https://api.themoviedb.org/3/movie/24428/watch/providers?api_key=25d31599243ac9c6e9dd94435ea96737
    //https://api.themoviedb.org/3/movie/24428/videos?api_key=25d31599243ac9c6e9dd94435ea96737&language=en-US
    return this.http.get<MovieWatch>(`${this.baseUrl}/movie/${id}/videos`,{
      params: this.params
    }).pipe(
      map(resp=>resp.results)
    )
  }
}
