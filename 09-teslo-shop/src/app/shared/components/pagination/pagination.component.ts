import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPageInput = input(1);
  totalPagesInput = input(0);

  currentPage = linkedSignal(this.currentPageInput);

  getPagesList = computed(() => Array.from({ length: this.totalPagesInput() }, (_, i) => i + 1));
}
