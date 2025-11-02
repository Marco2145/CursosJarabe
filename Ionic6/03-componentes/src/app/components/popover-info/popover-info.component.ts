import { Component, inject, OnInit } from '@angular/core';
import {
  IonLabel,
  IonItem,
  IonList,
  PopoverController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel],
})
export class PopoverInfoComponent {
  popoverCtrl = inject(PopoverController);

  items = Array(6);

  onClick(index: number) {
    console.log(index);

    this.popoverCtrl.dismiss(
      {
        item: index,
      },
      'success'
    );
  }
}
