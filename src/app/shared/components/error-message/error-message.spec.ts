import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message';

describe('ErrorMessageComponent', () => {
  let fixture: ComponentFixture<ErrorMessageComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    fixture.componentRef.setInput('message', 'Something went wrong');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be standalone', () => {
    const metadata = (ErrorMessageComponent as any).ɵcmp;
    expect(metadata.standalone).toBe(true);
  });

  it('should use OnPush change detection', () => {
    const metadata = (ErrorMessageComponent as any).ɵcmp;
    expect(metadata.onPush).toBe(true);
  });

  it('should display the provided error message', () => {
    const text = compiled.querySelector('.error-message__text');
    expect(text?.textContent).toContain('Something went wrong');
  });

  it('should update when the message input changes', () => {
    fixture.componentRef.setInput('message', 'Network error');
    fixture.detectChanges();
    const text = compiled.querySelector('.error-message__text');
    expect(text?.textContent).toContain('Network error');
  });

  it('should have role="alert" for accessibility', () => {
    const container = compiled.querySelector('.error-message');
    expect(container?.getAttribute('role')).toBe('alert');
  });

  it('should handle long error messages without breaking', () => {
    const longMessage = 'Error: '.repeat(100) + 'Something terrible happened.';
    fixture.componentRef.setInput('message', longMessage);
    fixture.detectChanges();
    const text = compiled.querySelector('.error-message__text');
    expect(text?.textContent).toContain('Something terrible happened.');
  });
});
