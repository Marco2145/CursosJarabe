import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
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
  IonInput,
  NavController,
} from '@ionic/angular/standalone';

import { SwiperContainer } from 'swiper/element';
import Swiper from 'swiper';

import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { User } from 'src/app/interfaces/interfaces';
import { AvatarSelectorComponent } from 'src/app/components/avatar-selector/avatar-selector.component';

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
    IonInput,
    AvatarSelectorComponent,
  ],
})
export class LoginPage implements OnInit {
  // https://stackoverflow.com/questions/77363731/ionic-7-swiper-11-how-to-set-the-parameter-in-typescript
  @ViewChild('mainSlide') swiperRef!: ElementRef<SwiperContainer>;

  navController = inject(NavController);
  userService = inject(UserService);
  uiService = inject(UiService);

  // Form Elements
  loginUser = {
    email: 'layla@gmail.com',
    password: '123456',
  };

  registerUser: User = {
    name: 'Test X',
    email: 'testX@test.com',
    password: '123456',
    avatar: 'av-1.png',
  };

  // Form Methods
  async login(loginForm: NgForm) {
    if (loginForm.invalid) return;

    const valid = await this.userService.login(
      this.loginUser.email,
      this.loginUser.password
    );

    if (valid) {
      // Navegar a pagina principal
      this.navController.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // Mostrar error de inicio de sesión
      this.uiService.presentInfoAlert('Credenciales Incorrectas');
    }

    console.log(loginForm.value);
  }

  async register(registerForm: NgForm) {
    if (registerForm.invalid) return;

    const valid = await this.userService.register(this.registerUser);

    if (valid) {
      // Navegar a pagina principal
      this.navController.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // Mostrar error de inicio de sesión
      this.uiService.presentInfoAlert('El correo electrónico ya está en uso');
    }
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
