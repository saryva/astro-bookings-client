import { API_URL } from './api.config';

describe('API_URL', () => {
  it('should be a non-empty string', () => {
    expect(API_URL).toBeTruthy();
    expect(typeof API_URL).toBe('string');
  });

  it('should not have a trailing slash', () => {
    expect(API_URL.endsWith('/')).toBe(false);
  });

  it('should match the development environment apiUrl', () => {
    expect(API_URL).toBe('http://localhost:3000/api');
  });
});
