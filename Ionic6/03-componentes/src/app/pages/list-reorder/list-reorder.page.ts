import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonList,
  IonItem,
  IonReorderGroup,
  ItemReorderEventDetail,
  IonReorder,
  IonIcon,
} from '@ionic/angular/standalone';
import { IonReorderGroupCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonReorderGroup,
    IonItem,
    IonList,
    IonLabel,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonReorder,
    IonButton,
  ],
})
export class ListReorderPage {
  personajes: string[] = ['1', '2', '3', '4', '5'];
  isDisabled = signal(false);
  // isDisabled = false;

  doReorder(event: IonReorderGroupCustomEvent<ItemReorderEventDetail>) {
    // console.log('from', this.personajes);
    // const { from, to } = event.detail;

    // const itemMover = this.personajes.splice(from, 1)[0];
    // this.personajes.splice(to, 0, itemMover);
    // console.log({ from, to }, this.personajes);

    event.detail.complete(this.personajes);
    console.log(this.personajes);
  }

  toggleEnabled() {
    this.isDisabled.update((value) => !value);
    // this.isDisabled = !this.isDisabled;
  }

  print() {
    console.log(this.personajes);
  }
}
