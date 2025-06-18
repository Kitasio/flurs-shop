interface PosterFormat {
  name: string;
  price: number;
}

export interface Poster {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  formats: { data: PosterFormat[] };
  hidden: boolean;
  id: string;
  images: { data: string[] };
  inventory: number;
  name: string;
  updated: string;
  // Add other fields if they exist and are needed
}
