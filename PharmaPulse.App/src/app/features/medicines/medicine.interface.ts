import { Medicine } from "src/app/api/models/medicine.model";

export interface MedicineViewModel extends Medicine {
  rowHighlightClass: 'row-expiring-soon' | 'row-low-stock' | '';
};
