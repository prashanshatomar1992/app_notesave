import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
//reactive js operators
// import 'rxjs/add/operators/map';
// import { map } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  public allnotes: any = [];
  public apiurl: any = "http://localhost:3001/notesaver/";
  public model: any = {};
  public favourite:Boolean = false;

  constructor(private http: Http) { };
  //get all notes
  getAllNotes() {
    this.favourite = true;
    this.http.get(this.apiurl + 'getallnotes')
      .subscribe(
        Response => {

          // console.log(Object.keys(Response));        
          // console.log(typeof(Response));            
          // console.log(Response["_body"]);
          var data = Response.json();
          console.log(data.payload)

          console.log(Response.json())
          this.allnotes = data.payload;


        },
        err => {
          this.allnotes = [];
        }
      )
  }
  saveNote(model) {
    // console.log('model');
    console.log(model);
    // console.log('model');
    this.http.post(this.apiurl + 'addnote',model)
    .subscribe(
      Response => {
        this.getAllNotes();
        console.log(Response.json());
      },
      err => {
        this.allnotes = [];
      }
    )

  }
  addToFav(id){
    console.log('model')
    console.log(id)
    console.log('model')
    this.http.get(this.apiurl+'/addtofav/' + id)
    .subscribe(
      Response => {
        this.getAllNotes();
        console.log(Response.json());
      },
      err => {
        this.allnotes = [];
      }
    )
  }
  //Remove from fav
  remToFav(id){
    console.log('model')
    console.log(id)
    console.log('model')
    this.http.get(this.apiurl+'/removefav/' + id)
    .subscribe(
      Response => {
        this.getAllNotes();
        console.log(Response.json());
      },
      err => {
        this.allnotes = [];
      }
    )
  }
  //Getting only fav notes
  getFavNotes() {
    this.favourite = false;
    this.http.get(this.apiurl + 'getfavnotes')
      .subscribe(
        Response => {
          var data = Response.json();
          console.log(data.payload);
          this.allnotes = [];
          console.log(Response.json())
          this.allnotes = data.payload;


        },
        err => {
          this.allnotes = [];
        }
      )
    
  }
  ngOnInit() {
    this.getAllNotes();
  }

}
