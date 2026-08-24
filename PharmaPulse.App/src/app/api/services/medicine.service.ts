import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams }  from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CreateMedicineDto, Medicine } from "../models/medicine.model";

@Injectable({
    providedIn: "root"
})
export class MedicineService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/medicines`;

    public getAll(search?: string): Observable<Medicine[]> {

        let params = new HttpParams();

        if (search) {
            params = params.set('search', search);
        }

        return this.http.get<Medicine[]>(this.apiUrl, { params });
    }

    public create(payload:  CreateMedicineDto): Observable<Medicine> {
        return this.http.post<Medicine>(this.apiUrl, payload);
    }


}