import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateMedicineDto, Medicine } from 'src/app/api/models/medicine.model';
import { MedicineService } from 'src/app/api/services/medicine.service';
import { MEDICINE_FORM_PLACEHOLDERS } from './medicine-add.constant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ERROR_MESSAGES } from 'src/app/common/constant/common.constant';

@Component({
  selector: 'pp-medicine-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.scss']
})
export class MedicineAddComponent {
  private destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<MedicineAddComponent>);
  private readonly medicineService = inject(MedicineService);

  public readonly PLACEHOLDERS = MEDICINE_FORM_PLACEHOLDERS;
  public readonly addForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(255)]],
    brand: ['', [Validators.required, Validators.maxLength(50)]],
    quantity: [1, [Validators.required, Validators.min(0)]],
    price: [0.00, [Validators.required, Validators.min(0.01)]],
    expiryDate: ['', [Validators.required]],
    notes: ['']
  });

  public onSubmit(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
  
    const formValue = this.addForm.getRawValue();
    const newMedicine: CreateMedicineDto = {
      ...formValue,
      expiryDate: new Date(formValue.expiryDate).toISOString().split('T')[0]
    };

    this.medicineService.create(newMedicine)
     .pipe(
        takeUntilDestroyed(this.destroyRef) 
      )
      .subscribe({
        next: () => {
          this.dialogRef.close(newMedicine);
        },
        error :() => {
          console.log(ERROR_MESSAGES.DEFAULT);
        }
    });
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }
}