import { Component } from '@angular/core';
import { PresentsService } from '../../services/presents.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-present',
  standalone: true,
  imports: [FormsModule, LoadingComponent, CommonModule],
  templateUrl: './add-new-present.component.html',
  styleUrl: './add-new-present.component.css'
})
export class AddNewPresentComponent {
  public recipient: string | null = null;
  public description: string | null = null;
  public status: string | null = null;

  public isLoading = false;

  public constructor(private presentsService: PresentsService) {

  }

  public addPresent() {
    if (this.recipient != null && this.description != null && this.status != null) {
    this.isLoading = true;
    this.presentsService.addPresent({
      recipient: this.recipient,
      description: this.description,
      status: this.status,
      id: null,
      }).subscribe(()=> {
        this.recipient = null;
        this.description = null;
        this.status = null;
        this.isLoading = false;
      });
    }
  }
}
