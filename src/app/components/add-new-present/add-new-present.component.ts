import { Component } from '@angular/core';
import { PresentsService } from '../../services/presents.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-present',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new-present.component.html',
  styleUrl: './add-new-present.component.css'
})
export class AddNewPresentComponent {
  public recipient: string | null = null;
  public description: string | null = null;
  public status: string | null = null;

  public constructor(private presentsService: PresentsService) {

  }

  public addPresent() {
    if (this.recipient != null && this.description != null && this.status != null) {
    this.presentsService.addPresent({
      recipient: this.recipient,
      description: this.description,
      status: this.status
      }) 
    this.recipient = null;
    this.description = null;
    this.status = null;
    }
  }

}
