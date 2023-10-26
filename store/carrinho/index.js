import { create } from "zustand";
import { v4 as uuid } from 'uuid'

const defaultValues = {
  cdPedido: uuid(),
  nmStore: 'PGCUSTOM',
  nmCliente: '',
  nmTelefone: '',
  nmCEP: '',
  nmEndereco: '',
  nmCidade: '',
  nmEstado: '',
  nmComplemento: '',
  nmTotal: '',
  nmObservacoes: '',
  nmEmailCliente: '',
  produtos: []
}

export const useCarrinhoStore = create((set) => ({
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
