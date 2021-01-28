import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }
  allmovies(research:string){
    let key='17306c6d';
    let url_film ='http://www.omdbapi.com/?s='+research+'&apikey='+key+'&plot=full';
    return this.http.get<any[]>(url_film);
  }
}
