import { Injectable } from '@angular/core';
import { Present } from '../models/present';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresentsService {

  public presents: Present[] = [];

  constructor(private http : HttpClient) { }

  private addToDatabase(present: Present) {
    this.http.post("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json", present).subscribe(() => {});
  }

  public addPresent(present : Present) {
    this.presents.push(present);
    this.addToDatabase(present)
  }

  public loadData() {
    return this.http.get<{[key: string] : Present}>("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json")
  }

}
