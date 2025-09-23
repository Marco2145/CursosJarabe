import { Component } from '@angular/core';
import { SideMenuHeaderComponent as SideMenuHeaderComponent } from './side-menu-header/side-menu-header.component';
import { SideMenuOptionsComponent as SideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {}
