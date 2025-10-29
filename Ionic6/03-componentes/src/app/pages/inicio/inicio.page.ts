import { Component, OnInit, signal } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

interface MyComponent {
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class InicioPage implements OnInit {
  components = signal<MyComponent[]>([
    {
      icon: 'american-football',
      name: 'Action Sheet',
      redirectTo: '/action-sheet',
    },
    {
      icon: 'alert-circle',
      name: 'Alert',
      redirectTo: '/alert',
    },
    {
      icon: 'beaker',
      name: 'Avatar',
      redirectTo: '/avatar',
    },
    {
      icon: 'radio-button-on',
      name: 'Button',
      redirectTo: '/button',
    },
    {
      icon: 'card',
      name: 'Cards',
      redirectTo: '/card',
    },
    {
      icon: 'checkmark-circle',
      name: 'CheckBox',
      redirectTo: '/check',
    },
    {
      icon: 'calendar',
      name: 'DateTime',
      redirectTo: '/date-time',
    },
    {
      icon: 'car',
      name: 'Fab',
      redirectTo: '/fab',
    },
    {
      icon: 'grid',
      name: 'Grid',
      redirectTo: '/grid',
    },
    {
      icon: 'infinite',
      name: 'Infinite scroll',
      redirectTo: '/infinite',
    },
    {
      icon: 'hammer',
      name: 'Input Forms',
      redirectTo: '/input',
    },
    {
      icon: 'list',
      name: 'List - Sliding',
      redirectTo: '/list',
    },
    {
      icon: 'reorder-three-outline',
      name: 'List reorder',
      redirectTo: '/list-reorder',
    },
  ]);

  constructor() {}

  ngOnInit() {}
}
