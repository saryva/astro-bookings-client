import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { API_URL } from '../../core/api.config';
import { Launch } from '../../core/models/launch.interface';

@Injectable({ providedIn: 'root' })
export class LaunchesService {
  private readonly http = inject(HttpClient);

  /** Signal holding the list of launches */
  readonly launches = signal<Launch[]>([]);

  /** Signal indicating whether a request is in progress */
  readonly loading = signal(false);

  /** Signal holding the last error message, or null */
  readonly error = signal<string | null>(null);

  /** Fetches all available launches from the API */
  getAll(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http
      .get<Launch[]>(`${API_URL}/launches`)
      .pipe(
        catchError((err) => {
          this.error.set(err?.message || 'Failed to load launches');
          this.launches.set([]);
          this.loading.set(false);
          return EMPTY;
        }),
      )
      .subscribe((data) => {
        this.launches.set(data);
        this.loading.set(false);
      });
  }
}
