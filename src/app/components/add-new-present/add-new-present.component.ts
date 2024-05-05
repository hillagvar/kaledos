import { Component } from '@angular/core';
import { PresentsService } from '../../services/presents.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-add-new-present',
  standalone: true,
  imports: [FormsModule, LoadingComponent, CommonModule, ErrorComponent],
  templateUrl: './add-new-present.component.html',
  styleUrl: './add-new-present.component.css'
})
export class AddNewPresentComponent {
  public recipient: string | null = null;
  public description: string | null = null;
  public status: string | null = null;

  public isLoading = false;
  public isError = false;

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
      }).subscribe({
        next: ()=> {
        this.recipient = null;
        this.description = null;
        this.status = null;
        this.isLoading = false;
        },
        error: () => {
        this.isError = true;
        this.isLoading = false;
        }
      });
    }
  }
}
