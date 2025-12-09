import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonIcon,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { AvatarSelectorComponent } from 'src/app/components/avatar-selector/avatar-selector.component';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonCol,
    IonRow,
    IonButton,
    IonIcon,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonContent,
    AvatarSelectorComponent,
    FormsModule,
  ],
})
export class Tab3Page implements OnInit {
  private userService = inject(UserService);
  private uiService = inject(UiService);

  user: User = {};

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  updateSelectedAvatar(event: string) {
    this.user.avatar = event;
  }

  logout() {
    throw new Error('Method not implemented.');
  }

  async updateUser(updateForm: NgForm) {
    if (updateForm.invalid) return;

    const didUpdate = await this.userService.updateUser(this.user);

    if (didUpdate) {
      this.uiService.presentToast('Usuario actualizado con exito');
    } else {
      this.uiService.presentToast('No se pudo actualizar al usuario');
    }
  }
}
