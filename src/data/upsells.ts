export interface UpsellItem {
  id: string;
  name: string;
  price: number;
}

export const UPSELL_ITEMS: UpsellItem[] = [
  { id: "surf-lesson", name: "Surf Lesson", price: 30 },
  { id: "paradise-valley", name: "Paradise Valley", price: 30 },
  { id: "sand-dunes", name: "Sand Dunes", price: 30 },
  { id: "airport-pickup", name: "Taxi", price: 25 },
  { id: "washing-machine", name: "Washing Machine", price: 5 },
  { id: "skate-park", name: "Skate Park Sunset", price: 5 },
];
