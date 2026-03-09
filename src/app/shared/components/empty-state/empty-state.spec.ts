import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state';

describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<EmptyStateComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be standalone', () => {
    const metadata = (EmptyStateComponent as any).ɵcmp;
    expect(metadata.standalone).toBe(true);
  });

  it('should use OnPush change detection', () => {
    const metadata = (EmptyStateComponent as any).ɵcmp;
    expect(metadata.onPush).toBe(true);
  });

  it('should display the default message "No results found."', () => {
    const text = compiled.querySelector('.empty-state__text');
    expect(text?.textContent).toContain('No results found.');
  });

  it('should display a custom message when provided', () => {
    fixture.componentRef.setInput('message', 'No launches available.');
    fixture.detectChanges();
    const text = compiled.querySelector('.empty-state__text');
    expect(text?.textContent).toContain('No launches available.');
  });

  it('should update when the message input changes', () => {
    fixture.componentRef.setInput('message', 'No bookings yet.');
    fixture.detectChanges();
    const text = compiled.querySelector('.empty-state__text');
    expect(text?.textContent).toContain('No bookings yet.');
  });
});
