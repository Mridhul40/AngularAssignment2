import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
    }

  ngOnInit() {
    Object.assign(this.user, this.authService.getCurrentUser());

    this.settingsForm.patchValue(this.user);
  }

  submitForm() {
    this.isSubmitting = true;

    this.updateUser(this.settingsForm.value)

    this.authService.update(this.settingsForm.value).subscribe(updateUser => this.router.navigateByUrl('/profile/'+updateUser.username),
                                                err => {
                                                  this.errors = err;
                                                  this.isSubmitting = false;
                                                });
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
