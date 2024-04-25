import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPresentComponent } from './add-new-present.component';

describe('AddNewPresentComponent', () => {
  let component: AddNewPresentComponent;
  let fixture: ComponentFixture<AddNewPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPresentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
