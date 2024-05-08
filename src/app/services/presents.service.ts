import { EventEmitter, Injectable } from '@angular/core';
import { Present } from '../models/present';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PresentsService {

  public presents: Present[] = [];

  public onPresentCountChange = new EventEmitter();

  // public onStatusChange=new EventEmitter<Number>();

  constructor(private http : HttpClient, private authService: AuthService) { }


  public addPresent(present : Present) {
    // this.presents.push(present);
    return this.http.post("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json", present)
      .pipe(tap(() => this.onPresentCountChange.emit())
    );
  }

  // public loadData() {

  //   //gauname observable

  //   return this.http
  //   .get<{[key: string] : Present}>("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json")
  //  .pipe(
  //     map ( (data): Present[]=> {
  //       let presents = [];
  //       for (let x in data) {
  //         presents.push({...data[x], id:x });
  //       }
  //       return presents;
  //     }),
  //     tap ( (data) => {
  //       this.presents = data;
  //     })
  //     // delay(1000)
  //   )
  // }

  public loadData(status: string) {

    //gauname observable

    return this.http
    .get<{[key: string] : Present}>("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents.json?auth="+this.authService.auth?.idToken)
   .pipe(
      map ( (data): Present[]=> {
        let presents = [];
        let filteredPresents : Present[] = [];
        for (let x in data) {
          presents.push({...data[x], id:x });
        }
        presents.forEach((present) => {
          if(present.status === status) {
            filteredPresents.push(present);
          
          }
        })
        
        if (status !== "all") {
          return filteredPresents;
        } else {
          return presents;
        }
      }),
      tap ( (data) => {
        this.presents = data;
        
      }),
      delay(400)
    )
  }



  public loadRecord(id: string) {
    return this.http.get<Present>("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents/"+id+".json?auth="+this.authService.auth?.idToken);
  }

  public updateRecord(item: Present) {
    return this.http.patch("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents/"+item.id+".json?auth="+this.authService.auth?.idToken, item);
  }

  public deleteRecord(id: string) {
    return this.http.delete("https://kaledos-d3222-default-rtdb.europe-west1.firebasedatabase.app/presents/"+id+".json?auth="+this.authService.auth?.idToken)
      .pipe(tap(() => this.onPresentCountChange.emit())
    );
  }

}
