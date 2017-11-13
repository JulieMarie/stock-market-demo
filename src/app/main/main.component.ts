import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Manage News',
      route: '/news',
      icon: 'people',
    },
  ];

  constructor(private _router: Router) {}

  logout(): void {
    this._router.navigate(['/login']);
  }
}
