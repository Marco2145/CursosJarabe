import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { AsyncPipe, CommonModule, KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonButton,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonIcon,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DataService } from 'src/app/services/data.service';
import { Observable, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonButton,
    IonItem,
    IonList,
    IonLabel,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class ListPage {
  dataService = inject(DataService);

  users = toSignal<any>(
    this.dataService
      .getUsuarios()
      .pipe(tap((response) => console.log(response)))
  );

  usersObservable: Observable<any> = this.dataService.getUsuarios();

  onClick() {
    console.log(this.users());
  }
  favorite(user: any, myList?: IonList) {
    console.log('fav', user);
    if (myList) {
      myList!.closeSlidingItems();
    }
  }
  share(user: any, myList?: IonList) {
    console.log('share', user);
    if (myList) {
      myList!.closeSlidingItems();
    }
  }

  delete(user: any, myList?: IonList) {
    console.log('delete', user.name);
    if (myList) {
      myList!.closeSlidingItems();
    }
  }
}
