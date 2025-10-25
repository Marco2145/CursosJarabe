import { Component, input, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonBackButton, IonTitle],
})
export class HeaderComponent implements OnInit {
  titleInput = input<string>('');

  constructor() {}

  ngOnInit() {}
}
