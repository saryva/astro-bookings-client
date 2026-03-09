import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../shared/components/loading/loading';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { LaunchesService } from '../launches.service';

@Component({
  selector: 'app-launch-list',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe, LoadingComponent, ErrorMessageComponent, EmptyStateComponent],
  templateUrl: './launch-list.html',
  styleUrl: './launch-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchListComponent implements OnInit {
  protected readonly service = inject(LaunchesService);

  ngOnInit(): void {
    this.service.getAll();
  }
}
