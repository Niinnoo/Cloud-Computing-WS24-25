import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../models/product.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatOption, MatSelect} from '@angular/material/select';
import {CategoryService} from '../../services/category/category.service';
import {MatTableDataSource} from '@angular/material/table';
import {Category} from '../../models/category.model';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-product-admin-dialog',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    CommonModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './product-admin-dialog.component.html',
  styleUrl: './product-admin-dialog.component.css'
})
export class ProductAdminDialogComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean;
  uploadedImage: string | ArrayBuffer | null | undefined = null;
  categories = new MatTableDataSource<Category>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null },
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {
    this.isEditMode = !!data.product;
    this.productForm = this.formBuilder.group({
      image:[data.product?.image || '', Validators.required],
      name: [data.product?.name || '', Validators.required],
      price: [data.product?.price || 0, [Validators.required, Validators.min(0.01)]],
      short_description: [data.product?.short_description || '', Validators.required],
      long_description: [data.product?.long_description || '', Validators.required],
      category_name: [data.product?.category_name || '', Validators.required],
      stock: [data.product?.stock || 0, [Validators.required, Validators.min(0)]],
    })
  }

  ngOnInit() {
    this.categoryService.fetchCategories();
    this.categoryService.categories$.subscribe((categories) => {
      this.categories.data = categories;
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target?.result;

        // Convert the image to Base64 and patch the form value
        const base64Image = e.target?.result as string;
        this.productForm.patchValue({
            image: base64Image,
        });
        this.productForm.get('image')?.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
    }
  }

  onSave() {
    if (this.productForm.valid) {
      if (this.isEditMode) {
        let product: Product = this.productForm.value;
        product.id = this.data.product!.id;
        product.category_name = this.categories.data.find(cat => cat.name === product.category_name)?.id.toString() ?? product.category_name;
        this.productService.updateProduct(product);
        console.log(product);
      }
      else {
        this.productService.addProduct(this.productForm.value);
        console.log(this.productForm.value);
      }
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
