import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Gifs populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      route: '/dashboard/search',
    },
  ];

  gifService = inject(GifService);
  // historyOptions = computed<MenuOption[]>(() => {
  //   let history: MenuOption[] = [];
  //   this.gifService.searchHistoryKeys().forEach((element) => {
  //     history = [
  //       ...history,
  //       {
  //         icon: '',
  //         label: element,
  //         sublabel: '',
  //         route: '',
  //       },
  //     ];
  //   });
  //   return history;
  // });
}
