import { NgClass } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol, IonRow, FormsModule, NgClass],
})
export class AvatarSelectorComponent {
  avatarSelected = output<string>();

  // Form Avatars
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

  selectAvatar(avatar: { img: string; seleccionado: boolean }) {
    this.avatars.forEach((avatar) => (avatar.seleccionado = false));
    avatar.seleccionado = true;
    console.log(avatar.img);

    this.avatarSelected.emit(avatar.img);
  }
}
