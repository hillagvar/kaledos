import { Component } from '@angular/core';
import { PresentsService } from '../../services/presents.service';
import { Present } from '../../models/present';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-of-presents',
  standalone: true,
  imports: [CommonModule,RouterLink, LoadingComponent, ErrorComponent],
  templateUrl: './list-of-presents.component.html',
  styleUrl: './list-of-presents.component.css'
})
export class ListOfPresentsComponent {

  public presents: Present[] = [];

  public filter: string = "all";

  public isLoading = false;
  public isError = false;

  public constructor(private presentsService: PresentsService, private authService: AuthService) {
    this.loadData("all");
    // this.authService.register("hilla.gvar@ghmail.com", "helloworld", true);
  }

  public loadData(status: string) {

    let obs = this.presentsService.loadData(status);

    this.filter = status;

    /*
     //kai turime tik viena f-ja, kuria norima, kad iskviestu po duomenu gavimo
     obs.subscribe( (data) => {
      console.log("duomenys gauti paprastai");
     });

     obs.subscribe({
      next: (data) => {
        console.log("duomenys gauti is next");   
      },
      error: (err) => {
        console.log("ivyko klaida");
      },
      complete: () => {
        console.log("obs baige darba");
      }
     });
    */

    this.isLoading = true;
    this.isError = false;

    obs.subscribe({
      next: (data) => {  
        this.presents = data;       
        this.isLoading = false;
        this.isError = false;
      },
      error: (err) => {
        this.isError = true;
        this.isLoading = false;
      }
    });
  }
      
    
  public deleteRecord(id: string | null) {
    if (id != null){
      this.isLoading = true;
      this.presentsService.deleteRecord(id).subscribe(()=>{
        
        this.loadData(this.filter);
      });
    }
  }

  public closeError() {
    this.loadData(this.filter);

  }

  // public loadData(status : string) {
  //   this.presentsService.loadData(status).subscribe((data) => {
  //     this.presents = data;
  //   })

  // }

}
   



