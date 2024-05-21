import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useOffre = create(
  persist(
    (set, get) => ({
      Offre: {},
      setOffre: (data) => set({ Offre: data }),
    }),
    {
      name: "OffreStore", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
