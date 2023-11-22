import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to sign up a user', () => {
    const mockFormData = {
      firstName: 'test',
      lastName: 'user',
      email: 'testtest@hgfhg.com',
      password: 'Volodymyr'
    };

    service.signUp(mockFormData).subscribe(response => {
      expect(response).toBeDefined()
    });

    const req = httpMock.expectOne('https://demo-api.now.sh/users');

    expect(req.request.method).toEqual('POST');

    const mockResponse = {};
    req.flush(mockResponse);

    httpMock.verify();
  });
});
