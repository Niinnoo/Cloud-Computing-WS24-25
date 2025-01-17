import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../models/product.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-admin-dialog',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './product-admin-dialog.component.html',
  styleUrl: './product-admin-dialog.component.css'
})
export class ProductAdminDialogComponent {
  productForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null }
  ) {
    this.isEditMode = !!data.product;
    this.productForm = this.formBuilder.group({
      name: [data.product?.name || '', Validators.required],
      price: [data.product?.price || 0, [Validators.required, Validators.min(0.01)]],
      short_description: [data.product?.short_description || '', Validators.required],
      long_description: [data.product?.long_description || '', Validators.required],
      category_name: [data.product?.category_name || '', Validators.required],
      stock: [data.product?.stock || 0, [Validators.required, Validators.min(0)]],
    })
  }

  onSave() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
