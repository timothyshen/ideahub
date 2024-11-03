export interface Idea {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  price: number;
  listedDate: string;
  license?: string;
  mediaUrl?: string;
  ipAssetId?: string;
  collectionId?: string;
  userId: string;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewIdea = Omit<Idea, 'id' | 'createdAt' | 'updatedAt' | 'isRegistered' | 'userId'>; 