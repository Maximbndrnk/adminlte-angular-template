import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgForOf } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-create-user',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './create-user.component.html',
  standalone: true,
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  users: any[] = [];
  form: FormGroup;
  services = ['Consulting', 'Support', 'Development'];
  languages = ['English', 'Spanish', 'French', 'German'];
  validateTypes = ['Basic', 'Advanced', 'Premium'];

  constructor(
    private userService: UserService,
              private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['Max', Validators.required],
      phone: ['123', Validators.required],
      email: ['max@gmail.com', [Validators.required, Validators.email]],
      holding: ['holding'],
      language: [this.languages[0], Validators.required],
      validateType: [this.validateTypes[0], Validators.required],
      blockUser: [false],
      // Dynamically create controls for services
      ...this.services.reduce((acc, service) => {
        // @ts-ignore
        acc[`services_${service}`] = [false];
        return acc;
      }, {}),
    });
  }
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((result: any) => {
      this.users = result.data.users;
      console.log(this);
    });
  }


  submitForm() {
    if (this.form.valid) {
      const fv = { ...this.form.getRawValue() };
      console.log('Form Submitted:', fv);
      this.userService
        .createUser(fv.name, fv.email, 'fv.password')
        .subscribe(() => {
          this.loadUsers();
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
