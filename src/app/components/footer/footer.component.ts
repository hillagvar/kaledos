import { Component } from '@angular/core';
import { PresentsService } from '../../services/presents.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  public count : number = 0;

  public isError = false;
  public isLoggedIn = false;

  constructor(private presentsService: PresentsService, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
    this.loadCount();
    }
    this.presentsService.onPresentCountChange.subscribe(() => {
      this.loadCount();
    });

    this.authService.onUserStatusChange.subscribe( (isLoggedIn)=>{
      this.isLoggedIn=isLoggedIn;
      if (isLoggedIn==true) this.loadCount();
    }); 
  }

  private loadCount() {
    this.presentsService.loadData("all").subscribe((data) => {
      this.count = data.length;
    });
  }
}
