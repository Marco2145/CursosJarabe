import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  LoadingController,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, HeaderComponent],
})
export class LoadingPage {
  private loadingController = inject(LoadingController);
  private loading: HTMLIonLoadingElement | undefined;

  onClick() {
    this.showLoading();

    setTimeout(() => {
      this.loading?.dismiss();
    }, 2000);
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
    });

    this.loading.present();
  }
}
