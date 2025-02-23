import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product/product.service';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {ProductAdminDialogComponent} from '../product-admin-dialog/product-admin-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatToolbar } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { CartService } from '../../services/shopping-cart/shopping-cart.service';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {CategoryService} from '../../services/category/category.service';

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
    MatIconModule,
    MatSortModule,
    MatPaginator,
    ToolbarComponent,
    MatOption,
    MatSelect,
    NgForOf
  ],
  providers: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  filteredProducts = [...this.dataSource.data];
  uniqueCategories: string[] = [];
  filter: string[] = ["", ""];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private categoryService: CategoryService
  ) {

  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.fetchProducts();
    this.productService.products$.subscribe((products) => {
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyFilter();
    });

    this.categoryService.fetchCategories();
    this.categoryService.categories$.subscribe((categories) => {
      this.uniqueCategories = this.getUniqueCategories(categories);
    })
  }

  getUniqueCategories(categories: any[]): string[] {
    const cats = categories.map(category => category.name);
    return [...new Set(cats)];
  }

  onAddProduct() {
    const dialogRef = this.dialog.open(ProductAdminDialogComponent, {
      width: '80%',
      maxHeight: '80vh',
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
      width: '80%',
      maxHeight: '80vh',
      data: { product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this.productService.updateProduct({ ...product, ...result });
      }
    });
  }

  onDeleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter[0] = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  applyCategoryFilter(event: any) {
    this.filter[1] = event.value.toLowerCase();
    this.applyFilter();
  }

  applyFilter() {
    this.filteredProducts = this.dataSource.data.filter(product =>
      ( // Search Filter
        product.name.toLowerCase().includes(this.filter[0]) ||
        product.category_name.toLowerCase().includes(this.filter[0]) ||
        product.short_description.toLowerCase().includes(this.filter[0])
      ) &&
      ( //Category Filter
        product.category_name.toLowerCase().includes(this.filter[1])
      )
    );
  }

}
