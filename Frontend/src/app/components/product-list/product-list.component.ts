import {AfterViewInit, Component, ViewChild, Output, EventEmitter, OnInit} from '@angular/core';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ProductDetailsDialogComponent} from '../product-details-dialog/product-details-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatOption, MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router, RouterModule } from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatOption,
    MatSelectModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements AfterViewInit, OnInit {
  dataSource: MatTableDataSource<Product>;
  filteredDataSource: MatTableDataSource<any>;
  columnsToDisplay = ['addToCart', 'name', 'description', 'price', 'category'];
  selectedCategories: string[] = [];
  uniqueCategories: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private cartService: CartService, private router: Router, private productService: ProductService) {
    this.dataSource = new MatTableDataSource<Product>([]);
    this.filteredDataSource = this.dataSource;
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts(){
    this.productService.products$.subscribe(products => {
      if (products) {
        this.dataSource.data = products;
        this.filteredDataSource.data = products;
        this.uniqueCategories = this.getUniqueCategories(products);
      }
    });
  }

  getUniqueCategories(products: any[]): string[] {
    const categories = products.map(product => product.category_name);
    return [...new Set(categories)];
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyCategoryFilter() {
    if (this.selectedCategories.length > 0) {
      this.filteredDataSource.data = this.dataSource.data.filter(product =>
        this.selectedCategories.includes(product.category_name)
      );
    } else {
      this.filteredDataSource.data = this.dataSource.data;
    }
    this.filteredDataSource.paginator = this.paginator;
  }

  showDetails(productId: number) {
    const product = this.dataSource.data.find((product: any) => product.id === productId);
    if (product) {
      this.dialog.open(ProductDetailsDialogComponent, {
        data: product
      });
    }
  }

  onCartButtonClick() {
    this.router.navigate(['/cart']);
  }

  onAdminButtonClick() {
    this.router.navigate(['/admin']);
  }
}
