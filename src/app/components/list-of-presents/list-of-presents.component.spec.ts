import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPresentsComponent } from './list-of-presents.component';

describe('ListOfPresentsComponent', () => {
  let component: ListOfPresentsComponent;
  let fixture: ComponentFixture<ListOfPresentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfPresentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfPresentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
