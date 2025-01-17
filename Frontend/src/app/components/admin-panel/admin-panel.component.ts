import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product/product.service';
import {MatDialog} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {ProductAdminDialogComponent} from '../product-admin-dialog/product-admin-dialog.component';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  imports: [
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  //products: Product[] = [];
  dataSource$!: Observable<Product[]>;

  constructor(private router:Router, private productService: ProductService, private dialog: MatDialog) {
    //this.products$ = this.productService.products$;
  }

  ngOnInit() {
    //this.productService.getProducts().subscribe((products) => (this.products = products));
    this.productService.fetchProducts();
    this.dataSource$ = this.productService.products$.pipe(
      map((products) => products || [])
    );
  }

  onAddProduct() {
    const dialogRef = this.dialog.open(ProductAdminDialogComponent, {
      width: '400px',
      data: { product: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this.productService.addProduct(result);
      }
    });
  }

  onEditProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductAdminDialogComponent, {
      width: '400px',
      data: { product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this.productService.updateProduct({ ...product, ...result });
      }
    });
  }

  onDeleteProduct(id: number) {
    //this.productService.deleteProduct(id);
  }
}
