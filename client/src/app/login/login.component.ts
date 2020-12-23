import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { PostService } from '../features/post/post.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'fa-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  hide = true;

  wrongLogin = false;

  message!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(() => {
      if (this.isAuthenticated()) {
        this.postService.save().subscribe(() => {
          this.postService.delete();
        });
        this.wrongLogin = false;
        this.message = '';
        // get the redirect URL from auth service
        // if no redirect has been set, use default
        this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : environment.defaultRoute]);
      }
    }, error => {
      this.wrongLogin = true;
      this.message = error.error.message;
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
