import { routes } from './app.routes';

describe('App Routes', () => {
  it('should have routes defined', () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should redirect root path to /launches', () => {
    const rootRoute = routes.find((r) => r.path === '');
    expect(rootRoute).toBeTruthy();
    expect(rootRoute?.redirectTo).toBe('launches');
    expect(rootRoute?.pathMatch).toBe('full');
  });

  it('should have a lazy-loaded launches route', () => {
    const launchesRoute = routes.find((r) => r.path === 'launches');
    expect(launchesRoute).toBeTruthy();
    expect(launchesRoute?.loadChildren).toBeDefined();
  });

  it('should have a lazy-loaded bookings route', () => {
    const bookingsRoute = routes.find((r) => r.path === 'bookings');
    expect(bookingsRoute).toBeTruthy();
    expect(bookingsRoute?.loadChildren).toBeDefined();
  });
});
