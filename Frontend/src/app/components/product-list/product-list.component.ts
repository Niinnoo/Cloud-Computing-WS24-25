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
import {MatCardModule} from '@angular/material/card';

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
    MatSelectModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule,
    MatCardModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  columnsToDisplay = ['addToCart', 'name', 'description', 'price', 'category'];
  uniqueCategories: string[] = [];
  isTableView: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private router: Router,
    private productService: ProductService)
  {
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
      this.uniqueCategories = this.getUniqueCategories(products);
    });
  }

  getUniqueCategories(products: any[]): string[] {
    const categories = products.map(product => product.category_name);
    return [...new Set(categories)];
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleView() {
    this.isTableView = !this.isTableView;
  }

  showDetails(product: number) {
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
