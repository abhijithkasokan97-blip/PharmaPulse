import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { toSignal } from '@angular/core/rxjs-interop';
import { ADD_MEDICINE_MODAL_WIDTH, MEDICINE_LIST_TABLE_COLUMNS } from './medicine-list.constant';
import { MedicineViewModel } from '../medicine.interface';
import { MedicineService } from 'src/app/api/services/medicine.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { formatMedicines } from './medicine-list.helper';
import { Medicine } from 'src/app/api/models/medicine.model';
import { MedicineAddComponent } from '../medicine-add/medicine-add.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'pp-medicine-list',
  standalone: true, 
  imports: [
    CommonModule,        
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    DatePipe
  ],
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {
  private readonly medicineService = inject(MedicineService);
  private readonly dialog = inject(MatDialog);
  public readonly displayedColumns: string[] = MEDICINE_LIST_TABLE_COLUMNS;

  public readonly searchControl = new FormControl('');
  public readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  public readonly isLoading = signal<boolean>(false);
  public readonly medicines = signal<MedicineViewModel[]>([]);

  ngOnInit(): void {
    this.loadMedicines();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.loadMedicines(term || '');
    });
  }

  public openAddMedicineModal(): void {
    const dialogRef = this.dialog.open(MedicineAddComponent, {
      width: ADD_MEDICINE_MODAL_WIDTH,
      disableClose: true,
      autoFocus: 'first-tabbable',
      restoreFocus: true
    });

    dialogRef.afterClosed().subscribe((result: Omit<Medicine, 'id'> | null) => {
      if (result) {
        const createdMedicine: MedicineViewModel = formatMedicines([{
          ...result,
          id: `MED-${Date.now().toString().slice(-4)}`
        }])[0];
        
        this.medicines.update((list) => [createdMedicine, ...list]);
      }
    });
  }

  public loadMedicines(search: string = ''): void {
    this.isLoading.set(true);

    this.medicineService.getAll(search).subscribe({
      next: (medicines: Medicine[]) => {
        this.isLoading.set(false);
        const formattedMedicines = formatMedicines(medicines);
        this.medicines.set(formattedMedicines);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Failed to load medicines:', err);
      }
    });
  }
}
