import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CollectionStore {
  collectionAddress: string | null;
  setCollectionAddress: (address: string) => void;
  isCollectionCreated: boolean;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      collectionAddress: null,
      isCollectionCreated: false,
      setCollectionAddress: (address) => 
        set({ collectionAddress: address, isCollectionCreated: true }),
    }),
    {
      name: 'collection-storage',
    }
  )
); 