import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  trendingScrollOffset = signal(0);

  //   pagesScrollState: Record<string, number> = {
  //     'page1': 0,
  //     'page2': 0,
  //     'page3': 0,
  //   };
  constructor() {}
}
