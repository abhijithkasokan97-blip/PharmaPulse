import { SaleRecord } from "src/app/api/models/sale.model";

export interface SaleHistoryViewModel extends SaleRecord {
    medicineName: string;
}