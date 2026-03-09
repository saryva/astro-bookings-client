import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { LaunchListComponent } from './launch-list';
import { LaunchesService } from '../launches.service';
import { Launch } from '../../../core/models/launch.interface';

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

function createMockService() {
  return {
    launches: signal<Launch[]>([]),
    loading: signal(false),
    error: signal<string | null>(null),
    getAll: vi.fn(),
  };
}

describe('LaunchListComponent', () => {
  let fixture: ComponentFixture<LaunchListComponent>;
  let compiled: HTMLElement;
  let mockService: ReturnType<typeof createMockService>;

  beforeEach(async () => {
    mockService = createMockService();

    await TestBed.configureTestingModule({
      imports: [LaunchListComponent],
      providers: [
        provideRouter([]),
        { provide: LaunchesService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchListComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be standalone', () => {
    const metadata = (LaunchListComponent as any).ɵcmp;
    expect(metadata.standalone).toBe(true);
  });

  it('should use OnPush change detection', () => {
    const metadata = (LaunchListComponent as any).ɵcmp;
    expect(metadata.onPush).toBe(true);
  });

  it('should call service.getAll() on init', () => {
    fixture.detectChanges();
    expect(mockService.getAll).toHaveBeenCalledTimes(1);
  });

  describe('loading state', () => {
    it('should display app-loading when loading is true', () => {
      mockService.loading.set(true);
      fixture.detectChanges();
      expect(compiled.querySelector('app-loading')).toBeTruthy();
    });

    it('should not display launch cards when loading', () => {
      mockService.loading.set(true);
      fixture.detectChanges();
      expect(compiled.querySelector('.launch-card')).toBeNull();
    });
  });

  describe('error state', () => {
    it('should display app-error-message when error is set', () => {
      mockService.error.set('Network error');
      fixture.detectChanges();
      expect(compiled.querySelector('app-error-message')).toBeTruthy();
    });

    it('should not display loading or launch cards on error', () => {
      mockService.error.set('Network error');
      fixture.detectChanges();
      expect(compiled.querySelector('app-loading')).toBeNull();
      expect(compiled.querySelector('.launch-card')).toBeNull();
    });
  });

  describe('empty state', () => {
    it('should display app-empty-state when launches is empty and not loading', () => {
      mockService.launches.set([]);
      mockService.loading.set(false);
      mockService.error.set(null);
      fixture.detectChanges();
      expect(compiled.querySelector('app-empty-state')).toBeTruthy();
    });
  });

  describe('data state', () => {
    beforeEach(() => {
      mockService.launches.set(MOCK_LAUNCHES);
      mockService.loading.set(false);
      mockService.error.set(null);
      fixture.detectChanges();
    });

    it('should display launch cards', () => {
      const cards = compiled.querySelectorAll('.launch-card');
      expect(cards).toHaveLength(2);
    });

    it('should display launch destination', () => {
      const destination = compiled.querySelector('.launch-card__destination');
      expect(destination?.textContent).toContain('Mars');
    });

    it('should display launch date', () => {
      const date = compiled.querySelector('.launch-card__date');
      expect(date?.textContent?.trim()).toBeTruthy();
    });

    it('should display rocket name', () => {
      const rocket = compiled.querySelector('.launch-card__rocket');
      expect(rocket?.textContent).toContain('Falcon Heavy');
    });

    it('should display price per seat', () => {
      const price = compiled.querySelector('.launch-card__price');
      expect(price?.textContent).toContain('5,000');
    });

    it('should display available / total seats', () => {
      const seats = compiled.querySelector('.launch-card__seats');
      expect(seats?.textContent).toContain('42');
      expect(seats?.textContent).toContain('100');
    });

    it('should have routerLink to launch detail', () => {
      const link = compiled.querySelector('.launch-card');
      expect(link?.getAttribute('href')).toBe('/launches/l1');
    });

    it('should apply sold-out class when availableSeats is 0', () => {
      const cards = compiled.querySelectorAll('.launch-card__seats');
      const soldOutCard = cards[1];
      expect(soldOutCard?.classList.contains('launch-card__seats--sold-out')).toBe(true);
    });

    it('should not apply sold-out class when seats are available', () => {
      const seats = compiled.querySelector('.launch-card__seats');
      expect(seats?.classList.contains('launch-card__seats--sold-out')).toBe(false);
    });

    it('should not show loading, error, or empty components', () => {
      expect(compiled.querySelector('app-loading')).toBeNull();
      expect(compiled.querySelector('app-error-message')).toBeNull();
      expect(compiled.querySelector('app-empty-state')).toBeNull();
    });
  });
});
