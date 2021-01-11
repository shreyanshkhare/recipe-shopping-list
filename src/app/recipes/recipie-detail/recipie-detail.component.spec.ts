import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieDetailComponent } from './recipie-detail.component';

describe('RecipieDetailComponent', () => {
  let component: RecipieDetailComponent;
  let fixture: ComponentFixture<RecipieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipieDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
