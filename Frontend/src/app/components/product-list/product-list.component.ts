import {AfterViewInit, Component, ViewChild, Output, EventEmitter, OnInit} from '@angular/core';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ProductDetailsDialogComponent} from '../product-details-dialog/product-details-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router, RouterModule } from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import {Product} from '../../models/product.model';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from '../toolbar/toolbar.component';

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
    MatCardModule,
    MatToolbarModule,
    ToolbarComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  filteredProducts = [...this.dataSource.data];
  columnsToDisplay = ['addToCart', 'image', 'name', 'description', 'price', 'category'];
  uniqueCategories: string[] = [];
  isTableView: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
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
      this.filteredProducts = this.dataSource.data;
    });
  }

  getUniqueCategories(products: any[]): string[] {
    const categories = products.map(product => product.category_name);
    return [...new Set(categories)];
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const searchText = filterValue.trim().toLowerCase();

    this.dataSource.filter = searchText;

    this.filteredProducts = this.dataSource.data.filter(product =>
      product.name.toLowerCase().includes(searchText) ||
      product.category_name.toLowerCase().includes(searchText) ||
      product.short_description.toLowerCase().includes(searchText)
    );

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleView() {
    this.isTableView = !this.isTableView;
  }

  showDetails(product: Product) {
    if (product) {
      this.dialog.open(ProductDetailsDialogComponent, {
        data: product
      });
    }
  }

}
