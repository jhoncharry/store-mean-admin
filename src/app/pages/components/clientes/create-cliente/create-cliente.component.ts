import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css'],
})
export class CreateClienteComponent implements OnInit {
  submitted = false;

  load_btn = false;

  public registerForm = this.fb.group({
    name: ['Test', [Validators.required, Validators.minLength(3)]],
    lastname: ['Serrato', [Validators.required, Validators.minLength(3)]],
    email: [
      'test1@gmail.com',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['123456', [Validators.required, Validators.minLength(3)]],
    phone: [''],
    birthday: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
      ],
    ],
    dni: [''],
    genre: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {}

  //Add user form actions
  get getControl() {
    return this.registerForm.controls;
  }

  changeGenre($event: any) {
    this.getControl['genre'].setValue($event.target.value);
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.load_btn = true;

    this.clientService.createClient(this.registerForm.value).subscribe({
      next: (resp: any) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'User successfully registered',
        });

        this.load_btn = false;
        this.registerForm.reset();
        this.router.navigateByUrl('/panel/clientes');
      },
      error: (error) => {
        console.log('error', error);
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: error.error.message,
        });
      },
    });

    /*     this.user.register(this.registerForm.value).subscribe(
      ({ data: { register }, errors }) => {
        if (register) {
          Swal.fire('Register', 'Successful register', 'success');
          this.router.navigateByUrl('/login');
          return;
        }
        Swal.fire('Register', errors[0].message, 'error');
      },
      () => {
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
      }
    ); */
  }
}
