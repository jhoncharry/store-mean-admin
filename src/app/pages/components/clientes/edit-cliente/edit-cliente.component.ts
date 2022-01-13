import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css'],
})
export class EditClienteComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;
  client: any;

  public updateForm = this.fb.group({
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
    private route: ActivatedRoute,
    private clienteService: ClientService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.clienteService.getClient(this.id).subscribe({
        next: (resp: any) => {
          this.client = resp.data;

          this.updateForm.setValue({
            name: this.client.name || '',
            lastname: this.client.lastname || '',
            email: this.client.email || '',
            phone: this.client.phone || '',
            birthday: this.client.birthday || '',
            dni: this.client.dni || '',
            genre: this.client.genre || null,
          });

          this.load_data = false;
          /* 
          this.updateForm.reset();
          this.router.navigateByUrl('/panel/clientes'); */
        },
        error: (error) => {
          this.load_data = false;
          console.log('error', error);
          /*         iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.message,
          }); */
        },
      });
    });
  }

  ngOnInit(): void {}

  //Add user form actions
  get getControl() {
    return this.updateForm.controls;
  }

  changeGenre($event: any) {
    this.getControl['genre'].setValue($event.target.value);
  }

  update() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    this.load_btn = true;

    this.clienteService
      .updateClient(this.client._id, this.updateForm.value)
      .subscribe({
        next: (resp: any) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'User successfully updated',
          });

          this.load_btn = false;
          this.updateForm.reset();
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
  }
}
