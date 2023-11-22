import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
  getTestBed,
  waitForAsync
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {HttpService} from "./services/http.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let injector: TestBed;
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [HttpService],
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(HttpService);
    httpMock = injector.get(HttpTestingController);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with proper controls', () => {
    expect(component.signUpForm.get('firstName')).toBeDefined();
    expect(component.signUpForm.get('lastName')).toBeDefined();
    expect(component.signUpForm.get('email')).toBeDefined();
    expect(component.signUpForm.get('password')).toBeDefined();
  });

  it('should set validators for password when form values change', fakeAsync(() => {
    component.signUpForm.setValue({ firstName: 'Thomas', lastName: 'password', email: 'test@shelby.com', password: 'password' });
    tick(); // Wait for valueChanges subscription

    const passwordControl = component.signUpForm.get('password');
    expect(passwordControl?.hasError('nameInPassword')).toBeTruthy();
  }));

  it('should call httpService.signUp POST request', fakeAsync(() => {
    const mockFormData = {
      firstName: 'test',
      lastName: 'user',
      email: 'testtest@hgfhg.com',
      password: 'Fdftgtyfdgbb'
    };

    service.signUp(mockFormData).subscribe(users => {
      expect(users.length).toBeDefined();
    });

    const req = httpMock.expectOne('https://demo-api.now.sh/users');
    expect(req.request.method).toBe('POST');
  }));
});
