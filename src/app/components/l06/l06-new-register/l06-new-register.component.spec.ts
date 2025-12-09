import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L06NewRegisterComponent } from './l06-new-register.component';

describe('L06NewRegisterComponent', () => {
  let component: L06NewRegisterComponent;
  let fixture: ComponentFixture<L06NewRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L06NewRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L06NewRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
