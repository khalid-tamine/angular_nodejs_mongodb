import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor( private http:HttpClient) { }

  //get all
  url = "http://localhost:3000/films";
  allFilms(){
    return this.http.get<any[]>(this.url);
  }

  //delete with id
  del_url="http://localhost:3000/films/";
  delFilm(id:any){
    return this.http.delete<any[]>(this.del_url+id);
  }
  //add object
  url_add = "http://localhost:3000/films/";
  addFilm(s:any){
    return this.http.post(this.url_add,s);
  }


}
