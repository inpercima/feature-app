import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { PostService } from 'src/app/features/post/post.service';

@Component({
  selector: 'fa-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  hide = true;

  wrongLogin = false;

  message!: string;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private postService: PostService) { }

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe(response => {
      if (response) {
        this.postService.delete().subscribe();
      }
    }, error => {
      this.wrongLogin = true;
      this.message = error.error.message;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
