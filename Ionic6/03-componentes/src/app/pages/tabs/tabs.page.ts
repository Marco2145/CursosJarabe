import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTab,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabButton,
    IonTabBar,
    IonContent,
    CommonModule,
    FormsModule,
    IonIcon,
    IonLabel,
  ],
})
export class TabsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
