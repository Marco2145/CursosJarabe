import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { Router } from '@angular/router';

import { PostsDB } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';
import { Geolocation } from '@capacitor/geolocation';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

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
    IonLabel,
    IonItem,
    IonList,
    IonButtons,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTextarea,
    FormsModule,
  ],
})
export class Tab2Page {
  private postsService = inject(PostsService);
  private UiService = inject(UiService);
  private router = inject(Router);

  tempImagesWeb: String[] = [];

  post: PostsDB = {
    message: '',
    coords: undefined,
  };
  positionEnabled = false;
  isLoading = signal<boolean>(false);

  async createPost() {
    this.post.message = this.post.message?.trim();

    const didPost = await this.postsService.createPost(this.post);
    if (didPost) {
      // Clear fields
      this.post = {
        message: '',
        coords: undefined,
      };
      this.tempImagesWeb = [];
      this.UiService.presentToast('Post sent successfully');

      // reroute to main tab
      this.router.navigateByUrl('/main/tabs/tab1');
    } else {
      this.UiService.presentToast(
        'An error has occurred while publishing your post...'
      );
    }
  }

  async getGeo() {
    this.isLoading.set(false);

    if (!this.positionEnabled) {
      this.post.coords = undefined;
      return;
    }
    this.isLoading.set(true);

    const position = await Geolocation.getCurrentPosition();
    const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
    this.post.coords = coords;

    this.isLoading.set(false);
  }

  async onCameraBtn() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      correctOrientation: true,
      // source: CameraSource.Camera,
    });

    console.log(image.webPath);
    this.tempImagesWeb.unshift(image.webPath!);

    this.processImage(image);
    console.log(JSON.stringify(image));
  }

  async onGalleryBtn() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      correctOrientation: true,
      source: CameraSource.Photos,
    });

    console.log(image.webPath);
    this.tempImagesWeb.unshift(image.webPath!);

    this.processImage(image);
    console.log(JSON.stringify(image));
  }

  async processImage(img: Photo) {
    let successfull: boolean;
    if (Capacitor.isNativePlatform()) {
      successfull = await this.postsService.uploadImage(img.path!);
    } else {
      let blob = await fetch(img.webPath!).then((r) => r.blob());
      successfull = await this.postsService.uploadImage(img.webPath!, blob);
    }

    console.log('uploaded picture: ', successfull);
  }
}
