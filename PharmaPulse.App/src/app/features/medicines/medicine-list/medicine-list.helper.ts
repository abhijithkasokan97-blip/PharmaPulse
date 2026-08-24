import { Medicine } from 'src/app/api/models/medicine.model';
import { MedicineViewModel } from '../medicine.interface';

export function formatMedicines(items: Medicine[]): MedicineViewModel[] {
  const today = new Date();

  return items.map((item) => {
    const expiry = new Date(item.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let rowHighlightClass: MedicineViewModel['rowHighlightClass'] = '';

    if (daysUntilExpiry <= 30) {
      rowHighlightClass = 'row-expiring-soon';
    } else if (item.quantity < 10) {
      rowHighlightClass = 'row-low-stock';
    }

    return {
      ...item,
      rowHighlightClass,
    };
  });
}