import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    console.log('ngOnInit --->>');
    this.userSubscription = this.authService.user.subscribe(
      user => {
        console.log('isAuthenticated --->>', user);
        this.isAuthenticated = !!user;
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}