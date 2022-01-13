import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-reviews-producto',
  templateUrl: './reviews-producto.component.html',
  styleUrls: ['./reviews-producto.component.css'],
})
export class ReviewsProductoComponent implements OnInit {
  submitted = false;

  load_btn = false;
  load_data = true;

  private id: any;

  reviews: Array<any> = [];
  product: any = {};

  page = 1;
  pageSize = 15;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.productService.getProduct(this.id).subscribe({
        next: async (resp: any) => {
          this.product = resp.data;

          this.productService.getReviewsProduct(this.product._id).subscribe({
            next: async (resp: any) => {
              if (resp.data) {
                this.reviews = resp.data;
              }
            },
            error: (error: any) => {
              console.log('error', error);
            },
          });

          this.load_data = false;
          /* 
          this.updateForm.reset();
          this.router.navigateByUrl('/panel/clientes'); */
        },
        error: (error: any) => {
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
}
