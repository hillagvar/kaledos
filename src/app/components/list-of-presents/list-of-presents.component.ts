import { Component } from '@angular/core';
import { PresentsService } from '../../services/presents.service';
import { Present } from '../../models/present';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-of-presents',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list-of-presents.component.html',
  styleUrl: './list-of-presents.component.css'
})
export class ListOfPresentsComponent {

  public presents: Present[] = [];
  
  public constructor(private presentsService: PresentsService){

    this.loadData();
  }

  private loadData() {

    this.presentsService.loadData().subscribe((data)=>{
      this.presents = [];
      for (let x in data){
        this.presents.push({...data[x], id:x });
      }
      console.log(this.presents);
    });
  }


  public deleteRecord(id: string | null){
    if (id != null){
      this.presentsService.deleteRecord(id).subscribe(()=>{
        this.loadData();
      });
    }
  }
}

   



