import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonRouterLink,
  IonList,
  IonItem,
  IonIcon,
  IonButtons,
  IonMenuButton,
  MenuController,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MyComponent } from 'src/app/interfaces/interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonRouterLink,
    RouterLink,
    IonList,
    IonItem,
    IonIcon,
    IonMenuButton,
  ],
})
export class InicioPage implements OnInit {
  menuController = inject(MenuController);
  dataService = inject(DataService);

  components = toSignal<MyComponent[]>(this.dataService.getMenuOptions());

  constructor() {}

  ngOnInit() {}
}
