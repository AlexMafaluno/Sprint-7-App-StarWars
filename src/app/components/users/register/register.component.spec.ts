import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';



const authServiceMock = {
  register: jasmine.createSpy('register').and.returnValue(Promise.resolve()),
};

const routerMock = {
  navigate: jasmine.createSpy('navigate'),
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.formReg.value).toEqual({ mail: '', password: '' });
  });

  it('should mark the form as invalid if the fields are empty', () => {
    expect(component.formReg.invalid).toBeTrue();
  });

  it('should mark the form as valid if the data is correct', () => {
    component.formReg.controls['mail'].setValue('test@example.com');
    component.formReg.controls['password'].setValue('123456');
    expect(component.formReg.valid).toBeTrue();
  });
});


