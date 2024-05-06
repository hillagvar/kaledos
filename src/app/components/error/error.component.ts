import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  @Input()
  message: string = "";

  @Output()
  close = new EventEmitter();

  public closeClick() {
    this.close.emit();
  }


}
