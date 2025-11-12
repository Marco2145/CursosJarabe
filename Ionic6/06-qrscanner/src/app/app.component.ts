import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

import { StatusBar, Style } from '@capacitor/status-bar';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';

const setBackgroundColorDark = async () => {
  await EdgeToEdge.setBackgroundColor({ color: '#1f1f1f' });
  await StatusBar.setStyle({ style: Style.Dark });
};

const setBackgroundColorLight = async () => {
  await EdgeToEdge.setBackgroundColor({ color: '#ffffff' });
  await StatusBar.setStyle({ style: Style.Light });
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {
    addIcons(allIcons);
    setBackgroundColorDark();
  }

  ngOnInit(): void {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    prefersDark.matches ? setBackgroundColorDark() : setBackgroundColorLight();

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) =>
      prefersDark.matches ? setBackgroundColorDark() : setBackgroundColorLight()
    );
  }
}
