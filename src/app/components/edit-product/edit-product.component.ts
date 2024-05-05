import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentsService } from '../../services/presents.service';
import { FormsModule } from '@angular/forms';
import { Present } from '../../models/present';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, LoadingComponent, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  public id: string;
  public description: string | null = null;
  public recipient: string | null = null;
  public status: string | null = null;

  public isLoading = false;

  constructor(private route: ActivatedRoute, private router: Router, private presentsService: PresentsService) {
    //paimame aktyvaus kelio parametra id
   this.id = this.route.snapshot.params["id"];
   
  //  console.log(this.id);

   //uzkrauname viena irasa
   this.presentsService.loadRecord(this.id).subscribe((data) => {
  
    this.description = data.description;
    this.recipient = data.recipient;
    this.status = data.status;
   });
  }

  public updateRecord() {
    //patikriname ar laukeliuose ivesti duomenys
    if (this.description != null && this.recipient != null && this.status != null ) {
      //sukuriame is tu duomenu irasa
  const record: Present = {
      id: this.id,
      description: this.description,
      recipient: this.recipient,
      status: this.status,
    }
// iskvieciame presentsService metoda, kuris atnaujins irasa
    this.isLoading = true;
    this.presentsService.updateRecord(record).subscribe(() => {
    this.isLoading = false;
  // po issaugojimo vartotoja nukreipiame atgal i sarasa
        this.router.navigate(["list"]);
    });
  }
}
}


