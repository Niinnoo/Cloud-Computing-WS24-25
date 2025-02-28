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
      this.dataSource.filterPredicate = (data: Product, filter: string) => {
        const searchMatch = data.name.toLowerCase().includes(filter) || data.id.toString().includes(filter);
        const categoryMatch = this.filter[1] ? data.category_name.toLowerCase() === this.filter[1].toLowerCase() : true;
        return searchMatch && categoryMatch;
      };
      //this.applyFilter();
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
  }

  onEditProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductAdminDialogComponent, {
      width: '80%',
      maxHeight: '80vh',
      data: { product },
    });
  }

  onDeleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
