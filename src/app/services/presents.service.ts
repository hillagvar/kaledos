import { Injectable } from '@angular/core';
import { Present } from '../models/present';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs';

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

    //gauname observable

    return this.http
    .get<{[key: string] : Present}>("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json")
   .pipe(
      map ( (data): Present[]=> {
        let presents = [];
        for (let x in data) {
          presents.push({...data[x], id:x });
        }
        return presents;
      }),
      tap ( (data) => {
        this.presents = data;
      })
      // delay(1000)
    )
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
