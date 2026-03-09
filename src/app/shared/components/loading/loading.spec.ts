import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { LoadingComponent } from './loading';

describe('LoadingComponent', () => {
  let fixture: ComponentFixture<LoadingComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be standalone', () => {
    const metadata = (LoadingComponent as any).ɵcmp;
    expect(metadata.standalone).toBe(true);
  });

  it('should use OnPush change detection', () => {
    const metadata = (LoadingComponent as any).ɵcmp;
    expect(metadata.onPush).toBe(true);
  });

  it('should display a loading spinner element', () => {
    const spinner = compiled.querySelector('.loading__spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display "Loading..." text', () => {
    const text = compiled.querySelector('.loading__text');
    expect(text?.textContent).toContain('Loading...');
  });

  it('should have aria-hidden on the spinner', () => {
    const spinner = compiled.querySelector('.loading__spinner');
    expect(spinner?.getAttribute('aria-hidden')).toBe('true');
  });
});
