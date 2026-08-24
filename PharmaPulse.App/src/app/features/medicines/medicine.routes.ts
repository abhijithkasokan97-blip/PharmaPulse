import { Routes } from "@angular/router";

export const MEDICINE_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import("./medicine-list/medicine-list.component").then(
            m => m.MedicineListComponent
        )
    }
];