export interface Idea {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  price: number;
  tags: string[];
  listedDate?: string;
  license?: string;
}
