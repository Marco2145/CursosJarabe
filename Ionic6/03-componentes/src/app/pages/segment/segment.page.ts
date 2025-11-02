import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  SegmentChangeEventDetail,
  IonList,
  IonItem,
  IonButtons,
  IonBackButton,
  IonSkeletonText,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonSegmentCustomEvent } from '@ionic/core';
import { DataService } from '../../services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FiltroPipe } from 'src/app/pipes/filtro-pipe';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonBackButton,
    IonButtons,
    IonItem,
    IonList,
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonContent,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    FiltroPipe,
    IonThumbnail,
  ],
})
export class SegmentPage {
  dataService = inject(DataService);

  superHeroes = toSignal(this.dataService.getHeroes());
  filterTerm = signal<string>('');

  segmentChanged(e: IonSegmentCustomEvent<SegmentChangeEventDetail>) {
    // console.log(e);
    // if (e.detail.value == 'all') {
    //   this.filterTerm.set('');
    //   return;
    // }

    this.filterTerm.set((e.detail.value as string) ?? '');
  }
}
