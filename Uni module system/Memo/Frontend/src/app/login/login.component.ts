import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  rememberMe: boolean = false;
  successMessage: string;
  email: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.username = '';
    this.password = '';
    this.rememberMe = true;
    this.successMessage = '';
    this.email = '';
  }


  onSubmit(): void {
    // Validate form inputs
    if (!this.username || !this.password) {
      // Display an error message to the user
      alert('Please enter a username and password.');
      return;
    }

    const username = this.username;
    const password = this.password;

    this.authService.login(username, password).subscribe(
      response => {
        // Handle the server's response
        if (response.success) {
          // Save user details to localStorage if rememberMe is checked
          if (this.rememberMe) {
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          // Set a flag in local storage indicating that the user is logged in
            localStorage.setItem('loggedIn', 'true');

          // Redirect the user to the product listing page
          this.router.navigate(['/products', 1]);

          alert('Login successful.');
        } else {
          // Display an error message to the user
          alert(response.message);
        }
      },
      error => {
        // Display an error message to the user
        alert('There was an error.');
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.successMessage = 'Registered successfully.';
      }
    });
  }
}
