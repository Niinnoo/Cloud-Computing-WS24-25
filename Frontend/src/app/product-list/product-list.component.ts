import {AfterViewInit, Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
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

@Component({
  selector: 'app-product-list',
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
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements AfterViewInit{
  // Toggles the cart visibility
  @Output() toggleCart = new EventEmitter<void>();
  
  onCartButtonClick() {
    this.toggleCart.emit();
  }

  products = [
    { id: 1, name: 'Wireless Headphones', description: 'High-quality headphones.', price: 149.99, category: 'Electronics' },
    { id: 2, name: 'Smartwatch', description: 'Track fitness and stay connected.', price: 199.99, category: 'Electronics' },
    { id: 3, name: 'Coffee Maker', description: 'Brew fresh coffee.', price: 79.99, category: 'Home Appliances' },
    { id: 4, name: 'Running Shoes', description: 'Durable running shoes.', price: 89.99, category: 'Fashion' },
    { id: 5, name: 'Gaming Mouse', description: 'Ergonomic mouse for gaming.', price: 59.99, category: 'Electronics' },
    { id: 6, name: 'Blender', description: 'Powerful blender for smoothies and more.', price: 49.99, category: 'Home Appliances' },
    { id: 7, name: 'Yoga Mat', description: 'Non-slip mat for your yoga sessions.', price: 29.99, category: 'Sports' },
    { id: 8, name: 'Laptop Stand', description: 'Adjustable stand to hold your laptop comfortably.', price: 39.99, category: 'Office' },
    { id: 9, name: 'Water Bottle', description: 'Insulated bottle to keep your drinks cold or hot.', price: 19.99, category: 'Sports' },
    { id: 10, name: 'Desk Lamp', description: 'Energy-efficient desk lamp with adjustable brightness.', price: 24.99, category: 'Office' },
    { id: 11, name: 'Electric Toothbrush', description: 'High-tech toothbrush for better oral care.', price: 59.99, category: 'Personal Care' },
    { id: 12, name: 'Smart Thermostat', description: 'Smart thermostat to control your home temperature remotely.', price: 129.99, category: 'Home Appliances' },
    { id: 13, name: 'Portable Charger', description: 'Compact portable charger to power your devices on the go.', price: 39.99, category: 'Electronics' },
    { id: 14, name: 'Waterproof Bluetooth Speaker', description: 'Durable and waterproof speaker for outdoor adventures.', price: 99.99, category: 'Electronics' },
    { id: 15, name: 'Smart Light Bulb', description: 'Control the lighting in your home with your phone or voice.', price: 29.99, category: 'Home Appliances' },
    { id: 16, name: 'Folding Bike', description: 'Compact folding bike for easy storage and transport.', price: 349.99, category: 'Sports' },
    { id: 17, name: 'Office Chair', description: 'Ergonomic office chair for all-day comfort.', price: 179.99, category: 'Office' },
    { id: 18, name: 'Robot Vacuum Cleaner', description: 'Automated vacuum cleaner for easy cleaning.', price: 299.99, category: 'Home Appliances' },
    { id: 19, name: 'Smartphone', description: 'Latest model smartphone with high-end features.', price: 799.99, category: 'Electronics' },
    { id: 20, name: 'Fitness Tracker', description: 'Track your daily fitness goals and monitor health data.', price: 129.99, category: 'Sports' },
    { id: 21, name: 'Electric Kettle', description: 'Fast boiling electric kettle with temperature control.', price: 49.99, category: 'Home Appliances' },
    { id: 22, name: 'Sunglasses', description: 'Stylish sunglasses with UV protection.', price: 59.99, category: 'Fashion' },
    { id: 23, name: 'Backpack', description: 'Spacious backpack for your daily needs.', price: 69.99, category: 'Fashion' },
    { id: 24, name: 'Bluetooth Earbuds', description: 'Wireless earbuds with noise-canceling features.', price: 89.99, category: 'Electronics' },
    { id: 25, name: 'Kitchen Knife Set', description: 'Complete knife set for all your kitchen needs.', price: 119.99, category: 'Home Appliances' }
  ];
  dataSource: MatTableDataSource<any>;
  filteredDataSource: MatTableDataSource<any>;
  columnsToDisplay = ['name', 'description', 'price', 'category'];
  selectedCategories: string[] = [];
  uniqueCategories: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.products);
    this.filteredDataSource = this.dataSource;
    this.uniqueCategories = this.getUniqueCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUniqueCategories(): string[] {
    const categories = this.products.map(product => product.category);
    return [...new Set(categories)];
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
      this.filteredDataSource.data = this.products.filter(product =>
        this.selectedCategories.includes(product.category)
      );
    } else {
      this.filteredDataSource.data = this.products;
    }
    this.filteredDataSource.paginator = this.paginator;
  }

  showDetails(productId: number) {
    const product = this.products.find(product => product.id === productId);
    if (product) {
      this.dialog.open(ProductDetailsDialogComponent, {
        data: product
      })
    }
  }
}
