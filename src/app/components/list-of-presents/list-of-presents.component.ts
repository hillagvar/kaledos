import { Component } from '@angular/core';
import { PresentsService } from '../../services/presents.service';
import { Present } from '../../models/present';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-presents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-of-presents.component.html',
  styleUrl: './list-of-presents.component.css'
})
export class ListOfPresentsComponent {

  public presents: Present[] = [];

  public constructor(private presentsService: PresentsService) {
    // this.presents = presentsService.presents;
    this.presentsService.loadData().subscribe((data) => {
      for (let x in data) {
        this.presents.push(data[x]);
        // console.log(data[x]);
      }

    });
  }

}
