import { NgClass } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  linkedSignal,
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
export class AvatarSelectorComponent implements OnInit {
  avatarSelected = output<string>();
  inputAvatar = input<string | undefined>('av-1.png');
  inputAvatarSanitized = linkedSignal(() => {
    const index = this.avatars.findIndex((v) => v.img === this.inputAvatar());

    if (index < 0) return 'av-1.png';

    return this.inputAvatar() as string;
  });

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

  ngOnInit(): void {
    this.selectAvatar({ img: this.inputAvatarSanitized(), seleccionado: true });

    // console.log(this.avatars);
  }

  selectAvatar(avatar: { img: string; seleccionado: boolean }) {
    this.avatars.forEach((oldAvatar) => {
      if (avatar.img != oldAvatar.img) oldAvatar.seleccionado = false;
      else oldAvatar.seleccionado = true;
    });

    this.avatarSelected.emit(avatar.img);
  }
}
