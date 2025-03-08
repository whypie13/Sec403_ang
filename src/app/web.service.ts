import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class webService {


  pageSize: number = 4;



  constructor(private http: HttpClient) {}



  getNotes(page: number) {
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/notes?pn=' + page + '&ps=' + this.pageSize);
  }


  getNote( id: any){
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/notes/' + id);
  }


  addNote(note:any): Observable<any>{
    let postData = new FormData();
    postData.append("title", note.title);
    postData.append("category", note.category);
    return this.http.post<any>(
      'http://127.0.0.1:5000/api/v1.0/notes', postData);
  }


  getNotesubs( id: any){
    return this.http.get<any>(
      'http://127.0.0.1:5000/api/v1.0/notes/' + id + '/notesubs');
  }


  postNotesub(id: any, notesub: any) {
    let postData = new FormData();
    postData.append("username", notesub.username);
    postData.append("comment", notesub.comment);
    postData.append("riskscore", notesub.riskscore);
    postData.append("source", notesub.source);
    return this.http.post<any> (
      'http://127.0.0.1:5000/api/v1.0/notes/' + id + '/notesubs', postData);
  }


  deleteNote( id: any){
    return this.http.delete<any>(
      'http://127.0.0.1:5000/api/v1.0/notes/' + id);
  }


  deleteNotesub( id: any, notesubID:any){
    return this.http.delete<any>(
      'http://127.0.0.1:5000/api/v1.0/notes/' + id + '/notesubs/' + notesubID);
  }
}
