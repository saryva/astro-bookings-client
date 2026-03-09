import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LaunchesService } from './launches.service';
import { API_URL } from '../../core/api.config';
import { Launch } from '../../core/models/launch.interface';

const MOCK_LAUNCHES: Launch[] = [
  {
    id: 'l1',
    agencyId: 'a1',
    rocketId: 'r1',
    date: '2026-06-15T10:00:00Z',
    mission: 'Mars Express',
    destination: 'Mars',
    pricePerSeat: 5000,
    totalSeats: 100,
    availableSeats: 42,
    status: 'scheduled',
    rocket: { id: 'r1', name: 'Falcon Heavy', capacity: 100, range: 'interplanetary' },
  },
  {
    id: 'l2',
    agencyId: 'a1',
    rocketId: 'r2',
    date: '2026-07-20T14:00:00Z',
    mission: 'Lunar Gateway',
    destination: 'Moon',
    pricePerSeat: 2000,
    totalSeats: 50,
    availableSeats: 0,
    status: 'scheduled',
    rocket: { id: 'r2', name: 'Starship', capacity: 50, range: 'lunar' },
  },
];

describe('LaunchesService', () => {
  let service: LaunchesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LaunchesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have empty launches array', () => {
      expect(service.launches()).toEqual([]);
    });

    it('should have loading as false', () => {
      expect(service.loading()).toBe(false);
    });

    it('should have error as null', () => {
      expect(service.error()).toBeNull();
    });
  });

  describe('getAll', () => {
    describe('happy path', () => {
      it('should set loading to true when called', () => {
        service.getAll();
        expect(service.loading()).toBe(true);
        httpMock.expectOne(`${API_URL}/launches`).flush([]);
      });

      it('should clear any previous error when called', () => {
        // Simulate a prior error
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).error(new ProgressEvent('error'));
        expect(service.error()).toBeTruthy();

        // Call again
        service.getAll();
        expect(service.error()).toBeNull();
        httpMock.expectOne(`${API_URL}/launches`).flush([]);
      });

      it('should make a GET request to the launches endpoint', () => {
        service.getAll();
        const req = httpMock.expectOne(`${API_URL}/launches`);
        expect(req.request.method).toBe('GET');
        req.flush([]);
      });

      it('should set launches with the response data', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush(MOCK_LAUNCHES);
        expect(service.launches()).toEqual(MOCK_LAUNCHES);
      });

      it('should set loading to false after success', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush(MOCK_LAUNCHES);
        expect(service.loading()).toBe(false);
      });

      it('should keep error as null after success', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush(MOCK_LAUNCHES);
        expect(service.error()).toBeNull();
      });
    });

    describe('empty response', () => {
      it('should set launches to empty array', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush([]);
        expect(service.launches()).toEqual([]);
      });

      it('should set loading to false', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush([]);
        expect(service.loading()).toBe(false);
      });
    });

    describe('error path', () => {
      it('should set error with the error message', () => {
        service.getAll();
        httpMock
          .expectOne(`${API_URL}/launches`)
          .error(new ProgressEvent('error'), { status: 500, statusText: 'Internal Server Error' });
        expect(service.error()).toBeTruthy();
      });

      it('should set launches to empty array on error', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).error(new ProgressEvent('error'));
        expect(service.launches()).toEqual([]);
      });

      it('should set loading to false on error', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).error(new ProgressEvent('error'));
        expect(service.loading()).toBe(false);
      });

      it('should use fallback message when error has no message', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).error(new ProgressEvent('error'));
        expect(service.error()).toBeTruthy();
        expect(typeof service.error()).toBe('string');
      });
    });

    describe('edge cases', () => {
      it('should handle launches with zero available seats', () => {
        const soldOutLaunch = [{ ...MOCK_LAUNCHES[1], availableSeats: 0 }];
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush(soldOutLaunch);
        expect(service.launches()[0].availableSeats).toBe(0);
      });

      it('should replace previous data on subsequent calls', () => {
        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush(MOCK_LAUNCHES);
        expect(service.launches()).toHaveLength(2);

        service.getAll();
        httpMock.expectOne(`${API_URL}/launches`).flush([MOCK_LAUNCHES[0]]);
        expect(service.launches()).toHaveLength(1);
      });
    });
  });
});
