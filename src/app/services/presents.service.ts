import { Injectable } from '@angular/core';
import { Present } from '../models/present';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresentsService {

  public presents: Present[] = [];

  constructor(private http : HttpClient) { }


  public addPresent(present : Present) {
    // this.presents.push(present);
    return this.http.post("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json", present);
  }

  public loadData() {
    return this.http.get<{[key: string] : Present}>("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json");
  }

  public loadRecord(id: string) {
    return this.http.get<Present>("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents/"+id+".json");
  }

  public updateRecord(item: Present) {
    return this.http.patch("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents/"+item.id+".json", item);
  }

  public deleteRecord(id: string) {
    return this.http.delete("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents/"+id+".json");
  }

}
