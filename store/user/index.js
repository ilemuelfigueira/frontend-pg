import { create } from "zustand";

const defaultValues = {
  cdUsuario: "",
  nmUsuario: "",
  nmEmail: "",
  nmTelefone: ""
}

export const useUserStore = create((set) => ({
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
