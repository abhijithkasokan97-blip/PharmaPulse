import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams }  from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CreateMedicineDto, Medicine } from "../models/medicine.model";
import { SaleRecord } from "../models/sale.model";

@Injectable({
    providedIn: "root"
})
export class SaleService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/sales`;

    public getAll(): Observable<SaleRecord[]> {
      return this.http.get<SaleRecord[]>(this.apiUrl);
    } 
}