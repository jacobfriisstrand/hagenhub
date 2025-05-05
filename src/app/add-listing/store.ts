import { create } from "zustand";

import type { AddListingFormValues } from "@/app/features/listings/schemas/add-listing-schema";

type AddListingState = {
  formData: Partial<AddListingFormValues>;
  setFormData: (data: Partial<AddListingFormValues>) => void;
  clearFormData: () => void;
  isListingCreated: boolean;
  setListingCreated: (value: boolean) => void;
};

export const useListingStore = create<AddListingState>()(set => ({
  formData: {},
  setFormData: data => set(state => ({ formData: { ...state.formData, ...data } })),
  clearFormData: () => set({ formData: {} }),
  isListingCreated: false,
  setListingCreated: value => set({ isListingCreated: value }),
}));
