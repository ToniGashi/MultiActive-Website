export type IPartner = {
  id: string; // UUID
  name: string; // Unique partner name
  main_image: string; // URL of the main image
  description: string; // Detailed description
  images: string[]; // Array of image URLs
  open_time: string; // Opening time in HH:mm format
  close_time: string; // Closing time in HH:mm format
  day_offs: string[]; // Array of days off (e.g., ["Sunday", "Saturday"])
  address: string; // Street address
  city: string; // City name
  country: string; // Country name
  thumbnail_image: string; // Thumbnail image URL
  longitude: number; // Longitude coordinate
  latitude: number; // Latitude coordinate
  created_at: Date; // Timestamp of creation
  updated_at: Date; // Timestamp of last update
};
