import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css'],
})
export class UpdateCuponComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;
  cupon: any;

  public updateForm = this.fb.group({
    codigo: ['Test', [Validators.required, Validators.minLength(3)]],
    tipo: [null, [Validators.required]],
    valor: ['', [Validators.required, Validators.minLength(1)]],
    limite: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cuponService: CuponService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.cuponService.getCupon(this.id).subscribe({
        next: (resp: any) => {
          this.cupon = resp.data;

          this.updateForm.setValue({
            codigo: this.cupon.codigo || '',
            tipo: this.cupon.tipo || null,
            valor: this.cupon.valor || 0,
            limite: this.cupon.limite || 0,
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

  changeTipo($event: any) {
    this.getControl['tipo'].setValue($event.target.value);
  }

  update() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    this.load_btn = true;

    this.cuponService
      .updateCupon(this.cupon._id, this.updateForm.value)
      .subscribe({
        next: (resp: any) => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Cupon successfully updated',
          });

          this.load_btn = false;
          this.updateForm.reset();
          this.router.navigateByUrl('/panel/cupones');
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
