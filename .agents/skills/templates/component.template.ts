import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {

  // --- Inputs (signal-based, Angular 17+) ---
  readonly item = input.required<MyModel>();
  readonly label = input<string>('Default label');

  // --- Outputs ---
  readonly selected = output<MyModel>();
  readonly cancelled = output<void>();

  // --- Injected services ---
  private readonly myService = inject(MyService);

  // --- Local state ---
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  // --- Computed ---
  protected readonly displayName = computed(() => this.item().name.toUpperCase());

  // --- Actions ---
  protected onSelect(): void {
    this.selected.emit(this.item());
  }

  protected onCancel(): void {
    this.cancelled.emit();
  }
}
