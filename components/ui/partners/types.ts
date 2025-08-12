export type IPartner = {
  id: string; // UUID
  name: string; // Unique partner name
  mainImage: string; // URL of the main image
  description: string; // Detailed description
  images: string[]; // Array of image URLs
  openTime: string; // Opening time in HH:mm format
  closeTime: string; // Closing time in HH:mm format
  dayOffs: string[]; // Array of days off (e.g., ["Sunday", "Saturday"])
  address: string; // Street address
  city: string; // City name
  country: string; // Country name
  thumbnailImage: string; // Thumbnail image URL
  longitude: number; // Longitude coordinate
  latitude: number; // Latitude coordinate
  createdAt: Date; // Timestamp of creation
  updatedAt: Date; // Timestamp of last update
};
