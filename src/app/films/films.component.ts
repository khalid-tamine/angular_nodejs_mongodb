import { FilmsService } from './../films.service';
import { Component, OnInit , ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { Watching } from '../watching';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;


  constructor(private flm:FilmsService,private http: HttpClient,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
      name:[''],
      description:['']
    });
    this.getFilm();
  }

  //========== Ajouter sub ===========
  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }
  onFormSubmit() {
    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('productImage', this.fileUploadForm.get('uploadedImage').value);
    formData.append('name', this.fileUploadForm.get('name').value);
    formData.append('description', this.fileUploadForm.get('description').value);
    this.flm.addFilm(formData).subscribe(
        data =>{ console.log(data); this.getFilm()},
        err => console.error('App err:',err),
        ()=>console.log("ok")
      );

  }

  //=========== get all films =========
  films:Array<Watching>=[];
  getFilm(){
    this.flm.allFilms().subscribe(
      data => this.films = data,
      error =>  console.error('app err :'+error),
      () =>console.log("ok")
    );
  }

  //=========== delete film ============
  supSub(id){
    console.log(id);
    this.flm.delFilm(id).subscribe(
      data =>{ console.log(data); this.getFilm()},
      err => console.error('App err:',err),
      ()=>console.log("ok")
    );
  }


}
