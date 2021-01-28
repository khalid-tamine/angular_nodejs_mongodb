import { MoviesService } from './../movies.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private fm :MoviesService) { }

  ngOnInit(): void {
    this.getfilm();
  }
  films:any;
  research='Batman';
  getfilm(){
    this.fm.allmovies(this.research).subscribe(
      data=>this.films = data,
      error=>console.error("error"+error),
      ()=>console.log("ok")
    )
  }
  afficher(){
    console.log(this.films.Search[0].Title);

  }

}
