import { Component, OnInit } from '@angular/core';
import { IonLabel, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel],
})
export class PopoverInfoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
