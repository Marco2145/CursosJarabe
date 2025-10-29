import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonListHeader,
  IonButton,
  IonItem,
  IonInput,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
    IonItem,
    IonListHeader,
    IonList,
    IonLabel,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    IonButton,
    JsonPipe,
    IonCardSubtitle,
  ],
})
export class InputPage {
  fb = inject(FormBuilder);

  nombre: string = '';
  // prettier-ignore
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

  myForm = this.fb.group({
    email: ['', [Validators.required, , Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    console.log(this.myForm.valid, this.myForm.value);
  }
}
