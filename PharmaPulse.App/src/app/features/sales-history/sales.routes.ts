import { Routes } from "@angular/router";

export const SALES_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import("./sales-history.component").then(
            m => m.SalesHistoryComponent
        )
    }
];