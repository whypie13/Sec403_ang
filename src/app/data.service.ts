import { Observable } from 'rxjs';
import jsonData from '../assets/notecollection.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
})

export class Dataservice {

  pageSize: number = 4;

  constructor(private http: HttpClient) {}


  getNotes(page: number) {
    let pageStart = (page - 1) * this.pageSize;
    let pageEnd = pageStart + this.pageSize;
    return jsonData.slice(pageStart, pageEnd);
  }


  getLastPageNumber() {
    return Math.ceil(jsonData.length / this.pageSize);
  }


  getNote (id: any) {
    let dataToReturn: any[] = [];
    jsonData.forEach( function(note){
        if (note['_id']['$oid'] == id) {
            dataToReturn.push(note)
      }
    })
    return dataToReturn
  }


  getLoremIpsum(paragraphs: number): Observable<any> {

    let API_key = 'o1LlHDrpMx7YiXiE9hXwwQ==mrxycYUPUQJYXbj0';
    return this.http.get<any>(
      'https://api.api-ninjas.com/v1/loremipsum?paragraphs=' + paragraphs,
      { headers: { 'X-Api-Key': API_key}}
    );
  }

  getIpLookup(address = '73.9.149.180'): Observable<any> {

    let API_key = 'o1LlHDrpMx7YiXiE9hXwwQ==mrxycYUPUQJYXbj0';
    return this.http.get<any>(
      'https://api.api-ninjas.com/v1/iplookup?address=' + address,
      { headers: { 'X-Api-Key': API_key}}
    );
  }


  postNotesub(id: any, notesub: any) {
      let newNotesub = {
          '_id' : notesub.id,
          'username' : notesub.username,
          'comment' : notesub.comment,
          'riskscore' : notesub.riskscore,
          'source' : notesub.source
      };
      jsonData.forEach( function(note) {
          if (note['_id']['$oid'] == id )
              note['notesubs'].push( newNotesub );
      });
    }

}
