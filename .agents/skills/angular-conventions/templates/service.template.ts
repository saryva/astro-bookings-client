import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MyModel } from '../models/my.model';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  // --- State ---
  readonly items = signal<MyModel[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /**
   * Loads all items from the API.
   * Updates items, loading and error signals accordingly.
   */
  loadItems() {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<MyModel[]>(`${this.baseUrl}/items`).pipe(
      tap((items) => {
        this.items.set(items);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.error.set('Failed to load items. Please try again.');
        this.loading.set(false);
        return throwError(() => err);
      }),
    );
  }

  /**
   * Creates a new item via the API.
   * @param payload - Data for the new item
   */
  createItem(payload: Partial<MyModel>) {
    return this.http.post<MyModel>(`${this.baseUrl}/items`, payload).pipe(
      tap((newItem) => {
        this.items.update((current) => [...current, newItem]);
      }),
      catchError((err) => {
        this.error.set('Failed to create item. Please try again.');
        return throwError(() => err);
      }),
    );
  }

  /**
   * Deletes an item by ID.
   * @param id - Item identifier
   */
  deleteItem(id: string) {
    return this.http.delete(`${this.baseUrl}/items/${id}`).pipe(
      tap(() => {
        this.items.update((current) => current.filter((i) => i.id !== id));
      }),
      catchError((err) => {
        this.error.set('Failed to delete item. Please try again.');
        return throwError(() => err);
      }),
    );
  }
}
