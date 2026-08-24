import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SaleRecord } from 'src/app/api/models/sale.model';
import { SALES_HISTORY_TABLE_COLUMNS } from './sales-history.constant';
import { SaleService } from 'src/app/api/services/sale.service';
import { ERROR_MESSAGES } from 'src/app/common/constant/common.constant';
import { forkJoin, map } from 'rxjs';
import { MedicineService } from 'src/app/api/services/medicine.service';
import { Medicine } from 'src/app/api/models/medicine.model';
import { SaleHistoryViewModel } from './sale-history.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pp-sales-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private readonly saleService = inject(SaleService);
  private readonly medicineService = inject(MedicineService);
  public displayedColumns: string[] = SALES_HISTORY_TABLE_COLUMNS;
  public saleRecords = new MatTableDataSource<SaleHistoryViewModel>([]);


  ngOnInit(): void {
    this.loadSaleHistory();
  }

  private loadSaleHistory(): void {
    forkJoin([
      this.saleService.getAll(),
      this.medicineService.getAll(),
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(
        ([salesHistory, medicines]:[ SaleRecord[], Medicine[]]) => {
          const medMap = new Map(medicines.map((m) => [m.id, m]));
    
        return salesHistory.map((sale) => ({
          ...sale,
          medicineName: medMap.get(sale.medicineId)?.fullName || "",
          brand: medMap.get(sale.medicineId)?.brand
        }));
      })
    ).subscribe({
      next: (saleRecords : SaleHistoryViewModel[]) => {
        this.saleRecords.data = saleRecords;
      },
      error: (err) => {
        console.log(ERROR_MESSAGES.DEFAULT);
      }
    })
  }
}