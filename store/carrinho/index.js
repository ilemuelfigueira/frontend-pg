import { create } from "zustand";

const defaultValues = {
  cdcarrinho: "",
  cdendereco: "",
  cdpagamento: "",
};

export const useCheckoutStore = create((set) => ({
  state: defaultValues,
  actions: {
    update(key, value) {
      const keys = Object.keys(defaultValues);
      if (!keys.includes(key)) return;

      set((state) => ({
        state: {
          ...state.state,
          [key]: value,
        },
      }));
    },
    reset() {
      set(() => ({
        state: defaultValues,
      }));
    },
  },
}));
