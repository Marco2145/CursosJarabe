import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSpinner,
  IonToggle,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonCard,
    IonIcon,
    IonCol,
    IonRow,
    IonToggle,
    IonSpinner,
    IonTextarea,
    IonLabel,
    IonItem,
    IonList,
    IonButtons,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class Tab2Page {
  createPost() {
    throw new Error('Method not implemented.');
  }
}
