import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonBackButton,
  SearchbarChangeEventDetail,
  IonLabel,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import {
  IonSearchbarCustomEvent,
  SearchbarInputEventDetail,
} from '@ionic/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FiltroPipe } from 'src/app/pipes/filtro-pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonList,
    IonLabel,
    IonBackButton,
    IonButtons,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    FiltroPipe,
  ],
})
export class SearchPage {
  dataService = inject(DataService);

  albumes = toSignal(this.dataService.getAlbumes());
  filterTerm = signal('');

  handleInput(e: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    // console.log(e);
    this.filterTerm.set(e.detail.value ?? '');
  }
}
