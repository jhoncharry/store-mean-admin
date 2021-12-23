import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css'],
})
export class CreateCuponComponent implements OnInit {
  submitted = false;

  load_btn = false;

  public registerForm = this.fb.group({
    codigo: ['Test', [Validators.required, Validators.minLength(3)]],
    tipo: [null, [Validators.required]],
    valor: ['', [Validators.required, Validators.minLength(1)]],
    limite: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cuponService: CuponService
  ) {}

  ngOnInit(): void {}

  //Add user form actions
  get getControl() {
    return this.registerForm.controls;
  }

  changeTipo($event: any) {
    this.getControl['tipo'].setValue($event.target.value);
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Datos del formulario no son validos',
      });
      return;
    }

    this.load_btn = true;
    console.log('DATAA', this.registerForm.value);
    this.cuponService.createCupon(this.registerForm.value).subscribe({
      next: (resp: any) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Cupon successfully registered',
        });

        this.load_btn = false;
        this.registerForm.reset();
        this.router.navigateByUrl('/panel/cupones');
      },
      error: (error) => {
        this.load_btn = false;
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
