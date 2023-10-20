// left-menu.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  menuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Appointments', link: '/appointments' },
    { label: 'Profile', link: '/profile' },
  ];
}
