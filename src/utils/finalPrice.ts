import type { UpsellItem } from "../data/upsells";

export type SelectedUpsellIds = string[];

export function addUpsell(selectedIds: SelectedUpsellIds, upsellId: string): SelectedUpsellIds {
  if (selectedIds.includes(upsellId)) return selectedIds;
  return [...selectedIds, upsellId];
}

export function removeUpsell(selectedIds: SelectedUpsellIds, upsellId: string): SelectedUpsellIds {
  return selectedIds.filter((id) => id !== upsellId);
}

export function toggleUpsell(selectedIds: SelectedUpsellIds, upsellId: string): SelectedUpsellIds {
  return selectedIds.includes(upsellId)
    ? removeUpsell(selectedIds, upsellId)
    : addUpsell(selectedIds, upsellId);
}

export function getSelectedUpsells(
  selectedIds: SelectedUpsellIds,
  availableUpsells: UpsellItem[]
): UpsellItem[] {
  return availableUpsells.filter((item) => selectedIds.includes(item.id));
}

export function calculateFinalPrice(baseRoomPrice: number, selectedUpsells: UpsellItem[]): number {
  const extrasTotal = selectedUpsells.reduce((sum, item) => sum + item.price, 0);
  return Number((baseRoomPrice + extrasTotal).toFixed(2));
}
