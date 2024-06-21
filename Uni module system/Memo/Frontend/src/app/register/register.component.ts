import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  rememberMe: boolean = false;



  constructor(private authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
    this.rememberMe = true;
  }

  register() {
    const email = this.email;
    const password = this.password;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);


    this.authService.register(email, hashedPassword).subscribe(
      response => {
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
        }
      }
    );
  }

}
