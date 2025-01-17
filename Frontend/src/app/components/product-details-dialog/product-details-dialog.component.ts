import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-product-details-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './product-details-dialog.component.html',
  styleUrl: './product-details-dialog.component.css'
})
export class ProductDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
