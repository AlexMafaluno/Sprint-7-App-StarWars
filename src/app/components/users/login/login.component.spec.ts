import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

const authServiceMock = {
  login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
  logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve()),
  loginWithGoogle: jasmine.createSpy('loginWithGoogle').and.returnValue(Promise.resolve()),
};


const routerMock = {
  navigate: jasmine.createSpy('navigate'),
};


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario con campos vacíos', () => {
    expect(component.formLogin.value).toEqual({ mail: '', password: '' });
  });

  it('Debe marcar el formulario como inválido si los campos están vacíos', () => {
    expect(component.formLogin.invalid).toBeTrue();
  });

  it('Debe llamar a AuthService.login y redirigir a /ships al hacer login con email y password', async () => {
    component.formLogin.controls['mail'].setValue('test@example.com');
    component.formLogin.controls['password'].setValue('123456');

    await component.loginEmailPassword();

    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/ships']);
  });

});
