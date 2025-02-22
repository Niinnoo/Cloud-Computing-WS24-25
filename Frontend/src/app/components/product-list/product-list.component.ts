import {Component, ViewChild, OnInit} from '@angular/core';
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
import {ProductService} from '../../services/product/product.service';
import {Product} from '../../models/product.model';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  uniqueCategories: string[] = [];
  filter: string[] = ["", ""];

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  )
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

  getSafeImageUrl(image: string) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

  getUniqueCategories(products: any[]): string[] {
    const categories = products.map(product => product.category_name);
    return [...new Set(categories)];
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id);
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

  showDetails(product: Product) {
    if (product) {
      this.dialog.open(ProductDetailsDialogComponent, {
        data: product
      });
    }
  }

}
