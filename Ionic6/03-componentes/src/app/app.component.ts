import { Component, inject, OnInit } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonButtons,
  IonMenuButton,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonMenu,
  IonItem,
  IonIcon,
  IonRouterLink,
  MenuController,
  IonToggle,
  IonMenuToggle,
  IonList,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { DataService } from './services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MyComponent } from './interfaces/interfaces';
import { RouterLink } from '@angular/router';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonSplitPane,
    IonIcon,
    IonItem,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    RouterLink,
    IonMenuToggle,
    IonContent,
  ],
})
export class AppComponent {
  // menuController = inject(MenuController);
  dataService = inject(DataService);

  components = toSignal<MyComponent[]>(this.dataService.getMenuOptions());

  constructor() {
    // Para que ionicons funcione, debemos importarlos primero
    // Ya que no sé de antemano cuales necesitamos, los importo todos
    addIcons(allIcons);
  }

  // onClickMenuItem() {
  //   this.menuController.close();
  // }
}
