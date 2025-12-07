import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent,
  IonToolbar,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
} from '@ionic/angular/standalone';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonRow,
    IonItem,
    IonGrid,
    IonCol,
    IonContent,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  // https://stackoverflow.com/questions/77363731/ionic-7-swiper-11-how-to-set-the-parameter-in-typescript
  @ViewChild('mainSlide') swiperRef!: ElementRef<SwiperContainer>;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true,
    },
    {
      img: 'av-2.png',
      seleccionado: false,
    },
    {
      img: 'av-3.png',
      seleccionado: false,
    },
    {
      img: 'av-4.png',
      seleccionado: false,
    },
    {
      img: 'av-5.png',
      seleccionado: false,
    },
    {
      img: 'av-6.png',
      seleccionado: false,
    },
    {
      img: 'av-7.png',
      seleccionado: false,
    },
    {
      img: 'av-8.png',
      seleccionado: false,
    },
  ];

  // Form
  selectAvatar(avatar: { img: string; seleccionado: boolean }) {
    this.avatars.forEach((avatar) => (avatar.seleccionado = false));

    avatar.seleccionado = true;
  }

  login(loginForm: NgForm) {
    console.log(loginForm.valid);
  }

  register(registerForm: NgForm) {
    console.log(registerForm.valid);
  }

  // Buttons
  showRegister() {
    this.swiperRef.nativeElement.swiper.allowSlideNext = true;
    this.swiperRef.nativeElement.swiper.slideTo(1);
    this.swiperRef.nativeElement.swiper.allowSlideNext = false;
  }
  showLogin() {
    this.swiperRef.nativeElement.swiper.allowSlidePrev = true;
    this.swiperRef.nativeElement.swiper.slideTo(0);
    this.swiperRef.nativeElement.swiper.allowSlidePrev = false;
  }
  ngOnInit() {}
}
