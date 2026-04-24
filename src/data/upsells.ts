export interface UpsellItem {
  id: string;
  name: string;
  price: number;
}

export const UPSELL_ITEMS: UpsellItem[] = [
  { id: "airport-pickup", name: "Airport Pickup", price: 25 },
  { id: "surf-lesson", name: "Surf Lesson", price: 25 },
  { id: "board-rental", name: "Board + Wetsuit Rental", price: 12 },
  { id: "yoga-session", name: "Rooftop Yoga", price: 12 },
  { id: "paradise-valley", name: "Paradise Valley Trip", price: 25 },
];
