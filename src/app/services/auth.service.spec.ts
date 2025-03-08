import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth, getAuth, onAuthStateChanged, provideAuth } from '@angular/fire/auth';

// Mocks de Firebase Auth
const mockAuth = {
  currentUser: null,
  signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({ user: { email: 'test@example.com' } })),
  createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({ user: { email: 'test@example.com' } })),
  signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
  signInWithPopup: jasmine.createSpy('signInWithPopup').and.returnValue(Promise.resolve({ user: { email: 'test@example.com' } }))
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideAuth(() => getAuth()), // Configura Firebase Authentication
      ],
      providers: [
        AuthService,
        { provide: Auth, useValue: mockAuth } // Mockeamos Auth
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar sesión con email y password', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = await service.login(email, password);
    expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    expect(user.user.email).toBe(email);
  });

  it('debería registrar un nuevo usuario', async () => {
    const email = 'newuser@example.com';
    const password = 'password123';
    const user = await service.register(email, password);
    expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    expect(user.user.email).toBe(email);
  });

  it('debería cerrar sesión', async () => {
    await service.logout();
    expect(mockAuth.signOut).toHaveBeenCalled();
  });

  it('debería verificar si el usuario está autenticado', (done) => {
    service.isAuthenticated$().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });
});
