import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PostService } from '../../features/post/post.service';
import { AuthService } from '../auth.service';

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
        this.postService.save().subscribe(() => {
          this.postService.delete().subscribe();
        });
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
